class Node {
  type: string;
}

class ErrorNode extends Node {
  type = "Error";
  msg: string;

  constructor(msg: string) {
    super();
    this.msg = msg;
  }
}

class StartNode extends Node {
  type = "Start";

  constructor() {
    super();
  }
}

class EndNode extends Node {
  type = "End";

  constructor() {
    super();
  }
}

// Literal Nodes

class NumberLiteralNode extends Node {
  type = "NumberLiteral";
  value: number;

  constructor(value: string) {
    super();
    this.value = Number.parseFloat(value);
  }
}

class StringLiteralNode extends Node {
  type = "StringLiteral";
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }
}

class BoolLiteralNode extends Node {
  type = "BoolLiteral";
  value: boolean;

  constructor(value: string) {
    super();
    if (value == "true") {
      this.value = true
    } else {
      this.value = false
    }
  }
}

class TypeLiteralNode extends Node {
  type = "TypeLiteral";
  litType: "bool" | "int" | "float" | "char" | "array";

  constructor(litType: string) {
    super();
    this.litType = litType as "bool" | "int" | "float" | "char" | "array"
  }
}

// Unary Operation Nodes

class IncrementNode extends Node {
  type = "Increment";
  variable: VariableNode;

  constructor(variable: VariableNode) {
    super();
    this.variable = variable;
  }
}

class DecrementNode extends Node {
  type = "Decrement";
  variable: VariableNode;

  constructor(variable: VariableNode) {
    super();
    this.variable = variable;
  }
}

class NegationNode extends Node {
  type = "Negation";
  variable: VariableNode;

  constructor(variable: VariableNode) {
    super();
    this.variable = variable;
  }
}

class InverseNode extends Node {
  type = "Negation";
  variable: VariableNode;

  constructor(variable: VariableNode) {
    super();
    this.variable = variable;
  }
}

class DelocationNode extends Node {
  type = "Negation";
  variable: VariableNode;

  constructor(variable: VariableNode) {
    super();
    this.variable = variable;
  }
}

// Binary Operation Nodes

class AssignmentNode extends Node {
  type = "Assignment";
  left: VariableNode;
  right: Node;

  constructor(left: VariableNode, right: Node) {
    super();
    this.left = left;
    this.right = right;
  }
}

class AdditionNode extends Node {
  type = "Addition";
  left: Node;
  right: Node;

  constructor(left: Node, right: Node) {
    super();
    this.left = left;
    this.right = right;
  }
}

class SubtractionNode extends Node {
  type = "Subtraction";
  left: Node;
  right: Node;

  constructor(left: Node, right: Node) {
    super();
    this.left = left;
    this.right = right;
  }
}

class MultiplicationNode extends Node {
  type = "Multiplication";
  left: Node;
  right: Node;

  constructor(left: Node, right: Node) {
    super();
    this.left = left;
    this.right = right;
  }
}

class DivisionNode extends Node {
  type = "Division";
  left: Node;
  right: Node;

  constructor(left: Node, right: Node) {
    super();
    this.left = left;
    this.right = right;
  }
}

class ModulusNode extends Node {
  type = "Modulus";
  left: Node;
  right: Node;

  constructor(left: Node, right: Node) {
    super();
    this.left = left;
    this.right = right;
  }
}

class ANDNode extends Node {
  type = "AND";
  left: Node;
  right: Node;

  constructor(left: Node, right: Node) {
    super();
    this.left = left;
    this.right = right;
  }
}

class ORNode extends Node {
  type = "AND";
  left: Node;
  right: Node;

  constructor(left: Node, right: Node) {
    super();
    this.left = left;
    this.right = right;
  }
}

// Variable Nodes

class DeclarationNode extends Node {
  type = "Declaration";
  litType: TypeLiteralNode;

  constructor(
    litType: TypeLiteralNode,
  ) {
    super();
    this.litType = litType;
  }
}

class VariableNode extends Node {
  type = "Variable";
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

class CodeBlockNode extends Node {
  type = "CodeBlock";
  statements: Node[];

  constructor(statements: Node[]) {
    super();
    this.statements = statements;
  }
}

// Control Flow Nodes

class MethodNode extends Node {
  type = "Method";
  parameters: VariableNode[];
  block: CodeBlockNode;

  constructor(parameters: VariableNode[], block: CodeBlockNode) {
    super();
    this.parameters = parameters;
    this.block = block;
  }
}

class TerminatorNode extends Node {
  type = "Terminator";
}

export {
  AdditionNode,
  ANDNode,
  AssignmentNode,
  BoolLiteralNode,
  CodeBlockNode,
  DeclarationNode,
  DecrementNode,
  DelocationNode,
  DivisionNode,
  EndNode,
  ErrorNode,
  IncrementNode,
  TypeLiteralNode,
  InverseNode,
  MethodNode,
  ModulusNode,
  MultiplicationNode,
  NegationNode,
  Node,
  NumberLiteralNode,
  ORNode,
  StartNode,
  StringLiteralNode,
  SubtractionNode,
  TerminatorNode,
  VariableNode,
};
