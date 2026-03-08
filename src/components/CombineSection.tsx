import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chosung = ["ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const jungsung = ["ㅏ","ㅑ","ㅓ","ㅕ","ㅗ","ㅛ","ㅜ","ㅠ","ㅡ","ㅣ","ㅐ","ㅔ","ㅚ","ㅟ","ㅢ","ㅘ","ㅙ","ㅝ","ㅞ"];
const jongsung = ["","ㄱ","ㄴ","ㄷ","ㄹ","ㅁ","ㅂ","ㅅ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

const CHOSUNG_BASE = 0x1100;
const JUNGSUNG_BASE = 0x1161;
const JONGSUNG_BASE = 0x11A7;

// Map display jamo to Unicode Jamo codepoints
const chosungMap: Record<string, number> = {
  "ㄱ":0x1100,"ㄴ":0x1102,"ㄷ":0x1103,"ㄹ":0x1105,"ㅁ":0x1106,
  "ㅂ":0x1107,"ㅅ":0x1109,"ㅇ":0x110B,"ㅈ":0x110C,"ㅊ":0x110E,
  "ㅋ":0x110F,"ㅌ":0x1110,"ㅍ":0x1111,"ㅎ":0x1112,
};

const jungsungMap: Record<string, number> = {
  "ㅏ":0x1161,"ㅐ":0x1162,"ㅑ":0x1163,"ㅒ":0x1164,"ㅓ":0x1165,
  "ㅔ":0x1166,"ㅕ":0x1167,"ㅖ":0x1168,"ㅗ":0x1169,"ㅘ":0x116A,
  "ㅙ":0x116B,"ㅚ":0x116C,"ㅛ":0x116D,"ㅜ":0x116E,"ㅝ":0x116F,
  "ㅞ":0x1170,"ㅟ":0x1171,"ㅠ":0x1172,"ㅡ":0x1173,"ㅢ":0x1174,
  "ㅣ":0x1175,
};

const jongsungMap: Record<string, number> = {
  "":0,"ㄱ":0x11A8,"ㄴ":0x11AB,"ㄷ":0x11AE,"ㄹ":0x11AF,
  "ㅁ":0x11B0+2,"ㅂ":0x11B2+2,"ㅅ":0x11B7+1,"ㅇ":0x11B8+1,"ㅈ":0x11BA,
  "ㅊ":0x11BD,"ㅋ":0x11BE,"ㅌ":0x11BF,"ㅍ":0x11C0,"ㅎ":0x11C1,
};

// Use the syllable composition formula
function composeSyllable(cho: string, jung: string, jong: string): string {
  // Indices for the syllable block formula: 0xAC00 + (cho_idx * 21 + jung_idx) * 28 + jong_idx
  const choIdx = chosung.indexOf(cho);
  const jungIdx = jungsung.indexOf(jung);
  const jongIdx = jongsung.indexOf(jong);

  if (choIdx < 0 || jungIdx < 0 || jongIdx < 0) return "";

  // Map to actual syllable indices
  const choOrder = [0,2,3,5,6,7,9,11,12,14,15,16,17,18]; // ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ
  const jungOrder = [0,2,4,6,8,12,13,17,18,20,1,5,11,16,19,9,10,14,15]; // matching jungsung array
  const jongOrder = [0,1,4,7,8,16,17,19,21,22,23,24,25,26,27]; // matching jongsung array

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
