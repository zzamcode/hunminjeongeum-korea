import { motion } from "framer-motion";

const FooterSection = () => {
  return (
    <footer className="py-16 px-6 border-t border-border hanji-texture overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl font-black text-ink/20 mb-6"
        >
          훈민정음
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-muted-foreground mb-2"
        >
          한글의 아름다움을 알리기 위해 만들어진 웹사이트입니다
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xs text-muted-foreground/60"
        >
          유네스코 세계기록유산 · 1997년 등재
        </motion.p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;
