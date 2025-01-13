import { runQueue } from "../helper.ts";
import { Token, TokenType } from "../lexer/lexer.ts";
import log from "../logs/log.ts";
import { 
  BoolLiteralNode, 
  DeclarationNode, 
  FloatLiteralNode, 
  IntegerLiteralNode, 
  MsgNode, 
  Node, 
  StringLiteralNode, 
  TypeLiteralNode, 
  VariableNode, 
  BinaryOperationNode,
  UnaryOperationNode, 
} from "./nodes.ts";

export interface NodeWrapper {
  payload: Node | null;
  index: number;
}

const nodeArr: Array<Node> = [];

function handleTerminator(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.PUNCTUATOR && tokens[tokenIndex].value === ";") {
    tokenIndex++;
    return { payload: { node: "terminator" }, index: tokenIndex };
  }
  return { payload: null, index: tokenIndex };
}

function handleType(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.TYPE) {
    const typeValue = tokens[tokenIndex].value;
    tokenIndex++;
    
    const typeNode: TypeLiteralNode = { node: "type", type: typeValue as "bool" | "int" | "float" | "str" };
    
    if (tokens[tokenIndex].type === TokenType.IDENTIFIER) {
      const variableName = tokens[tokenIndex].value;
      tokenIndex++;
      
      const variableNode: VariableNode = { node: "variable", name: variableName };
      const declarationNode: DeclarationNode = { node: "declaration", type: typeNode, variable: variableNode };

      if (tokens[tokenIndex].type === TokenType.ASSIGN_OPERATOR) {
        if (tokens[tokenIndex].value === "<->") {
          declarationNode.readonly = true;
        }
        tokenIndex++;
        
        const initializerNode = handleNode(tokens, tokenIndex);
        tokenIndex = initializerNode.index;
        declarationNode.init = initializerNode.payload!;
      }

      return { payload: declarationNode, index: tokenIndex };
    }

    return { payload: typeNode, index: tokenIndex };
  }

  return { payload: null, index: tokenIndex };
}

function handleNamespace(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.IDENTIFIER) {
    const variableName = tokens[tokenIndex].value;
    tokenIndex++;
    
    const varNode: VariableNode = { node: "variable", name: variableName };
    return { payload: varNode, index: tokenIndex };
  }

  return { payload: null, index: tokenIndex };
}

function handleStrLiteral(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.STRING) {
    const value = tokens[tokenIndex].value;
    tokenIndex++;
    
    const strNode: StringLiteralNode = { node: "string", value };
    return { payload: strNode, index: tokenIndex };
  }

  return { payload: null, index: tokenIndex };
}

function handleFloatLiteral(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.REAL_NUM) {
    const value: number = parseFloat(tokens[tokenIndex].value);
    tokenIndex++;
    
    const floatNode: FloatLiteralNode = { node: "float", value };
    return { payload: floatNode, index: tokenIndex };
  }

  return { payload: null, index: tokenIndex };
}

function handleIntLiteral(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.INT_NUM) {
    const value: number = parseInt(tokens[tokenIndex].value);
    tokenIndex++;
    
    const intNode: IntegerLiteralNode = { node: "integer", value };
    return { payload: intNode, index: tokenIndex };
  }

  return { payload: null, index: tokenIndex };
}

function handleBoolLiteral(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.BOOL) {
    const value = tokens[tokenIndex].value === "true";
    tokenIndex++;
    
    const boolNode: BoolLiteralNode = { node: "boolean", value };
    return { payload: boolNode, index: tokenIndex };
  }

  return { payload: null, index: tokenIndex };
}

function hanleUnaryOperation(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.UNA_OPERATOR) {
    const operator = tokens[tokenIndex].value;
    tokenIndex++

    const unaryOperationNode: UnaryOperationNode = {
      node: "unary",
      operation: operator,
      left: nodeArr[nodeArr.length - 1],
    }

    nodeArr.pop()

    return { payload: unaryOperationNode, index: tokenIndex }
  }

  return { payload: null, index: tokenIndex }
}

function handleBinaryOperation(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.BIN_OPERATOR) {
    const operator = tokens[tokenIndex].value;
    tokenIndex++;

    const rightNodeWrapper = handleNode(tokens, tokenIndex);
    tokenIndex = rightNodeWrapper.index;
    const rightNode = rightNodeWrapper.payload;

    const binaryOperationNode: BinaryOperationNode = {
      node: "binary",
      operation: operator,
      left: nodeArr[nodeArr.length - 1],
      right: rightNode!,
    };

    nodeArr.pop()

    return { payload: binaryOperationNode, index: tokenIndex };
  }

  return { payload: null, index: tokenIndex };
}

const instrQueue = [
  handleType,
  handleNamespace,
  handleBoolLiteral,
  handleIntLiteral,
  handleFloatLiteral,
  handleStrLiteral,
  handleTerminator,
  handleBinaryOperation,
  hanleUnaryOperation
];

function handleNode(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  const result = runQueue(instrQueue, tokens, tokenIndex);
  if (result) {
    return result;
  }

  return { 
    payload: { node: "error", msg: "Pattern not found in the code" } as MsgNode, 
    index: tokenIndex 
  };
}

export function handleNodes(tokens: Array<Token>) {
  let tokenIndex = 0;

  if (tokens[tokenIndex].type === TokenType.SOF) {
    tokenIndex++;
  }

  while (tokens[tokenIndex].type !== TokenType.EOF) {
    const nodeWrapper = handleNode(tokens, tokenIndex);
    tokenIndex = nodeWrapper.index;
    nodeArr.push(nodeWrapper.payload!);
  }

  return nodeArr;
}

export default function handleProgram(tokens: Array<Token>) {
  log.startLog("NODE");
  const nodes: Array<Node> = handleNodes(tokens);
  log.logAST(nodes);
  return nodes;
}
