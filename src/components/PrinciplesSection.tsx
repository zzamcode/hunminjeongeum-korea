import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const principles = [
  {
    title: "천·지·인",
    subtitle: "天地人",
    description: "하늘(ㆍ), 땅(ㅡ), 사람(ㅣ)의 삼재를 본떠 모음을 만들었습니다. 우주의 근본 원리가 글자 속에 담겨 있습니다.",
    symbol: "ㆍ ㅡ ㅣ",
  },
  {
    title: "상형의 원리",
    subtitle: "象形",
    description: "자음은 발음할 때의 혀, 입술, 목구멍 등 발음 기관의 모양을 본떠 만들었습니다. 소리의 형상이 곧 글자입니다.",
    symbol: "ㄱ ㄴ ㅁ ㅅ ㅇ",
  },
  {
    title: "가획의 원리",
    subtitle: "加劃",
    description: "기본 글자에 획을 더하면 소리가 세집니다. ㄱ→ㅋ, ㄴ→ㄷ→ㅌ. 체계적이고 논리적인 문자 설계입니다.",
    symbol: "ㄱ → ㅋ",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const PrinciplesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="py-32 px-6 bg-ink relative overflow-hidden scroll-mt-16"
    >
      {/* Parallax background character */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-primary-foreground/[0.02] select-none pointer-events-none"
      >
        음
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-sm tracking-[0.3em] text-vermillion/80 uppercase block mb-4"
          >
            Creation Principles
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            창제 원리
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-px bg-vermillion mx-auto mb-6 origin-center"
          />
          <p className="text-primary-foreground/50 max-w-lg mx-auto">
            한글은 단순한 문자가 아닌, 철학과 과학이 결합된 위대한 발명입니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="border border-primary-foreground/10 p-8 h-full hover:border-vermillion/30 transition-colors duration-500 relative overflow-hidden">
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-vermillion/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="text-3xl md:text-4xl font-light text-vermillion/70 mb-6 tracking-widest relative z-10"
                >
                  {principle.symbol}
                </motion.div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-1 relative z-10">
                  {principle.title}
                </h3>
                <span className="text-xs text-primary-foreground/30 tracking-widest block mb-4 relative z-10">
                  {principle.subtitle}
                </span>
                <p className="text-primary-foreground/60 text-sm leading-relaxed relative z-10">
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
