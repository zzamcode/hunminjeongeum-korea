import { useState } from "react";
import { motion } from "framer-motion";
import ResponsiveModal from "@/components/ResponsiveModal";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const quotes = [
  {
    text: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄",
    author: "세종대왕",
    source: "훈민정음 어제서문",
    accent: "vermillion",
    fullText: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄, 이런 전차로 어린 백셩이 니르고져 홀 배 이셔도 마참내 제 뜨들 시러 펴디 못할 노미 하니라. 내 이를 위하야 어엿비 녀겨 새로 스물여덟 자를 맹가노니, 사람마다 해여 수비 니겨 날로 쑤메 편안케 하고져 할 따르미니라.",
    bio: "세종대왕(1397~1450)은 조선의 제4대 왕으로, 한글 창제를 비롯하여 과학, 음악, 농업 등 다방면에서 업적을 남긴 성군입니다. 백성을 사랑하는 마음에서 누구나 쉽게 배울 수 있는 문자를 만들었습니다.",
    context: "이 서문은 한글 창제의 이유를 밝힌 글로, 중국 문자와 우리말이 달라 백성들이 뜻을 펼치지 못하는 안타까움을 담고 있습니다.",
  },
  {
    text: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라",
    author: "주시경",
    source: "국어문법, 1910",
    accent: "gold",
    fullText: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라. 이것은 옛적 이래로 나라의 성쇠를 보아 알 수 있는 것이며, 이로써 나라를 사랑하는 이는 먼저 그 겨레의 말부터 사랑할지니라.",
    bio: "주시경(1876~1914)은 한국의 대표적인 국어학자로, '한글'이라는 이름을 처음 사용하고 한글 문법 체계를 정립한 인물입니다. 국어 연구와 교육에 평생을 바쳤으며, 그의 제자들이 한글 운동의 주축이 되었습니다.",
    context: "일제강점기를 앞두고 민족의 정체성을 지키기 위해 국어의 중요성을 역설한 글입니다.",
  },
  {
    text: "한글은 세계에서 가장 합리적인 문자이며, 그 어떤 문자보다 뛰어나다",
    author: "제프리 샘슨",
    source: "영국 서섹스대학 언어학 교수",
    accent: "jade",
    fullText: "한글은 세계에서 가장 합리적인 문자이며, 그 어떤 문자보다 뛰어나다. 한글은 독창적이고 기호-Loss 관계가 뛰어나며 세계 문자 체계사에서 가장 위대한 지적 성취 중 하나이다.",
    bio: "제프리 샘슨(Geoffrey Sampson)은 영국 서섹스대학의 언어학 교수로, 세계 문자 체계를 연구한 권위자입니다. 그의 저서 'Writing Systems'에서 한글을 높이 평가했습니다.",
    context: "세계적인 언어학자가 객관적 학술 연구를 통해 한글의 과학성을 인정한 평가입니다.",
  },
  {
    text: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다",
    author: "존 맨",
    source: "Alpha Beta, 2000",
    accent: "vermillion",
    fullText: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다. 한글이야말로 세계 모든 알파벳의 꿈이다. 간결하면서도 체계적이며, 과학적이면서도 배우기 쉬운 이 문자는 인류 지성의 위대한 산물이다.",
    bio: "존 맨(John Man)은 영국의 역사학자이자 작가로, 세계의 문자 체계를 탐구한 'Alpha Beta'를 저술했습니다.",
    context: "세계 문자의 역사를 다룬 저서에서 한글을 최고의 알파벳으로 꼽으며 한 평가입니다.",
  },
  {
    text: "세종대왕은 한국의 레오나르도 다빈치다. 한글은 전 세계에서 가장 합리적인 문자다",
    author: "재레드 다이아몬드",
    source: "UCLA 지리학 교수",
    accent: "gold",
    fullText: "세종대왕은 한국의 레오나르도 다빈치다. 한글은 전 세계에서 가장 합리적인 문자다. 세종이 이룬 업적은 다빈치에 견줄 만한 것이며, 한글의 과학적 체계는 경이로움 그 자체다.",
    bio: "재레드 다이아몬드(Jared Diamond)는 미국 UCLA 교수이자 퓰리처상 수상 작가로, '총, 균, 쇠' 등으로 유명합니다. 문명의 발전과 문자의 역할에 대해 깊이 연구했습니다.",
    context: "세계적 석학이 세종대왕을 르네상스 거장에 비유하며 한글의 우수성을 칭송한 발언입니다.",
  },
  {
    text: "훈민정음 28자로 전환할 수 없는 소리가 없고, 바람 소리, 학의 울음, 닭의 홰치는 소리, 개 짖는 소리까지 모두 적을 수 있다",
    author: "정인지",
    source: "훈민정음 해례본 서문, 1446",
    accent: "jade",
    fullText: "지혜로운 사람은 아침 해가 뜨기 전에 깨우치고, 어리석은 사람이라도 열흘이면 배울 수 있다. 이 글자로써 바람 소리, 학의 울음, 닭의 홰치는 소리, 개 짖는 소리까지도 모두 적을 수 있으니, 마침내 글자로 적을 수 없는 소리가 없다.",
    bio: "정인지(1396~1478)는 조선 초기의 문신이자 학자로, 훈민정음 해례본의 서문을 작성했습니다. 세종대왕의 명을 받아 훈민정음의 창제 과정에 참여한 핵심 인물입니다.",
    context: "해례본 서문에서 한글의 뛰어난 표음 능력을 자연의 소리를 예로 들어 설명한 구절입니다.",
  },
  {
    text: "가나다라마바사, 한글은 그 자체로 하나의 예술이자 과학이다",
    author: "에드윈 라이샤워",
    source: "하버드대학 동아시아학 교수",
    accent: "vermillion",
    fullText: "한글은 그 자체로 하나의 예술이자 과학이다. 세계 어디에서도 이토록 체계적이면서 아름다운 문자를 찾기 어렵다. 한글은 인류의 위대한 지적 유산이다.",
    bio: "에드윈 라이샤워(Edwin O. Reischauer, 1910~1990)는 미국 하버드대학의 동아시아학 교수이자 주일 미국 대사를 역임한 동아시아 전문가입니다.",
    context: "동아시아 문화를 깊이 연구한 미국 학자가 한글의 예술성과 과학성을 동시에 인정한 평가입니다.",
  },
  {
    text: "슬기로운 사람은 아침나절이 되기 전에 이를 깨우치고, 어리석은 사람도 열흘이면 배울 수 있다",
    author: "세종대왕",
    source: "훈민정음 어제서문",
    accent: "gold",
    fullText: "슬기로운 사람은 아침나절이 되기 전에 이를 깨우치고, 어리석은 사람이라도 열흘이면 배울 수 있다. 이 28자를 가지고 천하의 만물을 적을 수 있으니, 비록 바람 소리, 학의 울음, 닭의 홰치는 소리, 개 짖는 소리일지라도 모두 적을 수 있느니라.",
    bio: "세종대왕은 한글이 누구나 쉽게 배울 수 있는 문자임을 강조했습니다. 실제로 한글은 자음 14개, 모음 10개의 24글자만으로 거의 모든 소리를 표기할 수 있는 효율적인 문자입니다.",
    context: "한글의 가장 큰 장점인 '배우기 쉬움'을 강조한 구절입니다. 이는 한글 창제의 핵심 목적이기도 합니다.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Quotes = () => {
  const [selected, setSelected] = useState<typeof quotes[0] | null>(null);

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
              한글의 가치를 담은 아름다운 말들. 각 명언을 클릭하면 전문과 배경을 읽을 수 있습니다.
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
                  variants={itemVariant}
                  onClick={() => setSelected(q)}
                  className={`break-inside-avoid bg-card border border-border border-l-4 ${borderColor} rounded-sm p-8 cursor-pointer hover:shadow-md transition-shadow`}
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

      {/* Detail Drawer */}
      <Drawer open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DrawerContent className="max-h-[85vh] border-border bg-background">
          <DrawerTitle className="sr-only">{selected?.author}의 명언</DrawerTitle>
          <DrawerDescription className="sr-only">{selected?.author}의 명언 상세 정보</DrawerDescription>
          {selected && (() => {
            const accentText =
              selected.accent === "vermillion"
                ? "text-vermillion"
                : selected.accent === "gold"
                ? "text-gold"
                : "text-jade";
            const accentBorder =
              selected.accent === "vermillion"
                ? "border-vermillion"
                : selected.accent === "gold"
                ? "border-gold"
                : "border-jade";

            return (
              <div className="overflow-y-auto p-8 space-y-6">
                <div className={`border-l-4 ${accentBorder} pl-6`}>
                  <p className="text-foreground leading-[1.9] text-base italic">
                    "{selected.fullText}"
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-black ${accentText}`}>
                    {selected.author[0]}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${accentText}`}>{selected.author}</p>
                    <p className="text-xs text-muted-foreground">{selected.source}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-2">인물 소개</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selected.bio}</p>
                </div>

                <div className="bg-muted/50 rounded-sm p-4">
                  <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-2">📖 배경</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.context}</p>
                </div>
              </div>
            );
          })()}
        </DrawerContent>
      </Drawer>

      <FooterSection />
    </main>
  );
};

export default Quotes;
