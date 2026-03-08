import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chosung = ["ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const jungsung = ["ㅏ","ㅑ","ㅓ","ㅕ","ㅗ","ㅛ","ㅜ","ㅠ","ㅡ","ㅣ","ㅐ","ㅔ","ㅚ","ㅟ","ㅢ","ㅘ","ㅙ","ㅝ","ㅞ"];
const jongsung = ["","ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];


// Syllable composition: 0xAC00 + (cho_idx * 21 + jung_idx) * 28 + jong_idx
function composeSyllable(cho: string, jung: string, jong: string): string {
  const choIdx = chosung.indexOf(cho);
  const jungIdx = jungsung.indexOf(jung);
  const jongIdx = jongsung.indexOf(jong);

  if (choIdx < 0 || jungIdx < 0 || jongIdx < 0) return "";

  // Standard Hangul syllable block index tables
  const choOrder = [0,2,3,5,6,7,9,11,12,14,15,16,17,18];
  // jungsung array: ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅔㅚㅟㅢㅘㅙㅝㅞ
  const jungOrder = [0,2,4,6,8,12,13,17,18,20,1,5,11,16,19,9,10,14,15];
  // jongsung array: (none)ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ
  const jongOrder = [0,1,4,7,8,16,17,19,21,22,23,24,25,26,27];

  const code = 0xAC00 + (choOrder[choIdx] * 21 + jungOrder[jungIdx]) * 28 + jongOrder[jongIdx];
  return String.fromCharCode(code);
}

const CombineSection = () => {
  const [selectedCho, setSelectedCho] = useState<string>("ㅎ");
  const [selectedJung, setSelectedJung] = useState<string>("ㅏ");
  const [selectedJong, setSelectedJong] = useState<string>("ㄴ");

  const combined = composeSyllable(selectedCho, selectedJung, selectedJong);

  return (
    <section className="py-32 px-6 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase block mb-4">
            Interactive
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-ink mb-4">
            글자 조합
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            초성, 중성, 종성을 선택하면 한글이 조합됩니다
          </p>
        </motion.div>

        {/* Combined result */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-4 md:gap-6 mb-6">
            {/* Individual parts */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2 tracking-widest">초성</span>
              <span className="text-4xl md:text-5xl font-bold text-vermillion">{selectedCho}</span>
            </div>
            <span className="text-2xl text-muted-foreground/40 mt-5">+</span>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2 tracking-widest">중성</span>
              <span className="text-4xl md:text-5xl font-bold text-vermillion">{selectedJung}</span>
            </div>
            <span className="text-2xl text-muted-foreground/40 mt-5">+</span>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2 tracking-widest">종성</span>
              <span className="text-4xl md:text-5xl font-bold text-vermillion">
                {selectedJong || "∅"}
              </span>
            </div>
            <span className="text-2xl text-muted-foreground/40 mt-5">=</span>
            {/* Result */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground mb-2 tracking-widest">결과</span>
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

        {/* Selection panels */}
        <div className="space-y-8">
          {/* Chosung */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 tracking-widest">
              초성 <span className="text-vermillion/60">· 첫소리</span>
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

          {/* Jungsung */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 tracking-widest">
              중성 <span className="text-vermillion/60">· 가운뎃소리</span>
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

          {/* Jongsung */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 tracking-widest">
              종성 <span className="text-vermillion/60">· 끝소리 (선택)</span>
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
