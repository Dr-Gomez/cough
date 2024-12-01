import handleToken from "./lexer/lexer.ts";
import { Token, TokenType, TokenWrapper } from "./lexer/lexer.ts";
import log from "./logs/log.ts";

const sourceCode = `

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

let tokenQueue: Array<Token> = [];

let jumpToken: TokenWrapper = {
  token: { type: TokenType.SOF, value: "" },
  index: 0,
};

tokenQueue.push(jumpToken.token!);

log.logToken(TokenType[jumpToken.token!.type], jumpToken.token!.value);

do {
  jumpToken = handleToken(sourceCode, jumpToken.index);
  if (jumpToken.token?.type == TokenType.ERROR) {
    log.logError(sourceCode, jumpToken.index);
    break;
  }
  tokenQueue.push(jumpToken.token!);
  log.logToken(TokenType[jumpToken.token!.type], jumpToken.token!.value);
} while (jumpToken.token?.type != TokenType.EOF);

if (jumpToken.token?.type != TokenType.ERROR) {
  log.logSuccess();
}

log.showLogs();
