import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const quotes = [
  {
    text: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄",
    author: "세종대왕",
    source: "훈민정음 어제서문",
    accent: "vermillion",
  },
  {
    text: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라",
    author: "주시경",
    source: "국어문법, 1910",
    accent: "gold",
  },
  {
    text: "한글은 세계에서 가장 합리적인 문자이며, 그 어떤 문자보다 뛰어나다",
    author: "제프리 샘슨",
    source: "영국 서섹스대학 언어학 교수",
    accent: "jade",
  },
  {
    text: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다",
    author: "존 맨",
    source: "Alpha Beta, 2000",
    accent: "vermillion",
  },
  {
    text: "세종대왕은 한국의 레오나르도 다빈치다. 한글은 전 세계에서 가장 합리적인 문자다",
    author: "재레드 다이아몬드",
    source: "UCLA 지리학 교수",
    accent: "gold",
  },
  {
    text: "훈민정음 28자로 전환할 수 없는 소리가 없고, 바람 소리, 학의 울음, 닭의 홰치는 소리, 개 짖는 소리까지 모두 적을 수 있다",
    author: "정인지",
    source: "훈민정음 해례본 서문, 1446",
    accent: "jade",
  },
  {
    text: "가나다라마바사, 한글은 그 자체로 하나의 예술이자 과학이다",
    author: "에드윈 라이샤워",
    source: "하버드대학 동아시아학 교수",
    accent: "vermillion",
  },
  {
    text: "슬기로운 사람은 아침나절이 되기 전에 이를 깨우치고, 어리석은 사람도 열흘이면 배울 수 있다",
    author: "세종대왕",
    source: "훈민정음 어제서문",
    accent: "gold",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Quotes = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              명언 컬렉션
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              한글의 가치를 담은 아름다운 말들
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="columns-1 md:columns-2 gap-6 space-y-6"
          >
            {quotes.map((q, i) => {
              const borderColor =
                q.accent === "vermillion"
                  ? "border-l-vermillion"
                  : q.accent === "gold"
                  ? "border-l-gold"
                  : "border-l-jade";
              const textColor =
                q.accent === "vermillion"
                  ? "text-vermillion"
                  : q.accent === "gold"
                  ? "text-gold"
                  : "text-jade";

              return (
                <motion.blockquote
                  key={i}
                  variants={item}
                  className={`break-inside-avoid bg-card border border-border border-l-4 ${borderColor} rounded-sm p-8`}
                >
                  <p className="text-foreground leading-relaxed text-base md:text-lg font-light italic mb-6">
                    "{q.text}"
                  </p>
                  <footer>
                    <cite className={`text-sm font-bold ${textColor} not-italic`}>
                      {q.author}
                    </cite>
                    <p className="text-xs text-muted-foreground mt-1">{q.source}</p>
                  </footer>
                </motion.blockquote>
              );
            })}
          </motion.div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default Quotes;
