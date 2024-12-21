import { Token, TokenWrapper } from "./lexer/lexer.ts";
import { NodeWrapper } from "./parser/parser.ts";

function checkBorrower(borrower: NodeWrapper | TokenWrapper) {
    return borrower.payload !== null
}

function runQueue(queue: Array<Function>, tokens: Array<Token> | string, index: number) {
    let i: number = 0;
    for(i; i < queue.length; i++) {
        const borrower = queue[i](tokens, index)
        if(checkBorrower(borrower)) {
            return borrower
        }
    }
}

export { runQueue }