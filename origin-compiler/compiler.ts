import { tokenize } from "./1-lexer/lexer.ts";
import { Token } from "./1-lexer/tokens.ts";

function compile(input: string): void {
  let tokens: Array<Token> = tokenize(input);
  console.log(tokens);
}

const input = `
  2 + 2;
`;

compile(input);
