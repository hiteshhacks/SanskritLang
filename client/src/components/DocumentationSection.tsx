import { DocumentationCard } from "./DocumentationCard";

const keywords = [
  {
    sanskritKeyword: "likh",
    englishTranslation: "Print / Output",
    description: "Outputs text or values to the console",
    example: 'likh "Namaste Jagat"',
  },
  {
    sanskritKeyword: "sthapan",
    englishTranslation: "Variable Declaration",
    description: "Declares a variable and assigns a value",
    example: "sthapan x = 10",
  },
  {
    sanskritKeyword: "yadi",
    englishTranslation: "If Condition",
    description: "Executes code block if condition is true",
    example: "yadi (x > 5) { likh x }",
  },
  {
    sanskritKeyword: "anyatha",
    englishTranslation: "Else",
    description: "Executes when if condition is false",
    example: "anyatha { likh 0 }",
  },
  {
    sanskritKeyword: "yavat",
    englishTranslation: "While Loop",
    description: "Repeats code block while condition is true",
    example: "yavat (x < 10) { likh x }",
  },
  {
    sanskritKeyword: "karya",
    englishTranslation: "Function",
    description: "Defines a reusable function",
    example: "karya namaste() { likh 'Hello' }",
  },
];

export function DocumentationSection() {
  return (
    <section id="docs-section" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif mb-2">
            Language Reference / भाषा संदर्भ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn the Sanskrit-inspired keywords and their usage in SanskritLang
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keywords.map((keyword) => (
            <DocumentationCard key={keyword.sanskritKeyword} {...keyword} />
          ))}
        </div>
      </div>
    </section>
  );
}
