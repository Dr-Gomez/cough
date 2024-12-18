import { Token, TokenType } from "../lexer/lexer.ts";

import log from "../logs/log.ts";
import { Node, BoolLiteralNode, IntegerLiteralNode, StringLiteralNode, FloatLiteralNode, MsgNode, VariableNode, TypeLiteralNode, DeclarationNode } from "./nodes.ts";

interface NodeWrapper {
  node: Node | null;
  index: number;
}

function handleEOF(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.EOF) {
    const node: Node = {node: "end"}
    return {node, index}
  }
  return {node: null, index}
}

function handleType(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.TYPE) {
    const typeNode: TypeLiteralNode = {
      node: "type",
      type: tokens[index].value as TypeLiteralNode["type"]
    }

    if(tokens[index + 1].type == TokenType.IDENTIFIER) {

      const variableNode: VariableNode = {
        node: "variable",
        name: tokens[index + 1].value
      }

      const declarationNode: DeclarationNode = {
        node: "declaration",
        type: typeNode,
        variable: variableNode
      }

      if(tokens[index + 2].type == TokenType.BIN_OPERATOR) {
        if (tokens[index + 2].value == "<->") {
          declarationNode.readonly = true
        }
        
        if (tokens[index + 2].value == "<-" ) {
          
        }
      }

      return {node: declarationNode, index: index + 2}
    }

    return {node: typeNode, index: index + 1}
  }
  return {node: null, index}
}

function handleStr(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.STRING) {
    const node: StringLiteralNode = {
      node: "string",
      value: tokens[index].value
    }
    return {node, index: index + 1}
  }
  return {node: null, index}
}

function handleFloat(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.REALNUM) {
    const value = Number.parseFloat(tokens[index].value)
    
    const node: FloatLiteralNode = {
      node: "float", 
      value: value
    }
    return {node, index: index + 1}
  }
  return {node: null, index}
}

function handleInt(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.INTNUM) {
    const value = Number.parseInt(tokens[index].value)
    
    const node: IntegerLiteralNode = {
      node: "integer",
      value: value
    }
    return {node, index: index + 1}
  }
  return {node: null, index}
}

function handleBool(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.BOOL) {
    let value: boolean;

    if(tokens[index].value == "true") {
      value = true;
    } else {
      value = false;
    }
    
    const node: BoolLiteralNode = {
      node: "boolean",
      value: value
    }
    return {node, index: index + 1}
  }
  return {node: null, index}
}

function handleVariable(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type === TokenType.IDENTIFIER) {
    const node: VariableNode = {
      node: "variable",
      name: tokens[index].value
    }

    return {node, index: index + 1}
  }
  return {node: null, index}
}

const instrQueue = [
  handleEOF,
  handleType,
  handleStr,
  handleFloat,
  handleInt,
  handleBool,
  handleVariable
]

function checkBorrower(borrower: NodeWrapper) {
  return borrower.node !== null
}

function handleNode(tokens: Array<Token>, index: number) {
  for(let i = 0; i < instrQueue.length; i++) {
    const borrower = instrQueue[i](tokens, index)
    if(checkBorrower(borrower)) {
      return borrower;
    }
  }

  const node: MsgNode = { node: "error", msg: "No pattern found matching your code"}
  return { node, index }
}

export default function handleNodes(tokens: Array<Token>) {
  log.startLog("NODE");
  
  let index = 1;
  let nodeQueue: Array<Node> = [];
  
  let jumpNode: NodeWrapper = { node: {node: "start"}, index: index };
  nodeQueue.push(jumpNode.node!);
  log.logAppend(jumpNode.node!.node, null);

  while (jumpNode.node!.node !== "end") {
    jumpNode = handleNode(tokens, index);

    if (jumpNode.node?.node == "error") {
      log.logNodeError(`${(jumpNode.node as MsgNode).msg}`);
      break;
    }

    nodeQueue.push(jumpNode.node!);
    index = jumpNode.index;
    log.logAppend(jumpNode.node!.node, null);
  }

  if (jumpNode.node?.node !== "error") {
    log.logSuccess("NODE");
  }

  return nodeQueue;
}