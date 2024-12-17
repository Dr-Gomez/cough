import handleTokens from "./lexer/lexer.ts";
import { Token } from "./lexer/lexer.ts";
import log from "./logs/log.ts";

const sourceCode = `

int num;
12;
12.;
12.0;

`;

let TokenQueue: Array<Token> = handleTokens(sourceCode);

log.showLogs();