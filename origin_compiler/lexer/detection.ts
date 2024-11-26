const keywords: string[] = ["if", "else", "loop", "fn", "return"];

function isKeyword(word: string): boolean {
  return keywords.includes(word);
}

const types: string[] = ["bool", "int", "float", "char", "array", "type"];

function isType(word: string): boolean {
  return types.includes(word);
}

function isAlpha(char: string): boolean {
  return /^[a-zA-Z_]$/.test(char);
}

function isDigit(num: string): boolean {
  return /^[0-9]$/.test(num);
}

function isUnaryOperator(op: string): boolean {
  return ["++", "--", "~~", "+~", "-~"].includes(op);
}

function isBinaryOperator(op: string): boolean {
  return ["+", "-", "*", "/", "=", "<", ">"].includes(op);
}

function isPunctuator(char: string): boolean {
  return [",", ".", ";", ":", "(", ")", "{", "}", "[", "]", "@"].includes(char);
}

export { isKeyword, isType, isAlpha, isDigit, isUnaryOperator, isBinaryOperator, isPunctuator };
