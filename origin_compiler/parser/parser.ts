import { Token, TokenType } from "../lexer/lexer.ts";

import log from "../logs/log.ts";
import { Node, BoolLiteralNode, IntegerLiteralNode, StringLiteralNode } from "./nodes.ts";

interface NodeWrapper {
  node: Node | null;
  index: number;
}

function handleStr(token: Token, index: number): NodeWrapper {
  if(token.type == TokenType.NUMBER) {
    return {node: new NumberLiteralNode(token.value), index: index + 1}
  }
  return {node: null, index: index + 1}
}

function handleInt(token: Token, index: number): NodeWrapper {
  if(token.type == TokenType.NUMBER) {
    return {node: new NumberLiteralNode(token.value), index: index + 1}
  }
  return {node: null, index: index + 1}
}

function handleBool(token: Token, index: number): NodeWrapper {
  if(token.type == TokenType.BOOL) {
    return {node: new BoolLiteralNode(token.value), index: index + 1}
  }
  return {node: null, index: index + 1}
}

const instrQueue = [
  handleBool
]

function handleNode(tokens: Array<Token>, index: number) {

}

export default function handleNodes(tokens: Array<Token>) {
  log.startLog("NODE");
  
  let index = 1;
  let nodeQueue: Array<Node> = [];
  
  let jumpNode: NodeWrapper = { node: new StartNode(), index: index };
  nodeQueue.push(jumpNode.node!);
  log.logAppend(jumpNode.node!.type, null);

  while (jumpNode.node!.type !== "End") {
    jumpNode = handleNode(tokens, index);

    if (jumpNode.node?.type == "Error") {
      const errorNode = jumpNode.node as ErrorNode;
      log.logNodeError(`${errorNode.msg}`);
      break;
    }

    nodeQueue.push(jumpNode.node!);
    index = jumpNode.index;
    log.logAppend(jumpNode.node!.type, null);
  }

  if (jumpNode.node?.type !== "Error") {
    log.logSuccess("NODE");
  }

  return new CodeBlockNode(nodeQueue);
}