import { Token, TokenType } from "../lexer/lexer.ts";

abstract class Node {
  abstract type: string;
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

class FunctionNode extends Node {
  type = "Function";
  parameters: Node[];
  block: CodeBlockNode;

  constructor(parameters: Node[], block: CodeBlockNode) {
    super();
    this.parameters = parameters;
    this.block = block;
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

// Handler Functions

interface NodeWrapper {
  node: Node | null;
  index: number;
}

function handleNumberLiteralNode(tokens: Token[], index: number) {
  if (tokens[index].type === TokenType.NUMBER) {
    return new NumberLiteralNode(Number.parseFloat(tokens[index].value));
  }
}

function handleStringLiteralNode(tokens: Token[], index: number) {
  if (tokens[index].type === TokenType.STRING) {
    return new StringLiteralNode(tokens[index].value);
  }
}

function checkBorrower(borrower: NodeWrapper): boolean {
  return borrower.node !== null;
}

// Handler functions need to go from highest scope to slowest

const instrQueue: Array<Function> = [
  handleNumberLiteralNode,
  handleStringLiteralNode,
];

export default function handleNode(
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
}
