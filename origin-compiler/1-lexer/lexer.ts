import {
  isAlpha,
  isAssignmentOperator,
  isBinaryLogicalOperator,
  isBitshiftOperator,
  isBoolKeyword,
  isComment,
  isComparisonOperator,
  isCountOperator,
  isDigit,
  isEqualityOperator,
  isIoKeyword,
  isLeftEncapsulator,
  isOperator,
  isRightEncapsulator,
  isSelectionKeyword,
  isSeparator,
  isSequencingKeyword,
  isString,
  isType,
  isUnaryLogicalKeyword,
  isBinaryLogicalKeyword,
  isUnaryLogicalOperator,
  isWhitespace,
  isSwapOperator,
  isAdditiveOperator,
  isSubtractiveOperator,
  isProductOperator,
  isQuotientOperator,
} from "./detection.ts";
import {
  Affix,
  Arity,
  BinaryOperatorToken,
  NumberBase,
  NumberToken,
  OperatorToken,
  StringLevel,
  StringToken,
  Token,
  TokenType,
  UnaryOperatorToken,
} from "./tokens.ts";

interface TokenWrapper {
  token: Token;
  index: number;
}

function handleWords(input: string, index: number): TokenWrapper {
  const startIndex: number = index;
  index++;

  while (isAlpha(input[index])) {
    index++;
  }

  const word: string = input.substring(startIndex, index);
  index--;

  let outToken: Token;
  if (isBoolKeyword(word)) {
    outToken = { value: word, type: TokenType.BOOL };
  } else if (isSelectionKeyword(word)) {
    outToken = { value: word, type: TokenType.SELECTION_KEYWORD };
  } else if (isSequencingKeyword(word)) {
    outToken = { value: word, type: TokenType.SEQUENCING_KEYWORD };
  } else if (isBinaryLogicalKeyword(word)) {
    outToken = {
      value: word,
      type: TokenType.LOGICAL_KEYWORD,
      arity: Arity.BINARY,
      affix: Affix.INFIX,
      associativity: 1,
    } as BinaryOperatorToken;
  } else if (isUnaryLogicalKeyword(word)) {
    outToken = {
      value: word,
      type: TokenType.LOGICAL_KEYWORD,
      arity: Arity.UNARY,
      affix: Affix.PREFIX,
      associativity: 1,
    } as UnaryOperatorToken;
  } else if (isIoKeyword(word)) {
    outToken = { value: word, type: TokenType.IO_KEYWORD };
  } else if (isType(word)) {
    outToken = { value: word, type: TokenType.TYPE };
  } else {
    outToken = { value: word, type: TokenType.IDENTIFIER };
  }

  return { token: outToken, index: index };
}

function handleOperator(input: string, index: number): TokenWrapper {
  const startIndex: number = index;
  index++;

  while (index < input.length && isOperator(input[index])) {
    index++;
  }

  const operator: string = input.substring(startIndex, index);

  let outToken: OperatorToken | Token;

  if (isAssignmentOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.ASSIGNMENT_OPERATOR,
      affix: Affix.INFIX,
      arity: Arity.BINARY,
      associativity: 0,
      commutative: false,
    } as BinaryOperatorToken;
  } else if (isSwapOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.SWAP_OPERATOR,
      affix: Affix.INFIX,
      arity: Arity.BINARY,
      associativity: 0,
      commutative: true,
    } as BinaryOperatorToken;
  } else if (isEqualityOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.EQUALITY_OPERATOR,
      affix: Affix.INFIX,
      arity: Arity.BINARY,
      associativity: 2,
      commutative: true,
    } as BinaryOperatorToken;
  } else if (isComparisonOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.COMPARISON_OPERATOR,
      affix: Affix.INFIX,
      arity: Arity.BINARY,
      associativity: 2,
      commutative: false,
    } as BinaryOperatorToken;
  } else if (isCountOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.COUNT_OPERATOR,
      affix: Affix.SUFFIX,
      arity: Arity.UNARY,
      associativity: 3,
    } as UnaryOperatorToken;
  } else if (isAdditiveOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.ARITHMETIC_OPERATOR,
      affix: Affix.INFIX,
      arity: Arity.BINARY,
      associativity: 3,
      commutative: true,
    } as BinaryOperatorToken;
  } else if (isSubtractiveOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.ARITHMETIC_OPERATOR,
      affix: Affix.INFIX,
      arity: Arity.BINARY,
      associativity: 3,
      commutative: false,
    } as BinaryOperatorToken;
  } else if (isProductOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.ARITHMETIC_OPERATOR,
      affix: Affix.INFIX,
      arity: Arity.BINARY,
      associativity: 4,
      commutative: true,
    } as BinaryOperatorToken;
  } else if (isQuotientOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.ARITHMETIC_OPERATOR,
      arity: Arity.BINARY,
      associativity: 4,
      commutative: false,
    } as BinaryOperatorToken;
  } else if (isBitshiftOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.BIT_OPERATOR,
      affix: Affix.INFIX,
      arity: Arity.BINARY,
      associativity: 4,
      commutative: false,
    } as BinaryOperatorToken;
  } else if (isBinaryLogicalOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.BIT_OPERATOR,
      affix: Affix.INFIX,
      arity: Arity.BINARY,
      associativity: 5,
      commutative: true,
    } as BinaryOperatorToken;
  } else if (isUnaryLogicalOperator(operator)) {
    outToken = {
      value: operator,
      type: TokenType.BIT_OPERATOR,
      affix: Affix.PREFIX,
      arity: Arity.UNARY,
      associativity: 5,
    } as UnaryOperatorToken;
  } else {
    outToken = { value: "Operator not recognized", type: TokenType.ERROR };
  }

  return { token: outToken, index: index };
}

