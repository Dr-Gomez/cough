import { Token, TokenType } from "../lexer/lexer.ts";

abstract class Node {
  abstract type: string;
}

class NumberNode extends Node {
  type = "number";
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}

export default function handleNode() {}
