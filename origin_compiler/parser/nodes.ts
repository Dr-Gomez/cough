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
  
  // Known Variables
  
  let variableTable = new Set();
  
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

  export { Node, ErrorNode, VariableNode, TerminatorNode , BoolLiteralNode, NumberLiteralNode, StringLiteralNode, DeclarationNode, BinaryOperationNode, CodeBlockNode }