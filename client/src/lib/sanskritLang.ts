interface OutputLine {
  type: "output" | "error" | "success";
  message: string;
}

export class SanskritLangInterpreter {
  private output: OutputLine[] = [];

  transpile(code: string): string {
    let jsCode = code;

    jsCode = jsCode.replace(/likh\s+"([^"]*)"/g, 'console.log("$1")');
    jsCode = jsCode.replace(/likh\s+'([^']*)'/g, "console.log('$1')");
    jsCode = jsCode.replace(/likh\s+([^\s;]+)/g, "console.log($1)");

    jsCode = jsCode.replace(/sthapan\s+(\w+)\s*=\s*(.+)/g, "let $1 = $2");

    jsCode = jsCode.replace(/yadi\s*\(([^)]+)\)/g, "if ($1)");
    jsCode = jsCode.replace(/anyatha/g, "else");

    jsCode = jsCode.replace(/yavat\s*\(([^)]+)\)/g, "while ($1)");

    jsCode = jsCode.replace(
      /karya\s+(\w+)\s*\(([^)]*)\)/g,
      "function $1($2)"
    );

    return jsCode;
  }

  execute(code: string): OutputLine[] {
    this.output = [];

    try {
      const jsCode = this.transpile(code);

      const capturedLogs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        capturedLogs.push(args.join(" "));
      };

      try {
        const func = new Function(jsCode);
        func();

        capturedLogs.forEach((log) => {
          this.output.push({ type: "output", message: log });
        });

        this.output.push({
          type: "success",
          message: "Code executed successfully",
        });
      } catch (execError: any) {
        this.output.push({
          type: "error",
          message: `Runtime Error: ${execError.message}`,
        });
      } finally {
        console.log = originalLog;
      }
    } catch (error: any) {
      this.output.push({
        type: "error",
        message: `Transpilation Error: ${error.message}`,
      });
    }

    return this.output;
  }
}
