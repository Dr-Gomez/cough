import { Token, TokenType } from "../lexer/lexer.ts";

import {
  matchAdditionRule,
  matchANDRule,
  matchAssignmentRule,
  matchBoolRule,
  matchDeclarationRule,
  matchDecrementRule,
  matchDelocationRule,
  matchDivisionRule,
  matchEOFRule,
  matchIncrementRule,
  matchInverseRule,
  matchModulationRule,
  matchMultiplicationRule,
  matchNegationRule,
  matchNumberRule,
  matchORRule,
  matchStringRule,
  matchSubtractionRule,
  matchTerminatorRule,
  matchTypeRule,
  matchVariableRule,
} from "./rules.ts";

import {
  AdditionNode,
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
  InverseNode,
  ModulusNode,
  MultiplicationNode,
  NegationNode,
  Node,
  NumberLiteralNode,
  StartNode,
  StringLiteralNode,
  SubtractionNode,
  TerminatorNode,
  TypeLiteralNode,
  VariableNode,
} from "./nodes.ts";

import log from "../logs/log.ts";

interface AnyWrapper {
  node: Array<any> | null;
  index: number;
}

interface NodeWrapper {
  node: Node | null;
  index: number;
}

// function handleEOF(tokens: Token[], index: number): NodeWrapper {
//   if (matchEOFRule(tokens[index])) {
//     return {
//       node: new EndNode(),
//       index: index,
//     };
//   }

//   return { node: null, index };
// }

// function handleTerminatorNode(tokens: Token[], index: number): NodeWrapper {
//   if (
//     matchTerminatorRule(tokens[index])
//   ) {
//     return {
//       node: new TerminatorNode(),
//       index: index + 1,
//     };
//   }

//   return { node: null, index };
// }

// function handleStringLiteralNode(tokens: Token[], index: number): NodeWrapper {
//   if (matchStringRule(tokens[index])) {
//     return {
//       node: new StringLiteralNode(tokens[index].value),
//       index: index + 1,
//     };
//   }

//   return { node: null, index };
// }

// function handleNumberLiteralNode(tokens: Token[], index: number): NodeWrapper {
//   if (matchNumberRule(tokens[index])) {
//     const num: number = Number.parseFloat(tokens[index].value);

//     return { node: new NumberLiteralNode(num), index: index + 1 };
//   }

//   return { node: null, index };
// }

// function handleBoolLiteralNode(tokens: Token[], index: number): NodeWrapper {
//   if (matchBoolRule(tokens[index])) {
//     if (tokens[index].value === "true") {
//       return { node: new BoolLiteralNode(true), index: index + 1 };
//     } else {
//       return { node: new BoolLiteralNode(true), index: index + 1 };
//     }
//   }

//   return { node: null, index };
// }

// const varTable = new Map();

// function handleDeclarationNode(tokens: Token[], index: number): NodeWrapper {
//   if (
//     matchDeclarationRule(tokens[index], tokens[index + 1])
//   ) {
//     const declaration: DeclarationNode = new DeclarationNode(
//       tokens[index].value as unknown as
//         | "bool"
//         | "int"
//         | "float"
//         | "char"
//         | "array",
//     );

//     const variable: VariableNode = new VariableNode(tokens[index + 1].value);

//     if (varTable.has(tokens[index + 1].value)) {
//       return {
//         node: new ErrorNode(
//           `${tokens[index + 1].value} being declared again`,
//         ),
//         index: index,
//       };
//     }

//     varTable.set(tokens[index + 1].value, variable);

//     return {
//       node: declaration,
//       index: index + 2,
//     };
//   }

//   return { node: null, index };
// }

// function handleVariableNode(tokens: Token[], index: number): NodeWrapper {
//   if (matchVariableRule(tokens[index])) {
//     const variable = varTable.get(tokens[index]);

//     if (typeof variable === "undefined") {
//       return {
//         node: new ErrorNode(
//           `${tokens[index + 1].value} is being used before being declared`,
//         ),
//         index: index,
//       };
//     }

//     return { node: new VariableNode(tokens[index].value), index: index + 1 };
//   }

//   return { node: null, index };
// }

// function handleUnaryOperator(tokens: Token[], index: number): NodeWrapper {
//   if (matchUnaryOperationRule(tokens[index + 1])) {
//     if (matchIncrementRule(tokens[index + 1])) {
//       return {
//         node: new IncrementNode(varTable.get(tokens[index].value)),
//         index: index + 2,
//       };
//     }

//     if (matchDecrementRule(tokens[index + 1])) {
//       return {
//         node: new DecrementNode(varTable.get(tokens[index].value)),
//         index: index + 2,
//       };
//     }

//     if (matchNegationRule(tokens[index + 1])) {
//       return {
//         node: new NegationNode(varTable.get(tokens[index].value)),
//         index: index + 2,
//       };
//     }
//   }

//   return { node: null, index };
// }

// function handleBinaryOperator(tokens: Token[], index: number) {
//   if (matchBinaryOperationRule(tokens[index + 1])) {
//     if (matchAdditionRule(tokens[index + 1])) {

//     }

//     if (matchSubtractionRule(tokens[index + 1])) {
//     }

//     if (matchMultiplicationRule(tokens[index + 1])) {
//     }

