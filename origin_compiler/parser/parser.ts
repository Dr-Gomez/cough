import { Token, TokenType } from "../lexer/lexer.ts";
import log from "../logs/log.ts";

abstract class Node {
  abstract type: string;
}

// Error Node
class ErrorNode extends Node {
  type = "Error";

  constructor() {
    super();
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

interface litTypes {
  litType: "bool" | "int" | "float" | "char" | "array";
}

class DeclarationNode extends Node {
  type = "Declaration";
  litType: litTypes;
  variable: VariableNode;

  constructor(
    litType: litTypes,
    variable: VariableNode,
  ) {
    super();
    this.litType = litType;
    this.variable = variable;
  }
}

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

class TerminatorNode extends Node {
  type = "Terminator";
}

// Handler Functions

interface NodeWrapper {
  node: Node | null;
  index: number;
}

function handleTerminatorNode(tokens: Token[], index: number): NodeWrapper {
  if(tokens[index].type == TokenType.PUNCTUATOR && tokens[index].value === ";"){
    return {
        node: new TerminatorNode(),
        index: index + 1
      }
    
  }

  return { node: null, index };
}

function handleDeclarationNode(tokens: Token[], index: number): NodeWrapper {
  if (
    tokens[index].type === TokenType.TYPE &&
    tokens[index + 1].type === TokenType.IDENTIFIER
  ) {

    return {
      node: new DeclarationNode(
        tokens[index].value as unknown as litTypes,
        new VariableNode(tokens[index + 1].value),
      ),
      index: index + 2,
    };
  }

  return { node: null, index };
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

// Handler functions need to go from highest scope to lowest

const instrQueue: Array<Function> = [
  handleTerminatorNode,
  handleDeclarationNode,
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

  for (let i = 0; i < instrQueue.length; i++) {
    borrower = instrQueue[i](tokens, index);
    if (checkBorrower(borrower)) {
      return borrower;
    }
  }

  const errNode = new ErrorNode();
  return { node: errNode, index };
}

export default function handleNodes(tokens: Array<Token>) {
  log.startLog("NODE");

  let index = 1; // Starts from one because first token is always SOF
  let jumpNode: NodeWrapper = { node: null, index: index };

  let nodeQueue: Array<Node> = [];

  while (tokens[index].type !== TokenType.EOF) {
    jumpNode = handleNode(tokens, index);

    if (jumpNode.node?.type == "Error") {
      log.logNodeError(tokens[index].value, index);
      break;
    }

    nodeQueue.push(jumpNode.node!);
    index = jumpNode.index;
    log.logAppend(jumpNode.node!.type, null);
  }

  if (jumpNode.node?.type !== "Error") {
    log.logSuccess("nodenized", "NODE");
  }

  const mainCodeBlock: CodeBlockNode = new CodeBlockNode(nodeQueue);

  return mainCodeBlock;
}
