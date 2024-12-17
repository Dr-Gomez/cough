interface Node {
  node: string
}

interface MsgNode extends Node {
  msg: string;
}

interface BoolLiteralNode extends Node {
  node: "boolean";
  value: boolean;
}

interface IntegerLiteralNode extends Node {
  node: "integer";
  value: number;
}

interface FloatLiteralNode extends Node {
  node: "float";
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

export { Node, MsgNode, BoolLiteralNode, IntegerLiteralNode, FloatLiteralNode, StringLiteralNode, VariableNode, DeclarationNode }