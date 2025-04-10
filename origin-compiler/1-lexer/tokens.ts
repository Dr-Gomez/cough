enum TokenType {
  BOOL = 0,
  INT_NUM = 1,
  REAL_NUM = 2,
  STRING = 3,
  IDENTIFIER = 4,
  LEFT_ENCAPSULATOR = 5,
  RIGHT_ENCAPSULATOR = 6,
  SEPARATOR = 7,
  TYPE = 8,
  SELECTION_KEYWORD = 9,
  SEQUENCING_KEYWORD = 10,
  SWAP_OPERATOR = 11,
  ASSIGNMENT_OPERATOR = 12,
  ARITHMETIC_OPERATOR = 13,
  BIT_OPERATOR = 14,
  COUNT_OPERATOR = 15,
  LOGICAL_KEYWORD = 16,
  EQUALITY_OPERATOR = 17,
  COMPARISON_OPERATOR = 18,
  IO_KEYWORD = 19,
  ERROR = 20,
  COMMENT = 21,
  length = 22,
}

interface Token {
  value: string;
  type: TokenType;
}

enum NumberBase {
  BIN = 2,
  QUD = 4,
  OCT = 8,
  DEC = 10,
  HEX = 16,
}

interface NumberToken extends Token {
  value: string;
  type: TokenType.INT_NUM | TokenType.REAL_NUM;
  base: NumberBase;
}

enum StringLevel {
  CHAR = 0,
  LITERAL = 1,
  TEMPLATE = 2,
}

interface StringToken extends Token {
  value: string;
  type: TokenType.STRING;
  level: StringLevel;
}

export enum Affix {
  PREFIX,
  INFIX,
  SUFFIX,
}

export enum Arity {
  UNARY,
  BINARY,
}

interface OperatorToken extends Token {
  value: string;
  type: TokenType;
  affix: Affix;
  arity: Arity;
  associativity: number;
}

type UnaryTypes = TokenType.LOGICAL_KEYWORD | TokenType.BIT_OPERATOR | TokenType.COUNT_OPERATOR;

interface UnaryOperatorToken extends OperatorToken {
  value: string;
  type: UnaryTypes;
  affix: Affix.PREFIX | Affix.SUFFIX;
  arity: Arity.UNARY;
}

type BinaryTypes =
  | TokenType.LOGICAL_KEYWORD
  | TokenType.BIT_OPERATOR
  | TokenType.SWAP_OPERATOR
  | TokenType.ASSIGNMENT_OPERATOR
  | TokenType.ARITHMETIC_OPERATOR
  | TokenType.BIT_OPERATOR
  | TokenType.EQUALITY_OPERATOR
  | TokenType.COMPARISON_OPERATOR;

interface BinaryOperatorToken extends OperatorToken {
  value: string;
  type: BinaryTypes;
  affix: Affix;
  arity: Arity.BINARY;
  commutative: boolean;
}

export {
  BinaryOperatorToken,
  NumberBase,
  NumberToken,
  OperatorToken,
  StringLevel,
  StringToken,
  Token,
  TokenType,
  UnaryOperatorToken,
};