function handleNumbers(input: string, index: number): TokenWrapper {
  let startIndex = index;
  index++;

  let base: NumberBase;

  if (index < input.length && input[startIndex] == "0" && isAlpha[startIndex]) {
    switch (input[index]) {
      case "b":
        base = NumberBase.BIN;
        break;
      case "q":
        base = NumberBase.QUD;
        break;
      case "o":
        base = NumberBase.OCT;
        break;
      case "x":
        base = NumberBase.HEX;
        break;
      default:
        let outToken: Token = {
          value: "Number base not recognized",
          type: TokenType.ERROR,
        };
        return { token: outToken, index: index };
    }
    startIndex += 2;
    index++;
  } else {
    base = NumberBase.DEC;
  }

  let type: TokenType = TokenType.INT_NUM;

  while (index < input.length) {
    if (type === TokenType.INT_NUM && input[index] === ".") {
      type = TokenType.REAL_NUM;
      index++;
      continue;
    } else if (input[index] === ".") {
      let outToken: Token = {
        value: "Can't have more than one radix point per number",
        type: TokenType.ERROR,
      };
    }

    if (!isDigit(input[index])) {
      break;
    }

    index++;
  }

  const number: string = input.substring(startIndex, index);
  index--;

  let outToken: NumberToken = { value: number, base: base!, type: type };
  return { token: outToken, index: index };
}

function handleStrings(input: string, index: number): TokenWrapper {
  const stringKey = input[index];
  let level: StringLevel;
  switch (stringKey) {
    case "`":
      level = StringLevel.TEMPLATE;
      break;
    case '"':
      level = StringLevel.LITERAL;
      break;
    default:
      level = StringLevel.CHAR;
      break;
  }

  index++;
  const startIndex = index;

  while (input[index] !== stringKey && index < input.length) {
    index++;
  }

  const content = input.substring(startIndex, index);

  let outToken: Token;
  if (index == input.length) {
    outToken = { value: content, type: TokenType.ERROR };
  } else {
    outToken = {
      value: content,
      level: level,
      type: TokenType.STRING,
    } as StringToken;
  }

  return { token: outToken, index: index };
}

function handleEncapsulator(
  input: string,
  index: number,
  type: TokenType.LEFT_ENCAPSULATOR | TokenType.RIGHT_ENCAPSULATOR
) {
  let outToken: Token | undefined;
  outToken = { value: input[index], type: type };

  return { token: outToken, index: index };
}

function skipSpace(input: string, index: number) {
  while (isWhitespace(input[index])) {
    index++;
  }

  return index;
}

function handleSeparator(input: string, index: number): TokenWrapper {
  let outToken: Token | undefined;

  outToken = { value: input[index], type: TokenType.SEPARATOR };
  return { token: outToken, index: index };
}

function handleComment(input: string, index: number): TokenWrapper {
  let outToken: Token | undefined;

  if (isComment(input[index + 1]) && index < input.length) {
    index += 2;
    const startIndex = index;
    while (input[index] !== "\n" && input[index] !== "\r" && index < input.length) {
      index++;
    }

    const value = input.substring(startIndex, index);

    outToken = { value: value, type: TokenType.COMMENT };
    return { token: outToken, index: index };
  } else {
    index++;
    const startIndex = index;
    while (!isComment(input[index]) && index < input.length) {
      index++;
    }

    const value = input.substring(startIndex, index);

    outToken = { value: value, type: TokenType.COMMENT };
    return { token: outToken, index: index };
  }
}

function handleError(input: string, index: number): TokenWrapper {
  function isConstruct(char: string) {
    if (
      isDigit(char) ||
      isAlpha(char) ||
      isOperator(char) ||
      isString(char) ||
      isLeftEncapsulator(char) ||
      isRightEncapsulator(char) ||
      isWhitespace(char)
    ) {
      return true;
    }

    return false;
  }
  let outToken: Token | undefined;

  const startIndex = index;
  index++;

  while (!isConstruct(input[index]) && index < input.length) {
    index++;
  }

  const error = input.substring(startIndex, index);
  outToken = { value: error, type: TokenType.ERROR };
  index--;

  return { token: outToken, index: index };
}

export function tokenize(input: string): Array<Token> {
  const tokensOut: Array<Token> = [];

  let index = skipSpace(input, 0);
  let jumpToken: TokenWrapper;

  while (index < input.length) {
    if (isAlpha(input[index])) {
      jumpToken = handleWords(input, index);
    } else if (isOperator(input[index])) {
      jumpToken = handleOperator(input, index);
    } else if (isDigit(input[index])) {
      jumpToken = handleNumbers(input, index);
    } else if (isString(input[index])) {
      jumpToken = handleStrings(input, index);
    } else if (isLeftEncapsulator(input[index])) {
      jumpToken = handleEncapsulator(input, index, TokenType.LEFT_ENCAPSULATOR);
    } else if (isRightEncapsulator(input[index])) {
      jumpToken = handleEncapsulator(input, index, TokenType.RIGHT_ENCAPSULATOR);
    } else if (isSeparator(input[index])) {
      jumpToken = handleSeparator(input, index);
    } else if (isComment(input[index])) {
      jumpToken = handleComment(input, index);
    } else {
      jumpToken = handleError(input, index);
    }

    index = ++jumpToken.index;
    tokensOut.push(jumpToken.token);

    index = skipSpace(input, index);
  }

  return tokensOut;
}
