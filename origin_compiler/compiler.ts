import handleTokens from "./lexer/lexer.ts";
import { Token } from "./lexer/lexer.ts";
import handleNode from "./parser/parser.ts";
import { CodeBlockNode } from "./parser/nodes.ts";
import log from "./logs/log.ts";

const sourceCode = `

int num = 4;
num++;

`;

let TokenQueue: Array<Token> = handleTokens(sourceCode);
let NodeTree: CodeBlockNode = handleNode(TokenQueue);

log.showLogs();
console.log(JSON.parse(JSON.stringify(NodeTree)));
