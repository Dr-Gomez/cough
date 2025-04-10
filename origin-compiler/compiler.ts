import { tokenize } from "./1-lexer/lexer.ts";
import { Token } from "./1-lexer/tokens.ts";

function compile(input: string): void {
  const tokens: Array<Token> = tokenize(input) as Array<Token>;
  console.log(tokens);
}

const input = `
  2 + 2 + (2 * 2);
`;

compile(input);
