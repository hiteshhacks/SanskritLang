import { Parser } from "./parser";
import { CodeGenerator } from "./codegen";

interface OutputLine {
  type: "output" | "error" | "success";
  message: string;
}

export class SanskritLangInterpreter {
  private output: OutputLine[] = [];
  private parser: Parser | null = null;
  private codegen: CodeGenerator = new CodeGenerator();

  transpile(code: string): string {
    try {
      this.parser = new Parser(code);
      const ast = this.parser.parse();
      return this.codegen.generate(ast);
    } catch (error: any) {
      throw new Error(this.formatError(error.message));
    }
  }

  execute(code: string): OutputLine[] {
    this.output = [];

    try {
      const jsCode = this.transpile(code);

      const capturedLogs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        capturedLogs.push(args.map(arg => String(arg)).join(" "));
      };

      try {
        const func = new Function(jsCode);
        func();

        capturedLogs.forEach((log) => {
          this.output.push({ type: "output", message: log });
        });

        this.output.push({
          type: "success",
          message: "कोड सफलतापूर्वक निष्पादित (Code executed successfully)",
        });
      } catch (execError: any) {
        this.output.push({
          type: "error",
          message: `त्रुटि (Runtime Error): ${execError.message}`,
        });
      } finally {
        console.log = originalLog;
      }
    } catch (error: any) {
      this.output.push({
        type: "error",
        message: error.message,
      });
    }

    return this.output;
  }

  private formatError(message: string): string {
    // Add Sanskrit-themed error messages
    if (message.includes("Expected")) {
      return `वाक्यविन्यास त्रुटि (Syntax Error): ${message}`;
    }
    if (message.includes("Unexpected")) {
      return `अप्रत्याशित चिह्न (Unexpected Token): ${message}`;
    }
    return `त्रुटि (Error): ${message}`;
  }
}
