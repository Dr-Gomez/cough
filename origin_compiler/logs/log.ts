class log {
  private startTime: number;

  private separator = "---------------------------------------------------";
  private logArr: Array<string> = [];

  private timer(): string {
    return new Date().toUTCString();
  }

  private separateLogs(): void {
    this.logArr.push(this.separator);
  }

  private endLog(type: string): void {
    this.separateLogs();
    this.logArr.push(`${this.timer()}: ${type} LOG ENDED`);
    this.separateLogs();
  }

  public startLog(type: string): void {
    this.startTime = performance.now();
    this.separateLogs();
    this.logArr.push(`${this.timer()}: ${type} LOG STARTED`);
    this.separateLogs();
  }

  private tokenNum: number = 0;

  public logToken(header: string, payload: string) {
    if (payload === "") {
      payload = "(null)";
    }

    this.logArr.push(
      `${this.timer()}: Created token #${this.tokenNum} [header: "${header}"] with value [payload: "${payload}"].`,
    );

    this.tokenNum++;
  }

  public logAppend(childNode: string, parentNode: string | null) {
    if (!parentNode) {
      parentNode = "Main";
    }
    this.logArr.push(
      `${this.timer()}: Appended node [child: "${childNode}"] to [parent: "${parentNode}"]`,
    );
  }

  public logAST(nodeArr: Array<object>) {
    this.separateLogs();
    this.logArr.push(
      `${this.timer()}: STARTED GENERATING AST:`,
    );
    this.separateLogs();
    nodeArr.forEach(node => this.logArr.push(`${JSON.stringify(node, null, 2)}`))
    this.separateLogs();
    this.logArr.push(
      `${this.timer()}: ENDED GENERATING AST`,
    );
  }

  public logTokenError(text: string, index: number) {
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

    this.endLog("TOKEN");
    this.logArr.push(
      `${this.timer()}: ERROR: cannot recognize character "${text[index]}" found at [line: ${errPos.line}, pos: ${errPos.char}] of your code`,
    );
  }

  public logNodeError(error: string) {
    this.endLog("NODE");
    this.logArr.push(
      `${this.timer()}: ERROR: "${error}"`,
    );
    this.separateLogs();
  }

  public logSuccess(type: string) {
    const endTime = performance.now();

    const deltaTime = endTime - this.startTime;

    let result: string;

    if (deltaTime > 1000) {
      result = `${deltaTime / 1000} seconds`;
    } else {
      result = `${deltaTime} milliseconds`;
    }

    this.endLog(type);
    this.logArr.push(
      `${this.timer()}: SUCCESS: Code was successfully ${type + "NIZED"} in ${result}.`,
    );
    this.separateLogs();
  }

  public showLogs(): void {
    for (let i = 0; i < this.logArr.length; i++) {
      console.log(this.logArr[i]);
    }
  }
}

export default new log();
