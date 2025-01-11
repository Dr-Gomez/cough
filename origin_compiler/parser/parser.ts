import { runQueue } from "../helper.ts";
import { Token, TokenType } from "../lexer/lexer.ts";
import log from "../logs/log.ts";
import { BoolLiteralNode, DeclarationNode, FloatLiteralNode, IntegerLiteralNode, Node, StringLiteralNode, TypeLiteralNode, VariableNode } from "./nodes.ts";

export interface NodeWrapper {
  payload: Node | null;
  index: number;
}

function handleTerminator(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type == TokenType.PUNCTUATOR) {
    if (tokens[tokenIndex].value == ";") {
      tokenIndex++;
      return { payload: { node: "terminator" }, index: tokenIndex }
    }
  }
  return { payload: null, index: tokenIndex }
}

function handleType(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type == TokenType.TYPE) {
    let value = tokens[tokenIndex].value
    tokenIndex++;
    const typeNode: TypeLiteralNode = { node: "type", type: value as "bool" | "int" | "float" | "str" }
    if (tokens[tokenIndex].type == TokenType.IDENTIFIER) {
      value = tokens[tokenIndex].value
      tokenIndex++;
      const variableNode: VariableNode = { node: "variable", name: value }
      const declarationNode: DeclarationNode = { node: "declaration", type: typeNode, variable: variableNode }

      if (tokens[tokenIndex].type == TokenType.BIN_OPERATOR) {
        if (tokens[tokenIndex].value == "<->") {
          declarationNode.readonly = true
          tokens[tokenIndex].value = "<-"
        }

        if (tokens[tokenIndex].value == "<-") {
          tokenIndex++
          const rightExpression: NodeWrapper = handleNode(tokens, tokenIndex)
          declarationNode.init = rightExpression.payload as Node
          tokenIndex = rightExpression.index
        }

      }

      return { payload: declarationNode, index: tokenIndex }
    }

    return { payload: typeNode, index: tokenIndex }
  }

  return { payload: null, index: tokenIndex }
}

function handleNamespace(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type == TokenType.IDENTIFIER) {
    const value = tokens[tokenIndex].value
    tokenIndex++;
    const varNode: VariableNode = { node: "variable", name: value }
    return { payload: varNode, index: tokenIndex }
  }

  return { payload: null, index: tokenIndex }
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
  handleType,
  handleNamespace,
  handleBoolLiteral,
  handleIntLiteral,
  handleFloatLiteral,
  handleStrLiteral,
  handleTerminator,
]

function handleNode(tokens: Array<Token>, tokenIndex: number) {
  const borrower = runQueue(instrQueue, tokens, tokenIndex)
  if (borrower) {
    return borrower
  }

  return { payload: {node: "error", msg: "Pattern not found on code"}, index: tokenIndex }
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
    tokenIndex = jumpNode.index
    nodeArr.push(jumpNode.payload!)
  }

  return nodeArr
}

export default function handleProgram(tokens: Array<Token>) {
  log.startLog("NODE")
  const nodes: Array<Node> = handleNodes(tokens)
  log.logAST(nodes)
  return nodes
}