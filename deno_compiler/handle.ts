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
}

export interface Token {
  type: TokenType;
  value: string;
}

function handleEOF(source: string, index: number) {
  if (index >= source.length) {
    const token: Token = {
      type: TokenType.EOF,
      value: "",
    };

    return token;
  }
}

function handleNamespace(source: string, index: number): void | Token {
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

    return token;
  }
}

export default function handleToken(source: string, index: number): Token {
  let token: Token;
  let borrower: void | Token;

  borrower = handleNamespace(source, index);
  if (borrower) {
    token = borrower;
    borrower = undefined;
  }

  return token!;
}
