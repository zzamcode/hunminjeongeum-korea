import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const events = [
  {
    year: "1443",
    title: "훈민정음 창제",
    desc: "세종대왕이 새로운 문자 체계를 창제하였다.",
    accent: "vermillion",
    detail: "세종대왕은 백성들이 한문을 몰라 자신의 뜻을 글로 표현하지 못하는 것을 안타깝게 여겨, 집현전 학자들과 함께 새로운 문자를 연구하였습니다. 훈민정음은 발음 기관의 모양을 본떠 자음을 만들고, 천지인(天地人)의 원리로 모음을 만든, 세계에서 유일하게 창제 원리가 밝혀진 문자입니다. 당시 중국, 일본 등 주변국에서는 이미 자국의 문자를 가지고 있었으나, 과학적 원리에 기반한 문자를 체계적으로 만든 것은 한글이 유일합니다.",
  },
  {
    year: "1446",
    title: "훈민정음 반포",
    desc: "해례본과 함께 공식적으로 반포되었다.",
    accent: "gold",
    detail: "음력 9월 상한(上澣)에 훈민정음이 공식 반포되었습니다. 함께 발간된 '훈민정음 해례본'에는 정인지, 신숙주, 성삼문 등 집현전 학자 8인이 각 글자의 제자(制字) 원리, 초성·중성·종성의 운용법, 용자례(用字例) 등을 상세하게 풀이해 놓았습니다. 이 해례본은 문자 창제의 원리를 밝힌 세계 유일의 문헌으로, 1997년 유네스코 세계기록유산에 등재되었습니다.",
  },
  {
    year: "1504",
    title: "한글 사용 탄압",
    desc: "연산군이 한글 교육과 사용을 금지하였다.",
    accent: "vermillion",
    detail: "연산군 10년, 백성들이 한글로 벽서(壁書)를 작성하여 왕을 비방하는 사건이 발생했습니다. 이에 분노한 연산군은 한글 서적을 불태우고, 한글을 가르치거나 배우는 것을 엄격히 금지하는 명을 내렸습니다. 그러나 한글은 궁중 여성들과 일반 백성들 사이에서 계속 사용되며 명맥을 이어갔습니다. 이 시기 한글은 '언문(諺文)'이라 불리며 공식 문서에는 사용되지 못했지만, 민간에서는 편지와 소설 등에 널리 쓰였습니다.",
  },
  {
    year: "1894",
    title: "공문식 반포",
    desc: "갑오개혁으로 한글이 공식 국문으로 채택되었다.",
    accent: "jade",
    detail: "갑오개혁의 일환으로 고종이 칙령 제1호 '공문식(公文式)'을 반포하여, 법률과 칙령을 한글(국문)로 작성하도록 명하였습니다. 이로써 약 450년 만에 한글이 공식적인 국가 문자의 지위를 되찾았습니다. 이후 한글과 한문을 혼용하는 '국한문혼용체'가 신문과 관보에 사용되기 시작했으며, 독립신문(1896)은 최초의 한글 전용 신문으로 발행되었습니다.",
  },
  {
    year: "1910",
    title: "주시경의 한글 연구",
    desc: "주시경 선생이 '한글'이라는 이름을 처음 사용하였다.",
    accent: "gold",
    detail: "국어학자 주시경(1876~1914) 선생은 한글의 문법 체계를 과학적으로 정리한 선구자입니다. 그는 '국어문법'을 저술하고, 기존에 '언문', '반절' 등으로 불리던 문자에 '한글'이라는 이름을 붙였습니다. '한'은 '크다'와 '하나'를 동시에 의미합니다. 주시경은 또한 조선어강습원을 설립하여 한글 보급에 힘썼고, 그의 제자들(최현배, 김두봉 등)이 이후 한글 연구와 보존의 중추적 역할을 담당했습니다.",
  },
  {
    year: "1926",
    title: "가갸날 제정",
    desc: "조선어학회가 한글을 기념하기 시작했다.",
    accent: "vermillion",
    detail: "조선어연구회(후에 조선어학회)가 훈민정음 반포 480주년을 맞아 음력 9월 29일을 '가갸날'로 정하고 기념식을 거행했습니다. 이 날은 1928년 '한글날'로 이름이 바뀌었고, 1940년 훈민정음 해례본이 발견된 후 양력 10월 9일로 확정되었습니다. 일제강점기에 한글날 기념은 민족정신을 일깨우는 중요한 행사였으며, 이로 인해 조선어학회 회원들이 투옥되는 '조선어학회 사건'(1942)이 일어나기도 했습니다.",
  },
  {
    year: "1940",
    title: "훈민정음 해례본 발견",
    desc: "경북 안동에서 해례본 원본이 발견되었다.",
    accent: "gold",
    detail: "1940년 경북 안동의 한 고택에서 간송 전형필 선생이 훈민정음 해례본 원본을 발견하였습니다. 이 책은 1446년 간행된 원본으로, 한글의 창제 원리와 사용법이 상세히 기술되어 있습니다. 간송 전형필은 당시 거금을 들여 이 책을 구입하고 보존했습니다. 해례본의 발견으로 그동안 베일에 싸여 있던 한글의 과학적 창제 원리가 세상에 알려지게 되었으며, 이는 한글이 세계적으로 높이 평가받는 결정적 계기가 되었습니다. 현재 국보 제70호로 지정되어 있습니다.",
  },
  {
    year: "1945",
    title: "광복과 한글 부활",
    desc: "일제 강점기 탄압에서 벗어나 한글이 부활했다.",
    accent: "jade",
    detail: "일제강점기 동안 일본은 조선어 사용을 금지하고 일본어를 강제하는 정책을 시행했습니다. 학교에서 한국어를 사용하면 처벌받았고, 창씨개명을 통해 이름까지 일본식으로 바꾸도록 강요했습니다. 1945년 광복 이후, 한글은 다시 공식 문자로 자리 잡았습니다. 미군정 시기 한글 전용 정책이 추진되었고, 조선어학회(현 한글학회)를 중심으로 한글 맞춤법 통일안 보급, 한글 교과서 제작 등이 활발히 이루어졌습니다.",
  },
  {
    year: "1997",
    title: "유네스코 세계기록유산 등재",
    desc: "훈민정음 해례본이 세계기록유산으로 등재되었다.",
    accent: "vermillion",
    detail: "1997년 10월, 훈민정음 해례본이 유네스코 세계기록유산(Memory of the World)에 등재되었습니다. 유네스코는 한글에 대해 '세계 문자 역사에서 독보적인 위치를 차지하며, 문자 체계의 과학적 설계라는 측면에서 비견할 대상이 없다'고 평가했습니다. 이와 별도로 유네스코는 1989년부터 매년 '세종대왕 문해상(King Sejong Literacy Prize)'을 수여하여, 세계 문맹 퇴치에 공헌한 개인이나 단체를 시상하고 있습니다.",
  },
  {
    year: "2009",
    title: "찌아찌아족 한글 채택",
    desc: "인도네시아 찌아찌아족이 한글을 채택하였다.",
    accent: "gold",
    detail: "인도네시아 부톤섬의 소수민족 찌아찌아족(약 8만 명)이 자신들의 언어를 표기하기 위해 한글을 공식 문자로 채택했습니다. 찌아찌아어는 그동안 표기 문자가 없어 구전으로만 전해져 왔는데, 한글의 우수한 표음 능력이 인정받아 채택된 것입니다. 한국의 훈민정음학회와 부톤시 정부가 협력하여 한글 교과서를 만들고 교육을 시작했습니다. 이는 한글이 한국어 이외의 언어를 표기하는 데 사용된 최초의 사례로 큰 주목을 받았습니다.",
  },
];

const History = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

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
              1443년 창제부터 세계 속의 한글이 되기까지. 각 사건을 클릭하면 자세한 이야기를 읽을 수 있습니다.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              const isExpanded = expandedIndex === i;
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
                  <div
                    className={`absolute w-3 h-3 rounded-full border-2 ${accentColor} bg-background top-1 left-[1.19rem] md:left-auto ${
                      isLeft ? "md:-right-[1.65rem]" : "md:-left-[1.65rem]"
                    }`}
                  />

                  <button
                    onClick={() => toggle(i)}
                    className="w-full text-left group"
                  >
                    <span className={`text-sm font-bold ${accentColor.split(" ")[0]} tracking-widest`}>
                      {event.year}
                    </span>
                    <div className="flex items-center justify-between mt-1 mb-2">
                      <h3 className="text-lg font-bold text-foreground">
                        {event.title}
                      </h3>
                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground transition-transform flex-shrink-0 ml-2 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {event.desc}
                    </p>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-foreground/80 leading-[1.8]">
                            {event.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
