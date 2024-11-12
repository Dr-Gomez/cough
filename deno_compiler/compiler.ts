const sourceCode = `
if x == 42 {
    return "hello"
}
`;

enum TokenType {
  EOF,
  IDENTIFIER,
  NUMBER,
  STRING,
  KEYWORD,
  OPERATOR,
  PUNCTUATOR,
  COMMENT,
}

interface Token {
  type: TokenType;
  text: string;
}

const keywords: string[] = [
  "if",
  "then",
  "else",
  "elseif",
  "for",
  "while",
  "end",
  "until",
  "return",
];

function isKeyword(word: string): boolean {
  return keywords.includes(word);
}

function isAlpha(char: string): boolean {
  return /^[a-zA-Z_]$/.test(char);
}

function isDigit(char: string): boolean {
  return /^\d$/.test(char);
}

function isOperator(char: string): boolean {
  return ["+", "-", "*", "/", "=", "<", ">"].includes(char);
}

function isPunctuator(char: string): boolean {
  return [",", ".", ";", ":", "(", ")", "{", "}"].includes(char);
}

function skipWhitespace(input: string, index: number): number {
  while (index < input.length && /\s/.test(input[index])) {
    index++;
  }
  return index;
}

function getNextToken(
  input: string,
  index: number
): { token: Token; newIndex: number } {
  index = skipWhitespace(input, index);

  if (index >= input.length) {
    return { token: { type: TokenType.EOF, text: "" }, newIndex: index };
  }

  const char = input[index];

  if (isAlpha(char)) {
    let start = index;
    while (
      index < input.length &&
      (isAlpha(input[index]) || isDigit(input[index]))
    ) {
      index++;
    }
    const word = input.slice(start, index);
    const token: Token = {
      type: isKeyword(word) ? TokenType.KEYWORD : TokenType.IDENTIFIER,
      text: word,
    };
    return { token, newIndex: index };
  }

  if (isDigit(char)) {
    let start = index;
    while (index < input.length && isDigit(input[index])) {
      index++;
    }
    if (input[index] === ".") {
      index++;
      while (index < input.length && isDigit(input[index])) {
        index++;
      }
    }
    const token: Token = {
      type: TokenType.NUMBER,
      text: input.slice(start, index),
    };
    return { token, newIndex: index };
  }

  if (char === '"') {
    let start = index;
    index++;
    while (index < input.length && input[index] !== '"') {
      index++;
    }
    const token: Token = {
      type: TokenType.STRING,
      text: input.slice(start, index + 1),
    };
    index++;
    return { token, newIndex: index };
  }

  if (isOperator(char)) {
    const token: Token = {
      type: TokenType.OPERATOR,
      text: char,
    };
    index++;
    return { token, newIndex: index };
  }

  if (isPunctuator(char)) {
    const token: Token = {
      type: TokenType.PUNCTUATOR,
      text: char,
    };
    index++;
    return { token, newIndex: index };
  }

  if (char === "/" && input[index + 1] === "/") {
    index += 2;
    const start = index;
    while (index < input.length && input[index] !== "\n") {
      index++;
    }
    const token: Token = {
      type: TokenType.COMMENT,
      text: input.slice(start, index),
    };
    return { token, newIndex: index };
  }

  throw new Error(`Unexpected character: ${char}`);
}

class Lexer {
  input: string;
  index: number;

  constructor(input: string) {
    this.input = input;
    this.index = 0;
  }

  getNextToken(): Token {
    const { token, newIndex } = getNextToken(this.input, this.index);
    this.index = newIndex;
    return token;
  }

  tokenize(): Token[] {
    const tokens: Token[] = [];
    let token: Token;
    do {
      token = this.getNextToken();
      tokens.push(token);
    } while (token.type !== TokenType.EOF);
    return tokens;
  }
}

const lexer = new Lexer(sourceCode);
const tokens = lexer.tokenize();

tokens.forEach((token) => {
  console.log(`Token: ${token.text} (Type: ${TokenType[token.type]})`);
});
