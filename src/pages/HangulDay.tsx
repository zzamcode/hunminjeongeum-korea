import { useState } from "react";
import { motion } from "framer-motion";
import ResponsiveModal from "@/components/ResponsiveModal";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const facts = [
  {
    title: "10월 9일",
    desc: "대한민국의 국경일로 한글의 우수성을 기리는 날입니다.",
    icon: "📅",
    detail: {
      fullDesc: "한글날은 매년 10월 9일로, 세종대왕이 훈민정음을 반포한 것을 기념하는 대한민국의 국경일입니다.",
      history: "1926년 조선어연구회가 '가갸날'로 처음 제정하였고, 1928년 '한글날'로 이름이 변경되었습니다. 1940년 훈민정음 해례본이 발견되면서 반포일이 음력 9월 상한(10일)으로 확인되어 양력 10월 9일로 확정되었습니다. 1991년 공휴일에서 제외되었다가 2013년부터 다시 공휴일로 지정되었습니다.",
      significance: "한글날은 단순한 기념일이 아니라 한글의 우수성과 세종대왕의 애민정신을 되새기는 날입니다. 이 날에는 세종대왕 동상 앞에서 기념식이 열리고, 한글 관련 다양한 문화 행사가 전국에서 개최됩니다.",
    },
  },
  {
    title: "유네스코 세계기록유산",
    desc: "1997년 훈민정음 해례본이 유네스코 세계기록유산에 등재되었습니다.",
    icon: "🏛️",
    detail: {
      fullDesc: "1997년 10월, 훈민정음 해례본(국보 제70호)이 유네스코 세계기록유산에 등재되었습니다.",
      history: "해례본은 1446년에 간행된 것으로, 한글의 창제 원리를 상세히 설명한 세계 유일의 문헌입니다. 1940년 경북 안동에서 발견되어 간송 전형필 선생이 보존하였습니다. 유네스코는 '문자 체계의 설계 원리가 과학적으로 기술된 유일한 사례'라고 높이 평가했습니다.",
      significance: "이 등재로 한글은 단순한 한 나라의 문자를 넘어 인류 전체의 소중한 지적 유산으로 인정받게 되었습니다. 세계의 언어학자들이 한글을 연구 대상으로 삼는 계기가 되었습니다.",
    },
  },
  {
    title: "세종대왕 문해상",
    desc: "유네스코가 1989년부터 문맹 퇴치에 공헌한 개인과 단체에 수여하는 상입니다.",
    icon: "🏆",
    detail: {
      fullDesc: "유네스코 세종대왕 문해상(UNESCO King Sejong Literacy Prize)은 전 세계 문맹 퇴치에 공헌한 개인이나 단체에 수여하는 국제상입니다.",
      history: "1989년 대한민국 정부의 제안으로 제정되었으며, 매년 9월 8일 '세계 문해의 날'에 시상합니다. 한국 정부가 상금을 지원하고 있으며, 매년 2개 기관 또는 개인에게 수여됩니다. 지금까지 아프리카, 아시아, 남미 등 다양한 지역의 문해 교육 기관이 수상했습니다.",
      significance: "이 상의 이름이 세종대왕인 것은, 백성을 위해 배우기 쉬운 문자를 만든 세종의 정신이 세계 문맹 퇴치의 이상과 통하기 때문입니다.",
    },
  },
  {
    title: "세계문자올림픽",
    desc: "2009년 세계문자올림픽에서 한글이 금메달을 수상하였습니다.",
    icon: "🥇",
    detail: {
      fullDesc: "2009년 10월 서울에서 열린 제1회 세계문자올림픽에서 한글이 금메달을 수상했습니다.",
      history: "이 대회에는 16개국의 문자가 참가하였으며, 문자의 기원, 구조, 글자 수, 문자의 결합 능력, 문자의 독립성과 응용성 등을 기준으로 평가되었습니다. 한글은 문자의 독창성, 합리성, 과학적 우수성에서 높은 점수를 받아 1위를 차지했습니다. 2위는 인도의 텔루구 문자, 3위는 영어 알파벳이었습니다.",
      significance: "비록 주최 측의 객관성에 대한 논란이 있었지만, 한글이 세계적으로 주목받는 계기가 되었으며 한글의 과학적 우수성을 다시 한번 확인하는 행사였습니다.",
    },
  },
];

