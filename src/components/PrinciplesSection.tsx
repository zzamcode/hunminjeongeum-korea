import { motion } from "framer-motion";

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

const PrinciplesSection = () => {
  return (
    <section className="py-32 px-6 bg-ink relative overflow-hidden">
      {/* Background decorative character */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-primary-foreground/[0.02] select-none pointer-events-none">
        음
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] text-vermillion/80 uppercase block mb-4">
            Creation Principles
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            창제 원리
          </h2>
          <p className="text-primary-foreground/50 max-w-lg mx-auto">
            한글은 단순한 문자가 아닌, 철학과 과학이 결합된 위대한 발명입니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="border border-primary-foreground/10 p-8 h-full hover:border-vermillion/30 transition-colors duration-500">
                <div className="text-3xl md:text-4xl font-light text-vermillion/70 mb-6 tracking-widest">
                  {principle.symbol}
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                  {principle.title}
                </h3>
                <span className="text-xs text-primary-foreground/30 tracking-widest block mb-4">
                  {principle.subtitle}
                </span>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">
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
