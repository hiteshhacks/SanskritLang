import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DocumentationCardProps {
  sanskritKeyword: string;
  englishTranslation: string;
  description: string;
  example: string;
}

export function DocumentationCard({
  sanskritKeyword,
  englishTranslation,
  description,
  example,
}: DocumentationCardProps) {
  return (
    <Card className="hover-elevate">
      <CardHeader>
        <CardTitle className="font-serif text-primary text-xl">
          {sanskritKeyword}
        </CardTitle>
        <CardDescription className="text-base">
          {englishTranslation}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="bg-muted rounded-md p-3">
          <code className="font-mono text-sm">{example}</code>
        </div>
      </CardContent>
    </Card>
  );
}
