import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { Volume2 } from "lucide-react";

// Letter data stays in Korean — these are Hangul linguistic artifacts
const consonants = [
  { letter: "ㄱ", name: "기역", origin: "혀뿌리가 목구멍을 막는 모양" },
  { letter: "ㄴ", name: "니은", origin: "혀끝이 윗잇몸에 닿는 모양" },
  { letter: "ㄷ", name: "디귿", origin: "ㄴ에 획을 더함" },
  { letter: "ㄹ", name: "리을", origin: "혀끝이 말리는 모양" },
  { letter: "ㅁ", name: "미음", origin: "입의 모양" },
  { letter: "ㅂ", name: "비읍", origin: "ㅁ에 획을 더함" },
  { letter: "ㅅ", name: "시옷", origin: "이의 모양" },
  { letter: "ㅇ", name: "이응", origin: "목구멍의 모양" },
  { letter: "ㅈ", name: "지읒", origin: "ㅅ에 획을 더함" },
  { letter: "ㅊ", name: "치읓", origin: "ㅈ에 획을 더함" },
  { letter: "ㅋ", name: "키읔", origin: "ㄱ에 획을 더함" },
  { letter: "ㅌ", name: "티읕", origin: "ㄷ에 획을 더함" },
  { letter: "ㅍ", name: "피읖", origin: "ㅂ에 획을 더함" },
  { letter: "ㅎ", name: "히읗", origin: "ㅇ에 획을 더함" },
];

const vowels = [
  { letter: "ㅏ", name: "아", origin: "하늘(ㆍ)과 사람(ㅣ)" },
  { letter: "ㅑ", name: "야", origin: "ㅏ에서 하늘 하나 더" },
  { letter: "ㅓ", name: "어", origin: "사람(ㅣ)과 하늘(ㆍ)" },
  { letter: "ㅕ", name: "여", origin: "ㅓ에서 하늘 하나 더" },
  { letter: "ㅗ", name: "오", origin: "땅(ㅡ)과 하늘(ㆍ)" },
  { letter: "ㅛ", name: "요", origin: "ㅗ에서 하늘 하나 더" },
  { letter: "ㅜ", name: "우", origin: "하늘(ㆍ)과 땅(ㅡ)" },
  { letter: "ㅠ", name: "유", origin: "ㅜ에서 하늘 하나 더" },
  { letter: "ㅡ", name: "으", origin: "땅의 모양" },
  { letter: "ㅣ", name: "이", origin: "사람이 서있는 모양" },
];

const LettersShowcase = () => {
  const { t } = useI18n();
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"consonants" | "vowels">("consonants");
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);

  const letters = activeTab === "consonants" ? consonants : vowels;

  const speakLetter = useCallback((name: string, letter: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(name);
    utterance.lang = "ko-KR";
    utterance.rate = 0.8;
    setPlayingLetter(letter);
    utterance.onend = () => setPlayingLetter(null);
    utterance.onerror = () => setPlayingLetter(null);
    window.speechSynthesis.speak(utterance);
  }, []);


  return (
    <section id="letters" className="py-32 px-6 hanji-texture scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase block mb-4">
            {t("letters.label")}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-ink mb-4">
            {t("letters.title")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-10">
            {t("letters.desc")}
          </p>

          <div className="inline-flex border border-border">
            <button
              onClick={() => setActiveTab("consonants")}
              className={`px-6 py-3 text-sm tracking-wider transition-colors ${
                activeTab === "consonants"
                  ? "bg-ink text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("letters.consonants")}
            </button>
            <button
              onClick={() => setActiveTab("vowels")}
              className={`px-6 py-3 text-sm tracking-wider transition-colors ${
                activeTab === "vowels"
                  ? "bg-ink text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("letters.vowels")}
            </button>
          </div>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-5 md:grid-cols-7 gap-3"
        >
          {letters.map((item, index) => (
            <motion.div
              key={item.letter}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              onMouseEnter={() => setHoveredLetter(item.letter)}
              onMouseLeave={() => setHoveredLetter(null)}
              onClick={() => speakLetter(item.name, item.letter)}
              className="relative aspect-square flex items-center justify-center border border-border hover:border-vermillion/40 transition-all duration-300 cursor-pointer group"
            >
              <span className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${
                playingLetter === item.letter ? "text-vermillion" : "text-ink group-hover:text-vermillion"
              }`}>
                {item.letter}
              </span>

              {playingLetter === item.letter && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-1 right-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-vermillion animate-pulse" />
                </motion.div>
              )}

              {hoveredLetter === item.letter && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-ink text-primary-foreground px-4 py-2 text-xs whitespace-nowrap z-20"
                >
                  <span className="font-bold">{item.name}</span>
                  <span className="text-primary-foreground/60 ml-2">{item.origin}</span>
                  <span className="text-vermillion/80 ml-2">🔊</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-24 text-center"
        >
          <div className="text-[20vw] md:text-[15vw] font-black text-ink/[0.06] leading-none select-none">
            가나다라
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LettersShowcase;
