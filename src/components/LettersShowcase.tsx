import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

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

const letterVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.04,
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
    },
  }),
};

const LettersShowcase = () => {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"consonants" | "vowels">("consonants");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgTextX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const letters = activeTab === "consonants" ? consonants : vowels;

  return (
    <section ref={sectionRef} id="letters" className="py-32 px-6 hanji-texture scroll-mt-16 overflow-hidden">
      <div className="max-w-5xl mx-auto">
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
            Letters
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-ink mb-4">
            자모음
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-px bg-vermillion mx-auto mb-6 origin-center"
          />
          <p className="text-muted-foreground max-w-lg mx-auto mb-10">
            각 글자에는 소리의 원리가 담겨 있습니다
          </p>

          {/* Tab toggle */}
          <div className="inline-flex border border-border overflow-hidden">
            <motion.button
              onClick={() => setActiveTab("consonants")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 text-sm tracking-wider transition-colors ${
                activeTab === "consonants"
                  ? "bg-ink text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              자음 · 14
            </motion.button>
            <motion.button
              onClick={() => setActiveTab("vowels")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-3 text-sm tracking-wider transition-colors ${
                activeTab === "vowels"
                  ? "bg-ink text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              모음 · 10
            </motion.button>
          </div>
        </motion.div>

        {/* Letters grid */}
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-5 md:grid-cols-7 gap-3"
        >
          {letters.map((item, index) => (
            <motion.div
              key={item.letter}
              custom={index}
              variants={letterVariants}
              onMouseEnter={() => setHoveredLetter(item.letter)}
              onMouseLeave={() => setHoveredLetter(null)}
              whileHover={{
                scale: 1.1,
                y: -4,
                boxShadow: "0 8px 25px -5px hsl(var(--vermillion) / 0.15)",
              }}
              className="relative aspect-square flex items-center justify-center border border-border hover:border-vermillion/40 transition-colors duration-300 cursor-default group"
            >
              <span className="text-3xl md:text-4xl font-bold text-ink group-hover:text-vermillion transition-colors duration-300">
                {item.letter}
              </span>

              {/* Hover tooltip */}
              {hoveredLetter === item.letter && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-ink text-primary-foreground px-4 py-2 text-xs whitespace-nowrap z-20"
                >
                  <span className="font-bold">{item.name}</span>
                  <span className="text-primary-foreground/60 ml-2">{item.origin}</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Featured large letter with parallax */}
        <motion.div
          style={{ x: bgTextX }}
          className="mt-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[20vw] md:text-[15vw] font-black text-ink/[0.06] leading-none select-none"
          >
            가나다라
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LettersShowcase;
