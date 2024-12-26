import handleTokens from "./lexer/lexer.ts";
import handleNodes from "./parser/parser.ts";
import { Node } from "./parser/nodes.ts";
import { Token } from "./lexer/lexer.ts";
import log from "./logs/log.ts";

const sourceCode = `

let x = 0;

loop {
    if (x > 10) {
        break;
    }
}

`;

let TokenQueue: Array<Token> = handleTokens(sourceCode);
let NodeQueue: Array<Node> = handleNodes(TokenQueue);

log.showLogs();