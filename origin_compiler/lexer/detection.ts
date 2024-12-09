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

const operatorChars: string[] = ["+", "-", "*", "/", "=", "<", ">", "~"];

function isOperatorChar(char: string): boolean {
  return operatorChars.includes(char);
}

const unaryOperators: string[] = ["++", "--", "~~"];

function isUnaryOperator(op: string): boolean {
  return unaryOperators.includes(op);
}

const binaryOperators: string[] = [
  "+",
  "-",
  "*",
  "/",
  "=",
  "==",
  "<",
  "<=",
  ">",
  ">=",
];

function isBinaryOperator(op: string): boolean {
  return binaryOperators.includes(op);
}

function isPunctuator(char: string): boolean {
  return [",", ";", ":", "(", ")", "{", "}", "[", "]", "@"].includes(char);
}

export {
  isAlpha,
  isBinaryOperator,
  isBool,
  isDigit,
  isKeyword,
  isOperatorChar,
  isPunctuator,
  isType,
  isUnaryOperator,
};
