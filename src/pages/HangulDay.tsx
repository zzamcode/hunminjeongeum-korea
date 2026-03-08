import { useState } from "react";
import { motion } from "framer-motion";
import ResponsiveModal from "@/components/ResponsiveModal";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const facts = [
  {
    title: "10월 9일, 한글날",
    desc: "문자에 국경일을 바친 나라는 대한민국이 유일합니다.",
    icon: "📅",
    detail: {
      fullDesc: "전 세계 수천 개의 문자 중, 자신의 탄생일에 국경일을 가진 문자는 한글이 유일합니다. 한글날은 단순한 기념일이 아니라, 한 왕이 백성을 위해 문자를 만든 사랑의 역사를 기리는 날입니다.",
      history: "1926년 조선어연구회가 '가갸날'이라는 이름으로 처음 기념한 이래, 1928년 '한글날'로 이름이 바뀌었습니다. 일제강점기에는 이 날을 기념하는 것조차 독립운동으로 간주되어 탄압받았습니다. 1940년 훈민정음 해례본이 발견되면서 반포일이 음력 9월 상한(10일)으로 확인되어 양력 10월 9일로 확정되었습니다. 1991년 경제 논리로 공휴일에서 제외되었다가, 한글학회와 시민들의 20년 넘는 노력 끝에 2013년 다시 공휴일로 지정되었습니다.",
      significance: "한글날은 세종대왕의 애민정신을 되새기는 날입니다. 매년 세종대왕 동상 앞에서 기념식이 열리고, 전국에서 한글 관련 문화 행사가 개최됩니다. 이 날은 또한 대한민국 국민이 자신의 문자를 가진 행운과 자부심을 확인하는 날이기도 합니다.",
    },
  },
  {
    title: "유네스코 세계기록유산",
    desc: "문자 창제 원리를 기록한 유일한 문헌, 훈민정음 해례본.",
    icon: "🏛️",
    detail: {
      fullDesc: "1997년, 훈민정음 해례본이 유네스코 세계기록유산에 등재되었습니다. 유네스코의 평가는 명확했습니다. '문자 체계의 과학적 설계 원리가 기록된 세계 유일의 사례.'",
      history: "해례본은 1446년 간행된 원본으로, 약 500년간 자취를 감추었다가 1940년 경북 안동에서 극적으로 발견되었습니다. 간송 전형필 선생이 서울 기와집 한 채 값에 해당하는 거금을 들여 이 책을 구입하고 목숨 걸고 보존했습니다. 이 한 권의 책이 없었다면, 한글이 왜 그런 모양인지 영원히 알 수 없었을 것입니다.",
      significance: "알파벳의 'A'가 왜 그런 모양인지, 한자의 '一'이 왜 가로선인지 아무도 모릅니다. 그러나 한글의 'ㄱ'이 혀뿌리가 목구멍을 막는 모양이라는 것, 'ㅁ'이 입술 모양이라는 것은 해례본에 명확히 기록되어 있습니다. 이 때문에 세계 언어학자들은 한글을 '설계된 문자'라 부릅니다.",
    },
  },
  {
    title: "세종대왕 문해상",
    desc: "세종의 이름으로, 세계 문맹 퇴치에 공헌한 이들을 기립니다.",
    icon: "🏆",
    detail: {
      fullDesc: "유네스코 세종대왕 문해상(UNESCO King Sejong Literacy Prize)은 전 세계에서 문맹 퇴치에 가장 큰 공헌을 한 개인이나 단체에 수여하는 국제상입니다.",
      history: "1989년 대한민국 정부의 제안으로 제정되었습니다. 매년 9월 8일 '세계 문해의 날'에 시상하며, 한국 정부가 상금을 지원합니다. 아프리카, 아시아, 남미 등 전 세계의 문해 교육 기관과 활동가들이 수상해 왔습니다. '누구나 쉽게 배울 수 있는 문자를 만들겠다'는 세종의 꿈이, 580년 뒤 전 세계 문맹 퇴치의 상징이 된 것입니다.",
      significance: "이 상의 이름이 세종대왕인 것은 우연이 아닙니다. 문맹의 고통을 누구보다 잘 이해하고, 배우기 쉬운 문자를 직접 만들어 해결한 지도자. 유네스코는 세종이야말로 문해(文解) 운동의 원조라고 인정한 것입니다.",
    },
  },
  {
    title: "세계문자올림픽 금메달",
    desc: "2009년, 16개국 문자가 겨루었고 한글이 1등을 차지했습니다.",
    icon: "🥇",
    detail: {
      fullDesc: "2009년 10월 서울에서 열린 제1회 세계문자올림픽에서, 16개국의 문자가 과학성·독창성·실용성을 겨루었고 한글이 금메달을 차지했습니다.",
      history: "평가 기준은 문자의 기원, 구조, 글자 수, 결합 능력, 독립성과 응용성 등이었습니다. 한글은 특히 문자의 독창성과 과학적 체계에서 압도적 점수를 받았습니다. 2위는 인도의 텔루구 문자, 3위는 영어 알파벳이었습니다.",
      significance: "주최 측의 객관성에 대한 논란이 있었지만, 이 대회는 한글이 세계적으로 주목받는 계기가 되었습니다. 한글이 24개 글자로 약 11,000개 음절을 조합할 수 있다는 사실, 그리고 자음이 발음 기관의 모양을 본뜬 '자질 문자'라는 독보적 특성이 세계에 널리 알려졌습니다.",
    },
  },
];

