import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const examples = [
  {
    title: "Hello World",
    description: "Your first SanskritLang program",
    code: 'likh "Namaste Jagat"',
    output: "Namaste Jagat",
  },
  {
    title: "Variables & Math",
    description: "Declare variables and perform calculations",
    code: 'sthapan x = 10\nsthapan y = 20\nlikh "Sum:"\nlikh x + y',
    output: "Sum:\n30",
  },
  {
    title: "Conditional Logic",
    description: "Use if-else statements",
    code: 'sthapan age = 25\nyadi (age >= 18) {\n  likh "Adult"\n}\nanyatha {\n  likh "Minor"\n}',
    output: "Adult",
  },
  {
    title: "Loops",
    description: "Iterate with while loops",
    code: "sthapan i = 1\nyavat (i <= 3) {\n  likh i\n  i = i + 1\n}",
    output: "1\n2\n3",
  },
];

export function ExamplesSection() {
  const { toast } = useToast();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Example code copied to clipboard",
    });
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif mb-2">
            Code Examples / उदाहरण
          </h2>
          <p className="text-muted-foreground">
            Explore sample programs to get started with SanskritLang
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {examples.map((example, index) => (
            <Card key={index} className="hover-elevate">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle>{example.title}</CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(example.code)}
                    data-testid={`button-copy-example-${index}`}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-muted rounded-md p-3">
                  <pre className="font-mono text-xs text-foreground whitespace-pre-wrap">
                    {example.code}
                  </pre>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Output:</p>
                  <div className="bg-card border rounded-md p-3">
                    <pre className="font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                      {example.output}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
