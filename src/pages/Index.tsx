import HeroSection from "@/components/HeroSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import LettersShowcase from "@/components/LettersShowcase";
import CombineSection from "@/components/CombineSection";
import PhilosophySection from "@/components/PhilosophySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <PrinciplesSection />
      <LettersShowcase />
      <CombineSection />
      <PhilosophySection />
      <FooterSection />
    </main>
  );
};

export default Index;
