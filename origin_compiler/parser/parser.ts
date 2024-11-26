import { Token, TokenType } from "../lexer/lexer.ts";

// Program Block

interface RootNode {
  type: string;
}

interface BlockNode extends RootNode {
  statements: RootNode[];
}

// Declaration

interface IdentifierNode extends RootNode {
  name: string;
}

// Literal Nodes

interface NumberNode extends RootNode {
  value: number;
}

interface StringNode extends RootNode {
  value: string;
}

// Types

interface typeNode extends RootNode {
  value: string;
}

// Binary Ops

interface BinaryOperatorNode extends RootNode {
  value: "add" | "subtract" | "multiply" | "divide";
}

interface BinaryExpressionNode extends RootNode {
  left: RootNode;
  operator: BinaryOperatorNode;
  right: RootNode;
}

// Logical Ops

interface LogicalOperatorNode extends RootNode {
  value: "||" | "&&" | "!";
}

interface LogicalExpressionNode extends RootNode {
  left: RootNode;
  operator: LogicalOperatorNode;
  right: RootNode;
}

// Control Flow Statements

interface ConditionExpressionNode extends RootNode {
  condition: RootNode;
  probody: RootNode;
  antibody: RootNode | null;
}

interface IterationExpressionNode extends RootNode {
  iterator: RootNode | null;
  condition: RootNode | null;
  increment: RootNode | null;
  body: BlockNode;
}

//  OOP Shenanigans

interface AccessModifierNode extends RootNode {
  value: "public" | "private" | "protected";
}

interface MethodNode extends RootNode {
  name: IdentifierNode;
  parameters: IdentifierNode[];
  returnType: typeNode;
  body: RootNode;
}

interface StaticMethodNode extends RootNode {
  isStatic: true;
}

interface InheritedNode extends RootNode {
  subclass: IdentifierNode;
  superclass: IdentifierNode;
}

interface MethodInvocationNode extends RootNode {
  object: RootNode;
  method: IdentifierNode;
  arguments: RootNode[];
}

interface FieldNode extends RootNode {
  name: IdentifierNode;
  truetype: typeNode;
  initializer: RootNode | null;
}

interface StaticFieldNode extends RootNode {
  isStatic: true;
}

interface FieldAccessNode extends RootNode {
  object: RootNode;
  field: IdentifierNode;
}

interface ConstructorNode extends MethodNode {
  isConstructor: true;
}

interface ClassNode extends RootNode {
  name: IdentifierNode;
  superclass: IdentifierNode | null;
  fields: FieldNode[];
  methods: MethodNode[];
  staticMethods: StaticMethodNode[];
}

export default function handleNode() {}
