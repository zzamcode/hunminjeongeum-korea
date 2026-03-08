import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const facts = [
  {
    title: "10월 9일",
    desc: "대한민국의 국경일로 한글의 우수성을 기리는 날입니다.",
    icon: "📅",
  },
  {
    title: "유네스코 세계기록유산",
    desc: "1997년 훈민정음 해례본이 유네스코 세계기록유산에 등재되었습니다.",
    icon: "🏛️",
  },
  {
    title: "세종대왕 문해상",
    desc: "유네스코가 1989년부터 문맹 퇴치에 공헌한 개인과 단체에 수여하는 상입니다.",
    icon: "🏆",
  },
  {
    title: "세계문자올림픽",
    desc: "2009년 세계문자올림픽에서 한글이 금메달을 수상하였습니다.",
    icon: "🥇",
  },
];

const globalReach = [
  {
    title: "찌아찌아족",
    location: "인도네시아",
    desc: "2009년 자신들의 언어를 표기하기 위해 한글을 공식 문자로 채택했습니다.",
  },
  {
    title: "한국어능력시험(TOPIK)",
    location: "전 세계 87개국",
    desc: "매년 30만 명 이상이 한국어능력시험에 응시하고 있습니다.",
  },
  {
    title: "세종학당",
    location: "전 세계 82개국",
    desc: "234개의 세종학당에서 한국어와 한글을 가르치고 있습니다.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HangulDay = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 hanji-texture">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-8xl md:text-9xl font-black text-vermillion mb-6">
              한글날
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              10월 9일 · 대한민국 국경일
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              한글날은 세종대왕이 훈민정음을 창제하여 세상에 펴낸 것을 기념하고,
              한글의 우수성을 기리기 위한 국경일입니다. 1926년 '가갸날'로 시작되어
              1928년 '한글날'로 이름이 바뀌었습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground text-center mb-12"
          >
            한글의 세계적 위상
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-sm p-8 border border-border"
              >
                <div className="text-3xl mb-4">{fact.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{fact.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{fact.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground text-center mb-12"
          >
            세계 속의 한글
          </motion.h2>

          <div className="space-y-8">
            {globalReach.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex gap-6 items-start"
              >
                <div className="w-1 h-full min-h-[4rem] bg-vermillion rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <span className="text-xs text-vermillion tracking-widest">{item.location}</span>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-20 px-6 hanji-texture">
        <div className="max-w-3xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-light text-foreground leading-relaxed italic"
          >
            "한글은 세계에서 가장 훌륭한 알파벳이며,
            <br className="hidden md:block" />
            가장 과학적인 표기 체계이다."
          </motion.blockquote>
          <p className="text-sm text-muted-foreground mt-6">
            — 제프리 샘슨, 영국 언어학자
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default HangulDay;
