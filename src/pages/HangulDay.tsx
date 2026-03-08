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
    { title: "10월 9일, 한글날", desc: "문자에 국경일을 바친 나라는 대한민국이 유일합니다.", icon: "📅", detail: { fullDesc: "전 세계 수천 개의 문자 중, 자신의 탄생일에 국경일을 가진 문자는 한글이 유일합니다.", history: "1926년 조선어연구회가 '가갸날'이라는 이름으로 처음 기념한 이래, 2013년 다시 공휴일로 지정되었습니다.", significance: "한글날은 세종대왕의 애민정신을 되새기는 날입니다." } },
    { title: "유네스코 세계기록유산", desc: "문자 창제 원리를 기록한 유일한 문헌, 훈민정음 해례본.", icon: "🏛️", detail: { fullDesc: "1997년, 훈민정음 해례본이 유네스코 세계기록유산에 등재되었습니다.", history: "해례본은 약 500년간 자취를 감추었다가 1940년 경북 안동에서 극적으로 발견되었습니다.", significance: "한글의 'ㄱ'이 혀뿌리가 목구멍을 막는 모양이라는 것은 해례본에 명확히 기록되어 있습니다." } },
    { title: "세종대왕 문해상", desc: "세종의 이름으로, 세계 문맹 퇴치에 공헌한 이들을 기립니다.", icon: "🏆", detail: { fullDesc: "유네스코 세종대왕 문해상은 전 세계에서 문맹 퇴치에 가장 큰 공헌을 한 개인이나 단체에 수여하는 국제상입니다.", history: "1989년 대한민국 정부의 제안으로 제정되었습니다. 매년 9월 8일 '세계 문해의 날'에 시상합니다.", significance: "이 상의 이름이 세종대왕인 것은 우연이 아닙니다. 유네스코는 세종이야말로 문해 운동의 원조라고 인정한 것입니다." } },
    { title: "세계문자올림픽 금메달", desc: "2009년, 16개국 문자가 겨루었고 한글이 1등을 차지했습니다.", icon: "🥇", detail: { fullDesc: "2009년 10월 서울에서 열린 제1회 세계문자올림픽에서 한글이 금메달을 차지했습니다.", history: "평가 기준은 문자의 기원, 구조, 글자 수, 결합 능력, 독립성과 응용성 등이었습니다.", significance: "한글이 24개 글자로 약 11,000개 음절을 조합할 수 있다는 사실이 세계에 널리 알려졌습니다." } },
  ],
  en: [
    { title: "October 9, Hangul Day", desc: "South Korea is the only country to dedicate a national holiday to its writing system.", icon: "📅", detail: { fullDesc: "Among thousands of writing systems worldwide, Hangul is the only one with a national holiday for its birthday.", history: "First commemorated in 1926 as 'Gagya Day,' it was re-designated as a public holiday in 2013 after being removed in 1991.", significance: "Hangul Day is a day to reflect on King Sejong's love for his people." } },
    { title: "UNESCO Memory of the World", desc: "The Hunminjeongeum Haerye — the only document recording a writing system's creation principles.", icon: "🏛️", detail: { fullDesc: "In 1997, the Hunminjeongeum Haerye was inscribed as a UNESCO Memory of the World.", history: "The Haerye was lost for nearly 500 years before being dramatically discovered in Andong in 1940.", significance: "The fact that 'ㄱ' represents the tongue root blocking the throat is clearly documented in the Haerye — unlike any other writing system." } },
    { title: "King Sejong Literacy Prize", desc: "In King Sejong's name, honoring those who contribute to global literacy.", icon: "🏆", detail: { fullDesc: "The UNESCO King Sejong Literacy Prize is awarded to individuals and organizations making the greatest contributions to global literacy.", history: "Established in 1989 at the proposal of the Korean government. Awarded annually on September 8, International Literacy Day.", significance: "It is no coincidence that this prize bears King Sejong's name. UNESCO recognizes Sejong as the pioneer of literacy." } },
    { title: "World Alphabet Olympics Gold", desc: "In 2009, Hangul won first place among 16 countries' writing systems.", icon: "🥇", detail: { fullDesc: "At the 1st World Alphabet Olympics held in Seoul in October 2009, Hangul won the gold medal.", history: "Evaluation criteria included the writing system's origin, structure, number of letters, combination ability, independence, and applicability.", significance: "The fact that Hangul can combine approximately 11,000 syllables with just 24 letters became widely known worldwide." } },
  ],
  ja: [
    { title: "10月9日、ハングルの日", desc: "文字に祝日を捧げた国は韓国が世界で唯一です。", icon: "📅", detail: { fullDesc: "世界中の数千の文字の中で、誕生日に祝日を持つ文字はハングルだけです。", history: "1926年に「カギャの日」として初めて記念されて以来、2013年に再び公休日に指定されました。", significance: "ハングルの日は世宗大王の愛民精神を振り返る日です。" } },
    { title: "ユネスコ世界記録遺産", desc: "文字創製原理を記録した唯一の文献、訓民正音解例本。", icon: "🏛️", detail: { fullDesc: "1997年、訓民正音解例本がユネスコ世界記録遺産に登録されました。", history: "解例本は約500年間行方不明でしたが、1940年に慶北安東で劇的に発見されました。", significance: "「ㄱ」が舌根が喉を塞ぐ形であることは解例本に明確に記録されています。" } },
    { title: "世宗大王識字賞", desc: "世宗の名のもと、世界の識字率向上に貢献した人々を称えます。", icon: "🏆", detail: { fullDesc: "ユネスコ世宗大王識字賞は、世界の識字率向上に最も貢献した個人や団体に授与される国際賞です。", history: "1989年に韓国政府の提案で制定されました。毎年9月8日の「世界識字デー」に授与されます。", significance: "この賞が世宗大王の名を冠しているのは偶然ではありません。" } },
    { title: "世界文字オリンピック金メダル", desc: "2009年、16カ国の文字が競い、ハングルが1位を獲得しました。", icon: "🥇", detail: { fullDesc: "2009年10月にソウルで開催された第1回世界文字オリンピックでハングルが金メダルを獲得しました。", history: "評価基準は文字の起源、構造、文字数、結合能力、独立性と応用性などでした。", significance: "ハングルが24文字で約11,000の音節を組み合わせられるという事実が世界に広く知られました。" } },
  ],
  zh: [
    { title: "10月9日，韩文日", desc: "韩国是世界上唯一为文字设立国庆日的国家。", icon: "📅", detail: { fullDesc: "在全世界数千种文字中，韩文是唯一拥有国庆日的文字。", history: "1926年首次以「嘎嘉日」名义纪念，2013年重新被指定为公休日。", significance: "韩文日是回顾世宗大王爱民精神的日子。" } },
    { title: "UNESCO世界记忆遗产", desc: "记录文字创制原理的唯一文献——训民正音解例本。", icon: "🏛️", detail: { fullDesc: "1997年，训民正音解例本被列入联合国教科文组织世界记忆遗产。", history: "解例本失踪近500年，1940年在庆北安东戏剧性地被发现。", significance: "「ㄱ」代表舌根阻塞喉咙的形状，这一点在解例本中有明确记载。" } },
    { title: "世宗大王扫盲奖", desc: "以世宗之名，表彰为全球扫盲做出贡献的人。", icon: "🏆", detail: { fullDesc: "联合国教科文组织世宗大王扫盲奖授予对全球扫盲做出最大贡献的个人或团体。", history: "1989年在韩国政府提议下设立。每年9月8日「世界扫盲日」颁奖。", significance: "这个奖以世宗大王命名并非偶然。联合国教科文组织认为世宗是扫盲运动的先驱。" } },
    { title: "世界文字奥林匹克金牌", desc: "2009年，16个国家的文字竞赛中韩文获得第一名。", icon: "🥇", detail: { fullDesc: "2009年10月在首尔举办的第一届世界文字奥林匹克中，韩文获得金牌。", history: "评价标准包括文字的起源、结构、字母数、组合能力、独立性和应用性等。", significance: "韩文仅用24个字母就能组合约11,000个音节的事实广为世界所知。" } },
  ],
  es: [
    { title: "9 de octubre, Día del Hangul", desc: "Corea del Sur es el único país que dedicó una fiesta nacional a su escritura.", icon: "📅", detail: { fullDesc: "Entre miles de sistemas de escritura del mundo, el Hangul es el único con un día festivo nacional para su nacimiento.", history: "Conmemorado por primera vez en 1926 como 'Día Gagya,' fue redesignado como feriado público en 2013.", significance: "El Día del Hangul es un día para reflexionar sobre el amor del Rey Sejong por su pueblo." } },
    { title: "Patrimonio de la Memoria de la UNESCO", desc: "El Haerye del Hunminjeongeum — el único documento que registra los principios de creación de un sistema de escritura.", icon: "🏛️", detail: { fullDesc: "En 1997, el Haerye fue inscrito como Patrimonio de la Memoria del Mundo de la UNESCO.", history: "El Haerye estuvo perdido durante casi 500 años antes de ser descubierto dramáticamente en Andong en 1940.", significance: "El hecho de que 'ㄱ' representa la raíz de la lengua bloqueando la garganta está documentado en el Haerye." } },
    { title: "Premio de Alfabetización Rey Sejong", desc: "En nombre del Rey Sejong, honrando a quienes contribuyen a la alfabetización global.", icon: "🏆", detail: { fullDesc: "El Premio de Alfabetización Rey Sejong de la UNESCO se otorga a personas y organizaciones que más contribuyen a la alfabetización global.", history: "Establecido en 1989 a propuesta del gobierno coreano. Se otorga anualmente el 8 de septiembre.", significance: "No es casualidad que este premio lleve el nombre del Rey Sejong." } },
    { title: "Oro en las Olimpiadas del Alfabeto Mundial", desc: "En 2009, el Hangul ganó el primer lugar entre los sistemas de escritura de 16 países.", icon: "🥇", detail: { fullDesc: "En las primeras Olimpiadas del Alfabeto Mundial celebradas en Seúl en octubre de 2009, el Hangul ganó la medalla de oro.", history: "Los criterios incluyeron origen, estructura, número de letras, capacidad de combinación e independencia.", significance: "El hecho de que el Hangul pueda combinar aproximadamente 11.000 sílabas con solo 24 letras se hizo ampliamente conocido." } },
  ],
};

