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
  CodeBlockNode, 
} from "./nodes.ts";

export interface NodeWrapper {
  payload: Node | null;
  index: number;
}

let nodeArr: Array<Node> = [];

function handleEncapsulator(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  function matchEncapsulator(encapsulator: string) {
    if (encapsulator === "{") {
      return "}";
    }
  
    else if (encapsulator === "[") {
      return "]";
    }
  
    else if (encapsulator === "(") {
      return ")";
    }
  }
  
  if (tokens[tokenIndex].type === TokenType.LEFT_ENCAPSULATOR) {
    const leftEncapsulator = tokens[tokenIndex].value;
    const rightEncapsulator = matchEncapsulator(leftEncapsulator);
    
    tokenIndex++;
    
    const startIndex = tokenIndex;

    let count = 1

    while (count !== 0 ) {
      tokenIndex++
      if (tokens[tokenIndex].type === TokenType.LEFT_ENCAPSULATOR && tokens[tokenIndex].value === leftEncapsulator) {
        count++;
      }
      if (tokens[tokenIndex].type === TokenType.RIGHT_ENCAPSULATOR && tokens[tokenIndex].value === rightEncapsulator) {
        count--;
      }
    }
    const nodes = handleNodes(tokens.slice(startIndex, tokenIndex))
    tokenIndex++
    const codeBlockNode: CodeBlockNode = { node: "block", nodes: nodes}
    return { payload: codeBlockNode, index: tokenIndex}
  }

  return { payload: null, index: tokenIndex }
}

function handleKeyword(tokens: Array<Token>, tokenIndex: number): NodeWrapper {
  if (tokens[tokenIndex].type === TokenType.KEYWORD) {
    if (tokens[tokenIndex].value === "if") {
      tokenIndex++;
      const conditions = handleEncapsulator(tokens, tokenIndex)
      tokenIndex = conditions.index
      const block = handleEncapsulator(tokens, tokenIndex)
      tokenIndex = block.index

      while(tokens[tokenIndex].type === "else") {
        const block = handleEncapsulator(tokens, tokenIndex)
        tokenIndex = block.index
      }
    }
  }
  return { payload: null, index: tokenIndex }
}

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
  handleEncapsulator,
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
  const context = nodeArr
  nodeArr = []
  let tokenIndex = 0;

  if (tokens[tokenIndex].type === TokenType.SOF) {
    tokenIndex++;
  }

  while (tokenIndex < tokens.length) {
    if (tokens[tokenIndex].type === TokenType.EOF) {
      break;
    }
    const nodeWrapper = handleNode(tokens, tokenIndex);
    tokenIndex = nodeWrapper.index;
    nodeArr.push(nodeWrapper.payload!);
  }

  if(nodeArr.length === 1) {
    context.push(nodeArr[0])
  } else {
    const codeblock: CodeBlockNode = { node: "block", nodes: nodeArr}
    context.push(codeblock)
    nodeArr = context
  }
  return context;
}

export default function handleProgram(tokens: Array<Token>) {
  log.startLog("NODE");
  const nodes: Array<Node> = handleNodes(tokens);
  log.logAST(nodes);
  return nodes;
}
