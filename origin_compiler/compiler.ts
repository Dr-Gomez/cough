import handleTokens from "./lexer/lexer.ts";
import handleNodes from "./parser/parser.ts";
import { Node } from "./parser/nodes.ts";
import { Token } from "./lexer/lexer.ts";
import log from "./logs/log.ts";

const sourceCode = `
variable
`;

let TokenQueue: Array<Token> = handleTokens(sourceCode);
let NodeQueue: Array<Node> = handleNodes(TokenQueue);

log.showLogs();