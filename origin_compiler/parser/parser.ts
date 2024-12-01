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

export default function handleNode() {}
