import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const events = [
  {
    year: "1443",
    title: "훈민정음 창제",
    desc: "세종대왕이 새로운 문자 체계를 창제하였다. 백성들이 글을 쉽게 배울 수 있도록 과학적 원리에 기반하여 만들었다.",
    accent: "vermillion",
  },
  {
    year: "1446",
    title: "훈민정음 반포",
    desc: "해례본과 함께 공식적으로 반포되었다. 해례본에는 창제 원리와 사용법이 상세히 기술되어 있다.",
    accent: "gold",
  },
  {
    year: "1504",
    title: "한글 사용 탄압",
    desc: "연산군이 한글로 쓴 벽서 사건 이후 한글 교육과 사용을 금지하였다.",
    accent: "vermillion",
  },
  {
    year: "1894",
    title: "공문식 반포",
    desc: "갑오개혁으로 한글이 공식 국문으로 채택되어 법률과 칙령에 사용되기 시작했다.",
    accent: "jade",
  },
  {
    year: "1910",
    title: "주시경의 한글 연구",
    desc: "주시경 선생이 한글의 문법 체계를 정리하고 '한글'이라는 이름을 처음 사용하였다.",
    accent: "gold",
  },
  {
    year: "1926",
    title: "가갸날 제정",
    desc: "조선어학회가 음력 9월 29일을 '가갸날'로 정하여 한글을 기념하기 시작했다.",
    accent: "vermillion",
  },
  {
    year: "1940",
    title: "훈민정음 해례본 발견",
    desc: "경북 안동에서 훈민정음 해례본 원본이 발견되어 창제 원리를 명확히 알 수 있게 되었다.",
    accent: "gold",
  },
  {
    year: "1945",
    title: "광복과 한글 부활",
    desc: "일제 강점기 탄압에서 벗어나 한글이 공식 문자로 다시 자리 잡았다.",
    accent: "jade",
  },
  {
    year: "1997",
    title: "유네스코 세계기록유산 등재",
    desc: "훈민정음 해례본이 유네스코 세계기록유산으로 등재되어 세계적으로 그 가치를 인정받았다.",
    accent: "vermillion",
  },
  {
    year: "2009",
    title: "찌아찌아족 한글 채택",
    desc: "인도네시아 찌아찌아족이 자신들의 언어 표기 문자로 한글을 채택하였다.",
    accent: "gold",
  },
];

const History = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              한글의 역사
            </h1>
            <p className="text-muted-foreground">
              1443년 창제부터 세계 속의 한글이 되기까지
            </p>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              const accentColor =
                event.accent === "vermillion"
                  ? "text-vermillion border-vermillion"
                  : event.accent === "gold"
                  ? "text-gold border-gold"
                  : "text-jade border-jade";

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative mb-16 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  } pl-14 md:pl-0`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute w-3 h-3 rounded-full border-2 ${accentColor} bg-background top-1 left-[1.19rem] md:left-auto ${
                      isLeft ? "md:-right-[1.65rem]" : "md:-left-[1.65rem]"
                    }`}
                  />

                  <span className={`text-sm font-bold ${accentColor.split(" ")[0]} tracking-widest`}>
                    {event.year}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-1 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {event.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default History;
