import { Token } from "../handle.ts";

class log {
  private separator = "------------------------------------------";
  private logArr: Array<string> = [];

  private timer(): string {
    return new Date().toUTCString();
  }

  public logToken(header: string, payload: string) {
    if (payload === "") {
      payload = "(null)";
    }

    this.logArr.push(`${this.timer()}: Created token [header: ${header}] with value [payload: ${payload}].`);
  }

  logAppend(parent: Token | "main" | null, token: Token) {
    if (parent === null) {
      parent = "main";
    }
    this.logArr.push(`${this.timer()}: Appended token [${token}] to [parent: ${parent}]`);
  }

  public showLogs(): void {
    for (let i = 0; i < this.logArr.length; i++) {
      console.log(this.logArr[i]);
    }
    console.log(this.separator);
  }

  constructor() {
    this.logArr.push(`${this.timer()}: LOG STARTED`);
    this.logArr.push(this.separator);
  }
}

export default new log();