const globalReach = [
  {
    title: "찌아찌아족의 한글",
    location: "인도네시아 부톤섬",
    desc: "2009년, 고유 문자가 없던 소수민족이 한글을 선택했습니다.",
    detail: "인도네시아 술라웨시 남동쪽 부톤섬에 사는 찌아찌아족은 약 8만 명의 소수민족입니다. 그들에게는 고유한 언어가 있었지만 문자가 없어, 아이들에게 말을 가르칠 수는 있어도 글로 남길 수는 없었습니다.\n\n로마 알파벳으로 표기를 시도했지만, 찌아찌아어에는 로마자로 구별할 수 없는 미묘한 발음 차이가 많았습니다. 그때 한글이 해답이 되었습니다. 한글은 찌아찌아어의 복잡한 발음을 거의 완벽하게 표기할 수 있었습니다.\n\n현지 초등학교에서 한글 수업이 시작되었고, 한글 교과서도 만들어졌습니다. 아이들이 처음으로 자기 말을 글로 적는 순간, 세종대왕이 꿈꾸었던 일이 지구 반대편에서 현실이 되었습니다.",
  },
  {
    title: "한국어능력시험(TOPIK)",
    location: "전 세계 87개국",
    desc: "매년 40만 명 이상이 한국어를 배우고 시험에 응시합니다.",
    detail: "TOPIK은 1997년 약 2,700명의 응시자로 시작했습니다. 그로부터 25년 뒤, 연간 응시자 수는 40만 명을 넘어섰습니다. 150배가 넘는 증가입니다.\n\n무엇이 이 폭발적 성장을 이끌었을까요? K-팝, K-드라마, K-영화의 세계적 인기입니다. BTS의 노래를 원어로 이해하고 싶어서, 《기생충》의 대사를 자막 없이 듣고 싶어서, 전 세계 젊은이들이 한국어를 배우기 시작했습니다.\n\n그리고 그들이 공통적으로 놀라는 것이 있습니다. 한글이 놀라울 만큼 배우기 쉽다는 것. 대부분의 학습자가 며칠 만에 한글을 읽을 수 있게 됩니다. 580년 전 세종의 약속—'열흘이면 배울 수 있다'—이 지금도 유효한 것입니다.",
  },
  {
    title: "세종학당",
    location: "전 세계 82개국 234곳",
    desc: "한국어와 한글을 세계에 알리는 공공 교육 기관입니다.",
    detail: "2007년 몽골에 처음 문을 연 세종학당은 현재 82개국 234개소로 확대되었습니다. 프랑스의 알리앙스 프랑세즈, 독일의 괴테 인스티투트, 중국의 공자학원에 해당하는 한국어·한국문화 교육 기관입니다.\n\n세종학당이라는 이름에는 깊은 의미가 담겨 있습니다. 580년 전 세종대왕이 백성을 위해 쉬운 문자를 만든 것처럼, 세종학당은 세계인에게 한국어의 문을 활짝 열어주고 있습니다.\n\n한국어 수업뿐 아니라 한글 서예, 한국 요리, 전통 문화 체험 등 다채로운 프로그램을 제공합니다. 한류의 확산과 함께 입학 대기자가 줄을 서는 곳도 많습니다.",
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
              세계에서 문자에 국경일을 바친 나라는 대한민국이 유일합니다.
              한글날은 세종대왕이 백성을 위해 만든 문자의 탄생을 기리고,
              그 뒤에 숨은 사랑과 희생의 이야기를 기억하는 날입니다.
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
            <p className="text-sm text-foreground leading-[1.85]">{selectedFact.detail.fullDesc}</p>
            <div>
              <h4 className="text-xs font-bold text-vermillion tracking-widest mb-3">역사</h4>
              <p className="text-sm text-muted-foreground leading-[1.85]">{selectedFact.detail.history}</p>
            </div>
            <div className="bg-muted/50 rounded-sm p-5">
              <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-3">✨ 의의</h4>
              <p className="text-sm text-muted-foreground leading-[1.85]">{selectedFact.detail.significance}</p>
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
            {selectedGlobal.detail.split("\n\n").map((p, i) => (
              <p key={i} className="text-sm text-foreground/80 leading-[1.85]">{p}</p>
            ))}
          </div>
        )}
      </ResponsiveModal>

      <FooterSection />
    </main>
  );
};

export default HangulDay;
