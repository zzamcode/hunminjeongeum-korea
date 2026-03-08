import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import LettersShowcase from "@/components/LettersShowcase";
import CombineSection from "@/components/CombineSection";
import PhilosophySection from "@/components/PhilosophySection";
import ContentCards from "@/components/ContentCards";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <PrinciplesSection />
      <LettersShowcase />
      <CombineSection />
      <PhilosophySection />
      <ContentCards />
      <FooterSection />
    </main>
  );
};

export default Index;