const globalData: Record<Locale, GlobalItem[]> = {
  ko: [
    { title: "찌아찌아족의 한글", location: "인도네시아 부톤섬", desc: "2009년, 고유 문자가 없던 소수민족이 한글을 선택했습니다.", image: "/images/global-ciacia.png", detail: "인도네시아 술라웨시 남동쪽 부톤섬에 사는 찌아찌아족은 약 8만 명의 소수민족입니다. 한글은 찌아찌아어의 복잡한 발음을 거의 완벽하게 표기할 수 있었습니다.\n\n현지 초등학교에서 한글 수업이 시작되었고, 한글 교과서도 만들어졌습니다." },
    { title: "한국어능력시험(TOPIK)", location: "전 세계 87개국", desc: "매년 40만 명 이상이 한국어를 배우고 시험에 응시합니다.", image: "/images/global-topik.png", detail: "TOPIK은 1997년 약 2,700명의 응시자로 시작했습니다. 25년 뒤, 연간 응시자 수는 40만 명을 넘어섰습니다.\n\n전 세계 젊은이들이 한글을 배우기 시작했고, 대부분의 학습자가 며칠 만에 한글을 읽을 수 있게 됩니다." },
    { title: "세종학당", location: "전 세계 82개국 234곳", desc: "한국어와 한글을 세계에 알리는 공공 교육 기관입니다.", image: "/images/global-sejong.png", detail: "2007년 몽골에 처음 문을 연 세종학당은 현재 82개국 234개소로 확대되었습니다.\n\n한국어 수업뿐 아니라 한글 서예, 한국 요리, 전통 문화 체험 등 다채로운 프로그램을 제공합니다." },
    { title: "한글과 유니코드", location: "전 세계 디지털 환경", desc: "11,172개 음절이 체계적으로 배열된, 유니코드 속 가장 과학적인 문자 블록.", image: "/images/global-unicode.png", detail: "한글은 유니코드에서 '한글 음절' 블록에 11,172개의 완성형 음절이 배정되어 있습니다.\n\n580년 전 세종이 설계한 조합 원리가 디지털 시대에도 완벽하게 작동하는 것입니다." },
    { title: "해외 대학의 한국어학과", location: "미국·유럽·아시아 주요 대학", desc: "하버드, 옥스퍼드, 소르본 등 세계 명문대에 한국어학과가 개설되어 있습니다.", image: "/images/global-university.jpg", detail: "현재 미국에서만 100개 이상의 대학이 한국어 과정을 운영하고 있으며, 한국어는 미국 대학에서 가장 빠르게 성장하는 외국어 과목 중 하나입니다." },
    { title: "한류와 한글의 세계화", location: "전 세계 190개국 이상", desc: "K-pop, K-drama, K-영화가 한글을 세계인의 일상 속으로 가져왔습니다.", image: "/images/global-hallyu.png", detail: "BTS의 노래 가사를 따라 부르기 위해, 전 세계 수백만 명이 한글을 배우기 시작했습니다.\n\n한글의 디자인적 아름다움이 패션과 예술 분야에서도 주목받고 있습니다." },
  ],
  en: [
    { title: "Cia-Cia Tribe's Hangul", location: "Buton Island, Indonesia", desc: "In 2009, a minority without a writing system chose Hangul.", image: "/images/global-ciacia.png", detail: "The Cia-Cia people on Buton Island in Indonesia are a minority of about 80,000. Hangul could nearly perfectly transcribe the complex sounds of their language.\n\nHangul classes began in local elementary schools, and Hangul textbooks were created." },
    { title: "TOPIK (Korean Proficiency Test)", location: "87 countries worldwide", desc: "Over 400,000 people take the Korean proficiency test annually.", image: "/images/global-topik.png", detail: "TOPIK started with about 2,700 test-takers in 1997. Twenty-five years later, annual test-takers exceeded 400,000.\n\nYoung people worldwide began learning Hangul, and most learners can read it within a few days." },
    { title: "King Sejong Institute", location: "234 locations in 82 countries", desc: "Public educational institutions spreading Korean language and Hangul worldwide.", image: "/images/global-sejong.png", detail: "First opened in Mongolia in 2007, King Sejong Institutes have expanded to 234 locations in 82 countries.\n\nThey offer diverse programs including Korean calligraphy, Korean cooking, and traditional culture experiences." },
    { title: "Hangul and Unicode", location: "Global digital environment", desc: "11,172 syllables systematically arranged — the most scientific character block in Unicode.", image: "/images/global-unicode.png", detail: "Hangul has 11,172 complete syllable blocks assigned in the Unicode 'Hangul Syllables' block.\n\nThe combination principles Sejong designed 580 years ago work perfectly in the digital age." },
    { title: "Korean Studies at Universities", location: "Major universities in the US, Europe, and Asia", desc: "Korean language programs at Harvard, Oxford, Sorbonne, and other prestigious universities.", image: "/images/global-university.jpg", detail: "Currently, over 100 universities in the US alone offer Korean language courses, and Korean is one of the fastest-growing foreign language courses at American universities." },
    { title: "Hallyu and Hangul's Globalization", location: "Over 190 countries worldwide", desc: "K-pop, K-drama, and K-movies brought Hangul into daily life worldwide.", image: "/images/global-hallyu.png", detail: "Millions worldwide began learning Hangul to sing along with BTS lyrics.\n\nHangul's design beauty is also gaining attention in fashion and art." },
  ],
  ja: [
    { title: "チアチア族のハングル", location: "インドネシア・ブトン島", desc: "2009年、固有の文字を持たない少数民族がハングルを選びました。", image: "/images/global-ciacia.png", detail: "ブトン島のチアチア族は約8万人の少数民族です。ハングルは彼らの言語の複雑な発音をほぼ完璧に表記できました。\n\n現地の小学校でハングルの授業が始まり、ハングルの教科書も作られました。" },
    { title: "韓国語能力試験(TOPIK)", location: "世界87カ国", desc: "毎年40万人以上が韓国語能力試験を受験しています。", image: "/images/global-topik.png", detail: "TOPIKは1997年に約2,700人の受験者で始まりました。25年後、年間受験者数は40万人を超えました。\n\nほとんどの学習者が数日でハングルを読めるようになります。" },
    { title: "世宗学堂", location: "世界82カ国234カ所", desc: "韓国語とハングルを世界に広める公教育機関です。", image: "/images/global-sejong.png", detail: "2007年にモンゴルで初めて開設された世宗学堂は、現在82カ国234カ所に拡大しました。\n\nハングル書道、韓国料理、伝統文化体験など多彩なプログラムを提供しています。" },
    { title: "ハングルとユニコード", location: "世界のデジタル環境", desc: "11,172の音節が体系的に配列された、ユニコード中最も科学的な文字ブロック。", image: "/images/global-unicode.png", detail: "ハングルはユニコードの「ハングル音節」ブロックに11,172の完成型音節が割り当てられています。\n\n580年前に世宗が設計した組み合わせ原理がデジタル時代でも完璧に機能しています。" },
    { title: "海外大学の韓国語学科", location: "米国・欧州・アジアの主要大学", desc: "ハーバード、オックスフォード、ソルボンヌなど世界の名門大学に韓国語学科があります。", image: "/images/global-university.jpg", detail: "現在、米国だけで100以上の大学が韓国語コースを運営しており、韓国語は米国の大学で最も急速に成長している外国語科目の一つです。" },
    { title: "韓流とハングルの世界化", location: "世界190カ国以上", desc: "K-POP、Kドラマ、K映画がハングルを世界の人々の日常に持ち込みました。", image: "/images/global-hallyu.png", detail: "BTSの歌詞を歌うために、世界中の何百万人もがハングルを学び始めました。\n\nハングルのデザイン的な美しさはファッションや芸術の分野でも注目されています。" },
  ],
  zh: [
    { title: "齐亚齐亚族的韩文", location: "印度尼西亚布顿岛", desc: "2009年，一个没有文字的少数民族选择了韩文。", image: "/images/global-ciacia.png", detail: "布顿岛的齐亚齐亚族是约8万人的少数民族。韩文几乎能完美地表记他们语言的复杂发音。\n\n当地小学开始了韩文课程，并编写了韩文教科书。" },
    { title: "韩国语能力考试(TOPIK)", location: "全球87个国家", desc: "每年超过40万人参加韩语能力考试。", image: "/images/global-topik.png", detail: "TOPIK于1997年以约2,700名考生起步。25年后，年度考生人数已超过40万。\n\n大多数学习者几天内就能阅读韩文。" },
    { title: "世宗学堂", location: "全球82个国家234处", desc: "向世界传播韩语和韩文的公共教育机构。", image: "/images/global-sejong.png", detail: "2007年在蒙古首次开设的世宗学堂，现已扩展至82个国家234处。\n\n提供韩文书法、韩国料理、传统文化体验等丰富多彩的课程。" },
    { title: "韩文与Unicode", location: "全球数字环境", desc: "11,172个音节系统排列——Unicode中最科学的文字块。", image: "/images/global-unicode.png", detail: "韩文在Unicode的「韩文音节」块中分配了11,172个完成型音节。\n\n580年前世宗设计的组合原理在数字时代依然完美运作。" },
    { title: "海外大学的韩语系", location: "美国·欧洲·亚洲主要大学", desc: "哈佛、牛津、索邦等世界名校均设有韩语系。", image: "/images/global-university.jpg", detail: "目前仅在美国就有100多所大学开设韩语课程，韩语是美国大学中增长最快的外语课程之一。" },
    { title: "韩流与韩文的全球化", location: "全球190多个国家", desc: "K-POP、韩剧、韩国电影将韩文带入了世界人民的日常生活。", image: "/images/global-hallyu.png", detail: "为了跟唱BTS的歌词，全球数百万人开始学习韩文。\n\n韩文的设计之美也在时尚和艺术领域受到关注。" },
  ],
  es: [
    { title: "El Hangul de la tribu Cia-Cia", location: "Isla Buton, Indonesia", desc: "En 2009, una minoría sin sistema de escritura eligió el Hangul.", image: "/images/global-ciacia.png", detail: "Los Cia-Cia en la isla Buton son una minoría de unos 80.000 habitantes. El Hangul pudo transcribir casi perfectamente los sonidos complejos de su idioma.\n\nLas clases de Hangul comenzaron en escuelas locales y se crearon libros de texto." },
    { title: "TOPIK (Examen de Competencia Coreana)", location: "87 países del mundo", desc: "Más de 400.000 personas realizan el examen de competencia coreana anualmente.", image: "/images/global-topik.png", detail: "TOPIK comenzó con unos 2.700 examinados en 1997. Veinticinco años después, los examinados anuales superaron los 400.000.\n\nLa mayoría de los estudiantes pueden leer Hangul en pocos días." },
    { title: "Instituto Rey Sejong", location: "234 ubicaciones en 82 países", desc: "Instituciones educativas públicas que difunden el coreano y el Hangul en el mundo.", image: "/images/global-sejong.png", detail: "Abierto por primera vez en Mongolia en 2007, los Institutos Rey Sejong se han expandido a 234 ubicaciones en 82 países.\n\nOfrecen programas diversos incluyendo caligrafía coreana, cocina coreana y experiencias culturales." },
    { title: "Hangul y Unicode", location: "Entorno digital global", desc: "11.172 sílabas ordenadas sistemáticamente — el bloque de caracteres más científico en Unicode.", image: "/images/global-unicode.png", detail: "El Hangul tiene 11.172 bloques silábicos completos asignados en el bloque 'Sílabas Hangul' de Unicode.\n\nLos principios de combinación que Sejong diseñó hace 580 años funcionan perfectamente en la era digital." },
    { title: "Estudios Coreanos en Universidades", location: "Principales universidades de EE.UU., Europa y Asia", desc: "Programas de coreano en Harvard, Oxford, Sorbonne y otras universidades prestigiosas.", image: "/images/global-university.jpg", detail: "Actualmente, más de 100 universidades solo en EE.UU. ofrecen cursos de coreano, siendo uno de los idiomas de más rápido crecimiento." },
    { title: "Hallyu y la Globalización del Hangul", location: "Más de 190 países", desc: "K-pop, K-drama y cine coreano llevaron el Hangul a la vida cotidiana mundial.", image: "/images/global-hallyu.png", detail: "Millones en todo el mundo comenzaron a aprender Hangul para cantar las letras de BTS.\n\nLa belleza del diseño del Hangul también está ganando atención en moda y arte." },
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
