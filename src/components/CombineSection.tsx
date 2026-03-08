import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const chosung = ["ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const jungsung = ["ㅏ","ㅑ","ㅓ","ㅕ","ㅗ","ㅛ","ㅜ","ㅠ","ㅡ","ㅣ","ㅐ","ㅔ","ㅚ","ㅟ","ㅢ","ㅘ","ㅙ","ㅝ","ㅞ"];
const jongsung = ["","ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

function composeSyllable(cho: string, jung: string, jong: string): string {
  const choIdx = chosung.indexOf(cho);
  const jungIdx = jungsung.indexOf(jung);
  const jongIdx = jongsung.indexOf(jong);
  if (choIdx < 0 || jungIdx < 0 || jongIdx < 0) return "";
  const choOrder = [0,2,3,5,6,7,9,11,12,14,15,16,17,18];
  const jungOrder = [0,2,4,6,8,12,13,17,18,20,1,5,11,16,19,9,10,14,15];
  const jongOrder = [0,1,4,7,8,16,17,19,21,22,23,24,25,26,27];
  const code = 0xAC00 + (choOrder[choIdx] * 21 + jungOrder[jungIdx]) * 28 + jongOrder[jongIdx];
  return String.fromCharCode(code);
}

const CombineSection = () => {
  const { t } = useI18n();
  const [selectedCho, setSelectedCho] = useState<string>("ㅎ");
  const [selectedJung, setSelectedJung] = useState<string>("ㅏ");
  const [selectedJong, setSelectedJong] = useState<string>("ㄴ");

  const combined = composeSyllable(selectedCho, selectedJung, selectedJong);

  return (
    <section id="combine" className="py-32 px-6 bg-secondary scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase block mb-4">
            {t("combine.label")}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-ink mb-4">
            {t("combine.title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("combine.desc")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 md:gap-6 mb-6">
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2 tracking-widest">{t("combine.cho")}</span>
              <span className="text-4xl md:text-5xl font-bold text-vermillion">{selectedCho}</span>
            </div>
            <span className="text-2xl text-muted-foreground/40 mt-5">+</span>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2 tracking-widest">{t("combine.jung")}</span>
              <span className="text-4xl md:text-5xl font-bold text-vermillion">{selectedJung}</span>
            </div>
            <span className="text-2xl text-muted-foreground/40 mt-5">+</span>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2 tracking-widest">{t("combine.jong")}</span>
              <span className="text-4xl md:text-5xl font-bold text-vermillion">
                {selectedJong || "∅"}
              </span>
            </div>
            <span className="text-2xl text-muted-foreground/40 mt-5">=</span>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2 tracking-widest">{t("combine.result")}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={combined}
                  initial={{ opacity: 0, scale: 0.5, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="text-5xl md:text-7xl font-black text-ink"
                >
                  {combined}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 tracking-widest">
              {t("combine.cho")} <span className="text-vermillion/60">· {t("combine.cho.sub")}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {chosung.map((ch) => (
                <button
                  key={`cho-${ch}`}
                  onClick={() => setSelectedCho(ch)}
                  className={`w-11 h-11 text-lg font-bold border transition-all duration-200 ${
                    selectedCho === ch
                      ? "bg-ink text-primary-foreground border-ink"
                      : "border-border text-foreground hover:border-vermillion/40 hover:text-vermillion"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 tracking-widest">
              {t("combine.jung")} <span className="text-vermillion/60">· {t("combine.jung.sub")}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {jungsung.map((ch) => (
                <button
                  key={`jung-${ch}`}
                  onClick={() => setSelectedJung(ch)}
                  className={`w-11 h-11 text-lg font-bold border transition-all duration-200 ${
                    selectedJung === ch
                      ? "bg-ink text-primary-foreground border-ink"
                      : "border-border text-foreground hover:border-vermillion/40 hover:text-vermillion"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 tracking-widest">
              {t("combine.jong")} <span className="text-vermillion/60">· {t("combine.jong.sub")}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {jongsung.map((ch, i) => (
                <button
                  key={`jong-${i}`}
                  onClick={() => setSelectedJong(ch)}
                  className={`w-11 h-11 text-lg font-bold border transition-all duration-200 ${
                    selectedJong === ch
                      ? "bg-ink text-primary-foreground border-ink"
                      : "border-border text-foreground hover:border-vermillion/40 hover:text-vermillion"
                  }`}
                >
                  {ch || "∅"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombineSection;
