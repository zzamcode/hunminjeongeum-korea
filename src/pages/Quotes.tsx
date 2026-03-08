import { useState } from "react";
import { motion } from "framer-motion";
import ResponsiveModal from "@/components/ResponsiveModal";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const quotes = [
  {
    text: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄",
    author: "세종대왕",
    source: "훈민정음 어제서문, 1446",
    accent: "vermillion",
    image: "/images/sejong.jpg",
    fullText: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄, 이런 전차로 어린 백셩이 니르고져 홀 배 이셔도 마참내 제 뜨들 시러 펴디 못할 노미 하니라. 내 이를 위하야 어엿비 녀겨 새로 스물여덟 자를 맹가노니, 사람마다 해여 수비 니겨 날로 쑤메 편안케 하고져 할 따르미니라.",
    bio: "세종대왕(1397~1450)은 조선의 제4대 왕입니다. 즉위 후 집현전을 설치하고 학문을 장려했으며, 측우기·해시계·자격루 등 과학 기구를 발명하도록 했습니다. 그러나 그의 가장 위대한 업적은 단연 훈민정음 창제입니다. 당시 양반들은 한문을 독점하며 지식을 쌓았지만, 대다수 백성들은 글을 몰라 억울한 일을 당해도 호소조차 할 수 없었습니다. 세종은 이를 깊이 안타깝게 여겨 직접 새로운 문자를 만들기로 결심했습니다. 최만리 등 일부 신하들의 강렬한 반대에도 불구하고, 세종은 '내 백성을 위한 일'이라며 뜻을 굽히지 않았습니다.",
    context: "이 서문은 한글 창제의 이유를 세종 자신의 목소리로 밝힌 글입니다. 중국 문자와 우리말이 서로 통하지 않아 백성들이 하고 싶은 말이 있어도 글로 표현하지 못하는 현실. 세종은 이 한 구절에 자신이 문자를 만든 이유의 전부를 담았습니다. 580년이 지난 오늘날까지도 이 서문은 한국인이라면 누구나 아는 가장 유명한 문장으로 남아 있습니다.",
  },
  {
    text: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라",
    author: "주시경",
    source: "국어문법, 1910",
    accent: "gold",
    image: "/images/jusigyeong.png",
    fullText: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라. 이것은 옛적 이래로 나라의 성쇠를 보아 알 수 있는 것이며, 이로써 나라를 사랑하는 이는 먼저 그 겨레의 말부터 사랑할지니라.",
    bio: "주시경(1876~1914)은 한국 근대 국어학의 아버지로 불리는 인물입니다. 황해도 봉산에서 태어나 서울로 올라와 배재학당에서 공부했습니다. 그는 기존에 '언문', '반절' 등 낮잡아 불리던 우리 문자에 '한글'이라는 이름을 붙인 장본인입니다. '한'은 '크다'와 '하나'를 동시에 뜻하니, 곧 '크고 하나뿐인 글'이라는 의미입니다. 주시경은 조선어강습원을 설립해 한글을 가르쳤고, 그의 제자 최현배·김두봉·이극로 등이 후날 한글 운동의 핵심 인물이 되었습니다. 안타깝게도 38세의 젊은 나이에 세상을 떠났지만, 그가 뿌린 씨앗은 일제강점기 내내 한글을 지켜내는 힘이 되었습니다.",
    context: "1910년, 나라를 잃기 직전의 위기 속에서 주시경은 언어가 곧 민족의 생명줄임을 역설했습니다. 일본은 조선어를 말살하려 했지만, 주시경과 그의 제자들이 목숨을 걸고 한글을 연구하고 가르친 덕분에 우리 말과 글이 살아남을 수 있었습니다. 이 문장은 단순한 격언이 아니라, 한 학자가 조국의 운명을 걸고 외친 절규였습니다.",
  },
  {
    text: "지혜로운 사람은 아침나절이 되기 전에 깨우치고, 어리석은 사람이라도 열흘이면 배울 수 있다",
    author: "정인지",
    source: "훈민정음 해례본 서문, 1446",
    accent: "jade",
    image: "/images/jeonginji.jpg",
    fullText: "지혜로운 사람은 아침 해가 뜨기 전에 깨우치고, 어리석은 사람이라도 열흘이면 배울 수 있다. 이 글자로써 바람 소리, 학의 울음, 닭의 홰치는 소리, 개 짖는 소리까지도 모두 적을 수 있으니, 마침내 글자로 적을 수 없는 소리가 없다.",
    bio: "정인지(1396~1478)는 조선 초기 최고의 학자이자 정치가입니다. 세종의 두터운 신임을 받아 훈민정음 해례본의 서문을 직접 작성했습니다. 해례본은 각 글자가 왜 그런 모양인지, 어떻게 조합하는지를 상세히 설명한 해설서입니다. 정인지는 이 서문에서 한글의 우수성을 자연의 소리에 비유하며 찬탄했습니다. 이후 영의정까지 올랐으며, 《고려사》 편찬에도 참여한 조선 초기의 대표적 지식인입니다.",
    context: "해례본 서문의 이 구절은 한글의 두 가지 핵심 장점을 함축합니다. 첫째, 놀라울 만큼 배우기 쉽다는 것. 둘째, 세상 모든 소리를 적을 수 있다는 것. 이 두 가지는 580년이 지난 지금도 한글이 세계 언어학자들에게 경탄의 대상인 이유이기도 합니다. 유네스코는 바로 이 해례본을 세계기록유산으로 지정했습니다.",
  },
  {
    text: "한글은 세계에서 가장 합리적인 문자이며, 그 어떤 문자보다도 뛰어나다",
    author: "제프리 샘슨",
    source: "Writing Systems, 영국 서섹스대학 언어학 교수",
    accent: "vermillion",
    image: "/images/geoffrey-sampson.jpg",
    fullText: "한글은 독창적이고 기호와 소리의 관계가 뛰어나며, 세계 문자 체계사에서 가장 위대한 지적 성취 중 하나이다. 한글처럼 자질문자(featural writing system)의 특성을 갖춘 문자는 세계 어디에도 없다.",
    bio: "제프리 샘슨(Geoffrey Sampson, 1944~)은 영국 서섹스대학의 언어학·컴퓨터학 교수입니다. 세계의 문자 체계를 비교 분석한 저서 《Writing Systems》에서 한글을 독보적으로 높이 평가했습니다. 그는 한글을 기존의 '알파벳', '음절 문자' 등의 분류와 다른 새로운 범주인 '자질 문자(featural system)'로 분류했습니다. 이는 한글의 자음 글자가 발음 기관의 모양을 본뜨고, 획을 더해 소리의 세기를 표현하는 체계적 원리를 인정한 것입니다.",
    context: "서양 학자가 한글을 세계 문자사의 최고 성취로 꼽은 것은 큰 의미가 있습니다. 한글은 단순히 '좋은 문자'가 아니라, 문자학의 기존 분류 체계 자체를 바꿔놓은 유일무이한 존재라는 학술적 평가입니다.",
  },
  {
    text: "세종대왕은 한국의 레오나르도 다빈치다",
    author: "재레드 다이아몬드",
    source: "총·균·쇠 저자, 미국 UCLA 교수",
    accent: "gold",
    image: "/images/jared-diamond.jpg",
    fullText: "세종대왕은 한국의 레오나르도 다빈치다. 한글은 전 세계에서 가장 합리적인 문자다. 세종이 이룬 업적은 다빈치에 견줄 만한 것이며, 한글의 과학적 체계는 경이로움 그 자체다.",
    bio: "재레드 다이아몬드(Jared Diamond, 1937~)는 미국 UCLA 교수이자 퓰리처상 수상 작가입니다. 인류 문명의 발전을 생물학·지리학적 관점에서 분석한 《총, 균, 쇠(Guns, Germs, and Steel)》로 세계적 명성을 얻었습니다. 그는 세계 각 문명의 문자 체계를 깊이 연구한 학자로서, 한글의 과학적 설계에 깊은 감탄을 표했습니다.",
    context: "퓰리처상 수상 과학자가 세종대왕을 르네상스 최고의 천재 다빈치에 비유한 이 발언은, 한글 창제가 단순한 문자 발명이 아니라 인류 지성사의 위대한 업적임을 보여줍니다. 다이아몬드는 수천 년간 자연 발생적으로 형성된 다른 문자들과 달리, 한글만이 과학적 원리에 따라 의도적으로 '설계'된 문자라는 점에 주목했습니다.",
  },
  {
    text: "한글은 그 자체로 하나의 예술이자 과학이다",
    author: "에드윈 라이샤워",
    source: "하버드대학 동아시아학 교수, 전 주일미국대사",
    accent: "jade",
    image: "/images/edwin-reischauer.png",
    fullText: "한글은 그 자체로 하나의 예술이자 과학이다. 세계 어디에서도 이토록 체계적이면서 아름다운 문자를 찾기 어렵다. 한글은 인류의 위대한 지적 유산이다.",
    bio: "에드윈 라이샤워(Edwin O. Reischauer, 1910~1990)는 일본 도쿄에서 태어난 미국의 동아시아학자이자 외교관입니다. 하버드대학에서 동아시아학을 가르쳤고, 케네디 대통령 시절 주일 미국 대사를 역임했습니다. 그는 동아시아 각국의 문자와 문화를 비교 연구한 권위자로, 한글의 과학성과 미적 아름다움을 동시에 높이 평가했습니다.",
    context: "동아시아를 가장 깊이 이해한 서양 학자 중 한 명이 한글에 대해 '예술'과 '과학'이라는 두 단어를 동시에 사용한 것은 주목할 만합니다. 한자의 서예적 아름다움, 일본 가나의 간결함을 모두 아는 학자가, 한글만이 체계적 아름다움과 과학적 합리성을 겸비했다고 평가한 것입니다.",
  },
  {
    text: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다",
    author: "존 맨",
    source: "Alpha Beta, 2000",
    accent: "vermillion",
    image: "/images/john-man.jpg",
    fullText: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다. 한글이야말로 세계 모든 알파벳의 꿈이다. 간결하면서도 체계적이며, 과학적이면서도 배우기 쉬운 이 문자는 인류 지성의 위대한 산물이다.",
    bio: "존 맨(John Man, 1941~)은 영국의 역사학자이자 여행 작가입니다. 세계의 문자 체계를 탐구한 《Alpha Beta》에서 한글을 '모든 알파벳의 꿈'이라 칭했습니다. 그는 알파벳의 기원부터 현대까지의 문자 역사를 추적하면서, 한글이 다른 모든 문자의 장점을 합쳐놓은 듯한 완벽한 체계를 갖추고 있다고 놀라움을 표했습니다.",
    context: "전 세계 수천 개의 문자를 비교 연구한 끝에 나온 이 평가는, 한글에 대한 최고의 찬사 중 하나입니다. '꿈(dream)'이라는 표현은, 다른 문자들이 수천 년에 걸쳐 도달하지 못한 경지를 한글이 단숨에 이루어냈다는 의미를 담고 있습니다.",
  },
  {
    text: "슬기로운 사람은 아침나절이 되기 전에 이를 깨우치고, 어리석은 사람도 열흘이면 배울 수 있다",
    author: "세종대왕",
    source: "훈민정음 어제서문",
    accent: "gold",
    image: "/images/sejong.jpg",
    fullText: "슬기로운 사람은 아침나절이 되기 전에 이를 깨우치고, 어리석은 사람이라도 열흘이면 배울 수 있다. 이 28자를 가지고 천하의 만물을 적을 수 있으니, 비록 바람 소리, 학의 울음, 닭의 홰치는 소리, 개 짖는 소리일지라도 모두 적을 수 있느니라.",
    bio: "세종대왕은 한글이 누구나 쉽게 배울 수 있는 문자임을 거듭 강조했습니다. 이는 허풍이 아니었습니다. 실제로 한글은 자음 14개, 모음 10개, 총 24글자만으로 약 11,000개 이상의 음절을 조합할 수 있습니다. 영어 알파벳 26자보다 적은 글자로 더 많은 소리를 정확하게 표현할 수 있는 것입니다.",
    context: "이 구절에 담긴 자신감은 580년이 지난 오늘날 현실로 증명되었습니다. 한국의 문맹률은 세계 최저 수준이며, 유네스코 세종대왕 문해상은 세종의 정신을 기려 세계 문맹 퇴치에 공헌한 이들에게 매년 수여되고 있습니다. '쉬운 문자'라는 세종의 꿈은 현실이 된 것입니다.",
  },
  {
    text: "한글은 겨레의 목숨이다. 한글이 죽으면 겨레도 죽고, 한글이 살면 겨레도 산다",
    author: "최현배",
    source: "우리말본, 1937",
    accent: "jade",
    image: "/images/choehyeonbae.jpg",
    fullText: "한글은 겨레의 목숨이다. 한글이 죽으면 겨레도 죽고, 한글이 살면 겨레도 산다. 우리가 한글을 아끼고 빛내는 것은 곧 나라를 아끼고 빛내는 길이니, 한글은 단순한 글자가 아니라 민족의 얼이요, 넋이요, 목숨이다.",
    bio: "최현배(1894~1970)는 호가 외솔인 한글학자로, 주시경의 수제자이자 일제강점기 한글 수호의 핵심 인물입니다. 연희전문학교(현 연세대) 교수로 재직하며 《우리말본》을 저술해 한글 문법을 체계화했습니다. 1942년 조선어학회 사건으로 일제에 검거되어 함흥 형무소에서 옥고를 치렀지만, 광복 후 곧바로 한글 보급에 헌신했습니다. 한글전용법 제정에도 큰 역할을 했으며, 평생을 한글을 지키고 가꾸는 데 바쳤습니다.",
    context: "일제강점기, 일본은 조선어를 말살하려 했습니다. 학교에서 한국어를 쓰면 벌을 받았고, 한글 연구는 곧 독립운동이었습니다. 최현배의 이 선언은 단순한 학술적 주장이 아니라, 민족의 존망이 걸린 절체절명의 외침이었습니다. 1942년 조선어학회 사건으로 33명의 학자가 체포되었고, 이윤재·한징 두 분은 옥중에서 순국했습니다. 한글을 지키는 것이 곧 목숨을 거는 일이던 시대였습니다.",
  },
  {
    text: "한글은 세계에서 가장 과학적인 표기 체계다",
    author: "로버트 램지",
    source: "미국 메릴랜드대학 언어학 교수",
    accent: "vermillion",
    image: "/images/robert-ramsey.jpg",
    fullText: "한글은 세계에서 가장 과학적인 표기 체계다. 자음 글자의 모양이 발음할 때 혀와 입의 모양을 본뜬 것은 놀라운 발상이며, 이런 원리를 가진 문자는 세계 어디에도 없다. 한글은 언어학의 보물이다.",
    bio: "로버트 램지(S. Robert Ramsey)는 미국 메릴랜드대학의 언어학 교수로, 한국어와 동아시아 언어를 전문적으로 연구한 학자입니다. 저서 《The Languages of China》와 함께 한국어 연구로도 널리 알려져 있습니다. 그는 한글의 자음이 발음 기관의 모양을 본떠 만들어진 원리에 특히 주목하며, 이를 '음성학적 지도(phonetic map)'라고 표현했습니다.",
    context: "램지 교수의 평가가 의미 있는 것은, 그가 중국어·일본어·한국어 등 동아시아 언어를 모두 깊이 연구한 비교언어학자라는 점입니다. 수많은 문자 체계를 비교한 끝에 한글만이 '과학적'이라는 수식어를 받을 자격이 있다고 단언한 것입니다.",
  },
  {
    text: "한글은 세계 문자 가운데 가장 진보한 글자다. 한글은 독창적이고 과학적인 최고의 걸작이다",
    author: "우메다 히로유키",
    source: "일본 언어학자, 도쿄외국어대학",
    accent: "gold",
    image: "/images/umeda-hiroyuki.jpg",
    fullText: "한글은 세계 문자 가운데 가장 진보한 글자다. 한글은 독창적이고 과학적인 최고의 걸작이며, 세종대왕은 그야말로 천재 중의 천재다. 일본의 가나 문자가 한자를 변형한 것에 불과한 데 비해, 한글은 완전히 새로운 원리에서 탄생한 독보적인 문자다.",
    bio: "우메다 히로유키(梅田博之, 1930~)는 도쿄외국어대학의 한국어학 교수로, 일본에서 한국어 연구의 개척자로 불리는 학자입니다. 평생을 한국어와 한글 연구에 바쳤으며, 일본 학술계에 한글의 우수성을 알리는 데 큰 역할을 했습니다. 그는 특히 일본의 가나 문자와 한글을 비교하며, 한글의 독창성에 깊은 경탄을 표했습니다.",
    context: "같은 동아시아 문화권의 일본 학자가 자국의 문자(가나)와 비교하며 한글의 우수성을 인정한 것은 특별한 의미가 있습니다. 가나는 한자의 일부를 변형해 만든 문자지만, 한글은 완전히 새로운 과학적 원리에서 탄생했다는 차이를 학술적으로 인정한 것입니다.",
  },
  {
    text: "한글은 세계에서 가장 훌륭한 문자이며, 한글을 만든 세종대왕은 천재 중의 천재다",
    author: "펄 벅",
    source: "노벨문학상 수상 작가, 대지(The Good Earth) 저자",
    accent: "jade",
    image: "/images/pearl-buck.jpg",
    fullText: "한글은 세계에서 가장 단순하면서도 가장 훌륭한 문자다. 세종대왕은 한국의 레오나르도 다빈치보다 위대한 인물이다. 한글이야말로 세계 어떤 나라의 일반 백성도 가지지 못한 가장 좋은 문자다.",
    bio: "펄 벅(Pearl S. Buck, 1892~1973)은 미국의 소설가로, 1938년 노벨문학상을 수상했습니다. 중국에서 자라 동아시아 문화에 깊은 이해를 가졌으며, 대표작 《대지(The Good Earth)》로 전 세계적 명성을 얻었습니다. 그녀는 한국을 여러 차례 방문하며 한국 문화와 한글에 깊은 관심을 보였고, 한국의 고아와 혼혈아 복지 사업에도 헌신했습니다.",
    context: "노벨문학상 수상자가 한글을 '세계에서 가장 훌륭한 문자'로 칭한 것은 문학적 관점에서의 최고 찬사입니다. 펄 벅은 중국어·일본어 등 동아시아 문자들을 두루 경험한 작가로서, 한글의 '단순하면서도 훌륭한' 특성에 주목했습니다. 복잡한 한자를 평생 다뤄본 작가의 눈에 한글은 경이로운 발명이었습니다.",
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
              한글을 빛낸 말들
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              한글의 가치를 알아본 사람들이 남긴 아름다운 말들. 클릭하면 그 말 뒤에 숨은 이야기를 읽을 수 있습니다.
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
                  <footer className="flex items-center gap-3">
                    {q.image ? (
                      <img
                        src={q.image}
                        alt={q.author}
                        className="w-10 h-10 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-black ${textColor}`}>
                        {q.author[0]}
                      </div>
                    )}
                    <div>
                      <cite className={`text-sm font-bold ${textColor} not-italic`}>
                        {q.author}
                      </cite>
                      <p className="text-xs text-muted-foreground mt-0.5">{q.source}</p>
                    </div>
                  </footer>
                </motion.blockquote>
              );
            })}
          </motion.div>
        </div>
      </section>

      <ResponsiveModal
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        title={`${selected?.author}의 말`}
        description={`${selected?.author}의 말 상세 정보`}
      >
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

              <div className="flex items-center gap-4">
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-border"
                  />
                ) : (
                  <div className={`w-14 h-14 rounded-full bg-muted flex items-center justify-center text-2xl font-black ${accentText}`}>
                    {selected.author[0]}
                  </div>
                )}
                <div>
                  <p className={`text-base font-bold ${accentText}`}>{selected.author}</p>
                  <p className="text-xs text-muted-foreground">{selected.source}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-3">이 사람은 누구인가</h4>
                <p className="text-sm text-foreground/80 leading-[1.85]">{selected.bio}</p>
              </div>

              <div className="bg-muted/50 rounded-sm p-5">
                <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-3">📖 이 말이 나온 배경</h4>
                <p className="text-sm text-muted-foreground leading-[1.85]">{selected.context}</p>
              </div>
            </div>
          );
        })()}
      </ResponsiveModal>

      <FooterSection />
    </main>
  );
};

export default Quotes;
