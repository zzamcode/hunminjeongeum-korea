import { useState } from "react";
import { motion } from "framer-motion";
import ResponsiveModal from "@/components/ResponsiveModal";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useI18n, type Locale } from "@/lib/i18n";

type Fact = {
  title: string;
  desc: string;
  icon: string;
  image: string;
  detail: { fullDesc: string; history: string; significance: string };
};

type GlobalItem = {
  title: string;
  location: string;
  desc: string;
  image: string;
  detail: string;
};

type HangulDayQuote = {
  text: string;
  lines: string[];
};

const quoteData: Record<Locale, HangulDayQuote> = {
  ko: {
    text: "",
    lines: [
      "슬기로운 사람은 아침나절이 되기 전에 이를 깨우치고,",
      "어리석은 사람이라도 열흘이면 배울 수 있다.",
      "이 28자를 가지고 천하의 만물을 적을 수 있으니,",
      "비록 바람 소리, 학의 울음, 닭의 홰치는 소리,",
      "개 짖는 소리일지라도 모두 적을 수 있느니라.",
    ],
  },
  en: {
    text: "",
    lines: [
      "A wise person can learn it before morning is over,",
      "and even a foolish person can learn it within ten days.",
      "With these 28 letters, one can write all things under heaven,",
      "even the sound of the wind, the cry of the crane,",
      "the crowing of the rooster, and the barking of a dog.",
    ],
  },
  ja: {
    text: "",
    lines: [
      "賢い者は朝が来る前に悟り、",
      "愚かな者でも十日あれば学ぶことができる。",
      "この28字をもって天下の万物を書くことができ、",
      "たとえ風の音、鶴の鳴き声、鶏の声、",
      "犬の吠え声であっても、すべて書くことができる。",
    ],
  },
  zh: {
    text: "",
    lines: [
      "聪慧之人，日出之前即可领悟；",
      "愚笨之人，十日之内亦能学会。",
      "以此二十八字，可书写天下万物，",
      "纵是风声、鹤鸣、鸡啼、",
      "犬吠之声，亦皆可以记之。",
    ],
  },
  es: {
    text: "",
    lines: [
      "Una persona sabia puede aprenderlo antes de que acabe la mañana,",
      "y hasta un necio puede aprenderlo en diez días.",
      "Con estas 28 letras se puede escribir todo bajo el cielo,",
      "incluso el sonido del viento, el grito de la grulla,",
      "el canto del gallo y el ladrido del perro.",
    ],
  },
};