const globalReach = [
  {
    title: "찌아찌아족",
    location: "인도네시아",
    desc: "2009년 자신들의 언어를 표기하기 위해 한글을 공식 문자로 채택했습니다.",
    detail: "인도네시아 술라웨시 남동쪽 부톤섬에 거주하는 찌아찌아족(약 8만 명)은 고유한 언어를 가지고 있었지만 표기 문자가 없었습니다. 2009년 한국의 훈민정음학회와 부톤시 정부의 협력으로 한글이 공식 표기 문자로 채택되었습니다. 한글의 뛰어난 표음 능력 덕분에 찌아찌아어의 복잡한 발음을 정확하게 표기할 수 있었습니다. 현지 초등학교에서 한글 수업이 진행되었으며, 한글 교과서도 제작되었습니다.",
  },
  {
    title: "한국어능력시험(TOPIK)",
    location: "전 세계 87개국",
    desc: "매년 30만 명 이상이 한국어능력시험에 응시하고 있습니다.",
    detail: "TOPIK(Test of Proficiency in Korean)은 1997년부터 시행된 한국어 능력 평가 시험입니다. K-팝, K-드라마 등 한류의 영향으로 응시자 수가 급격히 증가하여, 최근에는 연간 40만 명 이상이 응시하고 있습니다. 한국 유학, 취업, 이민 등을 위해 필수적인 시험이며, 87개국 260여 개 지역에서 시행됩니다. 이는 한글과 한국어에 대한 세계적 관심이 크게 높아졌음을 보여줍니다.",
  },
  {
    title: "세종학당",
    location: "전 세계 82개국",
    desc: "234개의 세종학당에서 한국어와 한글을 가르치고 있습니다.",
    detail: "세종학당은 한국어와 한국 문화를 세계에 보급하기 위해 설립된 교육 기관입니다. 2007년 몽골에 처음 설립된 이후 빠르게 확대되어, 현재 82개국 234개소에서 운영되고 있습니다. 프랑스의 알리앙스 프랑세즈, 독일의 괴테 인스티투트, 중국의 공자학원에 해당하는 한국어 교육 기관입니다. 세종학당에서는 한국어 수업뿐만 아니라 한국 문화 체험, 한글 서예 등 다양한 프로그램을 제공하고 있습니다.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HangulDay = () => {
  const [selectedFact, setSelectedFact] = useState<typeof facts[0] | null>(null);
  const [selectedGlobal, setSelectedGlobal] = useState<typeof globalReach[0] | null>(null);

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
                onClick={() => setSelectedFact(fact)}
                className="bg-card rounded-sm p-8 border border-border cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{fact.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{fact.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{fact.desc}</p>
                <span className="text-xs text-vermillion mt-3 inline-block">자세히 보기 →</span>
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
                onClick={() => setSelectedGlobal(item)}
                className="flex gap-6 items-start cursor-pointer group"
              >
                <div className="w-1 h-full min-h-[4rem] bg-vermillion rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground group-hover:text-vermillion transition-colors">{item.title}</h3>
                  <span className="text-xs text-vermillion tracking-widest">{item.location}</span>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                  <span className="text-xs text-muted-foreground group-hover:text-vermillion mt-2 inline-block transition-colors">자세히 보기 →</span>
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

      <ResponsiveModal
        open={!!selectedFact}
        onOpenChange={(open) => !open && setSelectedFact(null)}
        title={selectedFact?.title || ""}
        description={`${selectedFact?.title} 상세 정보`}
      >
        {selectedFact && (
          <div className="overflow-y-auto p-8 space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedFact.icon}</span>
              <h3 className="text-xl font-bold text-foreground">{selectedFact.title}</h3>
            </div>
            <p className="text-sm text-foreground leading-relaxed">{selectedFact.detail.fullDesc}</p>
            <div>
              <h4 className="text-xs font-bold text-vermillion tracking-widest mb-2">역사</h4>
              <p className="text-sm text-muted-foreground leading-[1.8]">{selectedFact.detail.history}</p>
            </div>
            <div className="bg-muted/50 rounded-sm p-4">
              <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-2">✨ 의의</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedFact.detail.significance}</p>
            </div>
          </div>
        )}
      </ResponsiveModal>

      <ResponsiveModal
        open={!!selectedGlobal}
        onOpenChange={(open) => !open && setSelectedGlobal(null)}
        title={selectedGlobal?.title || ""}
        description={`${selectedGlobal?.title} 상세 정보`}
      >
        {selectedGlobal && (
          <div className="overflow-y-auto p-8 space-y-5">
            <div>
              <h3 className="text-xl font-bold text-foreground">{selectedGlobal.title}</h3>
              <span className="text-xs text-vermillion tracking-widest">{selectedGlobal.location}</span>
            </div>
            <p className="text-sm text-foreground/80 leading-[1.8]">{selectedGlobal.detail}</p>
          </div>
        )}
      </ResponsiveModal>

      <FooterSection />
    </main>
  );
};

export default HangulDay;
