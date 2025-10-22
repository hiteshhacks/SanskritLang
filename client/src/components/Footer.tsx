import { Heart, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-8 px-4 mt-16">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-primary fill-primary" />
            <span>by blending ancient wisdom with modern technology</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Code2 className="h-4 w-4" />
            <span className="font-serif">SanskritLang</span>
            <span>- Code in the Language of the Ancients</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Inspired by Bhailang and the timeless elegance of Sanskrit
          </p>
        </div>
      </div>
    </footer>
  );
}