const factsData: Record<Locale, Fact[]> = {
  ko: [
    { title: "10월 9일, 한글날", desc: "문자에 국경일을 바친 나라는 대한민국이 유일합니다.", icon: "📅", image: "/images/fact-hangulday.jpg", detail: { fullDesc: "전 세계 수천 개의 문자 중, 자신의 탄생일에 국경일을 가진 문자는 한글이 유일합니다. 영어 알파벳의 생일을 아는 사람이 있을까요? 아랍 문자의 탄생일은요? 그 누구도 모릅니다. 하지만 한글은 다릅니다. 1446년 음력 9월 상순, 세종대왕이 훈민정음을 세상에 반포한 그 날을 우리는 정확히 알고 있고, 매년 그날을 기념합니다.", history: "한글날의 역사는 1926년으로 거슬러 올라갑니다. 조선어연구회(현 한글학회)가 음력 9월 29일을 '가갸날'로 정한 것이 시작이었습니다. 1928년 '한글날'로 이름이 바뀌었고, 양력으로 환산하여 10월 9일이 되었습니다. 1970년 공휴일로 지정되었다가 1991년 공휴일에서 제외되는 아픔을 겪었지만, 한글을 사랑하는 시민들의 꾸준한 노력 끝에 2013년 다시 공휴일로 부활했습니다.", significance: "한글날은 단순한 기념일이 아닙니다. 580년 전, 왕이 백성을 위해 직접 문자를 만들었다는 사실 — 이것은 세계 역사에서 전례가 없는 일입니다. 한글날은 세종대왕의 '애민정신(愛民精神)'을 되새기고, 문자가 단순한 도구가 아니라 인간 존엄성의 표현이라는 깊은 뜻을 기리는 날입니다." } },
    { title: "유네스코 세계기록유산", desc: "문자 창제 원리를 기록한 유일한 문헌, 훈민정음 해례본.", icon: "🏛️", image: "/images/fact-unesco.jpg", detail: { fullDesc: "1997년 10월, 훈민정음 해례본이 유네스코 세계기록유산에 등재되었습니다. 해례본이 특별한 이유는 명확합니다 — 이 책은 문자가 '왜' 만들어졌는지, '어떤 원리'로 만들어졌는지, 각 글자의 '발음 방법'까지 모두 설명합니다. 이런 문서는 인류 역사상 유일합니다. 라틴 알파벳도, 한자도, 아랍 문자도 자신의 탄생 설명서를 가지고 있지 않습니다.", history: "해례본은 약 500년간 자취를 감추었습니다. 학자들은 이 책의 존재만 알고 있었을 뿐, 실물을 본 사람은 없었습니다. 그러다 1940년, 경북 안동의 한 고택에서 극적으로 발견됩니다. 발견자 이용준은 이 책의 가치를 즉시 알아보았고, 한국전쟁 중에도 이 책을 품에 안고 피난했다고 전해집니다. 현재 간송미술관에 소장된 이 보물은 대한민국 국보 제70호입니다.", significance: "해례본의 가장 놀라운 점은 자음의 기본 글자 5개(ㄱ, ㄴ, ㅁ, ㅅ, ㅇ)가 발음할 때의 혀와 입, 목구멍의 모양을 본뜬 것이라는 설명입니다. 'ㄱ'은 혀뿌리가 목구멍을 막는 모양, 'ㄴ'은 혀끝이 윗잇몸에 닿는 모양입니다. 이처럼 인체의 발음 기관을 과학적으로 분석하여 문자를 만든 것은 세계 언어학 역사상 전무후무한 사건입니다." } },
    { title: "세종대왕 문해상", desc: "세종의 이름으로, 세계 문맹 퇴치에 공헌한 이들을 기립니다.", icon: "🏆", image: "/images/fact-literacy.jpg", detail: { fullDesc: "유네스코 세종대왕 문해상(UNESCO King Sejong Literacy Prize)은 전 세계에서 문맹 퇴치에 가장 큰 공헌을 한 개인이나 단체에 수여하는 국제상입니다. 매년 2개 단체가 수상하며, 각 수상자에게 미화 2만 달러의 상금이 주어집니다. 지금까지 아프리카, 아시아, 남미 등 다양한 지역의 문해 교육 단체들이 이 상을 수상했습니다.", history: "1989년 대한민국 정부의 제안으로 제정되었으며, 매년 9월 8일 '세계 문해의 날(International Literacy Day)'에 시상합니다. 유네스코에는 문해 관련 상이 두 개 있는데, 하나는 '공자 문해상', 그리고 다른 하나가 바로 '세종대왕 문해상'입니다. 580년 전 백성의 문맹을 해결하기 위해 문자를 만든 세종의 정신이 21세기에도 이어지고 있는 것입니다.", significance: "이 상의 이름이 세종대왕인 것은 결코 우연이 아닙니다. 유네스코는 세종이야말로 '문해 운동의 원조'라고 인정한 것입니다. 15세기에 글을 모르는 백성을 위해 왕이 직접 쉬운 문자를 만든 것 — 이것이야말로 인류 최초의 문해 운동이 아닐까요? 세종의 '나랏말싸미 듕귁에 달아(우리나라 말이 중국과 달라)'라는 서문은 문해의 평등을 선언한 역사적 문장입니다." } },
    { title: "세계문자올림픽 금메달", desc: "2009년, 16개국 문자가 겨루었고 한글이 1등을 차지했습니다.", icon: "🥇", image: "/images/fact-olympics.jpg", detail: { fullDesc: "2009년 10월, 서울에서 열린 제1회 세계문자올림픽(World Alphabet Olympics)에서 한글이 금메달을 차지했습니다. 이 대회에는 그리스 알파벳, 라틴 알파벳, 인도 데바나가리, 태국 문자, 에티오피아 그으즈 문자 등 16개국의 문자가 참가했습니다. 그 중 한글이 종합 1등, 인도 텔루구 문자가 2등을 차지했습니다.", history: "심사 기준은 다섯 가지였습니다: ① 문자의 기원(독창성), ② 구조(체계성), ③ 글자 수(효율성), ④ 결합 능력(확장성), ⑤ 독립성과 응용성. 한글은 모든 항목에서 높은 점수를 받았습니다. 특히 '24개 글자로 약 11,000개 이상의 음절을 조합할 수 있다'는 점과 '창제 원리가 명확히 기록되어 있다'는 점이 결정적이었습니다. 2012년에 열린 제2회 대회에서도 한글은 다시 1등을 차지했습니다.", significance: "물론 문자에 우열을 가리는 것은 논란이 있을 수 있습니다. 하지만 이 대회가 보여준 것은 분명합니다 — 한글의 과학적 구조는 세계 어느 문자와 비교해도 독보적이라는 것입니다. 자음은 발음 기관의 모양을, 모음은 천(·)·지(ㅡ)·인(ㅣ)의 철학을 담고 있으며, 이 글자들이 초성·중성·종성으로 조합되어 네모꼴의 음절을 만드는 시스템은 580년 전의 발명이라고는 믿기 어려울 만큼 현대적입니다." } },
  ],
  en: [
    { title: "October 9, Hangul Day", desc: "South Korea is the only country to dedicate a national holiday to its writing system.", icon: "📅", image: "/images/fact-hangulday.jpg", detail: { fullDesc: "Among thousands of writing systems worldwide, Hangul is the only one with a national holiday celebrating its birthday. Does anyone know the birthday of the Latin alphabet? Or when Arabic script was born? Nobody does. But Hangul is different. We know the exact date — the upper ten days of the ninth lunar month of 1446 — when King Sejong proclaimed Hunminjeongeum to the world, and we celebrate it every year.", history: "Hangul Day dates back to 1926, when the Korean Language Research Society designated the 29th day of the 9th lunar month as 'Gagya Day.' Renamed 'Hangul Day' in 1928 and converted to October 9 on the solar calendar. It became a public holiday in 1970, was removed in 1991, but was restored in 2013 after persistent efforts by citizens who loved Hangul.", significance: "Hangul Day is more than a memorial day. The fact that a king personally created a writing system for his people 580 years ago is unprecedented in world history. Hangul Day commemorates King Sejong's philosophy that writing is not merely a tool, but an expression of human dignity." } },
    { title: "UNESCO Memory of the World", desc: "The Hunminjeongeum Haerye — the only document recording a writing system's creation principles.", icon: "🏛️", image: "/images/fact-unesco.jpg", detail: { fullDesc: "In October 1997, the Hunminjeongeum Haerye was inscribed as a UNESCO Memory of the World. What makes it special is clear — this book explains why the script was created, the principles behind it, and how each letter should be pronounced. Such a document is unique in human history. Neither the Latin alphabet, Chinese characters, nor Arabic script has its own birth certificate.", history: "The Haerye was lost for nearly 500 years. Scholars knew of its existence but no one had seen the actual book. Then in 1940, it was dramatically discovered in an old house in Andong. The discoverer reportedly carried it against his chest even while fleeing during the Korean War. Now housed in the Kansong Art Museum, it is Korean National Treasure No. 70.", significance: "The most remarkable aspect is the explanation that the five basic consonants (ㄱ, ㄴ, ㅁ, ㅅ, ㅇ) were designed after the shapes of the speech organs during pronunciation. 'ㄱ' mimics the tongue root blocking the throat; 'ㄴ' represents the tongue tip touching the upper gum. This scientific analysis of human articulatory organs to create a writing system is unprecedented in linguistic history." } },
    { title: "King Sejong Literacy Prize", desc: "In King Sejong's name, honoring those who contribute to global literacy.", icon: "🏆", image: "/images/fact-literacy.jpg", detail: { fullDesc: "The UNESCO King Sejong Literacy Prize is an international award given to individuals and organizations making the greatest contributions to global literacy. Two organizations receive the prize annually, each awarded $20,000 USD. Recipients have come from Africa, Asia, South America, and beyond.", history: "Established in 1989 at the proposal of the Korean government. Awarded annually on September 8, International Literacy Day. UNESCO has two literacy prizes: the Confucius Prize for Literacy and the King Sejong Literacy Prize. The spirit of a king who created a writing system to solve his people's illiteracy 580 years ago lives on in the 21st century.", significance: "The fact that this prize bears King Sejong's name is no coincidence. UNESCO recognizes Sejong as the pioneer of literacy movements. A king creating an easy writing system for his illiterate people in the 15th century — isn't this humanity's first literacy campaign? Sejong's preface declaring 'our nation's language differs from Chinese' was a historic declaration of equality in literacy." } },
    { title: "World Alphabet Olympics Gold", desc: "In 2009, Hangul won first place among 16 countries' writing systems.", icon: "🥇", image: "/images/fact-olympics.jpg", detail: { fullDesc: "In October 2009, at the 1st World Alphabet Olympics held in Seoul, Hangul won the gold medal. Sixteen writing systems competed, including the Greek alphabet, Latin alphabet, Indian Devanagari, Thai script, and Ethiopian Ge'ez. Hangul took first place overall, with Indian Telugu script in second.", history: "Five criteria were evaluated: ① Origin (originality), ② Structure (systematicity), ③ Number of letters (efficiency), ④ Combination ability (expandability), ⑤ Independence and applicability. Hangul scored high in all categories. The decisive factors were that '24 letters can combine into over 11,000 syllables' and that 'creation principles are clearly documented.' Hangul won first place again at the 2nd competition in 2012.", significance: "While ranking writing systems is debatable, this competition demonstrated something undeniable — Hangul's scientific structure is unparalleled among world writing systems. Consonants mirror speech organ shapes; vowels embody the philosophy of Heaven (·), Earth (ㅡ), and Human (ㅣ). The system of combining initial, medial, and final sounds into square syllable blocks is astonishingly modern for a 580-year-old invention." } },
  ],
  ja: [
    { title: "10月9日、ハングルの日", desc: "文字に祝日を捧げた国は韓国が世界で唯一です。", icon: "📅", image: "/images/fact-hangulday.jpg", detail: { fullDesc: "世界中の数千の文字の中で、誕生日に祝日を持つ文字はハングルだけです。ラテンアルファベットの誕生日を知っている人はいますか？アラビア文字の誕生日は？誰も知りません。しかしハングルは違います。1446年陰暦9月上旬、世宗大王が訓民正音を世に公布したその日を、私たちは正確に知っており、毎年その日を記念しています。", history: "ハングルの日は1926年に遡ります。朝鮮語研究会が陰暦9月29日を「カギャの日」と定めたのが始まりでした。1928年に「ハングルの日」と改名され、陽暦10月9日となりました。1970年に公休日に指定されましたが1991年に外されました。しかしハングルを愛する市民たちの粘り強い努力により、2013年に再び公休日として復活しました。", significance: "ハングルの日は単なる記念日ではありません。580年前、王が民のために自ら文字を作ったという事実——これは世界の歴史に前例のないことです。ハングルの日は、文字が単なる道具ではなく、人間の尊厳の表現であるという深い意味を記念する日です。" } },
    { title: "ユネスコ世界記録遺産", desc: "文字創製原理を記録した唯一の文献、訓民正音解例本。", icon: "🏛️", image: "/images/fact-unesco.jpg", detail: { fullDesc: "1997年10月、訓民正音解例本がユネスコ世界記録遺産に登録されました。この本は文字が「なぜ」作られたのか、「どのような原理」で作られたのか、各文字の「発音方法」まですべて説明しています。このような文書は人類の歴史上唯一です。", history: "解例本は約500年間行方不明でした。学者たちはこの本の存在だけを知っていましたが、実物を見た人はいませんでした。1940年、慶北安東の古宅で劇的に発見されました。発見者は韓国戦争中もこの本を胸に抱いて避難したと伝えられています。現在は澗松美術館に所蔵されている韓国国宝第70号です。", significance: "最も驚くべき点は、基本子音5つ（ㄱ、ㄴ、ㅁ、ㅅ、ㅇ）が発音時の舌や口、喉の形を模したものだという説明です。「ㄱ」は舌根が喉を塞ぐ形、「ㄴ」は舌先が上の歯茎に触れる形です。人体の発音器官を科学的に分析して文字を作ったことは、世界の言語学史上前代未聞の出来事です。" } },
    { title: "世宗大王識字賞", desc: "世宗の名のもと、世界の識字率向上に貢献した人々を称えます。", icon: "🏆", image: "/images/fact-literacy.jpg", detail: { fullDesc: "ユネスコ世宗大王識字賞は、世界の識字率向上に最も貢献した個人や団体に授与される国際賞です。毎年2団体が受賞し、各受賞者に2万ドルの賞金が贈られます。アフリカ、アジア、南米など多様な地域の識字教育団体がこの賞を受賞してきました。", history: "1989年に韓国政府の提案で制定されました。毎年9月8日の「世界識字デー」に授与されます。ユネスコには識字関連の賞が2つあり、「孔子識字賞」と「世宗大王識字賞」です。580年前に民の文盲を解決するために文字を作った世宗の精神が、21世紀にも受け継がれています。", significance: "この賞が世宗大王の名を冠しているのは偶然ではありません。ユネスコは世宗こそが「識字運動の元祖」と認めたのです。15世紀に文字を知らない民のために、王が自ら易しい文字を作ったこと――これこそ人類最初の識字運動ではないでしょうか。" } },
    { title: "世界文字オリンピック金メダル", desc: "2009年、16カ国の文字が競い、ハングルが1位を獲得しました。", icon: "🥇", image: "/images/fact-olympics.jpg", detail: { fullDesc: "2009年10月にソウルで開催された第1回世界文字オリンピックでハングルが金メダルを獲得しました。ギリシャ文字、ラテン文字、インドのデーヴァナーガリー、タイ文字、エチオピアのゲエズ文字など16カ国の文字が参加し、ハングルが総合1位、インドのテルグ文字が2位でした。", history: "審査基準は5つ：①起源（独創性）、②構造（体系性）、③文字数（効率性）、④結合能力（拡張性）、⑤独立性と応用性。ハングルは全項目で高得点を獲得しました。「24文字で約11,000以上の音節を組み合わせられる」点と「創製原理が明確に記録されている」点が決定的でした。2012年の第2回大会でもハングルは再び1位を獲得しました。", significance: "文字に優劣をつけることには議論の余地がありますが、この大会が示したことは明らかです——ハングルの科学的構造は世界のどの文字と比較しても独自のものです。子音は発音器官の形を、母音は天(·)・地(ㅡ)・人(ㅣ)の哲学を含み、初声・中声・終声として組み合わさり四角い音節を作るシステムは、580年前の発明とは信じがたいほど現代的です。" } },
  ],
  zh: [
    { title: "10月9日，韩文日", desc: "韩国是世界上唯一为文字设立国庆日的国家。", icon: "📅", image: "/images/fact-hangulday.jpg", detail: { fullDesc: "在全世界数千种文字中，韩文是唯一拥有国庆日的文字。有人知道拉丁字母的生日吗？阿拉伯文字诞生于何时？没人知道。但韩文不同。1446年农历九月上旬，世宗大王向世界公布训民正音的那一天，我们确切地知道，并每年纪念。", history: "韩文日可以追溯到1926年。朝鲜语研究会将农历9月29日定为「嘎嘉日」，这是开始。1928年改名为「韩文日」，换算为阳历10月9日。1970年被指定为公休日，1991年被取消，但在热爱韩文的市民们的不懈努力下，2013年重新恢复为公休日。", significance: "韩文日不仅仅是一个纪念日。580年前，国王亲自为百姓创造文字——这在世界历史上史无前例。韩文日纪念的是世宗大王的「爱民精神」，以及文字不仅是工具，更是人类尊严的表达这一深刻意义。" } },
    { title: "UNESCO世界记忆遗产", desc: "记录文字创制原理的唯一文献——训民正音解例本。", icon: "🏛️", image: "/images/fact-unesco.jpg", detail: { fullDesc: "1997年10月，训民正音解例本被列入联合国教科文组织世界记忆遗产。这本书解释了文字「为何」被创造、以「什么原理」创造、以及每个字母的「发音方法」。这样的文献在人类历史上绝无仅有。", history: "解例本失踪近500年。学者们只知道它的存在，却没有人见过实物。1940年，它在庆北安东的一座古宅中被戏剧性地发现。据说发现者在韩战期间将其抱在胸前逃难。现藏于涧松美术馆，是韩国国宝第70号。", significance: "最令人惊叹的是，5个基本辅音（ㄱ、ㄴ、ㅁ、ㅅ、ㅇ）是模仿发音时舌头、嘴巴和喉咙的形状而设计的。「ㄱ」模仿舌根阻塞喉咙的形状，「ㄴ」代表舌尖触及上牙龈的形状。这种科学分析人体发音器官来创造文字的做法，在世界语言学史上绝无仅有。" } },
    { title: "世宗大王扫盲奖", desc: "以世宗之名，表彰为全球扫盲做出贡献的人。", icon: "🏆", image: "/images/fact-literacy.jpg", detail: { fullDesc: "联合国教科文组织世宗大王扫盲奖授予对全球扫盲做出最大贡献的个人或团体。每年有2个团体获奖，各获得2万美元奖金。来自非洲、亚洲、南美等各地的扫盲教育团体都曾获得此奖。", history: "1989年在韩国政府提议下设立，每年9月8日「世界扫盲日」颁奖。联合国教科文组织设有两个扫盲相关奖项：「孔子扫盲奖」和「世宗大王扫盲奖」。580年前为解决百姓文盲问题而创造文字的世宗精神，在21世纪延续着。", significance: "这个奖以世宗大王命名绝非偶然。联合国教科文组织认为世宗是「扫盲运动的鼻祖」。15世纪，国王亲自为不识字的百姓创造简易文字——这难道不是人类最早的扫盲运动吗？" } },
    { title: "世界文字奥林匹克金牌", desc: "2009年，16个国家的文字竞赛中韩文获得第一名。", icon: "🥇", image: "/images/fact-olympics.jpg", detail: { fullDesc: "2009年10月在首尔举办的第1届世界文字奥林匹克中，韩文获得金牌。希腊字母、拉丁字母、印度天城文、泰文、埃塞俄比亚吉兹文等16国文字参赛，韩文获得综合第一，印度泰卢固文字第二。", history: "评审标准有五项：①起源（独创性）、②结构（系统性）、③字母数（效率性）、④组合能力（扩展性）、⑤独立性和应用性。韩文在所有项目中都获得高分。「24个字母可组合出约11,000个以上音节」和「创制原理有明确记录」是决定性因素。2012年第2届比赛中韩文再次获得第一。", significance: "虽然给文字排名有争议，但这次比赛清楚地表明——韩文的科学结构在世界文字中独树一帜。辅音模仿发音器官的形状，元音蕴含天(·)、地(ㅡ)、人(ㅣ)的哲学，初声、中声、终声组合成方块音节的系统，对于580年前的发明来说，现代得令人难以置信。" } },
  ],
  es: [
    { title: "9 de octubre, Día del Hangul", desc: "Corea del Sur es el único país que dedicó una fiesta nacional a su escritura.", icon: "📅", image: "/images/fact-hangulday.jpg", detail: { fullDesc: "Entre miles de sistemas de escritura del mundo, el Hangul es el único con un feriado nacional celebrando su nacimiento. ¿Alguien conoce el cumpleaños del alfabeto latino? ¿O cuándo nació la escritura árabe? Nadie lo sabe. Pero el Hangul es diferente. Sabemos la fecha exacta — los primeros diez días del noveno mes lunar de 1446 — cuando el Rey Sejong proclamó el Hunminjeongeum al mundo.", history: "El Día del Hangul se remonta a 1926, cuando la Sociedad de Investigación de la Lengua Coreana designó el día 29 del noveno mes lunar como 'Día Gagya.' Renombrado 'Día del Hangul' en 1928 y convertido al 9 de octubre del calendario solar. Se convirtió en feriado público en 1970, fue eliminado en 1991, pero fue restaurado en 2013 tras los persistentes esfuerzos de los ciudadanos.", significance: "El Día del Hangul es más que un día conmemorativo. El hecho de que un rey creara personalmente un sistema de escritura para su pueblo hace 580 años no tiene precedentes en la historia mundial. El Día del Hangul conmemora la filosofía del Rey Sejong de que la escritura no es solo una herramienta, sino una expresión de la dignidad humana." } },
    { title: "Patrimonio de la Memoria de la UNESCO", desc: "El Haerye del Hunminjeongeum — el único documento que registra los principios de creación de un sistema de escritura.", icon: "🏛️", image: "/images/fact-unesco.jpg", detail: { fullDesc: "En octubre de 1997, el Haerye fue inscrito como Patrimonio de la Memoria del Mundo de la UNESCO. Este libro explica por qué se creó la escritura, con qué principios y cómo pronunciar cada letra. Tal documento es único en la historia humana.", history: "El Haerye estuvo perdido durante casi 500 años. Los eruditos conocían su existencia pero nadie había visto el libro real. En 1940, fue descubierto dramáticamente en una antigua casa en Andong. Se dice que el descubridor lo llevó contra su pecho mientras huía durante la Guerra de Corea. Actualmente es el Tesoro Nacional Coreano N.° 70.", significance: "Lo más notable es la explicación de que las cinco consonantes básicas (ㄱ, ㄴ, ㅁ, ㅅ, ㅇ) fueron diseñadas imitando las formas de los órganos del habla durante la pronunciación. Este análisis científico de los órganos articulatorios humanos para crear una escritura no tiene precedentes en la historia lingüística." } },
    { title: "Premio de Alfabetización Rey Sejong", desc: "En nombre del Rey Sejong, honrando a quienes contribuyen a la alfabetización global.", icon: "🏆", image: "/images/fact-literacy.jpg", detail: { fullDesc: "El Premio de Alfabetización Rey Sejong de la UNESCO se otorga a individuos y organizaciones que más contribuyen a la alfabetización global. Dos organizaciones reciben el premio anualmente, cada una con $20,000 USD. Los ganadores han venido de África, Asia, Sudamérica y más.", history: "Establecido en 1989 a propuesta del gobierno coreano. Se otorga anualmente el 8 de septiembre, Día Internacional de la Alfabetización. La UNESCO tiene dos premios de alfabetización: el Premio Confucio y el Premio Rey Sejong. El espíritu de un rey que creó una escritura para resolver el analfabetismo de su pueblo hace 580 años vive en el siglo XXI.", significance: "Que este premio lleve el nombre del Rey Sejong no es casualidad. La UNESCO reconoce a Sejong como el pionero de los movimientos de alfabetización. Un rey creando un sistema de escritura fácil para su pueblo analfabeto en el siglo XV — ¿no es esta la primera campaña de alfabetización de la humanidad?" } },
    { title: "Oro en las Olimpiadas del Alfabeto Mundial", desc: "En 2009, el Hangul ganó el primer lugar entre los sistemas de escritura de 16 países.", icon: "🥇", image: "/images/fact-olympics.jpg", detail: { fullDesc: "En octubre de 2009, en las primeras Olimpiadas del Alfabeto Mundial en Seúl, el Hangul ganó la medalla de oro. Participaron 16 escrituras, incluyendo el alfabeto griego, latino, devanagari indio, tailandés y ge'ez etíope. El Hangul quedó primero y el telugu indio segundo.", history: "Se evaluaron cinco criterios: ① Origen (originalidad), ② Estructura (sistematicidad), ③ Número de letras (eficiencia), ④ Capacidad de combinación (expandibilidad), ⑤ Independencia y aplicabilidad. El Hangul obtuvo puntuaciones altas en todas las categorías. En las segundas Olimpiadas de 2012, el Hangul volvió a ganar el primer lugar.", significance: "Aunque clasificar escrituras es debatible, esta competición demostró algo innegable — la estructura científica del Hangul es incomparable. Las consonantes reflejan formas de los órganos del habla; las vocales encarnan la filosofía del Cielo (·), Tierra (ㅡ) y Humano (ㅣ). El sistema es asombrosamente moderno para un invento de 580 años." } },
  ],
};

