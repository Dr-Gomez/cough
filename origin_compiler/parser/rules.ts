import { Token, TokenType } from "../lexer/lexer.ts";

//Binary Operators

function matchAssignmentRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "=") {
    return true;
  }
  return false;
}

function matchAdditionRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "+") {
    return true;
  }
  return false;
}

function matchSubtractionRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "-") {
    return true;
  }
  return false;
}

function matchMultiplicationRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "*") {
    return true;
  }
  return false;
}

function matchDivisionRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "/") {
    return true;
  }
  return false;
}

function matchModulationRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "%") {
    return true;
  }
  return false;
}

function matchANDRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "&") {
    return true;
  }
  return false;
}

function matchORRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "|") {
    return true;
  }
  return false;
}

function matchEqualityRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "=") {
    return true;
  }
  return false;
}

function matchLesserRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "=") {
    return true;
  }
  return false;
}

function matchLequalityRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "=") {
    return true;
  }
  return false;
}

function matchGreaterRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "=") {
    return true;
  }
  return false;
}

function matchGequalityRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BIN_OPERATOR && token.value === "=") {
    return true;
  }
  return false;
}

// Unary Operators

function matchIncrementRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.UNA_OPERATOR && token.value === "++") {
    return true;
  }
  return false;
}

function matchDecrementRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.UNA_OPERATOR && token.value === "--") {
    return true;
  }
  return false;
}

function matchInverseRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.UNA_OPERATOR && token.value === "!!") {
    return true;
  }
  return false;
}

function matchNegationRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.UNA_OPERATOR && token.value === "~~") {
    return true;
  }
  return false;
}

function matchDelocationRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.UNA_OPERATOR && token.value === "??") {
    return true;
  }
  return false;
}

function matchDeclarationRule(baseToken: Token, lookaheadToken: Token) {
  if (
    baseToken.type === TokenType.TYPE &&
    lookaheadToken.type === TokenType.IDENTIFIER
  ) {
    return true;
  }
  return false;
}

function matchTerminatorRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.PUNCTUATOR && token.value === ";") {
    return true;
  }
  return false;
}

function matchStringRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.STRING) {
    return true;
  }
  return false;
}

function matchNumberRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.NUMBER) {
    return true;
  }
  return false;
}

function matchBoolRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.BOOL) {
    return true;
  }
  return false;
}

function matchTypeRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.TYPE) {
    return true;
  }
  return false;
}

function matchVariableRule(token: Token, lookaheadToken: Token) {
  if (token.type === TokenType.IDENTIFIER) {
    return true;
  }
  return false;
}

function matchEOFRule(tokens: Token, lookaheadToken: Token) {
  if (tokens.type === TokenType.EOF) {
    return true;
  }
  return false;
}

export {
  matchAdditionRule,
  matchANDRule,
  matchAssignmentRule,
  matchBoolRule,
  matchDeclarationRule,
  matchTypeRule,
  matchDecrementRule,
  matchDelocationRule,
  matchDivisionRule,
  matchEOFRule,
  matchEqualityRule,
  matchGequalityRule,
  matchGreaterRule,
  matchIncrementRule,
  matchInverseRule,
  matchLequalityRule,
  matchLesserRule,
  matchModulationRule,
  matchMultiplicationRule,
  matchNegationRule,
  matchNumberRule,
  matchORRule,
  matchStringRule,
  matchSubtractionRule,
  matchTerminatorRule,
  matchVariableRule,
};
