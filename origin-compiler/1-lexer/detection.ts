const alpha: Array<string> = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "_",
];
function isAlpha(char: string) {
  return alpha.includes(char);
}

const digits: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function isDigit(char: string) {
  return digits.includes(char);
}

const operators: Array<string> = ["+", "-", "*", "/", "%", "$", "&", "|", "^", ">", "<", "=", "!", "~"];
function isOperator(char: string) {
  return operators.includes(char);
}

const whitespaces: Array<string> = [" ", "\n", "\r"];
function isWhitespace(char: string) {
  switch (char) {
    case " ":
      return true;
    case "\n":
      return true;
    case "\r":
      return true;
  }

  return false;
}

const comment = "#";
function isComment(char: string) {
  return comment == char;
}

const strings: Array<string> = ["'", "`", '"'];
function isString(char: string) {
  return strings.includes(char);
}

function isRightEncapsulator(char: string) {
  switch (char) {
    case "}":
      return true;
    case "]":
      return;
  }
}

function isLeftEncapsulator(char: string) {
  switch (char) {
    case "{":
      return true;
    case "[":
      return true;
    case "(":
      return true;
  }

  return false;
}

function isSeparator(char: string) {
  switch (char) {
    case ",":
      return true;
    case ";":
      return true;
  }
  return false;
}

function isType(word: string) {
  switch (word) {
    case "void":
      return true;
    case "bool":
      return true;
    case "int":
      return true;
    case "float":
      return true;
    case "char":
      return true;
    case "outlaw":
      return true;
  }

  return false;
}

function isSelectionKeyword(word: string) {
  switch (word) {
    case "if":
      return true;
    case "else":
      return true;
    case "elif":
      return true;
  }

  return false;
}

function isSequencingKeyword(word: string) {
  switch (word) {
    case "gateway":
      return true;
    case "warp":
      return true;
  }

  return false;
}

function isBoolKeyword(word: string) {
  switch (word) {
    case "true":
      return true;
    case "false":
      return true;
  }

  return false;
}

function isBinaryLogicalKeyword(word: string) {
  switch (word) {
    case "and":
      return true;
    case "or":
      return true;
  }

  return false;
}

function isUnaryLogicalKeyword(word: string) {
  if (word == "not") {
    return true;
  }

  return false;
}

function isIoKeyword(word: string) {
  switch (word) {
    case "print":
      return true;
    case "input":
      return true;
  }

  return false;
}

function isAssignmentOperator(operator: string) {
  switch (operator) {
    case "<-":
      return true;
    case "<~":
      return true;
    case "<->":
      return true;
    case "<~>":
      return true;
    case ":":
      return true;
  }

  return false;
}

function isSwapOperator(operator: string) {
  if (operator == "><") {
    return true;
  }

  return false;
}

function isAdditiveOperator(operator: string) {
  if (operator == "+") {
    return true;
  }

  return false;
}

function isSubtractiveOperator(operator: string) {
  if (operator == "-") {
    return true;
  }

  return false;
}

function isProductOperator(operator: string) {
  if (operator == "*") {
    return true;
  }

  return false;
}

function isQuotientOperator(operator: string) {
  switch (operator) {
    case "/":
      return true;
    case "%":
      return true;
    case "$":
      return true;
  }

  return false;
}

function isBinaryLogicalOperator(operator: string) {
  switch (operator) {
    case "&":
      return true;
    case "|":
      return true;
    case "^":
      return true;
  }

  return false;
}

function isUnaryLogicalOperator(operator: string) {
  if (operator == "!") {
    return true;
  }

  return false;
}

function isBitshiftOperator(operator: string) {
  switch (operator) {
    case "<<<":
      return true;
    case ">>>":
      return true;
  }

  return false;
}

function isCountOperator(operator: string) {
  switch (operator) {
    case "++":
      return true;
    case "--":
      return true;
  }

  return false;
}

function isEqualityOperator(operator: string) {
  switch (operator) {
    case "=":
      return true;
    case "!=":
      return true;
    case "~=":
      return true;
  }

  return false;
}

function isComparisonOperator(operator: string) {
  switch (operator) {
    case "<":
      return true;
    case ">":
      return true;
    case "<=":
      return true;
    case ">=":
      return true;
  }

  return false;
}

export {
  isAdditiveOperator,
  isSubtractiveOperator,
  isProductOperator,
  isQuotientOperator,
  isAlpha,
  isAssignmentOperator,
  isSwapOperator,
  isBinaryLogicalKeyword,
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
  isUnaryLogicalOperator,
  isWhitespace,
};