const globalData: Record<Locale, GlobalItem[]> = {
  ko: [
    { title: "찌아찌아족의 한글", location: "인도네시아 부톤섬", desc: "2009년, 고유 문자가 없던 소수민족이 한글을 선택했습니다.", image: "/images/global-ciacia.png", detail: "인도네시아 술라웨시 남동쪽 부톤섬에 사는 찌아찌아족은 약 8만 명의 소수민족입니다. 그들에게는 고유한 말은 있었지만, 그 말을 적을 문자가 없었습니다. 라틴 알파벳으로는 찌아찌아어의 복잡한 발음을 제대로 표기할 수 없었죠.\n\n2009년, 한국의 훈민정음학회가 찌아찌아족에게 한글을 소개했습니다. 놀랍게도 한글은 찌아찌아어의 독특한 발음을 거의 완벽하게 표기할 수 있었습니다. 현지 초등학교에서 한글 수업이 시작되었고, 세계 최초로 한국어가 아닌 다른 언어를 적기 위한 한글 교과서가 만들어졌습니다.\n\n580년 전 세종이 '백성이 말하고자 하는 바가 있어도 쓸 수 없다'고 한탄하며 만든 한글이, 지구 반대편의 소수민족에게도 같은 선물이 된 것입니다. 이것이야말로 한글의 보편성을 증명하는 가장 아름다운 사례가 아닐까요?" },
    { title: "한국어능력시험(TOPIK)", location: "전 세계 87개국", desc: "매년 40만 명 이상이 한국어를 배우고 시험에 응시합니다.", image: "/images/global-topik.png", detail: "TOPIK(Test of Proficiency in Korean)은 1997년 약 2,700명의 응시자로 시작했습니다. 25년 뒤인 2023년, 연간 응시자 수는 40만 명을 넘어섰습니다. 무려 150배 증가입니다.\n\n흥미로운 점은 응시자들의 동기입니다. 과거에는 한국 유학이나 취업이 주된 이유였지만, 최근에는 'BTS의 노래를 원어로 이해하고 싶어서', '한국 드라마를 자막 없이 보고 싶어서'라는 이유가 급증하고 있습니다.\n\n그리고 대부분의 학습자들이 입을 모아 말합니다 — '한글은 며칠이면 읽을 수 있다.' 세종이 '슬기로운 사람은 아침나절이 되기 전에 깨우치고, 어리석은 사람이라도 열흘이면 배울 수 있다'고 한 말이 580년이 지난 지금도 그대로 증명되고 있는 셈입니다." },
    { title: "세종학당", location: "전 세계 82개국 234곳", desc: "한국어와 한글을 세계에 알리는 공공 교육 기관입니다.", image: "/images/global-sejong.png", detail: "2007년 몽골 울란바토르에 처음 문을 연 세종학당은 현재 82개국 234개소로 확대되었습니다. 프랑스 공교육 기관인 '알리앙스 프랑세즈'나 독일의 '괴테 인스티튜트'에 해당하는 한국어판이라 할 수 있습니다.\n\n세종학당에서는 한국어 수업뿐 아니라, 한글 서예, 한국 요리, K-pop 댄스, 전통 문화 체험 등 다채로운 프로그램을 제공합니다. 단순한 어학원이 아니라, 한국 문화를 체험하는 복합 문화 공간인 셈이죠.\n\n특히 인상적인 것은 '세종학당'이라는 이름입니다. 세종대왕의 이름을 딴 이 기관은 580년 전 세종이 품었던 '모든 사람이 자유롭게 글을 읽고 쓸 수 있어야 한다'는 꿈을 21세기에 전 세계로 확장하고 있습니다." },
    { title: "한글과 유니코드", location: "전 세계 디지털 환경", desc: "11,172개 음절이 체계적으로 배열된, 유니코드 속 가장 과학적인 문자 블록.", image: "/images/global-unicode.png", detail: "한글은 유니코드(Unicode)에서 '한글 음절(Hangul Syllables)' 블록에 11,172개의 완성형 음절이 배정되어 있습니다. AC00(가)부터 D7A3(힣)까지, 초성 19개 × 중성 21개 × (종성 27개 + 종성 없음 1개) = 11,172개가 수학적으로 완벽하게 배열됩니다.\n\n이것은 단순한 숫자가 아닙니다. 유니코드 위원회가 한글의 조합 원리를 그대로 인정하고, 그 수학적 체계를 코드에 반영했다는 뜻입니다. 다른 문자들이 역사적 순서나 임의 배열로 유니코드에 등록된 것과는 근본적으로 다릅니다.\n\n580년 전 세종이 설계한 '초성 + 중성 + 종성' 조합 원리가 디지털 시대에도 완벽하게 작동하는 것입니다. 어떤 프로그래머는 이렇게 말했습니다 — '한글은 마치 프로그래밍 언어처럼 설계되어 있다.'" },
    { title: "해외 대학의 한국어학과", location: "미국·유럽·아시아 주요 대학", desc: "하버드, 옥스퍼드, 소르본 등 세계 명문대에 한국어학과가 개설되어 있습니다.", image: "/images/global-university.jpg", detail: "현재 미국에서만 100개 이상의 대학이 한국어 과정을 운영하고 있으며, 한국어는 미국 대학에서 가장 빠르게 성장하는 외국어 과목 중 하나입니다. 하버드, 컬럼비아, UCLA, 옥스퍼드, 소르본, 도쿄대 등 세계 최고 명문대학들이 한국어학과를 운영하고 있습니다.\n\n특히 미국 현대언어학회(MLA)의 조사에 따르면, 2009년부터 2016년 사이 미국 대학의 한국어 수강생은 약 14% 증가했습니다. 같은 기간 프랑스어(-25%), 독일어(-29%), 일본어(-20%)가 감소한 것과 대조적입니다.\n\n이들 대학에서 한국어를 배우는 학생들의 상당수는 한글의 과학적 구조에 먼저 매료됩니다. '이렇게 논리적인 문자가 있다니!' — 이것이 서양 학생들의 공통된 첫 반응입니다." },
    { title: "한류와 한글의 세계화", location: "전 세계 190개국 이상", desc: "K-pop, K-drama, K-영화가 한글을 세계인의 일상 속으로 가져왔습니다.", image: "/images/global-hallyu.png", detail: "BTS의 노래 가사를 따라 부르기 위해, 블랙핑크의 인스타그램 댓글을 읽기 위해, '오징어 게임'의 대사를 원어로 이해하기 위해 — 전 세계 수백만 명이 한글을 배우기 시작했습니다.\n\n한류의 영향은 숫자로도 확인됩니다. 한국어 학습 앱 '두오링고'에서 한국어는 전 세계에서 7번째로 인기 있는 언어이며, 일부 국가에서는 3위 안에 들기도 합니다. 유튜브에서 '한글 배우기' 관련 영상의 총 조회수는 수억 건에 달합니다.\n\n그리고 또 하나의 흥미로운 현상이 있습니다 — 한글의 디자인적 아름다움입니다. 구찌, 루이비통 등 글로벌 패션 브랜드가 한글을 디자인 요소로 활용하고, 해외 아티스트들이 한글을 타투로 새기며, 한글 캘리그래피가 하나의 예술 장르로 인정받고 있습니다. 한글은 이제 '읽는 문자'를 넘어 '보는 예술'이 되고 있습니다." },
  ],
  en: [
    { title: "Cia-Cia Tribe's Hangul", location: "Buton Island, Indonesia", desc: "In 2009, a minority without a writing system chose Hangul.", image: "/images/global-ciacia.png", detail: "The Cia-Cia people on Buton Island in southeastern Sulawesi, Indonesia, are a minority of about 80,000. They had their own spoken language, but no writing system to record it. The Latin alphabet couldn't properly represent the complex sounds of Cia-Cia.\n\nIn 2009, the Hunminjeongeum Society of Korea introduced Hangul to the Cia-Cia people. Remarkably, Hangul could transcribe their unique sounds almost perfectly. Hangul classes began in local elementary schools, and the world's first Hangul textbook for a non-Korean language was created.\n\nThe writing system that Sejong created 580 years ago, lamenting that 'the people have things they wish to say but cannot write,' became the same gift for a minority on the other side of the globe. Isn't this the most beautiful proof of Hangul's universality?" },
    { title: "TOPIK (Korean Proficiency Test)", location: "87 countries worldwide", desc: "Over 400,000 people take the Korean proficiency test annually.", image: "/images/global-topik.png", detail: "TOPIK (Test of Proficiency in Korean) started with about 2,700 test-takers in 1997. Twenty-five years later in 2023, annual test-takers exceeded 400,000 — a 150-fold increase.\n\nWhat's fascinating is why they study. In the past, studying or working in Korea was the main motivation. Recently, reasons like 'I want to understand BTS songs in the original language' and 'I want to watch Korean dramas without subtitles' have surged.\n\nAnd most learners unanimously agree — 'You can read Hangul in just a few days.' Sejong's statement that 'a wise person can learn it before morning, and even a fool can learn it in ten days' continues to be proven true 580 years later." },
    { title: "King Sejong Institute", location: "234 locations in 82 countries", desc: "Public educational institutions spreading Korean language and Hangul worldwide.", image: "/images/global-sejong.png", detail: "First opened in Ulaanbaatar, Mongolia in 2007, King Sejong Institutes have expanded to 234 locations in 82 countries. They're the Korean equivalent of France's Alliance Française or Germany's Goethe-Institut.\n\nBeyond Korean language classes, they offer Hangul calligraphy, Korean cooking, K-pop dance, and traditional culture experiences — not just language schools, but comprehensive cultural spaces.\n\nWhat's particularly impressive is the name itself. Named after King Sejong, these institutions are expanding his 580-year-old dream — that 'everyone should be free to read and write' — to the entire world in the 21st century." },
    { title: "Hangul and Unicode", location: "Global digital environment", desc: "11,172 syllables systematically arranged — the most scientific character block in Unicode.", image: "/images/global-unicode.png", detail: "Hangul has 11,172 complete syllable blocks in the Unicode 'Hangul Syllables' block. From AC00 (가) to D7A3 (힣), 19 initial consonants × 21 medial vowels × (27 final consonants + 1 no final) = 11,172 syllables are mathematically perfectly arranged.\n\nThis isn't just a number. It means the Unicode Consortium recognized Hangul's combinatory principles and reflected its mathematical system in the code. This is fundamentally different from other scripts registered in Unicode by historical order or arbitrary arrangement.\n\nThe 'initial + medial + final' combination principle Sejong designed 580 years ago works perfectly in the digital age. As one programmer put it — 'Hangul is designed like a programming language.'" },
    { title: "Korean Studies at Universities", location: "Major universities in the US, Europe, and Asia", desc: "Korean language programs at Harvard, Oxford, Sorbonne, and other prestigious universities.", image: "/images/global-university.jpg", detail: "Currently, over 100 universities in the US alone offer Korean language courses, and Korean is one of the fastest-growing foreign language courses at American universities. Harvard, Columbia, UCLA, Oxford, Sorbonne, and the University of Tokyo all operate Korean studies departments.\n\nAccording to the Modern Language Association (MLA), Korean enrollment at US universities increased about 14% between 2009 and 2016, while French (-25%), German (-29%), and Japanese (-20%) declined during the same period.\n\nMany students studying Korean at these universities are first captivated by Hangul's scientific structure. 'I can't believe such a logical writing system exists!' — this is the universal first reaction of Western students." },
    { title: "Hallyu and Hangul's Globalization", location: "Over 190 countries worldwide", desc: "K-pop, K-drama, and K-movies brought Hangul into daily life worldwide.", image: "/images/global-hallyu.png", detail: "To sing along with BTS lyrics, to read BLACKPINK's Instagram comments, to understand 'Squid Game' dialogue in the original — millions worldwide began learning Hangul.\n\nThe impact shows in numbers. On the language learning app Duolingo, Korean is the 7th most popular language globally, and in some countries, it ranks in the top 3. YouTube videos about 'learning Hangul' have accumulated hundreds of millions of views.\n\nThere's another fascinating phenomenon — Hangul's design beauty. Global fashion brands like Gucci and Louis Vuitton use Hangul as design elements, international artists get Hangul tattoos, and Hangul calligraphy is recognized as an art genre. Hangul is evolving from a 'script to read' into 'art to see.'" },
  ],
  ja: [
    { title: "チアチア族のハングル", location: "インドネシア・ブトン島", desc: "2009年、固有の文字を持たない少数民族がハングルを選びました。", image: "/images/global-ciacia.png", detail: "インドネシア・スラウェシ南東のブトン島に住むチアチア族は約8万人の少数民族です。彼らには固有の言葉がありましたが、それを書き記す文字がありませんでした。ラテンアルファベットではチアチア語の複雑な発音を正確に表記できなかったのです。\n\n2009年、韓国の訓民正音学会がチアチア族にハングルを紹介しました。驚くべきことに、ハングルは彼らの独特な発音をほぼ完璧に表記できました。現地の小学校でハングルの授業が始まり、世界初の韓国語以外の言語のためのハングル教科書が作られました。\n\n580年前、世宗が「民が言いたいことがあっても書くことができない」と嘆いて作ったハングルが、地球の反対側の少数民族にも同じ贈り物となったのです。" },
    { title: "韓国語能力試験(TOPIK)", location: "世界87カ国", desc: "毎年40万人以上が韓国語能力試験を受験しています。", image: "/images/global-topik.png", detail: "TOPIK（Test of Proficiency in Korean）は1997年に約2,700人の受験者で始まりました。25年後の2023年、年間受験者数は40万人を超えました。実に150倍の増加です。\n\n興味深いのは受験者の動機です。かつては韓国への留学や就職が主な理由でしたが、最近では「BTSの歌を原語で理解したい」「韓国ドラマを字幕なしで見たい」という理由が急増しています。\n\nそして、ほとんどの学習者が口を揃えて言います——「ハングルは数日で読めるようになる」と。世宗が「賢い者は朝が来る前に悟り、愚かな者でも十日あれば学べる」と述べた言葉が、580年経った今も証明され続けているのです。" },
    { title: "世宗学堂", location: "世界82カ国234カ所", desc: "韓国語とハングルを世界に広める公教育機関です。", image: "/images/global-sejong.png", detail: "2007年にモンゴル・ウランバートルで初めて開設された世宗学堂は、現在82カ国234カ所に拡大しました。フランスの公教育機関「アリアンス・フランセーズ」やドイツの「ゲーテ・インスティトゥート」に相当する韓国語版と言えます。\n\n韓国語の授業だけでなく、ハングル書道、韓国料理、K-POPダンス、伝統文化体験など多彩なプログラムを提供しています。単なる語学学校ではなく、韓国文化を体験する複合文化空間なのです。\n\n特に印象的なのは「世宗学堂」という名前です。世宗大王にちなんだこの機関は、580年前に世宗が抱いた「すべての人が自由に読み書きできるべきだ」という夢を、21世紀に全世界へ広げています。" },
    { title: "ハングルとユニコード", location: "世界のデジタル環境", desc: "11,172の音節が体系的に配列された、ユニコード中最も科学的な文字ブロック。", image: "/images/global-unicode.png", detail: "ハングルはユニコード（Unicode）の「ハングル音節」ブロックに11,172の完成型音節が割り当てられています。AC00（가）からD7A3（힣）まで、初声19個×中声21個×（終声27個＋終声なし1個）＝11,172個が数学的に完璧に配列されています。\n\nこれは単なる数字ではありません。ユニコード委員会がハングルの組み合わせ原理をそのまま認め、その数学的体系をコードに反映したということです。\n\n580年前に世宗が設計した「初声＋中声＋終声」の組み合わせ原理がデジタル時代でも完璧に機能しています。あるプログラマーはこう言いました——「ハングルはまるでプログラミング言語のように設計されている」と。" },
    { title: "海外大学の韓国語学科", location: "米国・欧州・アジアの主要大学", desc: "ハーバード、オックスフォード、ソルボンヌなど世界の名門大学に韓国語学科があります。", image: "/images/global-university.jpg", detail: "現在、米国だけで100以上の大学が韓国語コースを運営しており、韓国語は米国の大学で最も急速に成長している外国語科目の一つです。ハーバード、コロンビア、UCLA、オックスフォード、ソルボンヌ、東京大学など世界最高の名門大学が韓国語学科を運営しています。\n\n米国現代言語学会（MLA）の調査によると、2009年から2016年にかけて米国大学の韓国語受講生は約14%増加しました。同時期にフランス語（-25%）、ドイツ語（-29%）、日本語（-20%）が減少したのとは対照的です。\n\nこれらの大学で韓国語を学ぶ学生の多くは、まずハングルの科学的構造に魅了されます。「こんなに論理的な文字があるなんて！」——これが西洋の学生たちの共通の第一印象です。" },
    { title: "韓流とハングルの世界化", location: "世界190カ国以上", desc: "K-POP、Kドラマ、K映画がハングルを世界の人々の日常に持ち込みました。", image: "/images/global-hallyu.png", detail: "BTSの歌詞を歌うために、BLACKPINKのインスタグラムのコメントを読むために、「イカゲーム」の台詞を原語で理解するために——世界中の何百万人もがハングルを学び始めました。\n\nその影響は数字にも表れています。語学学習アプリ「Duolingo」では、韓国語は世界で7番目に人気のある言語であり、一部の国ではトップ3に入ることもあります。\n\nそしてもう一つの興味深い現象があります——ハングルのデザイン的美しさです。グッチやルイ・ヴィトンなどグローバルファッションブランドがハングルをデザイン要素として活用し、海外アーティストがハングルをタトゥーに刻み、ハングルカリグラフィーが一つの芸術ジャンルとして認められています。ハングルは今や「読む文字」を超えて「見る芸術」になりつつあります。" },
  ],
  zh: [
    { title: "齐亚齐亚族的韩文", location: "印度尼西亚布顿岛", desc: "2009年，一个没有文字的少数民族选择了韩文。", image: "/images/global-ciacia.png", detail: "印度尼西亚苏拉威西东南部布顿岛上的齐亚齐亚族是约8万人的少数民族。他们有自己的语言，却没有书写文字。拉丁字母无法准确表记齐亚齐亚语的复杂发音。\n\n2009年，韩国训民正音学会向齐亚齐亚族介绍了韩文。令人惊叹的是，韩文几乎能完美地表记他们独特的发音。当地小学开设了韩文课程，世界上第一本为非韩语语言编写的韩文教科书也应运而生。\n\n580年前世宗感叹「百姓有话想说却无法书写」而创造的韩文，成为了地球另一端少数民族的同样礼物。这难道不是韩文普遍性最美丽的证明吗？" },
    { title: "韩国语能力考试(TOPIK)", location: "全球87个国家", desc: "每年超过40万人参加韩语能力考试。", image: "/images/global-topik.png", detail: "TOPIK（Test of Proficiency in Korean）于1997年以约2,700名考生起步。25年后的2023年，年度考生人数已超过40万——足足增长了150倍。\n\n有趣的是考生们的动机。过去主要是为了赴韩留学或就业，而近年来「想用原文理解BTS的歌词」「想不看字幕看韩剧」等理由急剧增加。\n\n而且大多数学习者异口同声地说——「韩文几天就能学会读」。世宗所说的「聪慧之人日出前即可领悟，愚笨之人十日内亦能学会」，580年后的今天依然被不断证实。" },
    { title: "世宗学堂", location: "全球82个国家234处", desc: "向世界传播韩语和韩文的公共教育机构。", image: "/images/global-sejong.png", detail: "2007年在蒙古乌兰巴托首次开设的世宗学堂，现已扩展至82个国家234处。可以说是法国「法语联盟」或德国「歌德学院」的韩语版。\n\n除韩语课程外，还提供韩文书法、韩国料理、K-POP舞蹈、传统文化体验等丰富多彩的项目。不仅是语言学校，更是体验韩国文化的综合文化空间。\n\n尤其令人印象深刻的是「世宗学堂」这个名字。以世宗大王命名的这个机构，正将580年前世宗「人人都应自由读写」的梦想，在21世纪推广到全世界。" },
    { title: "韩文与Unicode", location: "全球数字环境", desc: "11,172个音节系统排列——Unicode中最科学的文字块。", image: "/images/global-unicode.png", detail: "韩文在Unicode的「韩文音节（Hangul Syllables）」块中分配了11,172个完成型音节。从AC00（가）到D7A3（힣），初声19个×中声21个×（终声27个+无终声1个）= 11,172个，数学上完美排列。\n\n这不仅仅是一个数字。它意味着Unicode委员会认可了韩文的组合原理，并将其数学体系反映在编码中。这与其他文字按历史顺序或任意排列注册到Unicode有着本质区别。\n\n580年前世宗设计的「初声+中声+终声」组合原理在数字时代依然完美运作。有程序员这样说——「韩文就像是按照编程语言设计的。」" },
    { title: "海外大学的韩语系", location: "美国·欧洲·亚洲主要大学", desc: "哈佛、牛津、索邦等世界名校均设有韩语系。", image: "/images/global-university.jpg", detail: "目前仅在美国就有100多所大学开设韩语课程，韩语是美国大学中增长最快的外语课程之一。哈佛、哥伦比亚、UCLA、牛津、索邦、东京大学等世界顶级名校都设有韩语系。\n\n根据美国现代语言学会（MLA）的调查，2009年至2016年间美国大学的韩语选修生增加了约14%。同期法语（-25%）、德语（-29%）、日语（-20%）均下降，形成鲜明对比。\n\n在这些大学学习韩语的学生中，许多人首先被韩文的科学结构所吸引。「竟然有如此逻辑性的文字！」——这是西方学生们共同的第一反应。" },
    { title: "韩流与韩文的全球化", location: "全球190多个国家", desc: "K-POP、韩剧、韩国电影将韩文带入了世界人民的日常生活。", image: "/images/global-hallyu.png", detail: "为了跟唱BTS的歌词，为了读懂BLACKPINK的Instagram评论，为了用原文理解《鱿鱼游戏》的台词——全球数百万人开始学习韩文。\n\n这种影响也体现在数字上。在语言学习应用Duolingo上，韩语是全球第7大热门语言，在某些国家甚至跻身前3名。YouTube上「学韩文」相关视频的总播放量已达数亿次。\n\n还有一个有趣的现象——韩文的设计之美。Gucci、Louis Vuitton等全球时尚品牌将韩文用作设计元素，海外艺术家将韩文纹在身上，韩文书法被认可为一种艺术门类。韩文正从「阅读的文字」进化为「观赏的艺术」。" },
  ],
  es: [
    { title: "El Hangul de la tribu Cia-Cia", location: "Isla Buton, Indonesia", desc: "En 2009, una minoría sin sistema de escritura eligió el Hangul.", image: "/images/global-ciacia.png", detail: "Los Cia-Cia de la isla Buton, al sureste de Sulawesi, Indonesia, son una minoría de unos 80.000 habitantes. Tenían su propio idioma hablado, pero no un sistema de escritura para registrarlo. El alfabeto latino no podía representar adecuadamente los complejos sonidos del Cia-Cia.\n\nEn 2009, la Sociedad Hunminjeongeum de Corea les presentó el Hangul. Sorprendentemente, el Hangul pudo transcribir sus sonidos únicos casi a la perfección. Las clases comenzaron en escuelas locales y se creó el primer libro de texto de Hangul del mundo para un idioma no coreano.\n\nLa escritura que Sejong creó hace 580 años, lamentando que «el pueblo tiene cosas que decir pero no puede escribirlas», se convirtió en el mismo regalo para una minoría al otro lado del planeta." },
    { title: "TOPIK (Examen de Competencia Coreana)", location: "87 países del mundo", desc: "Más de 400.000 personas realizan el examen de competencia coreana anualmente.", image: "/images/global-topik.png", detail: "TOPIK (Test of Proficiency in Korean) comenzó con unos 2.700 examinados en 1997. Veinticinco años después, en 2023, los examinados anuales superaron los 400.000 — un aumento de 150 veces.\n\nLo fascinante son las motivaciones. Antes, estudiar o trabajar en Corea era la razón principal. Ahora, razones como «quiero entender las canciones de BTS en el idioma original» y «quiero ver dramas coreanos sin subtítulos» se han disparado.\n\nY la mayoría de los estudiantes coinciden: «Se puede leer Hangul en solo unos días.» La afirmación de Sejong de que «una persona sabia puede aprenderlo antes de que acabe la mañana, y un necio en diez días» sigue comprobándose 580 años después." },
    { title: "Instituto Rey Sejong", location: "234 ubicaciones en 82 países", desc: "Instituciones educativas públicas que difunden el coreano y el Hangul en el mundo.", image: "/images/global-sejong.png", detail: "Inaugurado por primera vez en Ulán Bator, Mongolia, en 2007, los Institutos Rey Sejong se han expandido a 234 ubicaciones en 82 países. Son el equivalente coreano de la Alliance Française de Francia o el Goethe-Institut de Alemania.\n\nAdemás de clases de coreano, ofrecen caligrafía Hangul, cocina coreana, danza K-pop y experiencias culturales tradicionales — no solo escuelas de idiomas, sino espacios culturales integrales.\n\nLo particularmente impresionante es el nombre. Nombrados en honor al Rey Sejong, estos institutos están expandiendo su sueño de 580 años — que «todos deberían ser libres de leer y escribir» — a todo el mundo en el siglo XXI." },
    { title: "Hangul y Unicode", location: "Entorno digital global", desc: "11.172 sílabas ordenadas sistemáticamente — el bloque de caracteres más científico en Unicode.", image: "/images/global-unicode.png", detail: "El Hangul tiene 11.172 bloques silábicos completos en el bloque 'Sílabas Hangul' de Unicode. Desde AC00 (가) hasta D7A3 (힣), 19 consonantes iniciales × 21 vocales mediales × (27 consonantes finales + 1 sin final) = 11.172 sílabas matemáticamente perfectas.\n\nEsto no es solo un número. Significa que el Consorcio Unicode reconoció los principios combinatorios del Hangul y reflejó su sistema matemático en el código. Esto es fundamentalmente diferente de otras escrituras registradas por orden histórico o disposición arbitraria.\n\nEl principio de combinación «inicial + medial + final» que Sejong diseñó hace 580 años funciona perfectamente en la era digital. Como dijo un programador: «El Hangul está diseñado como un lenguaje de programación.»" },
    { title: "Estudios Coreanos en Universidades", location: "Principales universidades de EE.UU., Europa y Asia", desc: "Programas de coreano en Harvard, Oxford, Sorbonne y otras universidades prestigiosas.", image: "/images/global-university.jpg", detail: "Actualmente, más de 100 universidades solo en EE.UU. ofrecen cursos de coreano, siendo uno de los idiomas de más rápido crecimiento. Harvard, Columbia, UCLA, Oxford, Sorbonne y la Universidad de Tokio operan departamentos de estudios coreanos.\n\nSegún la Modern Language Association (MLA), la matrícula en coreano en universidades estadounidenses aumentó un 14% entre 2009 y 2016, mientras que el francés (-25%), alemán (-29%) y japonés (-20%) disminuyeron en el mismo período.\n\nMuchos estudiantes se sienten primero cautivados por la estructura científica del Hangul. «¡No puedo creer que exista un sistema de escritura tan lógico!» — esta es la reacción universal de los estudiantes occidentales." },
    { title: "Hallyu y la Globalización del Hangul", location: "Más de 190 países", desc: "K-pop, K-drama y cine coreano llevaron el Hangul a la vida cotidiana mundial.", image: "/images/global-hallyu.png", detail: "Para cantar las letras de BTS, para leer los comentarios de BLACKPINK en Instagram, para entender los diálogos de «El Juego del Calamar» en el idioma original — millones en todo el mundo comenzaron a aprender Hangul.\n\nEl impacto se refleja en números. En la aplicación de idiomas Duolingo, el coreano es el 7.° idioma más popular del mundo, y en algunos países está en el top 3. Los videos de YouTube sobre «aprender Hangul» acumulan cientos de millones de visualizaciones.\n\nHay otro fenómeno fascinante: la belleza del diseño del Hangul. Marcas como Gucci y Louis Vuitton usan el Hangul como elemento de diseño, artistas internacionales se tatúan Hangul, y la caligrafía Hangul se reconoce como un género artístico. El Hangul está evolucionando de una «escritura para leer» a «arte para contemplar»." },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HangulDay = () => {
  const { t, locale } = useI18n();
  const facts = factsData[locale] || factsData.ko;
  const globalReach = globalData[locale] || globalData.ko;
  const quote = quoteData[locale] || quoteData.ko;
  const [selectedFact, setSelectedFact] = useState<Fact | null>(null);
  const [selectedGlobal, setSelectedGlobal] = useState<GlobalItem | null>(null);

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
              {t("hangulday.subtitle")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("hangulday.desc")}
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
            {t("hangulday.factsTitle")}
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
                <span className="text-xs text-vermillion mt-3 inline-block">{t("hangulday.viewMore")}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground text-center mb-12"
          >
            {t("hangulday.globalTitle")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {globalReach.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => setSelectedGlobal(item)}
                className="bg-background rounded-sm border border-border overflow-hidden cursor-pointer group hover:shadow-md transition-shadow"
              >
                <div className={`h-72 overflow-hidden ${item.image.includes('topik') ? 'bg-white flex items-center justify-center p-4' : ''}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${item.image.includes('topik') ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-foreground group-hover:text-vermillion transition-colors">{item.title}</h3>
                  </div>
                  <span className="text-xs text-vermillion tracking-widest">{item.location}</span>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                  <span className="text-xs text-muted-foreground group-hover:text-vermillion mt-3 inline-block transition-colors">{t("hangulday.viewMore")}</span>
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
            className="text-lg md:text-xl font-light text-foreground leading-[1.9] italic"
          >
            {quote.lines.map((line, i) => (
              <span key={i}>
                "{line}
                {i < quote.lines.length - 1 && <br className="hidden md:block" />}
                {i === quote.lines.length - 1 && '"'}
              </span>
            ))}
          </motion.blockquote>
          <div className="flex items-center justify-center gap-3 mt-8">
            <img
              src="/images/sejong.jpg"
              alt={t("hangulday.quoteAttr")}
              className="w-10 h-10 rounded-full object-cover border border-border"
            />
            <div className="text-left">
              <p className="text-sm font-bold text-foreground">{t("hangulday.quoteAttr")}</p>
              <p className="text-xs text-muted-foreground">{t("hangulday.quoteSource")}</p>
            </div>
          </div>
        </div>
      </section>

      <ResponsiveModal
        open={!!selectedFact}
        onOpenChange={(open) => !open && setSelectedFact(null)}
        title={selectedFact?.title || ""}
        description={`${selectedFact?.title} ${t("hangulday.modalDetail")}`}
      >
        {selectedFact && (
          <div className="overflow-y-auto p-8 space-y-5">
            <div className="rounded-sm overflow-hidden -mx-8 -mt-8 mb-6">
              <img
                src={selectedFact.image}
                alt={selectedFact.title}
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedFact.icon}</span>
              <h3 className="text-xl font-bold text-foreground">{selectedFact.title}</h3>
            </div>
            <p className="text-sm text-foreground leading-[1.85]">{selectedFact.detail.fullDesc}</p>
            <div>
              <h4 className="text-xs font-bold text-vermillion tracking-widest mb-3">{t("hangulday.modalHistory")}</h4>
              <p className="text-sm text-muted-foreground leading-[1.85]">{selectedFact.detail.history}</p>
            </div>
            <div className="bg-muted/50 rounded-sm p-5">
              <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-3">{t("hangulday.modalSignificance")}</h4>
              <p className="text-sm text-muted-foreground leading-[1.85]">{selectedFact.detail.significance}</p>
            </div>
          </div>
        )}
      </ResponsiveModal>

      <ResponsiveModal
        open={!!selectedGlobal}
        onOpenChange={(open) => !open && setSelectedGlobal(null)}
        title={selectedGlobal?.title || ""}
        description={`${selectedGlobal?.title} ${t("hangulday.modalDetail")}`}
      >
        {selectedGlobal && (
          <div className="overflow-y-auto p-8 space-y-5">
            <div className="rounded-sm overflow-hidden -mx-8 -mt-8 mb-6">
              <img
                src={selectedGlobal.image}
                alt={selectedGlobal.title}
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
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
