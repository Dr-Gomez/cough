import handleToken from "./handle.ts";
import { Token, TokenWrapper, TokenType } from "./handle.ts";
import log from "./log.ts";

const sourceCode = `

int@array hello = [1, 5, 2, 6]

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
  tokenQueue.push(jumpToken.token!);
  log.logToken(TokenType[jumpToken.token!.type], jumpToken.token!.value);
} while (jumpToken.token?.type != TokenType.EOF);

log.showLogs();
