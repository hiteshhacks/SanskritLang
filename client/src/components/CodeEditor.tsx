import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Play, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  onRun: (code: string) => void;
  defaultCode?: string;
}

export function CodeEditor({ onRun, defaultCode = "" }: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const { toast } = useToast();

  const handleRun = () => {
    onRun(code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
  };

  const handleClear = () => {
    setCode("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b gap-2">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Code Editor / संपादक
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            data-testid="button-copy"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            data-testid="button-clear"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleRun}
            className="gap-2"
            data-testid="button-run"
          >
            <Play className="h-4 w-4" />
            चलाओ Run
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='likh "Namaste Jagat"'
          className="min-h-full font-mono text-sm resize-none border-0 focus-visible:ring-0 p-0"
          data-testid="textarea-code"
        />
      </div>
    </div>
  );
}
