import { useState, useEffect } from "react";
import { CodeEditor } from "./CodeEditor";
import { OutputConsole } from "./OutputConsole";
import { SanskritLangInterpreter } from "@/lib/sanskritLang";
import { examplePrograms } from "@shared/examplePrograms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OutputLine {
  type: "output" | "error" | "success";
  message: string;
}

const defaultCode = `// Welcome to SanskritLang!
likh "Namaste Jagat"

sthapan x = 10
sthapan y = 20
likh "Sum: "
likh x + y`;

const CODE_STORAGE_KEY = "sanskritlang_code";

export function IDESection() {
  const [code, setCode] = useState(() => {
    const saved = localStorage.getItem(CODE_STORAGE_KEY);
    return saved || defaultCode;
  });
  const [output, setOutput] = useState<OutputLine[]>([]);
  const interpreter = new SanskritLangInterpreter();

  useEffect(() => {
    localStorage.setItem(CODE_STORAGE_KEY, code);
  }, [code]);

  const handleRun = (codeToRun: string) => {
    const result = interpreter.execute(codeToRun);
    setOutput(result);
  };

  const loadExample = (exampleId: string) => {
    const example = examplePrograms.find((ex) => ex.id === exampleId);
    if (example) {
      setCode(example.code);
      setOutput([]);
    }
  };

  return (
    <section id="ide-section" className="py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif mb-2">
            Try the IDE / संपादन
          </h2>
          <p className="text-muted-foreground mb-4">
            Write and execute SanskritLang code in your browser
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">उदाहरणं आनयन्तु:</span>
            <Select onValueChange={loadExample}>
              <SelectTrigger className="w-64" data-testid="select-example">
                <SelectValue placeholder="उदाहरणं वरयन्तु..." />
              </SelectTrigger>
              <SelectContent>
                {examplePrograms.map((example) => (
                  <SelectItem
                    key={example.id}
                    value={example.id}
                    data-testid={`option-example-${example.id}`}
                  >
                    {example.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-[3fr,2fr] gap-4 h-[600px]">
          <div className="border rounded-lg overflow-hidden">
            <CodeEditor code={code} onCodeChange={setCode} onRun={handleRun} />
          </div>
          <div className="border rounded-lg overflow-hidden">
            <OutputConsole output={output} />
          </div>
        </div>
      </div>
    </section>
  );
}
