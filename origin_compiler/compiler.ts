import handleTokens from "./lexer/lexer.ts";
import handleNodes from "./parser/parser.ts";
import { Node } from "./parser/nodes.ts";
import { Token } from "./lexer/lexer.ts";
import log from "./logs/log.ts";

const sourceCode = `
(55 + 5) * 2
`;

const TokenQueue: Array<Token> = handleTokens(sourceCode);
const NodeQueue: Array<Node> = handleNodes(TokenQueue);

log.showLogs();