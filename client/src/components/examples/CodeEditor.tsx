import { useState } from "react";
import { CodeEditor } from "../CodeEditor";
import { ThemeProvider } from "../ThemeProvider";

export default function CodeEditorExample() {
  const [code, setCode] = useState('likh "Namaste Jagat"');

  return (
    <ThemeProvider>
      <div className="h-96 border rounded-lg overflow-hidden">
        <CodeEditor
          code={code}
          onCodeChange={setCode}
          onRun={(code) => console.log("Running:", code)}
        />
      </div>
    </ThemeProvider>
  );
}
