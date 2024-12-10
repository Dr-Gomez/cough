import { Token, TokenType } from "../lexer/lexer.ts";

function matchBinaryOperationRule(token: Token) {
  if (token.type === TokenType.BIN_OPERATOR) {
    return true;
  } 
  return false;
}

function matchUnaryOperationRule(token: Token) {
  if (token.type === TokenType.UNA_OPERATOR) {
    return true;
  }
  return false;
}

function matchIncrementRule(token: Token){
  if (token.value === "++") {
    return true;
  }
  return false;
}

function matchDecrementRule(token: Token){
  if (token.value === "--") {
    return true;
  }
  return false;
}

function matchNegationRule(token: Token){
  if (token.value === "~~") {
    return true;
  }
  return false
}

function matchDeclarationRule(baseToken: Token, loohaheadToken: Token) {
  if (baseToken.type === TokenType.TYPE && loohaheadToken.type === TokenType.IDENTIFIER) {
    return true;
  }
  return false;
}

function matchTerminatorRule(token: Token) {
  if (token.type === TokenType.PUNCTUATOR && token.value === ";") {
    return true;
  }
  return false;
}

function matchStringRule(token: Token) {
  if (token.type === TokenType.STRING) {
    return true;
  }
  return false;
}

function matchNumberRule(token: Token) {
  if (token.type === TokenType.NUMBER) {
    return true;
  }
  return false;
}

function matchBoolRule(token: Token) {
  if (token.type === TokenType.BOOL) {
    return true;
  }
  return false;
}

function matchVariableRule(token: Token) {
  if (token.type === TokenType.IDENTIFIER) {
    return true;
  }
  return false;
}

function matchEOFRule(tokens: Token) {
  if (tokens.type === TokenType.EOF) {
    return true;
  }
  return false
}

export {
  matchBinaryOperationRule,
  matchUnaryOperationRule,
  matchIncrementRule,
  matchDecrementRule,
  matchNegationRule,
  matchDeclarationRule,
  matchBoolRule,
  matchNumberRule,
  matchStringRule,
  matchTerminatorRule,
  matchVariableRule,
  matchEOFRule,
};
