import { isKeyword, isAlpha, isDigit, isOperatorChar, isBinaryOperator, isUnaryOperator, isPunctuator, isType } from "./detection.ts";

export enum TokenType {
  EOF,
  SOF,
  IDENTIFIER,
  TYPE,
  NUMBER,
  STRING,
  KEYWORD,
  BIN_OPERATOR,
  UNA_OPERATOR,
  PUNCTUATOR,
  COMMENT,
  ERROR,
}

export interface Token {
  type: TokenType;
  value: string;
}

export interface TokenWrapper {
  token: Token | null;
  index: number;
}

function handleWhitespace(source: string, index: number): TokenWrapper {
  while (/\s/.test(source[index])) {
    index++;
  }

  return { token: null, index: index };
}

function handleEOF(source: string, index: number): TokenWrapper {
  if (index >= source.length) {
    const token: Token = {
      type: TokenType.EOF,
      value: "",
    };
    return { token: token, index: index };
  }
  return { token: null, index: index };
}

function handleNamespace(source: string, index: number): TokenWrapper {
  if (isAlpha(source[index])) {
    const start = index;
    while (index < source.length && (isAlpha(source[index]) || isDigit(source[index]))) {
      index++;
    }
    const value = source.slice(start, index);

    let type: TokenType;

    if (isKeyword(value)) {
      type = TokenType.KEYWORD;
    } else if (isType(value)) {
      type = TokenType.TYPE;
    } else {
      type = TokenType.IDENTIFIER;
    }
    const token: Token = {
      type: type,
      value: value,
    };
    return { token, index };
  }
  return { token: null, index };
}

function handleNumber(source: string, index: number): TokenWrapper {
  const start = index;
  while (index < source.length && isDigit(source[index])) {
    index++;
  }
  if (source[index] === "." && isDigit(source[index + 1])) {
    index++;
    while (index < source.length && isDigit(source[index])) {
      index++;
    }
  }
  const value = source.slice(start, index);
  if (value) {
    const token: Token = {
      type: TokenType.NUMBER,
      value: value,
    };

    return { token, index };
  }

  return { token: null, index };
}

function handleString(source: string, index: number): TokenWrapper {
  if (source[index] === '"') {
    const start = index + 1;
    index++;
    while (index < source.length && source[index] !== '"') {
      index++;
    }
    const value = source.slice(start, index);
    const token: Token = {
      type: TokenType.STRING,
      value: value,
    };
    index++;
    return { token, index };
  }
  return { token: null, index };
}

function handleOperator(source: string, index: number): TokenWrapper {
  const start = index;
  while (index < source.length && isOperatorChar(source[index])) {
    index++;
  }

  const value = source.slice(start, index);

  if (isUnaryOperator(value)) {
    const token: Token = {
      type: TokenType.UNA_OPERATOR,
      value: value,
    };
    index++;
    return { token, index: index };
  }

  if (isBinaryOperator(value)) {
    const token: Token = {
      type: TokenType.BIN_OPERATOR,
      value: value,
    };
    index++;
    return { token, index: index };
  }

  return { token: null, index };
}

function handlePunctuator(source: string, index: number): TokenWrapper {
  if (isPunctuator(source[index])) {
    const value = source[index];
    const token: Token = {
      type: TokenType.PUNCTUATOR,
      value: value,
    };
    index++;
    return { token, index: index };
  }
  return { token: null, index };
}

function handleComment(source: string, index: number): TokenWrapper {
  if (source[index] === "/") {
    const start: number = index;

    if (source[index + 1] === "/") {
      index += 2;
      while (index < source.length && source[index] !== "\n") {
        index++;
      }

      const value = source.slice(start, index);
      const token: Token = {
        type: TokenType.COMMENT,
        value: value,
      };
      return { token, index };
    } else if (source[index + 1] === "*") {
      index += 2;
      let start = index;
      while (index < source.length && !(source[index] === "*" && source[index + 1] === "/")) {
        index++;
      }
      let value = source.slice(start, index);
      value = value.replaceAll(/(\r\n|\n|\r)/gm, "");
      const token: Token = {
        type: TokenType.COMMENT,
        value: value,
      };
      index += 2;
      return { token, index };
    }
  }
  return { token: null, index };
}

function checkBorrower(borrower: TokenWrapper): boolean {
  return borrower.token !== null;
}

const instrQueue: Array<Function> = [handleWhitespace, handleEOF, handleComment, handleString, handlePunctuator, handleOperator, handleNumber, handleNamespace];

export default function handleToken(source: string, index: number): TokenWrapper {
  let borrower: TokenWrapper;

  borrower = instrQueue[0](source, index);
  index = borrower.index;

  for (let i = 1; i < instrQueue.length; i++) {
    borrower = instrQueue[i](source, index);
    if (checkBorrower(borrower)) {
      return borrower;
    }
  }

  const errToken: TokenWrapper = {
    token: { type: TokenType.ERROR, value: "" },
    index,
  };

  return errToken;
}