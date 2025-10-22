import heroImage from "@assets/generated_images/Sanskrit_manuscripts_morphing_into_code_2e7d95ae.png";
import { Button } from "@/components/ui/button";
import { Code2, BookOpen } from "lucide-react";

export function HeroSection() {
  const scrollToIDE = () => {
    document.getElementById("ide-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToDocs = () => {
    document.getElementById("docs-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif">
            Code in the Language of the Ancients
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-serif">
            प्राचीन भाषा में कोड करें
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Blend the elegance of Sanskrit with modern programming. Write code
            using Sanskrit-inspired syntax that transpiles to JavaScript.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={scrollToIDE}
              className="gap-2"
              data-testid="button-try-now"
            >
              <Code2 className="h-5 w-5" />
              Try Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToDocs}
              className="gap-2 bg-background/20 backdrop-blur-sm border-white/30 text-white hover:bg-background/30"
              data-testid="button-learn-more"
            >
              <BookOpen className="h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
