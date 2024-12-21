import log from "../logs/log.ts";

import { isAlpha, isBinaryOperator, isBool, isDigit, isKeyword, isOperatorChar, isPunctuator, isType, isUnaryOperator } from "./detection.ts";

import { runQueue } from "../helper.ts";

export enum TokenType {
  EOF,
  SOF,
  IDENTIFIER,
  TYPE,
  INTNUM,
  REALNUM,
  STRING,
  BOOL,
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
  payload: Token | null;
  index: number;
}

function skipWhitespace(source: string, index: number): number {
  while (/\s/.test(source[index])) {
    index++;
  }

  return index;
}

function handleEOF(source: string, index: number): TokenWrapper {
  if (index >= source.length) {
    const token: Token = {
      type: TokenType.EOF,
      value: "",
    };
    return { payload: token, index: index };
  }
  return { payload: null, index: index };
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
    const value = source.slice(start, index);

    let type: TokenType;

    if (isKeyword(value)) {
      type = TokenType.KEYWORD;
    } else if (isType(value)) {
      type = TokenType.TYPE;
    } else if (isBool(value)) {
      type = TokenType.BOOL;
    } else {
      type = TokenType.IDENTIFIER;
    }

    const token: Token = {
      type: type,
      value: value,
    };
    return { payload: token, index };
  }
  return { payload: null, index };
}

function handleNumber(source: string, index: number): TokenWrapper {
  const start = index;
  let float = false;
  while (index < source.length && isDigit(source[index])) {
    index++;
  }
  if (source[index] === ".") {
    float = true;
    index++;
    while (index < source.length && isDigit(source[index])) {
      index++;
    }
  }
  const value = source.slice(start, index);
  if (value) {
    if (float) {
      const token: Token = {
        type: TokenType.REALNUM,
        value: value,
      };
      return { payload: token , index };
    } else {
      const token: Token = {
        type: TokenType.INTNUM,
        value: value,
      };
      return { payload: token, index };
    }
  }

  return { payload: null, index };
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
    return { payload: token, index };
  }
  return { payload: null, index };
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
    return { payload: token, index: index };
  }

  if (isBinaryOperator(value)) {
    const token: Token = {
      type: TokenType.BIN_OPERATOR,
      value: value,
    };
    return { payload: token, index: index };
  }

  return { payload: null, index };
}

function handlePunctuator(source: string, index: number): TokenWrapper {
  if (isPunctuator(source[index])) {
    const value = source[index];
    const token: Token = {
      type: TokenType.PUNCTUATOR,
      value: value,
    };
    index++;
    return { payload: token, index: index };
  }
  return { payload: null, index };
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
      return { payload: token, index };
    } else if (source[index + 1] === "*") {
      index += 2;
      let start = index;
      while (
        index < source.length &&
        !(source[index] === "*" && source[index + 1] === "/")
      ) {
        index++;
      }
      let value = source.slice(start, index);
      value = value.replaceAll(/(\r\n|\n|\r)/gm, "");
      const token: Token = {
        type: TokenType.COMMENT,
        value: value,
      };
      index += 2;
      return { payload: token, index };
    }
  }
  return { payload: null, index };
}

function checkBorrower(borrower: TokenWrapper): boolean {
  return borrower.payload !== null;
}

const instrQueue: Array<Function> = [
  handleEOF,
  handleString,
  handleComment,
  handlePunctuator,
  handleOperator,
  handleNumber,
  handleNamespace,
];

function handleToken(
  source: string,
  index: number,
): TokenWrapper {
  index = skipWhitespace(source, index)

  const borrower = runQueue(instrQueue, source, index)
  if(borrower) {
    return borrower
  }

  const errToken: TokenWrapper = {
    payload: { type: TokenType.ERROR, value: "" },
    index,
  };

  return errToken;
}

export default function handleTokens(
  source: string,
) {
  log.startLog("TOKEN");

  let tokenQueue: Array<Token> = [];

  let jumpToken: TokenWrapper = {
    payload: { type: TokenType.SOF, value: "" },
    index: 0,
  };

  tokenQueue.push(jumpToken.payload!);
  log.logToken(TokenType[jumpToken.payload!.type], jumpToken.payload!.value);

  let index = 0;

  while (jumpToken.payload?.type !== TokenType.EOF) {
    jumpToken = handleToken(source, index);

    if (jumpToken.payload?.type == TokenType.ERROR) {
      log.logTokenError(source, index);
      break;
    }

    tokenQueue.push(jumpToken.payload!);
    index = jumpToken.index;
    log.logToken(TokenType[jumpToken.payload!.type], jumpToken.payload!.value);
  }

  if (jumpToken.payload?.type != TokenType.ERROR) {
    log.logSuccess("TOKEN");
  }

  return tokenQueue;
}
