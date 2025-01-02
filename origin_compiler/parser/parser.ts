import { Token, TokenType } from "../lexer/lexer.ts";
import { Node } from "./nodes.ts";

export interface NodeWrapper {
  payload: Node | null;
  index: number;
}

function handleNode(tokens: Array<Token>, tokenIndex: number) {
  return { payload: null, index: tokenIndex}
}

export default function handleNodes(tokens: Array<Token>) {
  let tokenIndex = 0;
  let jumpNode: NodeWrapper;

  if (tokens[tokenIndex].type === TokenType.SOF) {
    tokenIndex++
  }

  while(tokens[tokenIndex].type != TokenType.EOF) {
    jumpNode = handleNode(tokens, tokenIndex);
    tokenIndex++;
  }
}