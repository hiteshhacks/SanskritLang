import { OutputConsole } from "../OutputConsole";
import { ThemeProvider } from "../ThemeProvider";

export default function OutputConsoleExample() {
  const sampleOutput = [
    { type: "output" as const, message: "Namaste Jagat" },
    { type: "output" as const, message: "10" },
    { type: "success" as const, message: "Code executed successfully" },
  ];

  return (
    <ThemeProvider>
      <div className="h-96 border rounded-lg overflow-hidden">
        <OutputConsole output={sampleOutput} />
      </div>
    </ThemeProvider>
  );
}
