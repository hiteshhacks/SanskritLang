import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle2, Terminal } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface OutputLine {
  type: "output" | "error" | "success";
  message: string;
}

interface OutputConsoleProps {
  output: OutputLine[];
}

export function OutputConsole({ output }: OutputConsoleProps) {
  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex items-center gap-2 p-4 border-b">
        <Terminal className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-muted-foreground">
          Output / निर्गमन
        </h2>
      </div>
      <ScrollArea className="flex-1 p-4">
        {output.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            कोडं प्रवर्तयितुम् 'चलय' आदिश्यताम्
          </div>
        ) : (
          <div className="space-y-2">
            {output.map((line, index) => (
              <div key={index} className="font-mono text-sm">
                {line.type === "error" ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{line.message}</AlertDescription>
                  </Alert>
                ) : line.type === "success" ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{line.message}</span>
                  </div>
                ) : (
                  <div className="text-foreground">{line.message}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
