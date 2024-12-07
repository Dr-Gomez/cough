import handleTokens from "./lexer/lexer.ts";
import { Token, TokenType, TokenWrapper } from "./lexer/lexer.ts";
import { CodeBlockNode } from "./parser/parser.ts";
import log from "./logs/log.ts";

const sourceCode = `

bool running = true;
char@array alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
int@array numbers = [16, 1, 19, 20];

int i = 0;
loop {
  i++;

  print(alphabet[numbers[i]]);

  if(i == length@numbers){
    break;
  }
}

`;

let TokenQueue: Token[] = handleTokens(sourceCode);

log.showLogs();
