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
    detail: "1443년 음력 12월, 세종대왕은 세상에 없던 새로운 문자를 만들어냈습니다. 이 문자가 바로 훈민정음, 오늘날의 한글입니다.\n\n당시 조선의 공식 문자는 한문이었습니다. 그러나 한문은 수천 개의 글자를 외워야 하는 어려운 문자였기에, 양반이 아닌 일반 백성은 평생을 살아도 자기 이름조차 쓰지 못하는 경우가 허다했습니다. 억울한 일을 당해도 관청에 글로 호소할 수 없었고, 약의 용법을 읽지 못해 목숨을 잃는 사람도 있었습니다.\n\n세종은 이런 백성들의 처지를 깊이 안타깝게 여겼습니다. 그는 발음 기관(혀, 입술, 이, 목구멍)의 모양을 본떠 자음을 만들고, 하늘(ㆍ)·땅(ㅡ)·사람(ㅣ)의 원리로 모음을 설계했습니다. 세계 문자사에서 창제 원리가 명확히 밝혀진 문자는 한글이 유일합니다.\n\n최만리를 비롯한 일부 신하들은 '오랑캐의 짓'이라며 격렬히 반대했지만, 세종은 '내 백성을 위한 일'이라며 뜻을 꺾지 않았습니다.",
  },
  {
    year: "1446",
    title: "훈민정음 반포",
    desc: "해례본과 함께 공식적으로 반포되었다.",
    accent: "gold",
    detail: "1446년 음력 9월 상한, 세종은 훈민정음을 공식적으로 세상에 알렸습니다. 이때 함께 발간된 것이 바로 '훈민정음 해례본'입니다.\n\n해례본은 정인지, 신숙주, 성삼문, 박팽년 등 집현전 학자 8인이 참여하여 만든 해설서입니다. 각 글자가 왜 그런 모양인지(제자해), 초성·중성·종성을 어떻게 조합하는지(합자해), 실제 사용 예시(용자례)까지 상세하게 풀이해 놓았습니다.\n\n이것은 세계 문자사에서 전무후무한 일입니다. 알파벳이 왜 'A' 모양인지, 한자의 '一'이 왜 가로선인지 아무도 모르지만, 한글은 각 글자의 설계 원리가 완벽하게 기록되어 있습니다. 이 해례본은 1997년 유네스코 세계기록유산에 등재되었습니다.",
  },
  {
    year: "1504",
    title: "한글 사용 탄압",
    desc: "연산군이 한글 교육과 사용을 금지하였다.",
    accent: "vermillion",
    detail: "연산군 10년, 사건이 터졌습니다. 백성들이 한글로 벽보를 써서 폭군 연산군을 비방한 것입니다. 한글이 탄생한 지 불과 60년 만에, 한글은 그 위력을 증명한 셈이었습니다.\n\n분노한 연산군은 한글 서적을 모조리 불태우고, 한글을 가르치거나 배우는 것 자체를 엄금했습니다. 한글을 사용하다 적발되면 처벌을 받았습니다.\n\n그러나 한글은 사라지지 않았습니다. 궁중의 여성들은 한글로 편지를 주고받았고, 민간에서는 소설과 가사를 한글로 기록했습니다. 조선 후기 《홍길동전》, 《춘향전》 같은 한글 소설이 폭발적 인기를 끌며 한글은 되레 백성들의 문자로 더욱 깊이 뿌리내렸습니다.",
  },
  {
    year: "1894",
    title: "공문식 반포",
    desc: "갑오개혁으로 한글이 공식 국문으로 채택되었다.",
    accent: "jade",
    detail: "448년 만의 명예 회복이었습니다. 1894년 갑오개혁 때 고종은 칙령 제1호 '공문식'을 반포하여, 모든 법률과 칙령을 한글(국문)로 작성하도록 명했습니다.\n\n이로써 한글은 마침내 나라의 공식 문자 자리를 되찾았습니다. 1896년에는 서재필이 《독립신문》을 한글 전용으로 발행하며, 일반 백성도 신문을 읽을 수 있는 시대를 열었습니다.\n\n세종이 백성을 위해 만든 문자가, 450년의 천대를 딛고 마침내 제자리를 찾은 역사적 순간이었습니다.",
  },
  {
    year: "1910",
    title: "주시경의 한글 연구",
    desc: "주시경 선생이 '한글'이라는 이름을 처음 사용하였다.",
    accent: "gold",
    detail: "국어학자 주시경(1876~1914)은 한글 근대화의 아버지입니다. 그는 '언문'이니 '반절'이니 낮잡아 불리던 우리 문자에 '한글'이라는 당당한 이름을 붙였습니다. '한'은 '크다'와 '하나'를 동시에 뜻하니, '크고 하나뿐인 글'이라는 의미입니다.\n\n주시경은 《국어문법》을 저술하여 한글의 문법 체계를 과학적으로 정리했고, 조선어강습원을 설립하여 한글을 체계적으로 가르쳤습니다.\n\n안타깝게도 38세에 과로로 세상을 떠났지만, 그의 제자들—최현배, 김두봉, 이극로—이 일제강점기 내내 한글을 지켜냈습니다. 주시경이 없었다면, 한글은 일제의 탄압 속에서 사라졌을지도 모릅니다.",
  },
  {
    year: "1926",
    title: "가갸날 제정",
    desc: "조선어학회가 한글을 기념하기 시작했다.",
    accent: "vermillion",
    detail: "1926년, 조선어연구회는 훈민정음 반포 480주년을 맞아 음력 9월 29일을 '가갸날'로 정하고 최초의 기념식을 열었습니다. 일제의 감시 속에서도 한글을 기념한 것은 곧 민족의 얼을 지키겠다는 선언이었습니다.\n\n1928년에 '한글날'로 이름이 바뀌었고, 1940년 훈민정음 해례본이 발견된 뒤 양력 10월 9일로 확정되었습니다.\n\n일제는 이를 위험시했습니다. 1942년 '조선어학회 사건'을 조작하여 이극로, 최현배 등 한글학자 33명을 검거했고, 이윤재와 한징은 옥중에서 순국했습니다. 한글을 지키는 것은 곧 목숨을 거는 일이었습니다.",
  },
  {
    year: "1940",
    title: "훈민정음 해례본 발견",
    desc: "경북 안동에서 해례본 원본이 발견되었다.",
    accent: "gold",
    detail: "1940년, 경북 안동의 한 고택에서 기적 같은 일이 일어났습니다. 약 500년간 자취를 감추었던 훈민정음 해례본 원본이 세상에 다시 나타난 것입니다.\n\n간송 전형필 선생이 이 소식을 듣고 달려갔습니다. 당시 서울 기와집 한 채 값에 해당하는 거금 1만 1,000원을 주고 이 책을 구입했습니다. 전형필은 일제의 문화재 약탈을 막기 위해 평생 사재를 털어 우리 문화재를 수집한 인물입니다.\n\n해례본의 발견은 한글 역사의 분수령이었습니다. 그동안 베일에 싸여 있던 한글의 과학적 창제 원리가 세상에 알려지게 되었고, 한글이 세계적으로 높이 평가받는 결정적 계기가 되었습니다. 현재 국보 제70호이자 유네스코 세계기록유산입니다.",
  },
  {
    year: "1945",
    title: "광복과 한글 부활",
    desc: "일제 강점기 탄압에서 벗어나 한글이 부활했다.",
    accent: "jade",
    detail: "35년간의 어둠이 끝났습니다. 일제강점기 동안 일본은 우리말과 글을 말살하려 했습니다. 학교에서 한국어를 쓰면 '국어(일본어) 상용' 규칙 위반으로 벌을 받았고, 창씨개명으로 이름까지 빼앗으려 했습니다.\n\n그러나 한글은 살아남았습니다. 조선어학회 학자들이 목숨을 걸고 《조선말 큰사전》을 편찬했고, 이 원고는 해방 직후 경성역(현 서울역) 창고에서 기적적으로 발견되었습니다.\n\n광복 후 한글은 다시 나라의 공식 문자가 되었습니다. 한글학회를 중심으로 맞춤법 통일안이 보급되고, 한글 교과서가 만들어졌습니다. 백성을 위해 태어난 문자가, 수많은 이들의 희생 위에서 다시 부활한 것입니다.",
  },
  {
    year: "1997",
    title: "유네스코 세계기록유산 등재",
    desc: "훈민정음 해례본이 세계기록유산으로 등재되었다.",
    accent: "vermillion",
    detail: "1997년 10월, 훈민정음 해례본이 유네스코 세계기록유산에 등재되었습니다. 유네스코의 평가는 명확했습니다. '문자 체계의 과학적 설계 원리가 기록된 유일한 사례이며, 세계 문자 역사에서 독보적인 위치를 차지한다.'\n\n이 등재는 한글이 한 나라의 문자를 넘어 인류 공동의 지적 유산으로 인정받은 순간이었습니다. 같은 해부터 유네스코는 세종대왕의 이름을 딴 '세종대왕 문해상'을 수여하여, 세계 문맹 퇴치에 공헌한 개인과 단체를 시상하고 있습니다.\n\n세종이 백성을 위해 만든 문자의 정신이, 580년 뒤 전 세계 문맹 퇴치의 상징이 된 것입니다.",
  },
  {
    year: "2009",
    title: "찌아찌아족 한글 채택",
    desc: "인도네시아 찌아찌아족이 한글을 채택하였다.",
    accent: "gold",
    detail: "2009년, 지구 반대편에서 놀라운 일이 벌어졌습니다. 인도네시아 부톤섬의 소수민족 찌아찌아족이 자신들의 언어를 적기 위해 한글을 공식 문자로 채택한 것입니다.\n\n찌아찌아어는 약 8만 명이 사용하는 언어지만 고유 문자가 없어 구전으로만 전해져 왔습니다. 로마 알파벳으로는 찌아찌아어의 복잡한 발음을 정확히 표기할 수 없었는데, 한글은 이를 완벽하게 해냈습니다.\n\n이는 한글이 한국어만을 위한 문자가 아니라, 세계 어떤 언어의 소리든 표기할 수 있는 보편적 문자임을 증명한 역사적 사건입니다. 세종대왕이 '천하의 모든 소리를 적을 수 있다'고 한 자부심이 580년 만에 현실이 된 것입니다.",
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
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              1443년 세종대왕의 창제부터 세계 속의 문자가 되기까지. 탄압과 부활, 희생과 영광의 580년. 각 사건을 클릭하면 그 뒤에 숨은 이야기를 읽을 수 있습니다.
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
                          {event.detail.split("\n\n").map((paragraph, pi) => (
                            <p key={pi} className="text-sm text-foreground/80 leading-[1.85] mb-3 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
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
