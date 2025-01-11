import handleTokens from "./lexer/lexer.ts";
import handleNodes from "./parser/parser.ts";
import { Node } from "./parser/nodes.ts";
import { Token } from "./lexer/lexer.ts";
import log from "./logs/log.ts";

const sourceCode = `
// Start of program

int num <-> 5.0;
float num <-> 5.0;

// End of program
`;

const TokenQueue: Array<Token> = handleTokens(sourceCode);
console.log(TokenQueue)
const NodeQueue: Array<Node> = handleNodes(TokenQueue);

log.showLogs();