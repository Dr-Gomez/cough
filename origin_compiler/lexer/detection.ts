const keywords: string[] = ["if", "else", "loop", "break", "fn", "return"];

function isKeyword(word: string): boolean {
  return keywords.includes(word);
}

const types: string[] = ["bool", "int", "float", "char", "array"];

function isType(word: string): boolean {
  return types.includes(word);
}

const bools: string[] = ["true", "false"];

function isBool(key: string): boolean {
  return bools.includes(key);
}

function isAlpha(char: string): boolean {
  return /^[a-zA-Z_]$/.test(char);
}

function isDigit(num: string): boolean {
  return /^[0-9]$/.test(num);
}

const operatorChars: string[] = ["+", "-", "*", "/", "=", "<", ">", "~", "!"];

function isOperatorChar(char: string): boolean {
  return operatorChars.includes(char);
}

const unaryOperators: string[] = ["++", "--", "~~", "!!"];

function isUnaryOperator(op: string): boolean {
  return unaryOperators.includes(op);
}

const assignmentOperators: string[] = [
  "<-",
  "<->"
]

function isAssignmentOperators(op: string): boolean {
  return assignmentOperators.includes(op)
}

const binaryOperators: string[] = [
  "+",
  "-",
  "*",
  "/",
  "=",
  "<",
  ">",
];

function isBinaryOperator(op: string): boolean {
  return binaryOperators.includes(op);
}

const punctuators = [",", ";", ":", "@"]

function isPunctuator(char: string): boolean {
  return punctuators.includes(char);
}

const leftEncapsulators = ["(", "[", "{"]
const rightEncapsulators = [")", "]", "}"]

function isLeftEncapsulator(char: string): boolean {
  return leftEncapsulators.includes(char);
}

function isRightEncapsulator(char: string): boolean {
  return rightEncapsulators.includes(char);
}

export { isAlpha, isAssignmentOperators, isBinaryOperator, isBool, isDigit, isKeyword, isOperatorChar, isPunctuator, isType, isUnaryOperator, isLeftEncapsulator, isRightEncapsulator };
export { unaryOperators, binaryOperators, punctuators, leftEncapsulators, rightEncapsulators }
