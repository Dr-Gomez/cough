import { Token, TokenType } from "../lexer/lexer.ts";
import log from "../logs/log.ts";

abstract class Node {
  abstract type: string;
}

// Error Node
class ErrorNode extends Node {
  type = "Error"
  
  constructor() {
    super()
  }
}

// Literal Nodes

class NumberLiteralNode extends Node {
  type = "Number";
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}

class StringLiteralNode extends Node {
  type = "String";
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }
}

class BoolLiteralNode extends Node {
  type = "Boolean";
  value: boolean;

  constructor(value: boolean) {
    super();
    this.value = value;
  }
}

// Operation Nodes

class BinaryOperationNode extends Node {
  type = "BinaryOperation";
  left: Node;
  operator: string;
  right: Node;

  constructor(left: Node, operator: string, right: Node) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

// Variable Nodes

class VariableNode extends Node {
  type = "Variable";
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

// Control Flow Nodes

export class CodeBlockNode extends Node {
  type = "CodeBlock";
  statements: Node[];

  constructor(statements: Node[]) {
    super();
    this.statements = statements;
  }
}

class MethodNode extends Node {
  type = "Method";
  parameters: Node[];
  block: CodeBlockNode;

  constructor(parameters: Node[], block: CodeBlockNode) {
    super();
    this.parameters = parameters;
    this.block = block;
  }
}

// Handler Functions

interface NodeWrapper {
  node: Node | null;
  index: number;
}

function handleStringLiteralNode(tokens: Token[], index: number) {
  if (tokens[index].type === TokenType.STRING) {
    return {
      node: new StringLiteralNode(tokens[index].value),
      index: index + 1,
    };
  }

  return { node: null, index };
}

function handleNumberLiteralNode(tokens: Token[], index: number) {
  if (tokens[index].type === TokenType.NUMBER) {
    const num: number = Number.parseFloat(tokens[index].value);

    return { node: new NumberLiteralNode(num), index: index + 1 };
  }

  return { node: null, index };
}

function handleBoolLiteralNode(tokens: Token[], index: number) {
  if (tokens[index].type === TokenType.BOOL) {
    if (tokens[index].value === "true") {
      return { node: new BoolLiteralNode(true), index: index + 1 };
    } else {
      return { node: new BoolLiteralNode(true), index: index + 1 };
    }
  }

  return { node: null, index };
}

function handleVariableNode(tokens: Token[], index: number) {
  if (tokens[index].type === TokenType.IDENTIFIER) {
    return { node: new VariableNode(tokens[index].value), index: index + 1 };
  }

  return { node: null, index };
}

function checkBorrower(borrower: NodeWrapper): boolean {
  return borrower.node !== null;
}

// Handler functions need to go from highest scope to slowest

const instrQueue: Array<Function> = [
  handleStringLiteralNode,
  handleNumberLiteralNode,
  handleBoolLiteralNode,
  handleVariableNode,
];

function handleNode(
  tokens: Array<Token>,
  index: number,
) {
  let borrower: NodeWrapper;

  borrower = instrQueue[0](tokens, index);
  index = borrower.index;

  for (let i = 1; i < instrQueue.length; i++) {
    borrower = instrQueue[i](tokens, index);
    if (checkBorrower(borrower)) {
      return borrower;
    }
  }

  const errNode = new ErrorNode
  return { node: errNode, index }
}

export default function handleNodes(tokens: Array<Token>) {
  let index = 1; // Starts from one because first token is always SOF
  let jumpNode: NodeWrapper = { node: null, index: index }

  let nodeQueue: Array<Node> = []

  while (tokens[index].type !== TokenType.EOF) {
    jumpNode = handleNode(tokens, index);
    
    if (jumpNode.node?.type == "Error") {
      log.logNodeError(tokens[index].value, index)
      break;
    }

    nodeQueue.push(jumpNode.node!)
    index = jumpNode.index
    log.logAppend(jumpNode.node!.type, null)
  }

  if (jumpNode.node?.type !== "Error") {
    log.logSuccess("nodenized", "NODE");
  }

  return new CodeBlockNode(nodeQueue)
}
