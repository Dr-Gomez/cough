import handleTokens from "./lexer/lexer.ts";
import handleNodes from "./parser/parser.ts";
import { Node } from "./parser/nodes.ts";
import { Token } from "./lexer/lexer.ts";
import log from "./logs/log.ts";

const sourceCode = `

int num <- cool++ + 2 + 2 + 2 + 2

`;

let TokenQueue: Array<Token> = handleTokens(sourceCode);
let NodeQueue: Array<Node> = handleNodes(TokenQueue);

log.showLogs();

NodeQueue.forEach(node => console.log(JSON.stringify(node, null, 2)))