import { useState } from "react";
import { motion } from "framer-motion";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
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
    detail: {
      origin: "혀뿌리가 목구멍을 막는 모양을 본뜬 글자입니다. 훈민정음 해례본에서는 '아음(牙音)'이라 하여 어금닛소리로 분류하였습니다.",
      related: "ㄱ → ㅋ → ㄲ",
      relatedDesc: "기본자 ㄱ에 획을 더하면 ㅋ이 되고, ㄱ을 나란히 쓰면 ㄲ이 됩니다. 이는 소리의 세기가 점점 강해지는 원리를 반영합니다.",
      examples: "가을, 구름, 강, 꽃, 길",
      funFact: "ㄱ은 숫자 '1'을 뜻하는 고유어 '하나'의 초성이기도 합니다. 한글 자음 중 가장 먼저 배우는 글자입니다.",
    },
  },
  {
    char: "ㄴ",
    name: "니은",
    desc: "혀가 윗잇몸에 닿는 모양",
    bg: "bg-vermillion",
    text: "text-primary-foreground",
    accent: "text-gold",
    detail: {
      origin: "혀가 윗잇몸에 닿는 모양을 본뜬 글자입니다. 해례본에서는 '설음(舌音)'이라 하여 혓소리로 분류하였습니다.",
      related: "ㄴ → ㄷ → ㅌ → ㄸ",
      relatedDesc: "ㄴ에 획을 더하면 ㄷ이 되고, 다시 획을 더하면 ㅌ이 됩니다. 소리의 세기와 거센 정도가 달라집니다.",
      examples: "나라, 눈, 노래, 나무, 남산",
      funFact: "ㄴ은 받침으로 쓰일 때 콧소리(비음)가 나는 특징이 있습니다. '산', '문' 등의 발음에서 확인할 수 있습니다.",
    },
  },
  {
    char: "ㅁ",
    name: "미음",
    desc: "입의 모양을 본뜬 글자",
    bg: "bg-card",
    text: "text-foreground",
    accent: "text-vermillion",
    detail: {
      origin: "입의 모양을 본뜬 글자입니다. 해례본에서는 '순음(脣音)'이라 하여 입술소리로 분류하였습니다. 입을 다물고 소리를 내는 모습을 형상화했습니다.",
      related: "ㅁ → ㅂ → ㅍ → ㅃ",
      relatedDesc: "ㅁ에 획을 더하면 ㅂ이 되고, 다시 획을 더하면 ㅍ이 됩니다.",
      examples: "마음, 물, 미소, 먹구름, 무지개",
      funFact: "ㅁ은 한글 자음 중 유일하게 완전한 사각형 모양입니다. 입을 정면에서 바라본 형태를 그대로 담고 있습니다.",
    },
  },
  {
    char: "ㅅ",
    name: "시옷",
    desc: "이의 모양을 본뜬 글자",
    bg: "bg-ink",
    text: "text-primary-foreground",
    accent: "text-gold",
    detail: {
      origin: "이의 모양을 본뜬 글자입니다. 해례본에서는 '치음(齒音)'이라 하여 잇소리로 분류하였습니다.",
      related: "ㅅ → ㅈ → ㅊ → ㅆ",
      relatedDesc: "ㅅ에 획을 더하면 ㅈ이 되고, 다시 획을 더하면 ㅊ이 됩니다. 소리가 점점 거세집니다.",
      examples: "사랑, 산, 시, 소리, 세상",
      funFact: "ㅅ은 한국어에서 가장 많이 사용되는 자음 중 하나입니다. '사랑'이라는 단어의 첫 글자이기도 합니다.",
    },
  },
  {
    char: "ㅇ",
    name: "이응",
    desc: "목구멍의 모양을 본뜬 글자",
    bg: "bg-background",
    text: "text-foreground",
    accent: "text-jade",
    border: true,
    detail: {
      origin: "목구멍의 둥근 모양을 본뜬 글자입니다. 해례본에서는 '후음(喉音)'이라 하여 목구멍소리로 분류하였습니다.",
      related: "ㅇ → ㅎ",
      relatedDesc: "ㅇ에 획을 더하면 ㅎ이 됩니다. ㅇ은 초성에서 소리가 없고, 받침에서는 'ㅇ' 소리(비음)가 납니다.",
      examples: "아름다운, 어머니, 우리, 이야기, 온",
      funFact: "ㅇ은 초성에서는 '무음'이지만, 받침(종성)에서는 콧소리 'ㅇ'이 됩니다. 하나의 글자가 위치에 따라 다른 역할을 합니다.",
    },
  },
  {
    char: "ㅎ",
    name: "히읗",
    desc: "ㅇ에 획을 더한 글자",
    bg: "bg-card",
    text: "text-foreground",
    accent: "text-vermillion",
    detail: {
      origin: "ㅇ(목구멍 모양)에 획을 더한 글자입니다. 목구멍에서 거센 바람이 나오는 소리를 표현합니다.",
      related: "ㅇ → ㅎ",
      relatedDesc: "기본자 ㅇ에서 파생된 글자로, 거센소리를 나타냅니다.",
      examples: "하늘, 해, 한글, 희망, 행복",
      funFact: "ㅎ은 다른 자음 뒤에 오면 그 자음을 거센소리로 바꾸는 특별한 능력이 있습니다. 예: 좋다→[조타], 넣다→[너타]",
    },
  },
  {
    char: "ㅏ",
    name: "아",
    desc: "하늘(·)과 사람(ㅣ)의 조화",
    bg: "bg-vermillion",
    text: "text-primary-foreground",
    accent: "text-primary-foreground",
    detail: {
      origin: "모음 'ㅏ'는 천(天)·지(地)·인(人) 삼재의 원리로 만들어졌습니다. 세로 획(ㅣ)은 사람을, 오른쪽 점(·)은 하늘을 상징합니다.",
      related: "ㅏ ↔ ㅓ, ㅑ",
      relatedDesc: "점의 위치에 따라 ㅏ(양성)와 ㅓ(음성)가 구분됩니다. 점을 하나 더 추가하면 ㅑ가 됩니다.",
      examples: "아이, 사과, 바다, 나라, 가을",
      funFact: "한글 모음은 음양의 원리를 담고 있습니다. ㅏ·ㅗ는 양성모음, ㅓ·ㅜ는 음성모음으로, 이는 모음조화라는 한국어의 독특한 특징에 반영됩니다.",
    },
  },
  {
    char: "ㅣ",
    name: "이",
    desc: "사람이 서 있는 모양",
    bg: "bg-ink",
    text: "text-primary-foreground",
    accent: "text-vermillion",
    detail: {
      origin: "사람이 서 있는 모양을 본뜬 글자입니다. 천지인 삼재 중 '인(人)'을 나타내는 기본 모음입니다.",
      related: "ㅣ + · = ㅏ, ㅓ, ㅑ, ㅕ 등",
      relatedDesc: "ㅣ에 점(·)을 조합하여 다양한 모음을 만들 수 있습니다. 한글 모음 체계의 핵심 요소입니다.",
      examples: "이름, 기쁨, 시, 미소, 빛",
      funFact: "ㅣ는 모든 한글 모음의 기본이 되는 세 요소(·, ㅡ, ㅣ) 중 하나입니다. 하늘(·), 땅(ㅡ), 사람(ㅣ)의 조합으로 모든 모음이 탄생합니다.",
    },
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Posters = () => {
  const [selected, setSelected] = useState<typeof posters[0] | null>(null);

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
              한글 자모의 아름다움을 타이포그래피 아트로 표현했습니다. 각 포스터를 클릭하면 상세 내용을 볼 수 있습니다.
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
                variants={itemVariant}
                onClick={() => setSelected(p)}
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

      {/* Detail Drawer */}
      <Drawer open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DrawerContent className="max-h-[85vh] border-border bg-background">
          <DrawerTitle className="sr-only">{selected?.name} 상세정보</DrawerTitle>
          <DrawerDescription className="sr-only">{selected?.name}의 기원과 상세 정보</DrawerDescription>
          {selected && (
            <div className="overflow-y-auto">
              <div className={`${selected.bg} ${selected.text} p-10 text-center`}>
                <span className="text-8xl font-black">{selected.char}</span>
                <div className="mt-3">
                  <span className={`text-lg font-bold ${selected.accent}`}>{selected.name}</span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-vermillion tracking-widest mb-2">기원</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.detail.origin}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gold tracking-widest mb-2">파생 관계</h4>
                  <p className="text-base font-bold text-foreground tracking-wider mb-1">{selected.detail.related}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.detail.relatedDesc}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-jade tracking-widest mb-2">사용 예시</h4>
                  <p className="text-sm text-foreground">{selected.detail.examples}</p>
                </div>
                <div className="bg-muted/50 rounded-sm p-4">
                  <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-2">💡 알고 계셨나요?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.detail.funFact}</p>
                </div>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>

      <FooterSection />
    </main>
  );
};

export default Posters;
