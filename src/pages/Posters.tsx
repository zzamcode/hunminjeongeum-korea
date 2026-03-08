import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const posters = [
  {
    char: "ㄱ",
    name: "기역",
    desc: "혀뿌리가 목구멍을 막는 모양",
    bg: "bg-ink",
    text: "text-primary-foreground",
    accent: "text-vermillion",
  },
  {
    char: "ㄴ",
    name: "니은",
    desc: "혀가 윗잇몸에 닿는 모양",
    bg: "bg-vermillion",
    text: "text-primary-foreground",
    accent: "text-gold",
  },
  {
    char: "ㅁ",
    name: "미음",
    desc: "입의 모양을 본뜬 글자",
    bg: "bg-card",
    text: "text-foreground",
    accent: "text-vermillion",
  },
  {
    char: "ㅅ",
    name: "시옷",
    desc: "이의 모양을 본뜬 글자",
    bg: "bg-ink",
    text: "text-primary-foreground",
    accent: "text-gold",
  },
  {
    char: "ㅇ",
    name: "이응",
    desc: "목구멍의 모양을 본뜬 글자",
    bg: "bg-background",
    text: "text-foreground",
    accent: "text-jade",
    border: true,
  },
  {
    char: "ㅎ",
    name: "히읗",
    desc: "ㅇ에 획을 더한 글자",
    bg: "bg-card",
    text: "text-foreground",
    accent: "text-vermillion",
  },
  {
    char: "ㅏ",
    name: "아",
    desc: "하늘(·)과 사람(ㅣ)의 조화",
    bg: "bg-vermillion",
    text: "text-primary-foreground",
    accent: "text-primary-foreground",
  },
  {
    char: "ㅣ",
    name: "이",
    desc: "사람이 서 있는 모양",
    bg: "bg-ink",
    text: "text-primary-foreground",
    accent: "text-vermillion",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Posters = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              한글 포스터 갤러리
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              한글 자모의 아름다움을 타이포그래피 아트로 표현했습니다
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {posters.map((p) => (
              <motion.div
                key={p.char}
                variants={item}
                className={`${p.bg} ${p.text} rounded-sm aspect-[3/4] flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] ${p.border ? "border border-border" : ""}`}
              >
                <span className="text-[10rem] font-black leading-none opacity-90 group-hover:scale-110 transition-transform duration-500">
                  {p.char}
                </span>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className={`text-sm font-bold ${p.accent}`}>{p.name}</span>
                  <p className="text-xs opacity-70 mt-1">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default Posters;
