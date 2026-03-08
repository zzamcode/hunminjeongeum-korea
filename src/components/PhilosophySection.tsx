import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="py-32 px-6 bg-ink relative overflow-hidden scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto relative z-10">
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
            Philosophy
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            애민 정신
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-px bg-vermillion mx-auto origin-center"
          />
        </motion.div>

        {/* Quote with parallax */}
        <motion.blockquote
          style={{ y: quoteY }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-vermillion/30 text-6xl mb-4"
          >
            「
          </motion.div>
          {[
            "나랏말싸미 듕귁에 달아",
            "문자와로 서르 사맛디 아니할쎄",
            "이런 전차로 어린 백성이",
            "니르고져 홀 배 이셔도",
            "마참내 제 뜨들 시러 펴디 못할 노미 하니라",
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
              className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed font-light"
            >
              {line}
            </motion.p>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1, type: "spring" }}
            className="text-vermillion/30 text-6xl mt-4"
          >
            」
          </motion.div>
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-6 text-sm text-primary-foreground/40 tracking-widest"
          >
            — 훈민정음 서문, 세종대왕
          </motion.footer>
        </motion.blockquote>

        {/* Stats with counter-like entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-primary-foreground/10 pt-12"
        >
          {[
            { number: "1443", label: "창제년도" },
            { number: "28", label: "초기 글자 수" },
            { number: "24", label: "현대 글자 수" },
            { number: "11,172", label: "조합 가능 음절" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4 + index * 0.15,
                type: "spring",
                stiffness: 150,
              }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-vermillion/80 mb-2">
                {stat.number}
              </div>
              <div className="text-xs text-primary-foreground/40 tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
