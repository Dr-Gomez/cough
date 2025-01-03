import { runQueue } from "../helper.ts";
import { Token, TokenType } from "../lexer/lexer.ts";
import log from "../logs/log.ts";
import { BoolLiteralNode, FloatLiteralNode, IntegerLiteralNode, Node, StringLiteralNode } from "./nodes.ts";

export interface NodeWrapper {
  payload: Node | null;
  index: number;
}

function handleStrLiteral(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type == TokenType.STRING) {
    const value = tokens[tokenIndex].value
    tokenIndex++;
    const intNode: StringLiteralNode = { node: "string", value }
    return { payload: intNode, index: tokenIndex }
  }

  return { payload: null, index: tokenIndex }
}

function handleFloatLiteral(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type == TokenType.REAL_NUM) {
    const value: number = Number.parseFloat(tokens[tokenIndex].value)
    tokenIndex++;
    const floatNode: FloatLiteralNode = { node: "float", value }
    return { payload: floatNode, index: tokenIndex }
  }

  return { payload: null, index: tokenIndex }
}

function handleIntLiteral(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type == TokenType.INT_NUM) {
    const value: number = Number.parseInt(tokens[tokenIndex].value)
    tokenIndex++;
    const intNode: IntegerLiteralNode = { node: "integer", value }
    return { payload: intNode, index: tokenIndex }
  }

  return { payload: null, index: tokenIndex }
}


function handleBoolLiteral(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type == TokenType.BOOL) {
    let value: boolean;
    if (tokens[tokenIndex].value == "true") {
      value = true
    } else {
      value = false
    }

    tokenIndex++;
    const boolNode: BoolLiteralNode = { node: "boolean", value }
    return { payload: boolNode, index: tokenIndex }
  }

  return { payload: null, index: tokenIndex }
}

const instrQueue = [
  handleBoolLiteral,
  handleIntLiteral,
  handleFloatLiteral,
  handleStrLiteral
]

function handleNode(tokens: Array<Token>, tokenIndex: number) {
  const borrower = runQueue(instrQueue, tokens, tokenIndex)
  if (borrower) {
    return borrower
  }
}

export function handleNodes(tokens: Array<Token>) {
  let tokenIndex = 0;
  let jumpNode: NodeWrapper;
  let nodeArr: Array<Node> = [];

  if (tokens[tokenIndex].type === TokenType.SOF) {
    tokenIndex++
  }

  while(tokens[tokenIndex].type != TokenType.EOF) {
    jumpNode = handleNode(tokens, tokenIndex);
    nodeArr.push(jumpNode.payload!)
    tokenIndex++;
  }

  return nodeArr
}

export default function handleProgram(tokens: Array<Token>) {
  log.startLog("NODE")
  const nodes: Array<Node> = handleNodes(tokens)
  log.logAST(nodes)
  return nodes
}