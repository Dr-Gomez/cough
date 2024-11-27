import { Token } from "../lexer/lexer.ts";

class log {
  private startTime: number;

  private separator = "------------------------------------------";
  private logArr: Array<string> = [];

  private timer(): string {
    return new Date().toUTCString();
  }

  public logToken(header: string, payload: string) {
    if (payload === "") {
      payload = "(null)";
    }

    this.logArr.push(`${this.timer()}: Created token [header: "${header}"] with value [payload: "${payload}"].`);
  }

  logAppend(parent: Token | "main" | null, token: Token) {
    if (parent === null) {
      parent = "main";
    }
    this.logArr.push(`${this.timer()}: Appended token ["${token}"] to [parent: "${parent}:]`);
  }

  public logError(text: string, index: number) {
    let errPos = { line: 0, char: 0 };

    const lines: string[] = text.split("\n");

    let lineNumber = 0;
    let textIndex = 0;

    for (lineNumber; lineNumber < lines.length; lineNumber++) {
      const line = lines[lineNumber];

      if (textIndex + line.length >= index) {
        const char = index - textIndex;
        errPos = { line: lineNumber + 1, char: char };
        break;
      }

      textIndex += line.length + 1;
    }

    this.separateLogs();
    this.logArr.push(`${this.timer()}: LOG ENDED`);
    this.separateLogs();
    this.logArr.push(`${this.timer()}: ERROR: error in character "${text[index]}" found at [line: ${errPos.line}, pos: ${errPos.char}] of your code`);
  }

  public logSuccess() {
    const endTime = performance.now();

    const deltaTime = endTime - this.startTime;

    let result: string;

    if (deltaTime > 1000) {
      result = `${deltaTime / 1000} seconds`;
    } else {
      result = `${deltaTime} milliseconds`;
    }

    this.separateLogs();
    this.logArr.push(`${this.timer()}: LOG ENDED`);
    this.separateLogs();
    this.logArr.push(`${this.timer()}: SUCCESS: Code was successfully transpiled in ${result}. EUREKA!`);
  }

  public showLogs(): void {
    for (let i = 0; i < this.logArr.length; i++) {
      console.log(this.logArr[i]);
    }
  }

  public separateLogs(): void {
    this.logArr.push(this.separator);
  }

  constructor() {
    this.startTime = performance.now();
    this.separateLogs();
    this.logArr.push(`${this.timer()}: LOG STARTED`);
    this.separateLogs();
  }
}

export default new log();
