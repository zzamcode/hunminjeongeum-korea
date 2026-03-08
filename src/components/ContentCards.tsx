import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const cards = [
  {
    titleKey: "cards.history.title",
    descKey: "cards.history.desc",
    path: "/역사",
    icon: "史",
    accent: "vermillion" as const,
  },
  {
    titleKey: "cards.hangulday.title",
    descKey: "cards.hangulday.desc",
    path: "/한글날",
    icon: "慶",
    accent: "gold" as const,
  },
  {
    titleKey: "cards.quotes.title",
    descKey: "cards.quotes.desc",
    path: "/명언",
    icon: "言",
    accent: "jade" as const,
  },
  {
    titleKey: "cards.news.title",
    descKey: "cards.news.desc",
    path: "/소식",
    icon: "報",
    accent: "vermillion" as const,
  },
  {
    titleKey: "cards.posters.title",
    descKey: "cards.posters.desc",
    path: "/글자마당",
    icon: "美",
    accent: "gold" as const,
  },
];

const accentStyles = {
  vermillion: {
    text: "text-vermillion",
    border: "hover:border-vermillion/40",
    cornerBorder: "before:!border-vermillion/20 after:!border-vermillion/20",
  },
  gold: {
    text: "text-gold",
    border: "hover:border-gold/40",
    cornerBorder: "before:!border-gold/20 after:!border-gold/20",
  },
  jade: {
    text: "text-jade",
    border: "hover:border-jade/40",
    cornerBorder: "before:!border-jade/20 after:!border-jade/20",
  },
};

const ContentCards = () => {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 hanji-texture">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {t("cards.title")}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-12 h-px bg-vermillion/40" />
            <span className="w-2 h-2 bg-vermillion/40 rotate-45" />
            <span className="w-12 h-px bg-vermillion/40" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const style = accentStyles[card.accent];

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
                  className={`block changho-card rounded-sm p-7 ${style.border} hover:shadow-md transition-all duration-300 group h-full corner-motif ${style.cornerBorder}`}
                >
                  <div className={`text-3xl font-light ${style.text} opacity-50 mb-4`}>
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
