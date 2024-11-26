const keywords: string[] = ["if", "else", "loop", "fn", "return"];

function isKeyword(word: string): boolean {
  return keywords.includes(word);
}

const types: string[] = ["bool", "int", "float", "char", "array"];

function isType(word: string): boolean {
  return types.includes(word);
}

function isAlpha(char: string): boolean {
  return /^[a-zA-Z_]$/.test(char);
}

function isDigit(char: string): boolean {
  return /^[0-9]$/.test(char);
}

function isOperator(char: string): boolean {
  return ["+", "-", "*", "/", "=", "<", ">"].includes(char);
}

function isPunctuator(char: string): boolean {
  return [",", ".", ";", ":", "(", ")", "{", "}", "[", "]", "@"].includes(char);
}

export { isKeyword, isType, isAlpha, isDigit, isOperator, isPunctuator };
