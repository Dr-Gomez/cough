interface Node {
  node: string
}

interface BoolLiteralNode extends Node {
  node: "boolean";
  value: boolean;
}

interface IntegerLiteralNode extends Node {
  node: "integer";
  value: number;
}

interface StringLiteralNode extends Node {
  node: "string";
  value: string;
}

interface VariableNode extends Node {
  node: "variable";
  name: string;
}

interface DeclarationNode extends Node {
  node: "declaration";
  type: string;
  variable: VariableNode;
}

export { Node, BoolLiteralNode, IntegerLiteralNode, StringLiteralNode, VariableNode, DeclarationNode}