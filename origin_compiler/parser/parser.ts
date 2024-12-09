import { Token, TokenType } from "../lexer/lexer.ts";

import {
  matchBoolRule,
  matchDeclarationRule,
  matchNumberRule,
  matchStringRule,
  matchTerminatorRule,
  matchVariableRule,
} from "./rules.ts";

import {
  Node,
  ErrorNode,
  VariableNode,
  TerminatorNode,
  BoolLiteralNode,
  NumberLiteralNode,
  StringLiteralNode,
  DeclarationNode,
  BinaryOperationNode,
  CodeBlockNode
} from "./nodes.ts"

import log from "../logs/log.ts";


interface NodeWrapper {
  node: Node | null;
  index: number;
}

function handleTerminatorNode(tokens: Token[], index: number): NodeWrapper {
  if (
    matchTerminatorRule(tokens[index])
  ) {
    return {
      node: new TerminatorNode(),
      index: index + 1,
    };
  }

  return { node: null, index };
}

const varTable = new Set()

function handleDeclarationNode(tokens: Token[], index: number): NodeWrapper {
  if (
    matchDeclarationRule(tokens[index], tokens[index + 1])
  ) {
    const variable = new VariableNode(tokens[index + 1].value);

    if (varTable.has(variable)) {
      return {
        node: new ErrorNode(
          `${tokens[index + 1].value} is used before it is declared`,
        ),
        index: index,
      };
    }

    return {
      node: new DeclarationNode(
        tokens[index].value as unknown as "bool" | "int" | "float" | "char" | "array",
        variable,
      ),
      index: index + 2,
    };
  }

  return { node: null, index };
}

function handleStringLiteralNode(tokens: Token[], index: number): NodeWrapper {
  if (matchStringRule(tokens[index])) {
    return {
      node: new StringLiteralNode(tokens[index].value),
      index: index + 1,
    };
  }

  return { node: null, index };
}

function handleNumberLiteralNode(tokens: Token[], index: number): NodeWrapper {
  if (matchNumberRule(tokens[index])) {
    const num: number = Number.parseFloat(tokens[index].value);

    return { node: new NumberLiteralNode(num), index: index + 1 };
  }

  return { node: null, index };
}

function handleBoolLiteralNode(tokens: Token[], index: number): NodeWrapper {
  if (matchBoolRule(tokens[index])) {
    if (tokens[index].value === "true") {
      return { node: new BoolLiteralNode(true), index: index + 1 };
    } else {
      return { node: new BoolLiteralNode(true), index: index + 1 };
    }
  }

  return { node: null, index };
}

function handleVariableNode(tokens: Token[], index: number): NodeWrapper {
  if (matchVariableRule(tokens[index])) {
    return { node: new VariableNode(tokens[index].value), index: index + 1 };
  }

  return { node: null, index };
}

// Check if result of variable is true

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

  const errNode = new ErrorNode("no syntax pattern found matching token");
  return { node: errNode, index };
}

export default function handleNodes(tokens: Array<Token>) {
  log.startLog("NODE");

  let index = 1;
  let jumpNode: NodeWrapper = { node: null, index: index };

  let nodeQueue: Array<Node> = [];

  while (tokens[index].type !== TokenType.EOF) {
    jumpNode = handleNode(tokens, index);

    if (jumpNode.node?.type == "Error") {
      const errorNode = jumpNode.node as ErrorNode;
      log.logNodeError(`${errorNode.msg}`);
      break;
    }

    nodeQueue.push(jumpNode.node!);
    index = jumpNode.index;
    log.logAppend(jumpNode.node!.type, null);
  }

  if (jumpNode.node?.type !== "Error") {
    log.logSuccess("NODE");
  }

  return new CodeBlockNode(nodeQueue);
}
