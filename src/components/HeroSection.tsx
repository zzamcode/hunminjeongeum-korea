import { motion } from "framer-motion";
import hangulCalligraphy from "@/assets/hangul-calligraphy.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-ink">
      {/* Background calligraphy image */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-15"
        style={{ backgroundImage: `url(${hangulCalligraphy})` }}
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,15%,10%)] via-transparent to-[hsl(220,15%,10%)]" />

      {/* Decorative vertical lines */}
      <div className="absolute inset-0 flex justify-between px-12 opacity-[0.06] pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-px h-full bg-hanji" />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-vermillion" />
          <span className="text-sm tracking-[0.3em] text-hanji/60 uppercase">
            세종대왕 · 1443
          </span>
          <span className="w-8 h-px bg-vermillion" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black text-hanji mb-6 tracking-tight"
        >
          훈민정음
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-hanji/70 font-light max-w-lg mx-auto mb-4 leading-relaxed"
        >
          백성을 가르치는 바른 소리
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm text-hanji/50 max-w-md mx-auto leading-relaxed"
        >
          한글은 세계에서 가장 과학적이고 아름다운 문자입니다.
          <br />
          그 창제의 원리와 아름다움을 탐구합니다.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-vermillion/40 mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
