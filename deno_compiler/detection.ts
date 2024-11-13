const keywords: string[] = [
  "if",
  "else",
  "elif",
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

export { isKeyword, isAlpha, isDigit, isOperator, isPunctuator };
