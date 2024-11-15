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

function handleWhitespace(source: string, index: number): TokenWrapper {
  while (/\s/.test(source[index]) === true) {
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

function checkBorrower(borrower: TokenWrapper) {
  if (borrower.token) {
    return true;
  }
  return false;
}

export default function handleToken(
  source: string,
  index: number
): TokenWrapper {
  let borrower: TokenWrapper | null;

  borrower = handleWhitespace(source, index);
  index = borrower.index;

  borrower = handleEOF(source, index);
  if (checkBorrower(borrower)) {
    return borrower;
  }

  borrower = handleNamespace(source, index);
  if (checkBorrower(borrower)) {
    return borrower;
  }

  const errToken: TokenWrapper = {
    token: { type: TokenType.ERROR, value: "" },
    index,
  };

  return errToken;
}
