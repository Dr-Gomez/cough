import { unaryOperators, binaryOperators } from "../lexer/detection.ts";

interface Node {
  node: string
}

interface MsgNode extends Node {
  msg: string;
}

interface TypeLiteralNode extends Node {
  node: "type";
  type: "bool" | "int" | "float" | "str";
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


interface UnaryOperationNode extends Node {
  node: "unary"
  variable: VariableNode,
  operation: typeof unaryOperators[number];
}

interface BinaryOperationNode extends Node {
  node: "binary",
  left: Node,
  operation: typeof binaryOperators[number];
  right: Node
}

type expressions = TypeLiteralNode | BoolLiteralNode | IntegerLiteralNode | FloatLiteralNode | StringLiteralNode | VariableNode | DeclarationNode | UnaryOperationNode | BinaryOperationNode

interface ExpressionNode extends Node {
  node: "expression",
  expression: Array<expressions>;
}

interface DeclarationNode extends Node {
  node: "declaration";
  type: TypeLiteralNode;
  variable: VariableNode;
  readonly?: true;
  init?: ExpressionNode;
}

export { Node, MsgNode, TypeLiteralNode, BoolLiteralNode, IntegerLiteralNode, FloatLiteralNode, StringLiteralNode, VariableNode, ExpressionNode, DeclarationNode, BinaryOperationNode, UnaryOperationNode }