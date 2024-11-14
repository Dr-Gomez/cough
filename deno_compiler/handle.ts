import {
  isKeyword,
  isAlpha,
  isDigit,
  isOperator,
  isPunctuator,
} from "./detection.ts";

export enum TokenType {
  EOF,
  SOF,
  IDENTIFIER,
  NUMBER,
  STRING,
  KEYWORD,
  OPERATOR,
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

function handleWhitespace(source: string, index: number): TokenWrapper {
  while (/\s/.test(source[index]) === true) {
    index++;
  }

  return { token: null, index: index };
}

function handleNamespace(source: string, index: number): TokenWrapper {
  if (isAlpha(source[index])) {
    const start = index;

    while (
      index < source.length &&
      (isAlpha(source[index]) || isDigit(source[index]))
    ) {
      index++;
    }

    const namespace = source.slice(start, index);

    const token: Token = {
      type: isKeyword(namespace) ? TokenType.KEYWORD : TokenType.IDENTIFIER,
      value: namespace,
    };

    return { token: token, index: index };
  }

  return { token: null, index: index };
}

export default function handleToken(
  source: string,
  index: number
): TokenWrapper {
  let borrower: TokenWrapper | null;

  borrower = handleEOF(source, index);
  if (borrower?.token !== null) {
    return borrower;
  }

  borrower = handleWhitespace(source, index);
  index = borrower.index;

  borrower = handleNamespace(source, index);
  if (borrower?.token !== null) {
    return borrower;
  }

  const errToken: TokenWrapper = {
    token: { type: TokenType.ERROR, value: "" },
    index,
  };

  return errToken;
}
