import { CodeEditor } from "../CodeEditor";
import { ThemeProvider } from "../ThemeProvider";

export default function CodeEditorExample() {
  return (
    <ThemeProvider>
      <div className="h-96 border rounded-lg overflow-hidden">
        <CodeEditor
          onRun={(code) => console.log("Running:", code)}
          defaultCode='likh "Namaste Jagat"'
        />
      </div>
    </ThemeProvider>
  );
}
