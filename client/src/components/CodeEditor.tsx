import { useState, useRef, useEffect } from "react";
import { Play, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { highlightSanskritCode } from "@/lib/syntaxHighlight";

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  onRun: (code: string) => void;
}

export function CodeEditor({ code, onCodeChange, onRun }: CodeEditorProps) {
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.innerHTML = highlightSanskritCode(code || " ");
    }
  }, [code]);

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
    onCodeChange("");
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.currentTarget.scrollTop;
      highlightRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + "  " + code.substring(end);
      onCodeChange(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault();
      handleRun();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b gap-2">
        <h2 className="text-sm font-semibold text-muted-foreground">
          Code Editor / संपादन
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
            चलय
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto relative">
        <div className="relative font-mono text-sm">
          <div
            ref={highlightRef}
            className="absolute inset-0 pointer-events-none whitespace-pre-wrap break-words overflow-hidden"
            aria-hidden="true"
          />
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            placeholder='लिख "नमस्ते जगत्"'
            className="relative w-full h-full bg-transparent resize-none border-0 outline-none text-transparent caret-foreground"
            style={{ caretColor: "hsl(var(--foreground))" }}
            data-testid="textarea-code"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
