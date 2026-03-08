import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const HeroSection = () => {
  const { t, locale } = useI18n();
  const isCJK = locale === "ko" || locale === "ja" || locale === "zh";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hanji-texture dancheong-top">
      {/* Ink wash overlay */}
      <div className="absolute inset-0 ink-wash pointer-events-none" />

      {/* Traditional vertical lines like 원고지 */}
      <div className="absolute inset-0 flex justify-between px-16 opacity-[0.04] pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="w-px h-full bg-warm-brown" />
        ))}
      </div>

      {/* Large decorative Hangul with sway */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute text-[45vw] font-black text-ink leading-none select-none pointer-events-none animate-sway"
      >
        한
      </motion.div>

      {/* Secondary decorative character */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 3, delay: 1 }}
        className="absolute -right-[5vw] top-[15vh] text-[20vw] font-black text-vermillion leading-none select-none pointer-events-none"
        style={{ writingMode: "vertical-rl" }}
      >
        정음
      </motion.div>

      <div className="relative z-10 text-center px-6">
        {/* Seal-style label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="w-10 h-px bg-vermillion/60" />
          <span className="seal-stamp">
            {t("hero.label")}
          </span>
          <span className="w-10 h-px bg-vermillion/60" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className={`font-black text-ink mb-8 tracking-tight ${
            isCJK
              ? "text-6xl md:text-8xl lg:text-9xl"
              : "text-4xl md:text-5xl lg:text-7xl"
          }`}
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground font-light max-w-lg mx-auto mb-4 leading-relaxed"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-sm text-muted-foreground/70 max-w-md mx-auto leading-relaxed whitespace-pre-line"
        >
          {t("hero.desc")}
        </motion.p>

        {/* Ink drip scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20"
        >
          <div className="w-0.5 h-16 bg-gradient-to-b from-vermillion/60 to-vermillion/0 mx-auto animate-ink-drip" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
