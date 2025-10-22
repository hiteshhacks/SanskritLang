import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { OutputConsole } from "./OutputConsole";
import { SanskritLangInterpreter } from "@/lib/sanskritLang";

interface OutputLine {
  type: "output" | "error" | "success";
  message: string;
}

const defaultCode = `likh "Namaste Jagat"

sthapan x = 10
sthapan y = 20
likh x + y`;

export function IDESection() {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const interpreter = new SanskritLangInterpreter();

  const handleRun = (code: string) => {
    const result = interpreter.execute(code);
    setOutput(result);
  };

  return (
    <section id="ide-section" className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif mb-2">
            Try the IDE / संपादक
          </h2>
          <p className="text-muted-foreground">
            Write and execute SanskritLang code in your browser
          </p>
        </div>

        <div className="grid lg:grid-cols-[3fr,2fr] gap-4 h-[600px]">
          <div className="border rounded-lg overflow-hidden">
            <CodeEditor onRun={handleRun} defaultCode={defaultCode} />
          </div>
          <div className="border rounded-lg overflow-hidden">
            <OutputConsole output={output} />
          </div>
        </div>
      </div>
    </section>
  );
}
