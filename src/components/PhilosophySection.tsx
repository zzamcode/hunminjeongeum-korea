import { motion } from "framer-motion";

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="py-32 px-6 bg-ink relative overflow-hidden scroll-mt-16">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm tracking-[0.3em] text-vermillion/80 uppercase block mb-4">
            Philosophy
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            애민 정신
          </h2>
          <p className="text-primary-foreground/50 max-w-lg mx-auto">
            백성을 사랑하는 마음이 세계에서 가장 과학적인 문자를 탄생시켰습니다
          </p>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          <div className="text-vermillion/30 text-6xl mb-4">「</div>
          <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed font-light mb-4">
            나랏말싸미 듕귁에 달아<br />
            문자와로 서르 사맛디 아니할쎄<br />
            이런 전차로 어린 백성이<br />
            니르고져 홀 배 이셔도<br />
            마참내 제 뜨들 시러 펴디 못할 노미 하니라
          </p>
          <div className="text-vermillion/30 text-6xl">」</div>
          <footer className="mt-6 text-sm text-primary-foreground/40 tracking-widest">
            — 훈민정음 서문, 세종대왕
          </footer>
        </motion.blockquote>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-primary-foreground/10 pt-12"
        >
          {[
            { number: "1443", label: "창제년도" },
            { number: "28", label: "초기 글자 수" },
            { number: "24", label: "현대 글자 수" },
            { number: "11,172", label: "조합 가능 음절" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-vermillion/80 mb-2">
                {stat.number}
              </div>
              <div className="text-xs text-primary-foreground/40 tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