//     if (matchDivisionRule(tokens[index + 1])) {
//     }

//     if (matchModulationRule(tokens[index + 1])) {
//     }

//     if (matchANDRule(tokens[index + 1])) {
//     }

//     if (matchORRule(tokens[index + 1])) {
//     }
//   }
// }


// Handler functions need to go from highest scope to lowest

// const instrQueue: Array<Function> = [
  //   handleEOF,
//   handleTerminatorNode,
//   handleUnaryOperator,
//   handleDeclarationNode,
//   handleStringLiteralNode,
//   handleNumberLiteralNode,
//   handleBoolLiteralNode,
//   handleVariableNode,
// ];

// function handleNode(
  //   tokens: Array<Token>,
  //   index: number,
  // ) {
    //   let borrower: NodeWrapper;
    
//   for (let i = 0; i < instrQueue.length; i++) {
  //     borrower = instrQueue[i](tokens, index);
  //     if (checkBorrower(borrower)) {
    //       return borrower;
    //     }
    //   }
    
    //   const errNode = new ErrorNode("no syntax pattern found matching token");
    //   return { node: errNode, index };
    // }

const BinaryMatches = [
  matchAssignmentRule,
  matchAdditionRule,
  matchSubtractionRule,
  matchMultiplicationRule,
  matchDivisionRule,
  matchModulationRule,
];

const UnaryMatches = [
  matchIncrementRule,
  matchDecrementRule,
  matchInverseRule,
  matchNegationRule,
  matchDelocationRule,
];

const LiteralMatches = [
  matchStringRule,
  matchNumberRule,
  matchBoolRule,
  matchTypeRule,
];

const BaseMatches = [
  matchTerminatorRule,
  ...LiteralMatches,
  matchVariableRule
]

const AllMatchesQueue = [
  matchEOFRule,
  matchDeclarationRule,
  ...BinaryMatches,
  ...UnaryMatches,
  ...BaseMatches
];

const BinaryNodes = [
  AssignmentNode,
  AdditionNode,
  SubtractionNode,
  MultiplicationNode,
  DivisionNode,
  ModulusNode
]

const UnaryNodes = [
  IncrementNode,
  DecrementNode,
  InverseNode,
  NegationNode,
  DelocationNode
]

const LiteralNodes = [
  StringLiteralNode,
  NumberLiteralNode,
  BoolLiteralNode,
  TypeLiteralNode,
]

const BaseNodes = [
  TerminatorNode,
  ...LiteralNodes,
  VariableNode
]

const AllNodes = [
  EndNode,
  DeclarationNode,
  ...BinaryNodes,
  ...UnaryNodes,
  ...BaseNodes
]

let NodeDepths: Array<Node> = [];

function handleParameters(tokens: Array<Token>, tokenIndex: number, instrIndex): AnyWrapper {
  const argNum = AllNodes[instrIndex].prototype.constructor.length

  let parameters: Array<any | Node> = []
  let i = 0;

  for(let primes = 0; primes < BaseNodes.length; primes++) {
    if (AllNodes[instrIndex] == BaseNodes[primes]) {
      parameters[0] = tokens[tokenIndex].value
      i++;
      tokenIndex++;
      break;
    }
  }
  
  for (let abstracts = 0; abstracts < NodeDepths.length; abstracts++) {
    if (AllNodes[instrIndex] == NodeDepths[abstracts]) {
      console.log("Triggered")
      break;
    }
  }

  for (i; i < argNum; i++) {
    
    const nodeWrapper = handleNode(tokens, tokenIndex + 1)
    parameters[i] = nodeWrapper.node
    tokenIndex = nodeWrapper.index;
  }

  return {node: parameters, index: tokenIndex }
}

function handleNode(tokens: Array<Token>, index: number): NodeWrapper {
  for(let i = 0; i < AllMatchesQueue.length; i++) {
    console.log("Attempting to match", tokens[index], "to rule", AllMatchesQueue[i])
    if(AllMatchesQueue[i](tokens[index], tokens[index + 1])) {
      console.log("Matched", tokens[index], "to rule", AllMatchesQueue[i])
      const parameters = handleParameters(tokens, index, i)

      let node: Node
      switch (parameters.node!.length) { // Evil manual spreading switch statement
        case 0:
          //@ts-ignore
          node = new AllNodes[i]();
          break;
        case 1:
          //@ts-ignore
          node = new AllNodes[i](parameters.node![0]);
          break;
        case 2:
          //@ts-ignore
          node = new AllNodes[i](parameters.node![0], parameters.node![1]);
          break;
        default:
          node = new ErrorNode("parser cannot handle node of more than 2 parameter complexity")
          break;
      } 
      return {node: node!, index: parameters.index}
    };
  }

  return {node: new ErrorNode("no logic pattern found matching your code"), index: index}
}

export default function handleNodes(tokens: Array<Token>) {
  log.startLog("NODE");
  
  let index = 1;
  let nodeQueue: Array<Node> = [];
  
  let jumpNode: NodeWrapper = { node: new StartNode(), index: index };
  nodeQueue.push(jumpNode.node!);
  log.logAppend(jumpNode.node!.type, null);

  while (jumpNode.node!.type !== "End") {
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