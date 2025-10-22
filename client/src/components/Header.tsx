import { ThemeToggle } from "./ThemeToggle";
import { Code2, BookOpen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold font-serif">
            <span className="text-primary">संस्कृत</span>Lang
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Button
            variant="ghost"
            className="gap-2"
            data-testid="button-documentation"
          >
            <BookOpen className="h-4 w-4" />
            Documentation
          </Button>
          <Button variant="ghost" className="gap-2" data-testid="button-about">
            <Info className="h-4 w-4" />
            About
          </Button>
          <ThemeToggle />
        </nav>

        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
