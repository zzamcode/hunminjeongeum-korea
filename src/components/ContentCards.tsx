import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const cards = [
  {
    titleKey: "cards.history.title",
    descKey: "cards.history.desc",
    path: "/역사",
    icon: "史",
    accent: "vermillion",
  },
  {
    titleKey: "cards.hangulday.title",
    descKey: "cards.hangulday.desc",
    path: "/한글날",
    icon: "慶",
    accent: "gold",
  },
  {
    titleKey: "cards.quotes.title",
    descKey: "cards.quotes.desc",
    path: "/명언",
    icon: "言",
    accent: "jade",
  },
  {
    titleKey: "cards.news.title",
    descKey: "cards.news.desc",
    path: "/소식",
    icon: "報",
    accent: "vermillion",
  },
  {
    titleKey: "cards.posters.title",
    descKey: "cards.posters.desc",
    path: "/글자마당",
    icon: "美",
    accent: "gold",
  },
];

const ContentCards = () => {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 hanji-texture">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-foreground text-center mb-14"
        >
          {t("cards.title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const accentText =
              card.accent === "vermillion"
                ? "text-vermillion"
                : card.accent === "gold"
                ? "text-gold"
                : "text-jade";
            const accentBorder =
              card.accent === "vermillion"
                ? "hover:border-vermillion/40"
                : card.accent === "gold"
                ? "hover:border-gold/40"
                : "hover:border-jade/40";

            return (
              <motion.div
                key={card.path}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={card.path}
                  className={`block bg-card border border-border rounded-sm p-7 ${accentBorder} hover:shadow-md transition-all duration-300 group h-full`}
                >
                  <div className={`text-3xl font-light ${accentText} opacity-60 mb-4`}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-vermillion transition-colors mb-2">
                    {t(card.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(card.descKey)}
                  </p>
                  <span className="text-xs text-muted-foreground group-hover:text-vermillion mt-4 inline-block transition-colors">
                    →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContentCards;
