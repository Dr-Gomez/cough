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

function matchDeclarationRule(lToken: Token, rToken: Token) {
  if (lToken.type === TokenType.TYPE && rToken.type === TokenType.IDENTIFIER) {
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

export {
  matchBinaryOperationRule,
  matchUnaryOperationRule,
  matchIncrementRule,
  matchDecrementRule,
  matchDeclarationRule,
  matchBoolRule,
  matchNumberRule,
  matchStringRule,
  matchTerminatorRule,
  matchVariableRule,
};
