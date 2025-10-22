import { DocumentationCard } from "../DocumentationCard";
import { ThemeProvider } from "../ThemeProvider";

export default function DocumentationCardExample() {
  return (
    <ThemeProvider>
      <div className="p-4 max-w-md">
        <DocumentationCard
          sanskritKeyword="likh"
          englishTranslation="Print / Output"
          description="Outputs text or values to the console"
          example='likh "Namaste Jagat"'
        />
      </div>
    </ThemeProvider>
  );
}
