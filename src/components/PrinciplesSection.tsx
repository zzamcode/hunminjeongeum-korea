import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const PrinciplesSection = () => {
  const { t } = useI18n();

  const principles = [
    {
      title: t("principles.p1.title"),
      subtitle: t("principles.p1.subtitle"),
      description: t("principles.p1.desc"),
      symbol: "ㆍ ㅡ ㅣ",
    },
    {
      title: t("principles.p2.title"),
      subtitle: t("principles.p2.subtitle"),
      description: t("principles.p2.desc"),
      symbol: "ㄱ ㄴ ㅁ ㅅ ㅇ",
    },
    {
      title: t("principles.p3.title"),
      subtitle: t("principles.p3.subtitle"),
      description: t("principles.p3.desc"),
      symbol: "ㄱ → ㅋ",
    },
  ];

  return (
    <section id="principles" className="py-32 px-6 sumuk-bg relative overflow-hidden scroll-mt-16">
      {/* Ink wash decorative bg */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-primary-foreground/[0.015] select-none pointer-events-none animate-sway">
        음
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="seal-stamp mb-6 inline-flex !text-primary-foreground !border-primary-foreground/40">
            {t("principles.label")}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 mt-6">
            {t("principles.title")}
          </h2>
          <p className="text-primary-foreground/50 max-w-lg mx-auto">
            {t("principles.desc")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group corner-motif"
            >
              <div className="border border-primary-foreground/10 p-8 h-full hover:border-vermillion/30 transition-colors duration-500 relative">
                <div className="text-3xl md:text-4xl font-light text-vermillion/70 mb-6 tracking-widest">
                  {principle.symbol}
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                  {principle.title}
                </h3>
                <span className="text-xs text-primary-foreground/30 tracking-widest block mb-4">
                  {principle.subtitle}
                </span>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
