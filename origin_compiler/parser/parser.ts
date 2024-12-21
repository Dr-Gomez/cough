import { runQueue } from "../helper.ts";
import { binaryOperators, unaryOperators } from "../lexer/detection.ts";
import { Token, TokenType } from "../lexer/lexer.ts";

import log from "../logs/log.ts";
import { Node, BoolLiteralNode, IntegerLiteralNode, StringLiteralNode, FloatLiteralNode, MsgNode, VariableNode, TypeLiteralNode, DeclarationNode, ExpressionNode, BinaryOperationNode, UnaryOperationNode } from "./nodes.ts";

export interface NodeWrapper {
  payload: Node | null;
  index: number;
}

function handleEOF(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.EOF) {
    const node: Node = {node: "end"}
    return {payload: node, index}
  }
  return {payload: null, index}
}

function handleType(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.TYPE) {
    const typeNode: TypeLiteralNode = {
      node: "type",
      type: tokens[index].value as TypeLiteralNode["type"]
    }

    index++;

    if(tokens[index].type == TokenType.IDENTIFIER) {

      const variableNode: VariableNode = {
        node: "variable",
        name: tokens[index].value
      }

      const declarationNode: DeclarationNode = {
        node: "declaration",
        type: typeNode,
        variable: variableNode
      }

      index++;

      if(tokens[index].type == TokenType.BIN_OPERATOR) {
        if (tokens[index].value == "<->") {
          declarationNode.readonly = true
        }
        
        if (tokens[index].value == "<-" || tokens[index].value == "<->") {
          index++
          const expressionNode = handleNode(tokens, index)
          declarationNode.init = expressionNode.payload as ExpressionNode
          index = expressionNode.index
        }
      }

      return {payload: declarationNode, index: index}
    }

    return {payload: typeNode, index}
  }
  return {payload: null, index}
}

function handleStr(tokens: Array<Token>, index: number): NodeWrapper {
  
  if(tokens[index].type == TokenType.STRING) {
    const node: StringLiteralNode = {
      node: "string",
      value: tokens[index].value
    }
    return {payload: node, index: index + 1}
  }
  return {payload: null, index}
}

function handleFloat(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.REALNUM) {
    const value = Number.parseFloat(tokens[index].value)
    
    const floatNode: FloatLiteralNode = {
      node: "float", 
      value: value
    }
    
    return {payload: floatNode, index: index + 1}
  }
  return {payload: null, index}
}

function handleInt(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type == TokenType.INTNUM) {
    const value = Number.parseInt(tokens[index].value)
    
    const intNode: IntegerLiteralNode = {
      node: "integer",
      value: value
    }
    return {payload: intNode, index: index + 1}
  }
  return {payload: null, index}
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
    return {payload: node, index: index + 1}
  }

  return {payload: null, index}
}

function handleVariable(tokens: Array<Token>, index: number): NodeWrapper {
  if(tokens[index].type === TokenType.IDENTIFIER) {
    const variableNode: VariableNode = {
      node: "variable",
      name: tokens[index].value
    }

    if(tokens[index + 1].type === TokenType.UNA_OPERATOR) {
      const unaryExpressionNode: UnaryOperationNode = {
        node: "unary",
        variable: variableNode,
        operation: tokens[index + 1].value as typeof unaryOperators[number]
      }

      return {payload: unaryExpressionNode, index: index + 2}
    }

    if(tokens[index + 1].type === TokenType.BIN_OPERATOR) {
      const nextNode: NodeWrapper = handleNode(tokens, index + 2)
      const nextExpression = nextNode.payload as ExpressionNode
      const binaryOperationNode: BinaryOperationNode = {
        node: "binary",
        left: variableNode,
        operation: tokens[index + 1].value as typeof binaryOperators[number],
        right: nextExpression
      }

      index = nextNode.index
      return {payload: binaryOperationNode, index: index}
    }

    return {payload: variableNode, index: index + 1}
  }
  return {payload: null, index}
}

const primitiveInstrQueue = [
  handleType,
  handleStr,
  handleFloat,
  handleInt,
  handleBool,
  handleVariable
]

const instrQueue = [
  handleEOF,
  handleType,
  handleStr,
  handleFloat,
  handleInt,
  handleBool,
  handleVariable
]

function handleNode(tokens: Array<Token>, index: number) {
  
  const borrower = runQueue(instrQueue, tokens, index)

  if(borrower) {
    return borrower
  }

  const node: MsgNode = { node: "error", msg: "No pattern found matching your code"}
  return { payload: node, index }
}

export default function handleNodes(tokens: Array<Token>) {
  log.startLog("NODE");
  
  let index = 1;
  let nodeQueue: Array<Node> = [];
  
  let jumpNode: NodeWrapper = { payload: {node: "start"}, index: index };
  nodeQueue.push(jumpNode.payload!);
  log.logAppend(jumpNode.payload!.node, null);

  while (jumpNode.payload!.node !== "end") {
    jumpNode = handleNode(tokens, index);

    if (jumpNode.payload?.node == "error") {
      log.logNodeError(`${(jumpNode.payload as MsgNode).msg}`);
      break;
    }

    nodeQueue.push(jumpNode.payload!);
    index = jumpNode.index;
    log.logAppend(jumpNode.payload!.node, null);
  }

  if (jumpNode.payload?.node !== "error") {
    log.logSuccess("NODE");
  }

  return nodeQueue;
}