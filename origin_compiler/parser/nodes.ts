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
  
  // Literal Nodes
  
  class NumberLiteralNode extends Node {
    type = "NumberLiteral";
    value: number;
  
    constructor(value: number) {
      super();
      this.value = value;
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
  
    constructor(value: boolean) {
      super();
      this.value = value;
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
      this.variable;
    }
  }

  // Binary Operation Nodes
  
  class AssignmentNode extends Node {
    type = "Assignment"
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
    type = "Addition";
    left: Node;
    right: Node;

    constructor(left: Node, right: Node) {
      super();
      this.left = left;
      this.right = right;
    }
  }

  class MultiplicationNode extends Node {
    type = "Addition";
    left: Node;
    right: Node;

    constructor(left: Node, right: Node) {
      super();
      this.left = left;
      this.right = right;
    }
  }

  class DivisionNode extends Node {
    type = "Addition";
    left: Node;
    right: Node;

    constructor(left: Node, right: Node) {
      super();
      this.left = left;
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
  
  class DeclarationNode extends Node {
    type = "Declaration";
    litType: "bool" | "int" | "float" | "char" | "array";
    variable: VariableNode;
  
    constructor(
      litType: "bool" | "int" | "float" | "char" | "array",
      variable: VariableNode,
    ) {
      super();
      this.litType = litType;
      this.variable = variable;
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
  
  class TerminatorNode extends Node {
    type = "Terminator";
  }

  export { Node, ErrorNode, VariableNode, TerminatorNode , BoolLiteralNode, NumberLiteralNode, StringLiteralNode, DeclarationNode, IncrementNode, DecrementNode, NegationNode, AssignmentNode, AdditionNode, SubtractionNode, MultiplicationNode, DivisionNode, CodeBlockNode }