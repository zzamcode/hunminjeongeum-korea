import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      delay: i * 0.02,
      type: "spring",
      stiffness: 250,
      damping: 18,
    },
  }),
};

const CombineSection = () => {
  const [selectedCho, setSelectedCho] = useState<string>("ㅎ");
  const [selectedJung, setSelectedJung] = useState<string>("ㅏ");
  const [selectedJong, setSelectedJong] = useState<string>("ㄴ");

  const combined = composeSyllable(selectedCho, selectedJung, selectedJong);

  return (
    <section id="combine" className="py-32 px-6 bg-secondary scroll-mt-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-sm tracking-[0.3em] text-muted-foreground uppercase block mb-4"
          >
            Interactive
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-ink mb-4">
            글자 조합
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-px bg-vermillion mx-auto mb-6 origin-center"
          />
          <p className="text-muted-foreground max-w-lg mx-auto">
            초성, 중성, 종성을 선택하면 한글이 조합됩니다
          </p>
        </motion.div>

        {/* Combined result */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 md:gap-6 mb-6">
            {[
              { label: "초성", value: selectedCho },
              null,
              { label: "중성", value: selectedJung },
              null,
              { label: "종성", value: selectedJong || "∅" },
            ].map((item, i) =>
              item === null ? (
                <motion.span
                  key={`plus-${i}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-2xl text-muted-foreground/40 mt-5"
                >
                  +
                </motion.span>
              ) : (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-xs text-muted-foreground mb-2 tracking-widest">{item.label}</span>
                  <span className="text-4xl md:text-5xl font-bold text-vermillion">{item.value}</span>
                </motion.div>
              )
            )}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="text-2xl text-muted-foreground/40 mt-5"
            >
              =
            </motion.span>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2 tracking-widest">결과</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={combined}
                  initial={{ opacity: 0, scale: 0.3, rotate: -15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.5, rotate: 15, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                  className="text-5xl md:text-7xl font-black text-ink"
                >
                  {combined}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Selection panels */}
        <div className="space-y-8">
          {[
            { title: "초성", sub: "· 첫소리", items: chosung, selected: selectedCho, onSelect: setSelectedCho, prefix: "cho" },
            { title: "중성", sub: "· 가운뎃소리", items: jungsung, selected: selectedJung, onSelect: setSelectedJung, prefix: "jung" },
            { title: "종성", sub: "· 끝소리 (선택)", items: jongsung, selected: selectedJong, onSelect: setSelectedJong, prefix: "jong" },
          ].map((group, gi) => (
            <motion.div
              key={group.prefix}
              initial={{ opacity: 0, x: gi % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: gi * 0.15 }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-3 tracking-widest">
                {group.title} <span className="text-vermillion/60">{group.sub}</span>
              </h3>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {group.items.map((ch, i) => (
                  <motion.button
                    key={`${group.prefix}-${i}`}
                    custom={i}
                    variants={buttonVariants}
                    onClick={() => group.onSelect(ch)}
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-11 h-11 text-lg font-bold border transition-all duration-200 ${
                      group.selected === ch
                        ? "bg-ink text-primary-foreground border-ink"
                        : "border-border text-foreground hover:border-vermillion/40 hover:text-vermillion"
                    }`}
                  >
                    {ch || "∅"}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CombineSection;
