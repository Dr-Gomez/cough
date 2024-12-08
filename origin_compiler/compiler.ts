import handleTokens from "./lexer/lexer.ts";
import { Token } from "./lexer/lexer.ts";
import handleNode, { CodeBlockNode } from "./parser/parser.ts";
import log from "./logs/log.ts";

const sourceCode = `

12

`;

let TokenQueue: Array<Token> = handleTokens(sourceCode);
let NodeTree: CodeBlockNode = handleNode(TokenQueue);

log.showLogs();
