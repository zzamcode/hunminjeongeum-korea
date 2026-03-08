import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useI18n, localeNames, type Locale } from "@/lib/i18n";

const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-vermillion transition-colors tracking-wider"
        aria-label="언어 선택"
      >
        <Globe size={14} />
        <span>{localeNames[locale]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-background/95 backdrop-blur-md border border-border rounded-sm shadow-lg min-w-[7rem] py-1.5 z-50"
          >
            {(Object.keys(localeNames) as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => {
                  setLocale(loc);
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-xs tracking-wider transition-colors ${
                  locale === loc
                    ? "text-vermillion font-bold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {localeNames[loc]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
