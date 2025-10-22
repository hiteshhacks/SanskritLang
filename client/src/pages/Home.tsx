import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { IDESection } from "@/components/IDESection";
import { DocumentationSection } from "@/components/DocumentationSection";
import { ExamplesSection } from "@/components/ExamplesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <IDESection />
        <DocumentationSection />
        <ExamplesSection />
      </main>
      <Footer />
    </div>
  );
}
