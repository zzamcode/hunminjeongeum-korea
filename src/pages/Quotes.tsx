import { useState } from "react";
import { motion } from "framer-motion";
import ResponsiveModal from "@/components/ResponsiveModal";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useI18n, type Locale } from "@/lib/i18n";

type Quote = {
  text: string; // Always Korean — cultural artifact
  author: string;
  source: string;
  accent: string;
  image: string;
  fullText: string; // Always Korean
  bio: string;
  context: string;
};

const quotesData: Record<Locale, Quote[]> = {
  ko: [
    { text: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄", author: "세종대왕", source: "훈민정음 어제서문, 1446", accent: "vermillion", image: "/images/sejong.jpg", fullText: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄, 이런 전차로 어린 백셩이 니르고져 홀 배 이셔도 마참내 제 뜨들 시러 펴디 못할 노미 하니라.", bio: "세종대왕(1397~1450)은 조선의 제4대 왕입니다. 그의 가장 위대한 업적은 단연 훈민정음 창제입니다.", context: "이 서문은 한글 창제의 이유를 세종 자신의 목소리로 밝힌 글입니다." },
    { text: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라", author: "주시경", source: "국어문법, 1910", accent: "gold", image: "/images/jusigyeong.png", fullText: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라. 이것은 옛적 이래로 나라의 성쇠를 보아 알 수 있는 것이며, 이로써 나라를 사랑하는 이는 먼저 그 겨레의 말부터 사랑할지니라.", bio: "주시경(1876~1914)은 한국 근대 국어학의 아버지로 불리는 인물입니다. 그는 '한글'이라는 이름을 붙인 장본인입니다.", context: "1910년, 나라를 잃기 직전의 위기 속에서 주시경은 언어가 곧 민족의 생명줄임을 역설했습니다." },
    { text: "한글은 세계에서 가장 합리적인 문자이며, 그 어떤 문자보다도 뛰어나다", author: "제프리 샘슨", source: "Writing Systems, 영국 서섹스대학 언어학 교수", accent: "vermillion", image: "/images/geoffrey-sampson.jpg", fullText: "한글은 독창적이고 기호와 소리의 관계가 뛰어나며, 세계 문자 체계사에서 가장 위대한 지적 성취 중 하나이다.", bio: "제프리 샘슨(1944~)은 영국 서섹스대학의 언어학·컴퓨터학 교수입니다. 한글을 '자질 문자(featural system)'로 분류했습니다.", context: "서양 학자가 한글을 세계 문자사의 최고 성취로 꼽은 것은 큰 의미가 있습니다." },
    { text: "세종대왕은 한국의 레오나르도 다빈치다", author: "재레드 다이아몬드", source: "총·균·쇠 저자, UCLA 교수", accent: "gold", image: "/images/jared-diamond.jpg", fullText: "세종대왕은 한국의 레오나르도 다빈치다. 한글은 전 세계에서 가장 합리적인 문자다.", bio: "재레드 다이아몬드(1937~)는 퓰리처상 수상 작가이자 UCLA 교수입니다.", context: "퓰리처상 수상 과학자가 세종대왕을 다빈치에 비유한 발언은 한글 창제가 인류 지성사의 위대한 업적임을 보여줍니다." },
    { text: "한글은 그 자체로 하나의 예술이자 과학이다", author: "에드윈 라이샤워", source: "하버드대학 동아시아학 교수", accent: "jade", image: "/images/edwin-reischauer.png", fullText: "한글은 그 자체로 하나의 예술이자 과학이다. 세계 어디에서도 이토록 체계적이면서 아름다운 문자를 찾기 어렵다.", bio: "에드윈 라이샤워(1910~1990)는 하버드대학 동아시아학자이자 전 주일 미국 대사입니다.", context: "동아시아를 가장 깊이 이해한 서양 학자 중 한 명이 한글을 '예술'과 '과학'이라 동시에 평가했습니다." },
    { text: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다", author: "존 맨", source: "Alpha Beta, 2000", accent: "vermillion", image: "/images/john-man.jpg", fullText: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다. 간결하면서도 체계적이며, 과학적이면서도 배우기 쉬운 이 문자는 인류 지성의 위대한 산물이다.", bio: "존 맨(1941~)은 영국의 역사학자이자 여행 작가입니다. 《Alpha Beta》에서 한글을 '모든 알파벳의 꿈'이라 칭했습니다.", context: "전 세계 수천 개의 문자를 비교 연구한 끝에 나온 이 평가는 한글에 대한 최고의 찬사 중 하나입니다." },
    { text: "한글은 세계에서 가장 훌륭한 문자이며, 한글을 만든 세종대왕은 천재 중의 천재다", author: "펄 벅", source: "노벨문학상 수상 작가", accent: "jade", image: "/images/pearl-buck.jpg", fullText: "한글은 세계에서 가장 단순하면서도 가장 훌륭한 문자다. 세종대왕은 한국의 레오나르도 다빈치보다 위대한 인물이다.", bio: "펄 벅(1892~1973)은 1938년 노벨문학상을 수상한 미국의 소설가입니다.", context: "노벨문학상 수상자가 한글을 '세계에서 가장 훌륭한 문자'로 칭한 것은 문학적 관점에서의 최고 찬사입니다." },
    { text: "한글은 세계에서 가장 과학적인 표기 체계다", author: "로버트 램지", source: "미국 메릴랜드대학 언어학 교수", accent: "vermillion", image: "/images/robert-ramsey.jpg", fullText: "한글은 세계에서 가장 과학적인 표기 체계다. 자음 글자의 모양이 발음할 때 혀와 입의 모양을 본뜬 것은 놀라운 발상이다.", bio: "로버트 램지는 메릴랜드대학의 한국어·동아시아 언어 전문 언어학 교수입니다.", context: "수많은 문자 체계를 비교한 끝에 한글만이 '과학적'이라는 수식어를 받을 자격이 있다고 단언한 것입니다." },
    { text: "한글은 세계 문자 가운데 가장 진보한 글자다", author: "우메다 히로유키", source: "일본 도쿄외국어대학", accent: "gold", image: "/images/umeda-hiroyuki.jpg", fullText: "한글은 세계 문자 가운데 가장 진보한 글자다. 한글은 독창적이고 과학적인 최고의 걸작이다.", bio: "우메다 히로유키(1930~)는 도쿄외국어대학의 한국어학 교수로, 일본에서 한국어 연구의 개척자입니다.", context: "같은 동아시아 문화권의 일본 학자가 한글의 우수성을 인정한 것은 특별한 의미가 있습니다." },
  ],
  en: [
    { text: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄", author: "King Sejong", source: "Royal Preface to Hunminjeongeum, 1446", accent: "vermillion", image: "/images/sejong.jpg", fullText: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄, 이런 전차로 어린 백셩이 니르고져 홀 배 이셔도 마참내 제 뜨들 시러 펴디 못할 노미 하니라.", bio: "King Sejong the Great (1397–1450) was the 4th king of the Joseon Dynasty. His greatest achievement was the creation of Hunminjeongeum.", context: "This preface reveals King Sejong's personal reasons for creating a new writing system — his compassion for the illiterate common people." },
    { text: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라", author: "Ju Si-gyeong", source: "Korean Grammar, 1910", accent: "gold", image: "/images/jusigyeong.png", fullText: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라. 이것은 옛적 이래로 나라의 성쇠를 보아 알 수 있는 것이며, 이로써 나라를 사랑하는 이는 먼저 그 겨레의 말부터 사랑할지니라.", bio: "Ju Si-gyeong (1876–1914) is called the father of modern Korean linguistics. He coined the name 'Hangul,' where 'han' means both 'great' and 'one.'", context: "In 1910, on the brink of losing the nation, Ju Si-gyeong argued that language is the lifeline of a people." },
    { text: "한글은 세계에서 가장 합리적인 문자이며, 그 어떤 문자보다도 뛰어나다", author: "Geoffrey Sampson", source: "Writing Systems, University of Sussex", accent: "vermillion", image: "/images/geoffrey-sampson.jpg", fullText: "한글은 독창적이고 기호와 소리의 관계가 뛰어나며, 세계 문자 체계사에서 가장 위대한 지적 성취 중 하나이다.", bio: "Geoffrey Sampson (1944–) is a Professor of Linguistics and Computing at the University of Sussex. He classified Hangul as a 'featural writing system.'", context: "A Western scholar ranking Hangul as the greatest achievement in the history of writing systems carries profound significance." },
    { text: "세종대왕은 한국의 레오나르도 다빈치다", author: "Jared Diamond", source: "Author of Guns, Germs & Steel, UCLA", accent: "gold", image: "/images/jared-diamond.jpg", fullText: "세종대왕은 한국의 레오나르도 다빈치다. 한글은 전 세계에서 가장 합리적인 문자다.", bio: "Jared Diamond (1937–) is a Pulitzer Prize-winning author and UCLA professor.", context: "A Pulitzer-winning scientist comparing King Sejong to da Vinci demonstrates that Hangul's creation is one of humanity's great intellectual achievements." },
    { text: "한글은 그 자체로 하나의 예술이자 과학이다", author: "Edwin Reischauer", source: "Harvard East Asian Studies Professor", accent: "jade", image: "/images/edwin-reischauer.png", fullText: "한글은 그 자체로 하나의 예술이자 과학이다. 세계 어디에서도 이토록 체계적이면서 아름다운 문자를 찾기 어렵다.", bio: "Edwin O. Reischauer (1910–1990) was a Harvard East Asian Studies scholar and former U.S. Ambassador to Japan.", context: "One of the Western scholars who best understood East Asia called Hangul both 'art' and 'science' simultaneously." },
    { text: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다", author: "John Man", source: "Alpha Beta, 2000", accent: "vermillion", image: "/images/john-man.jpg", fullText: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다. 간결하면서도 체계적이며, 과학적이면서도 배우기 쉬운 이 문자는 인류 지성의 위대한 산물이다.", bio: "John Man (1941–) is a British historian and travel writer. In 'Alpha Beta,' he called Hangul 'the dream of all alphabets.'", context: "This assessment, coming after comparing thousands of writing systems worldwide, is one of the highest tributes to Hangul." },
    { text: "한글은 세계에서 가장 훌륭한 문자이며, 한글을 만든 세종대왕은 천재 중의 천재다", author: "Pearl S. Buck", source: "Nobel Literature Laureate", accent: "jade", image: "/images/pearl-buck.jpg", fullText: "한글은 세계에서 가장 단순하면서도 가장 훌륭한 문자다. 세종대왕은 한국의 레오나르도 다빈치보다 위대한 인물이다.", bio: "Pearl S. Buck (1892–1973) was an American novelist who won the Nobel Prize in Literature in 1938.", context: "A Nobel laureate calling Hangul 'the finest writing system in the world' is the highest praise from a literary perspective." },
    { text: "한글은 세계에서 가장 과학적인 표기 체계다", author: "Robert Ramsey", source: "University of Maryland, Linguistics", accent: "vermillion", image: "/images/robert-ramsey.jpg", fullText: "한글은 세계에서 가장 과학적인 표기 체계다. 자음 글자의 모양이 발음할 때 혀와 입의 모양을 본뜬 것은 놀라운 발상이다.", bio: "S. Robert Ramsey is a Professor of Linguistics at the University of Maryland specializing in Korean and East Asian languages.", context: "After comparing numerous writing systems, he declared that only Hangul deserves the adjective 'scientific.'" },
    { text: "한글은 세계 문자 가운데 가장 진보한 글자다", author: "Umeda Hiroyuki", source: "Tokyo Univ. of Foreign Studies, Japan", accent: "gold", image: "/images/umeda-hiroyuki.jpg", fullText: "한글은 세계 문자 가운데 가장 진보한 글자다. 한글은 독창적이고 과학적인 최고의 걸작이다.", bio: "Umeda Hiroyuki (1930–) is a Professor of Korean Studies at Tokyo University of Foreign Studies, a pioneer of Korean language research in Japan.", context: "A Japanese scholar from the same East Asian cultural sphere acknowledging Hangul's superiority holds special significance." },
  ],
  ja: [
    { text: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄", author: "世宗大王", source: "訓民正音御製序文, 1446", accent: "vermillion", image: "/images/sejong.jpg", fullText: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄, 이런 전차로 어린 백셩이 니르고져 홀 배 이셔도 마참내 제 뜨들 시러 펴디 못할 노미 하니라.", bio: "世宗大王(1397～1450)は朝鮮の第4代王です。最大の業績は訓民正音の創製です。", context: "この序文は、世宗自身の声でハングル創製の理由を明かした文章です。" },
    { text: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라", author: "周時経", source: "国語文法, 1910", accent: "gold", image: "/images/jusigyeong.png", fullText: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라.", bio: "周時経(1876～1914)は韓国近代国語学の父と呼ばれる人物です。「ハングル」という名前を付けた張本人です。", context: "1910年、国を失う直前の危機の中で、周時経は言語が民族の命綱であることを力説しました。" },
    { text: "한글은 세계에서 가장 합리적인 문자이며, 그 어떤 문자보다도 뛰어나다", author: "ジェフリー・サンプソン", source: "Writing Systems, 英サセックス大学", accent: "vermillion", image: "/images/geoffrey-sampson.jpg", fullText: "한글은 독창적이고 기호와 소리의 관계가 뛰어나며, 세계 문자 체계사에서 가장 위대한 지적 성취 중 하나이다.", bio: "ジェフリー・サンプソン(1944～)は英サセックス大学の言語学教授です。ハングルを「素性文字」に分類しました。", context: "西洋の学者がハングルを世界文字史上最高の成果と評したことは大きな意義があります。" },
    { text: "세종대왕은 한국의 레오나르도 다빈치다", author: "ジャレド・ダイアモンド", source: "『銃・病原菌・鉄』著者, UCLA教授", accent: "gold", image: "/images/jared-diamond.jpg", fullText: "세종대왕은 한국의 레오나르도 다빈치다. 한글은 전 세계에서 가장 합리적인 문자다.", bio: "ジャレド・ダイアモンド(1937～)はピュリッツァー賞受賞作家でありUCLA教授です。", context: "ピュリッツァー賞受賞科学者が世宗大王をダヴィンチに例えた発言は、ハングル創製が人類知性史の偉大な業績であることを示しています。" },
    { text: "한글은 그 자체로 하나의 예술이자 과학이다", author: "エドウィン・ライシャワー", source: "ハーバード大学東アジア学教授", accent: "jade", image: "/images/edwin-reischauer.png", fullText: "한글은 그 자체로 하나의 예술이자 과학이다.", bio: "エドウィン・ライシャワー(1910～1990)はハーバード大学の東アジア学者であり、元駐日米国大使です。", context: "東アジアを最も深く理解した西洋学者の一人がハングルを「芸術」と「科学」の両方で評価しました。" },
    { text: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다", author: "ジョン・マン", source: "Alpha Beta, 2000", accent: "vermillion", image: "/images/john-man.jpg", fullText: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다.", bio: "ジョン・マン(1941～)は英国の歴史学者で旅行作家です。", context: "世界中の数千の文字を比較研究した結果としてのこの評価は、ハングルへの最高の賛辞の一つです。" },
    { text: "한글은 세계에서 가장 훌륭한 문자이며, 한글을 만든 세종대왕은 천재 중의 천재다", author: "パール・バック", source: "ノーベル文学賞受賞作家", accent: "jade", image: "/images/pearl-buck.jpg", fullText: "한글은 세계에서 가장 단순하면서도 가장 훌륭한 문자다.", bio: "パール・バック(1892～1973)は1938年ノーベル文学賞を受賞したアメリカの小説家です。", context: "ノーベル文学賞受賞者がハングルを「世界で最も優れた文字」と称したことは、文学的観点からの最高の賛辞です。" },
    { text: "한글은 세계에서 가장 과학적인 표기 체계다", author: "ロバート・ラムジー", source: "米メリーランド大学言語学教授", accent: "vermillion", image: "/images/robert-ramsey.jpg", fullText: "한글은 세계에서 가장 과학적인 표기 체계다.", bio: "ロバート・ラムジーはメリーランド大学の韓国語・東アジア言語専門の言語学教授です。", context: "多数の文字体系を比較した結果、ハングルだけが「科学的」という修飾語に値すると断言しました。" },
    { text: "한글은 세계 문자 가운데 가장 진보한 글자다", author: "梅田博之", source: "東京外国語大学", accent: "gold", image: "/images/umeda-hiroyuki.jpg", fullText: "한글은 세계 문자 가운데 가장 진보한 글자다.", bio: "梅田博之(1930～)は東京外国語大学の韓国語学教授で、日本における韓国語研究の先駆者です。", context: "同じ東アジア文化圏の日本の学者がハングルの優秀性を認めたことには特別な意味があります。" },
  ],
  zh: [
    { text: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄", author: "世宗大王", source: "训民正音御制序文, 1446", accent: "vermillion", image: "/images/sejong.jpg", fullText: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄, 이런 전차로 어린 백셩이 니르고져 홀 배 이셔도 마참내 제 뜨들 시러 펴디 못할 노미 하니라.", bio: "世宗大王(1397～1450)是朝鲜第四代国王。他最伟大的成就是创制训民正音。", context: "这篇序文以世宗本人的声音揭示了创制韩文的原因。" },
    { text: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라", author: "周时经", source: "国语文法, 1910", accent: "gold", image: "/images/jusigyeong.png", fullText: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라.", bio: "周时经(1876～1914)被称为韩国近代语言学之父。他是为韩文命名"Hangul"的人。", context: "1910年，在即将亡国的危机中，周时经力陈语言就是民族的命脉。" },
    { text: "한글은 세계에서 가장 합리적인 문자이며, 그 어떤 문자보다도 뛰어나다", author: "杰弗里·桑普森", source: "Writing Systems, 英国萨塞克斯大学", accent: "vermillion", image: "/images/geoffrey-sampson.jpg", fullText: "한글은 독창적이고 기호와 소리의 관계가 뛰어나며, 세계 문자 체계사에서 가장 위대한 지적 성취 중 하나이다.", bio: "杰弗里·桑普森(1944～)是英国萨塞克斯大学语言学教授。他将韩文归类为'特征文字体系'。", context: "西方学者将韩文评为世界文字史上最伟大的成就，意义重大。" },
    { text: "세종대왕은 한국의 레오나르도 다빈치다", author: "贾雷德·戴蒙德", source: "《枪炮、病菌与钢铁》作者, UCLA教授", accent: "gold", image: "/images/jared-diamond.jpg", fullText: "세종대왕은 한국의 레오나르도 다빈치다.", bio: "贾雷德·戴蒙德(1937～)是普利策奖获奖作家和UCLA教授。", context: "普利策奖获奖科学家将世宗大王比作达芬奇，说明韩文创制是人类智慧史上的伟大成就。" },
    { text: "한글은 그 자체로 하나의 예술이자 과학이다", author: "埃德温·赖肖尔", source: "哈佛大学东亚学教授", accent: "jade", image: "/images/edwin-reischauer.png", fullText: "한글은 그 자체로 하나의 예술이자 과학이다.", bio: "埃德温·赖肖尔(1910～1990)是哈佛大学东亚学者和前美国驻日大使。", context: "最深入了解东亚的西方学者之一同时以'艺术'和'科学'评价韩文。" },
    { text: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다", author: "约翰·曼", source: "Alpha Beta, 2000", accent: "vermillion", image: "/images/john-man.jpg", fullText: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다.", bio: "约翰·曼(1941～)是英国历史学家和旅行作家。", context: "比较研究了全世界数千种文字后得出的这一评价，是对韩文的最高赞誉之一。" },
    { text: "한글은 세계에서 가장 훌륭한 문자이며, 한글을 만든 세종대왕은 천재 중의 천재다", author: "赛珍珠", source: "诺贝尔文学奖获奖作家", accent: "jade", image: "/images/pearl-buck.jpg", fullText: "한글은 세계에서 가장 단순하면서도 가장 훌륭한 문자다.", bio: "赛珍珠(1892～1973)是1938年诺贝尔文学奖获得者。", context: "诺贝尔文学奖获得者称韩文为'世界上最优秀的文字'，是文学角度的最高赞誉。" },
    { text: "한글은 세계에서 가장 과학적인 표기 체계다", author: "罗伯特·拉姆齐", source: "美国马里兰大学语言学教授", accent: "vermillion", image: "/images/robert-ramsey.jpg", fullText: "한글은 세계에서 가장 과학적인 표기 체계다.", bio: "罗伯特·拉姆齐是马里兰大学专攻韩语和东亚语言的语言学教授。", context: "在比较了众多文字体系后，他断言只有韩文配得上'科学的'这一修饰语。" },
    { text: "한글은 세계 문자 가운데 가장 진보한 글자다", author: "梅田博之", source: "东京外国语大学", accent: "gold", image: "/images/umeda-hiroyuki.jpg", fullText: "한글은 세계 문자 가운데 가장 진보한 글자다.", bio: "梅田博之(1930～)是东京外国语大学韩语学教授，日本韩语研究的先驱。", context: "同属东亚文化圈的日本学者承认韩文的优越性，具有特殊意义。" },
  ],
  es: [
    { text: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄", author: "Rey Sejong", source: "Prefacio Real del Hunminjeongeum, 1446", accent: "vermillion", image: "/images/sejong.jpg", fullText: "나랏말싸미 듕귁에 달아 문자와로 서르 사맛디 아니할쎄, 이런 전차로 어린 백셩이 니르고져 홀 배 이셔도 마참내 제 뜨들 시러 펴디 못할 노미 하니라.", bio: "El Rey Sejong el Grande (1397–1450) fue el 4º rey de la dinastía Joseon. Su mayor logro fue la creación del Hunminjeongeum.", context: "Este prefacio revela, en la propia voz del Rey Sejong, las razones para crear un nuevo sistema de escritura." },
    { text: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라", author: "Ju Si-gyeong", source: "Gramática Coreana, 1910", accent: "gold", image: "/images/jusigyeong.png", fullText: "말이 오르면 나라도 오르고, 말이 내리면 나라도 내리나니라.", bio: "Ju Si-gyeong (1876–1914) es el padre de la lingüística coreana moderna. Acuñó el nombre 'Hangul.'", context: "En 1910, al borde de perder su nación, Ju Si-gyeong argumentó que el idioma es la línea vital de un pueblo." },
    { text: "한글은 세계에서 가장 합리적인 문자이며, 그 어떤 문자보다도 뛰어나다", author: "Geoffrey Sampson", source: "Writing Systems, Universidad de Sussex", accent: "vermillion", image: "/images/geoffrey-sampson.jpg", fullText: "한글은 독창적이고 기호와 소리의 관계가 뛰어나며, 세계 문자 체계사에서 가장 위대한 지적 성취 중 하나이다.", bio: "Geoffrey Sampson (1944–) es profesor de Lingüística en la Universidad de Sussex. Clasificó el Hangul como 'sistema de escritura de rasgos.'", context: "Que un académico occidental clasifique el Hangul como el mayor logro en la historia de los sistemas de escritura tiene un profundo significado." },
    { text: "세종대왕은 한국의 레오나르도 다빈치다", author: "Jared Diamond", source: "Autor de Armas, Gérmenes y Acero, UCLA", accent: "gold", image: "/images/jared-diamond.jpg", fullText: "세종대왕은 한국의 레오나르도 다빈치다.", bio: "Jared Diamond (1937–) es un autor ganador del Pulitzer y profesor de UCLA.", context: "Un científico ganador del Pulitzer comparando al Rey Sejong con da Vinci demuestra que la creación del Hangul es uno de los grandes logros intelectuales de la humanidad." },
    { text: "한글은 그 자체로 하나의 예술이자 과학이다", author: "Edwin Reischauer", source: "Profesor de Estudios de Asia Oriental, Harvard", accent: "jade", image: "/images/edwin-reischauer.png", fullText: "한글은 그 자체로 하나의 예술이자 과학이다.", bio: "Edwin O. Reischauer (1910–1990) fue académico de Harvard y ex embajador de EE.UU. en Japón.", context: "Uno de los académicos occidentales que mejor entendió Asia Oriental llamó al Hangul 'arte' y 'ciencia' simultáneamente." },
    { text: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다", author: "John Man", source: "Alpha Beta, 2000", accent: "vermillion", image: "/images/john-man.jpg", fullText: "한글은 모든 언어가 꿈꾸는 최고의 알파벳이다.", bio: "John Man (1941–) es un historiador y escritor de viajes británico.", context: "Esta evaluación, tras comparar miles de sistemas de escritura, es uno de los mayores tributos al Hangul." },
    { text: "한글은 세계에서 가장 훌륭한 문자이며, 한글을 만든 세종대왕은 천재 중의 천재다", author: "Pearl S. Buck", source: "Laureada del Nobel de Literatura", accent: "jade", image: "/images/pearl-buck.jpg", fullText: "한글은 세계에서 가장 단순하면서도 가장 훌륭한 문자다.", bio: "Pearl S. Buck (1892–1973) fue una novelista estadounidense ganadora del Nobel de Literatura en 1938.", context: "Una laureada del Nobel llamando al Hangul 'el mejor sistema de escritura del mundo' es el mayor elogio desde una perspectiva literaria." },
    { text: "한글은 세계에서 가장 과학적인 표기 체계다", author: "Robert Ramsey", source: "Universidad de Maryland, Lingüística", accent: "vermillion", image: "/images/robert-ramsey.jpg", fullText: "한글은 세계에서 가장 과학적인 표기 체계다.", bio: "S. Robert Ramsey es profesor de Lingüística en la Universidad de Maryland especializado en coreano.", context: "Después de comparar numerosos sistemas de escritura, declaró que solo el Hangul merece el adjetivo 'científico.'" },
    { text: "한글은 세계 문자 가운데 가장 진보한 글자다", author: "Umeda Hiroyuki", source: "Univ. de Estudios Extranjeros de Tokio", accent: "gold", image: "/images/umeda-hiroyuki.jpg", fullText: "한글은 세계 문자 가운데 가장 진보한 글자다.", bio: "Umeda Hiroyuki (1930–) es profesor de Estudios Coreanos en la Universidad de Estudios Extranjeros de Tokio.", context: "Que un académico japonés de la misma esfera cultural de Asia Oriental reconozca la superioridad del Hangul tiene un significado especial." },
  ],
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Quotes = () => {
  const { t, locale } = useI18n();
  const quotes = quotesData[locale] || quotesData.ko;
  const [selected, setSelected] = useState<Quote | null>(null);

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
              {t("quotes.title")}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("quotes.desc")}
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
                q.accent === "vermillion" ? "border-l-vermillion"
                : q.accent === "gold" ? "border-l-gold"
                : "border-l-jade";
              const textColor =
                q.accent === "vermillion" ? "text-vermillion"
                : q.accent === "gold" ? "text-gold"
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
                      <img src={q.image} alt={q.author} className="w-10 h-10 rounded-full object-cover border border-border" />
                    ) : (
                      <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg font-black ${textColor}`}>
                        {q.author[0]}
                      </div>
                    )}
                    <div>
                      <cite className={`text-sm font-bold ${textColor} not-italic`}>{q.author}</cite>
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
        title={`${selected?.author}${t("quotes.modalTitle")}`}
        description={`${selected?.author}${t("quotes.modalTitle")}`}
      >
        {selected && (() => {
          const accentText =
            selected.accent === "vermillion" ? "text-vermillion"
            : selected.accent === "gold" ? "text-gold"
            : "text-jade";
          const accentBorder =
            selected.accent === "vermillion" ? "border-vermillion"
            : selected.accent === "gold" ? "border-gold"
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
                  <img src={selected.image} alt={selected.author} className="w-14 h-14 rounded-full object-cover border-2 border-border" />
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
                <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-3">{t("quotes.modalWho")}</h4>
                <p className="text-sm text-foreground/80 leading-[1.85]">{selected.bio}</p>
              </div>

              <div className="bg-muted/50 rounded-sm p-5">
                <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-3">{t("quotes.modalContext")}</h4>
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
