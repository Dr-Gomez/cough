import handleToken from "./handle.ts";
import { Token, TokenWrapper, TokenType } from "./handle.ts";
import log from "./log.ts";

const sourceCode = `
// A simple calculator example

let x = 42;
let y = 3.14;

if (x > y) {
    x += 1;
    y = x * 2;
    console.log("x is greater than y");
} else {
    y -= 1;
    console.log("y is less than x");
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
  tokenQueue.push(jumpToken.token!);
  log.logToken(TokenType[jumpToken.token!.type], jumpToken.token!.value);
  jumpToken.index++;
} while (jumpToken.token?.type != TokenType.EOF);

console.log(log.showLogs());
