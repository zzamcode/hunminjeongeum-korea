import HeroSection from "@/components/HeroSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import LettersShowcase from "@/components/LettersShowcase";
import PhilosophySection from "@/components/PhilosophySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <PrinciplesSection />
      <LettersShowcase />
      <PhilosophySection />
      <FooterSection />
    </main>
  );
};

export default Index;
