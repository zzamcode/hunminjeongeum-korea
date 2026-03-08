import { createContext, useContext, useState, ReactNode } from "react";

export type Locale = "ko" | "en" | "ja" | "zh" | "es";

export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
  es: "Español",
};

type Translations = Record<string, string>;

const translations: Record<Locale, Translations> = {
  ko: {
    // Navbar
    "nav.principles": "원리",
    "nav.letters": "글자",
    "nav.combine": "조합",
    "nav.philosophy": "철학",
    "nav.more": "더 알아보기",
    "nav.posters": "한글 글자 마당",
    "nav.history": "한글의 역사",
    "nav.hangulday": "한글날",
    "nav.quotes": "한글을 빛낸 말들",
    "nav.news": "한글 소식",

    // Hero
    "hero.label": "세종대왕 · 1443",
    "hero.title": "훈민정음",
    "hero.subtitle": "백성을 가르치는 바른 소리",
    "hero.desc": "한글은 세계에서 가장 과학적이고 아름다운 문자입니다.\n그 창제의 원리와 아름다움을 탐구합니다.",

    // Principles
    "principles.label": "Creation Principles",
    "principles.title": "창제 원리",
    "principles.desc": "한글은 단순한 문자가 아닌, 철학과 과학이 결합된 위대한 발명입니다",
    "principles.p1.title": "천·지·인",
    "principles.p1.subtitle": "天地人",
    "principles.p1.desc": "하늘(ㆍ), 땅(ㅡ), 사람(ㅣ)의 삼재를 본떠 모음을 만들었습니다. 우주의 근본 원리가 글자 속에 담겨 있습니다.",
    "principles.p2.title": "상형의 원리",
    "principles.p2.subtitle": "象形",
    "principles.p2.desc": "자음은 발음할 때의 혀, 입술, 목구멍 등 발음 기관의 모양을 본떠 만들었습니다. 소리의 형상이 곧 글자입니다.",
    "principles.p3.title": "가획의 원리",
    "principles.p3.subtitle": "加劃",
    "principles.p3.desc": "기본 글자에 획을 더하면 소리가 세집니다. ㄱ→ㅋ, ㄴ→ㄷ→ㅌ. 체계적이고 논리적인 문자 설계입니다.",

    // Letters
    "letters.label": "Letters",
    "letters.title": "자모음",
    "letters.desc": "각 글자에는 소리의 원리가 담겨 있습니다",
    "letters.consonants": "자음 · 14",
    "letters.vowels": "모음 · 10",

    // Combine
    "combine.label": "Interactive",
    "combine.title": "글자 조합",
    "combine.desc": "초성, 중성, 종성을 선택하면 한글이 조합됩니다",
    "combine.cho": "초성",
    "combine.cho.sub": "첫소리",
    "combine.jung": "중성",
    "combine.jung.sub": "가운뎃소리",
    "combine.jong": "종성",
    "combine.jong.sub": "끝소리 (선택)",
    "combine.result": "결과",

    // Philosophy
    "philosophy.label": "Philosophy",
    "philosophy.title": "애민 정신",
    "philosophy.desc": "백성을 사랑하는 마음이 세계에서 가장 과학적인 문자를 탄생시켰습니다",
    "philosophy.quote.attr": "— 훈민정음 서문, 세종대왕",
    "philosophy.stat.year": "창제년도",
    "philosophy.stat.initial": "초기 글자 수",
    "philosophy.stat.modern": "현대 글자 수",
    "philosophy.stat.syllables": "조합 가능 음절",

    // Content Cards
    "cards.title": "한글의 세계를 탐험하세요",
    "cards.history.title": "한글의 역사",
    "cards.history.desc": "1443년 창제부터 세계 속 문자가 되기까지, 580년의 여정",
    "cards.hangulday.title": "한글날",
    "cards.hangulday.desc": "세계 유일, 문자에 국경일을 바친 나라의 이야기",
    "cards.quotes.title": "한글을 빛낸 말들",
    "cards.quotes.desc": "세계 석학들이 극찬한 한글의 위대함",
    "cards.news.title": "한글 소식",
    "cards.news.desc": "CNN, NYT 등 세계가 주목하는 한글 뉴스",
    "cards.posters.title": "글자 마당",
    "cards.posters.desc": "한글 자모의 아름다움을 포스터로 감상하세요",

    // Footer
    "footer.desc": "한글의 아름다움을 알리기 위해 만들어진 웹사이트입니다",
    "footer.unesco": "유네스코 세계기록유산 · 1997년 등재",

    // History page
    "history.title": "한글의 역사",
    "history.desc": "1443년 세종대왕의 창제부터 세계 속의 문자가 되기까지. 탄압과 부활, 희생과 영광의 580년. 각 사건을 클릭하면 그 뒤에 숨은 이야기를 읽을 수 있습니다.",

    // HangulDay page
    "hangulday.subtitle": "10월 9일 · 대한민국 국경일",
    "hangulday.desc": "세계에서 문자에 국경일을 바친 나라는 대한민국이 유일합니다. 한글날은 세종대왕이 백성을 위해 만든 문자의 탄생을 기리고, 그 뒤에 숨은 사랑과 희생의 이야기를 기억하는 날입니다.",
    "hangulday.factsTitle": "한글의 세계적 위상",
    "hangulday.globalTitle": "세계 속의 한글",
    "hangulday.viewMore": "자세히 보기 →",
    "hangulday.modalHistory": "역사",
    "hangulday.modalSignificance": "✨ 의의",
    "hangulday.quoteAttr": "세종대왕",
    "hangulday.quoteSource": "훈민정음 어제서문",
    "hangulday.modalDetail": "상세 정보",

    // Quotes page
    "quotes.title": "한글을 빛낸 말들",
    "quotes.desc": "한글의 가치를 알아본 사람들이 남긴 아름다운 말들. 클릭하면 그 말 뒤에 숨은 이야기를 읽을 수 있습니다.",
    "quotes.modalWho": "이 사람은 누구인가",
    "quotes.modalContext": "📖 이 말이 나온 배경",
    "quotes.modalTitle": "의 말",

    // News page
    "news.title": "한글 소식",
    "news.desc": "세계가 주목하는 한글, 그 자랑스러운 이야기들을 모았습니다.",
    "news.cta": "한글 관련 좋은 기사나 소식이 있다면 알려주세요. 함께 한글의 가치를 알려갑시다.",

    // YouTube player
    "player.unmute": "음악 켜기",
    "player.mute": "음악 끄기",
    "player.toast": "🎵 우측 하단에서 배경 음악을 들을 수 있습니다",
  },
  en: {
    "nav.principles": "Principles",
    "nav.letters": "Letters",
    "nav.combine": "Combination",
    "nav.philosophy": "Philosophy",
    "nav.more": "Explore",
    "nav.posters": "Letter Gallery",
    "nav.history": "History",
    "nav.hangulday": "Hangul Day",
    "nav.quotes": "Quotes",
    "nav.news": "News",

    "hero.label": "King Sejong · 1443",
    "hero.title": "Hunminjeongeum",
    "hero.subtitle": "The Correct Sounds for the Instruction of the People",
    "hero.desc": "Hangul is the most scientific and beautiful writing system in the world.\nExplore the principles and beauty of its creation.",

    "principles.label": "Creation Principles",
    "principles.title": "Creation Principles",
    "principles.desc": "Hangul is not merely a writing system — it is a great invention combining philosophy and science",
    "principles.p1.title": "Heaven · Earth · Human",
    "principles.p1.subtitle": "天地人",
    "principles.p1.desc": "Vowels were created based on the three cosmic elements: Heaven (ㆍ), Earth (ㅡ), and Human (ㅣ). The fundamental principles of the universe are embedded in the letters.",
    "principles.p2.title": "Pictographic Principle",
    "principles.p2.subtitle": "象形",
    "principles.p2.desc": "Consonants were modeled after the shape of speech organs — tongue, lips, and throat. The form of sound becomes the letter itself.",
    "principles.p3.title": "Stroke Addition",
    "principles.p3.subtitle": "加劃",
    "principles.p3.desc": "Adding strokes to basic letters makes the sound stronger: ㄱ→ㅋ, ㄴ→ㄷ→ㅌ. A systematic and logical design.",

    "letters.label": "Letters",
    "letters.title": "Consonants & Vowels",
    "letters.desc": "Each letter embodies the principles of sound",
    "letters.consonants": "Consonants · 14",
    "letters.vowels": "Vowels · 10",

    "combine.label": "Interactive",
    "combine.title": "Letter Combination",
    "combine.desc": "Select initial, medial, and final components to combine a Hangul syllable",
    "combine.cho": "Initial",
    "combine.cho.sub": "Choseong",
    "combine.jung": "Medial",
    "combine.jung.sub": "Jungseong",
    "combine.jong": "Final",
    "combine.jong.sub": "Jongseong (optional)",
    "combine.result": "Result",

    "philosophy.label": "Philosophy",
    "philosophy.title": "Love for the People",
    "philosophy.desc": "A king's compassion for his people gave birth to the world's most scientific writing system",
    "philosophy.quote.attr": "— Preface to Hunminjeongeum, King Sejong",
    "philosophy.stat.year": "Year Created",
    "philosophy.stat.initial": "Original Letters",
    "philosophy.stat.modern": "Modern Letters",
    "philosophy.stat.syllables": "Possible Syllables",

    "cards.title": "Explore the World of Hangul",
    "cards.history.title": "History of Hangul",
    "cards.history.desc": "A 580-year journey from its creation in 1443 to a global writing system",
    "cards.hangulday.title": "Hangul Day",
    "cards.hangulday.desc": "The only country that dedicated a national holiday to its alphabet",
    "cards.quotes.title": "Words of Praise",
    "cards.quotes.desc": "What world-renowned scholars say about the greatness of Hangul",
    "cards.news.title": "Hangul News",
    "cards.news.desc": "Global media coverage of Hangul from CNN, NYT, and more",
    "cards.posters.title": "Letter Gallery",
    "cards.posters.desc": "Experience the beauty of Hangul letters through posters",

    "footer.desc": "A website dedicated to sharing the beauty of Hangul",
    "footer.unesco": "UNESCO Memory of the World · Inscribed 1997",

    "history.title": "History of Hangul",
    "history.desc": "From King Sejong's creation in 1443 to becoming a world-class writing system. 580 years of persecution, revival, sacrifice, and glory. Click each event to read the hidden stories behind it.",

    "hangulday.subtitle": "October 9 · National Holiday of Korea",
    "hangulday.desc": "South Korea is the only country in the world that dedicated a national holiday to its writing system. Hangul Day celebrates the birth of the script King Sejong created for his people, and remembers the stories of love and sacrifice behind it.",
    "hangulday.factsTitle": "Hangul's Global Status",
    "hangulday.globalTitle": "Hangul Around the World",
    "hangulday.viewMore": "Learn more →",
    "hangulday.modalHistory": "History",
    "hangulday.modalSignificance": "✨ Significance",
    "hangulday.quoteAttr": "King Sejong",
    "hangulday.quoteSource": "Royal Preface to Hunminjeongeum",
    "hangulday.modalDetail": "Details",

    "quotes.title": "Words That Honor Hangul",
    "quotes.desc": "Beautiful words left by those who recognized the value of Hangul. Click to read the stories behind these words.",
    "quotes.modalWho": "About This Person",
    "quotes.modalContext": "📖 Context of This Quote",
    "quotes.modalTitle": "'s Words",

    "news.title": "Hangul News",
    "news.desc": "Stories of pride about Hangul that the world is paying attention to.",
    "news.cta": "If you have good articles or news about Hangul, please let us know. Let's spread the value of Hangul together.",

    "player.unmute": "Turn on music",
    "player.mute": "Turn off music",
    "player.toast": "🎵 You can listen to background music from the bottom right",
  },
  ja: {
    "nav.principles": "原理",
    "nav.letters": "文字",
    "nav.combine": "組み合わせ",
    "nav.philosophy": "哲学",
    "nav.more": "もっと見る",
    "nav.posters": "文字ギャラリー",
    "nav.history": "ハングルの歴史",
    "nav.hangulday": "ハングルの日",
    "nav.quotes": "名言集",
    "nav.news": "ニュース",

    "hero.label": "世宗大王 · 1443",
    "hero.title": "訓民正音",
    "hero.subtitle": "民を教える正しい音",
    "hero.desc": "ハングルは世界で最も科学的で美しい文字です。\nその創製の原理と美しさを探求します。",

    "principles.label": "創製原理",
    "principles.title": "創製の原理",
    "principles.desc": "ハングルは単なる文字ではなく、哲学と科学が融合した偉大な発明です",
    "principles.p1.title": "天・地・人",
    "principles.p1.subtitle": "天地人",
    "principles.p1.desc": "天(ㆍ)、地(ㅡ)、人(ㅣ)の三才に基づいて母音が作られました。宇宙の根本原理が文字に込められています。",
    "principles.p2.title": "象形の原理",
    "principles.p2.subtitle": "象形",
    "principles.p2.desc": "子音は発音時の舌、唇、喉など発音器官の形を模して作られました。音の形がそのまま文字になります。",
    "principles.p3.title": "加画の原理",
    "principles.p3.subtitle": "加劃",
    "principles.p3.desc": "基本文字に画を加えると音が強くなります。ㄱ→ㅋ、ㄴ→ㄷ→ㅌ。体系的で論理的な文字設計です。",

    "letters.label": "文字",
    "letters.title": "子音と母音",
    "letters.desc": "各文字には音の原理が込められています",
    "letters.consonants": "子音 · 14",
    "letters.vowels": "母音 · 10",

    "combine.label": "インタラクティブ",
    "combine.title": "文字の組み合わせ",
    "combine.desc": "初声、中声、終声を選択するとハングルが組み合わされます",
    "combine.cho": "初声",
    "combine.cho.sub": "最初の音",
    "combine.jung": "中声",
    "combine.jung.sub": "真ん中の音",
    "combine.jong": "終声",
    "combine.jong.sub": "最後の音（任意）",
    "combine.result": "結果",

    "philosophy.label": "哲学",
    "philosophy.title": "愛民精神",
    "philosophy.desc": "民を愛する心が世界で最も科学的な文字を生み出しました",
    "philosophy.quote.attr": "— 訓民正音序文、世宗大王",
    "philosophy.stat.year": "創製年",
    "philosophy.stat.initial": "初期文字数",
    "philosophy.stat.modern": "現代文字数",
    "philosophy.stat.syllables": "組合可能音節",

    "cards.title": "ハングルの世界を探検しよう",
    "cards.history.title": "ハングルの歴史",
    "cards.history.desc": "1443年の創製から世界の文字になるまでの580年の旅",
    "cards.hangulday.title": "ハングルの日",
    "cards.hangulday.desc": "文字に祝日を捧げた世界で唯一の国の物語",
    "cards.quotes.title": "ハングルを称える言葉",
    "cards.quotes.desc": "世界の学者たちが絶賛したハングルの偉大さ",
    "cards.news.title": "ハングルニュース",
    "cards.news.desc": "CNN、NYTなど世界が注目するハングルのニュース",
    "cards.posters.title": "文字ギャラリー",
    "cards.posters.desc": "ハングルの字母の美しさをポスターで鑑賞",

    "footer.desc": "ハングルの美しさを世界に伝えるウェブサイトです",
    "footer.unesco": "ユネスコ世界記録遺産 · 1997年登録",

    "history.title": "ハングルの歴史",
    "history.desc": "1443年の世宗大王による創製から世界的な文字になるまで。弾圧と復活、犠牲と栄光の580年。各事件をクリックすると、その裏に隠された物語を読むことができます。",

    "hangulday.subtitle": "10月9日 · 大韓民国の祝日",
    "hangulday.desc": "文字に祝日を捧げた国は世界で韓国だけです。ハングルの日は、世宗大王が民のために作った文字の誕生を祝い、その背後にある愛と犠牲の物語を記憶する日です。",
    "hangulday.factsTitle": "ハングルの世界的地位",
    "hangulday.globalTitle": "世界の中のハングル",
    "hangulday.viewMore": "詳しく見る →",
    "hangulday.modalHistory": "歴史",
    "hangulday.modalSignificance": "✨ 意義",
    "hangulday.quoteAttr": "世宗大王",
    "hangulday.quoteSource": "訓民正音御製序文",
    "hangulday.modalDetail": "詳細情報",

    "quotes.title": "ハングルを輝かせた言葉",
    "quotes.desc": "ハングルの価値を認めた人々が残した美しい言葉。クリックすると、その言葉の裏にある物語を読むことができます。",
    "quotes.modalWho": "この人物について",
    "quotes.modalContext": "📖 この言葉が生まれた背景",
    "quotes.modalTitle": "の言葉",

    "news.title": "ハングルニュース",
    "news.desc": "世界が注目するハングル、その誇らしい物語を集めました。",
    "news.cta": "ハングルに関する良い記事やニュースがあれば教えてください。一緒にハングルの価値を広めましょう。",

    "player.unmute": "音楽をオンにする",
    "player.mute": "音楽をオフにする",
    "player.toast": "🎵 右下からBGMを聴くことができます",
  },
  zh: {
    "nav.principles": "原理",
    "nav.letters": "字母",
    "nav.combine": "组合",
    "nav.philosophy": "哲学",
    "nav.more": "探索更多",
    "nav.posters": "字母展览",
    "nav.history": "韩文历史",
    "nav.hangulday": "韩文日",
    "nav.quotes": "名人评价",
    "nav.news": "新闻",

    "hero.label": "世宗大王 · 1443",
    "hero.title": "训民正音",
    "hero.subtitle": "教导百姓的正确声音",
    "hero.desc": "韩文是世界上最科学、最美丽的文字。\n探索其创制原理与美学。",

    "principles.label": "创制原理",
    "principles.title": "创制原理",
    "principles.desc": "韩文不仅仅是一种文字，更是哲学与科学结合的伟大发明",
    "principles.p1.title": "天·地·人",
    "principles.p1.subtitle": "天地人",
    "principles.p1.desc": "元音以天(ㆍ)、地(ㅡ)、人(ㅣ)三才为基础创制。宇宙的根本原理蕴含在文字之中。",
    "principles.p2.title": "象形原理",
    "principles.p2.subtitle": "象形",
    "principles.p2.desc": "辅音模仿发音时舌头、嘴唇、喉咙等发音器官的形状而制。声音的形态即为文字。",
    "principles.p3.title": "加画原理",
    "principles.p3.subtitle": "加劃",
    "principles.p3.desc": "在基本字母上加笔画使声音变强：ㄱ→ㅋ、ㄴ→ㄷ→ㅌ。系统而逻辑的文字设计。",

    "letters.label": "字母",
    "letters.title": "辅音与元音",
    "letters.desc": "每个字母都蕴含着声音的原理",
    "letters.consonants": "辅音 · 14",
    "letters.vowels": "元音 · 10",

    "combine.label": "互动体验",
    "combine.title": "文字组合",
    "combine.desc": "选择初声、中声、终声，组合出韩文音节",
    "combine.cho": "初声",
    "combine.cho.sub": "首音",
    "combine.jung": "中声",
    "combine.jung.sub": "中间音",
    "combine.jong": "终声",
    "combine.jong.sub": "尾音（可选）",
    "combine.result": "结果",

    "philosophy.label": "哲学",
    "philosophy.title": "爱民精神",
    "philosophy.desc": "对百姓的爱催生了世界上最科学的文字",
    "philosophy.quote.attr": "— 训民正音序文，世宗大王",
    "philosophy.stat.year": "创制年份",
    "philosophy.stat.initial": "初始字母数",
    "philosophy.stat.modern": "现代字母数",
    "philosophy.stat.syllables": "可组合音节",

    "cards.title": "探索韩文的世界",
    "cards.history.title": "韩文的历史",
    "cards.history.desc": "从1443年创制到成为世界性文字的580年旅程",
    "cards.hangulday.title": "韩文日",
    "cards.hangulday.desc": "世界上唯一为文字设立国庆日的国家",
    "cards.quotes.title": "赞美之词",
    "cards.quotes.desc": "世界著名学者对韩文伟大之处的极高评价",
    "cards.news.title": "韩文新闻",
    "cards.news.desc": "CNN、NYT等世界媒体对韩文的关注报道",
    "cards.posters.title": "字母展览",
    "cards.posters.desc": "通过海报欣赏韩文字母之美",

    "footer.desc": "一个致力于展示韩文之美的网站",
    "footer.unesco": "联合国教科文组织世界记忆遗产 · 1997年入选",

    "history.title": "韩文的历史",
    "history.desc": "从1443年世宗大王的创制到成为世界性文字。弹压与复兴、牺牲与荣耀的580年。点击每个事件，阅读背后隐藏的故事。",

    "hangulday.subtitle": "10月9日 · 大韩民国国庆日",
    "hangulday.desc": "世界上为文字设立国庆日的国家只有韩国。韩文日是纪念世宗大王为百姓创制文字的诞生日，铭记其背后爱与牺牲的故事。",
    "hangulday.factsTitle": "韩文的世界地位",
    "hangulday.globalTitle": "世界中的韩文",
    "hangulday.viewMore": "了解更多 →",
    "hangulday.modalHistory": "历史",
    "hangulday.modalSignificance": "✨ 意义",
    "hangulday.quoteAttr": "世宗大王",
    "hangulday.quoteSource": "训民正音御制序文",
    "hangulday.modalDetail": "详细信息",

    "quotes.title": "赞美韩文的名言",
    "quotes.desc": "认识到韩文价值的人们留下的美丽话语。点击可以阅读这些话语背后的故事。",
    "quotes.modalWho": "关于此人",
    "quotes.modalContext": "📖 这句话的背景",
    "quotes.modalTitle": "的话",

    "news.title": "韩文新闻",
    "news.desc": "收集了世界瞩目的韩文骄傲故事。",
    "news.cta": "如果您有关于韩文的好文章或消息，请告诉我们。让我们一起传播韩文的价值。",

    "player.unmute": "打开音乐",
    "player.mute": "关闭音乐",
  },
  es: {
    "nav.principles": "Principios",
    "nav.letters": "Letras",
    "nav.combine": "Combinación",
    "nav.philosophy": "Filosofía",
    "nav.more": "Explorar",
    "nav.posters": "Galería de Letras",
    "nav.history": "Historia",
    "nav.hangulday": "Día del Hangul",
    "nav.quotes": "Citas",
    "nav.news": "Noticias",

    "hero.label": "Rey Sejong · 1443",
    "hero.title": "Hunminjeongeum",
    "hero.subtitle": "Los Sonidos Correctos para la Instrucción del Pueblo",
    "hero.desc": "El Hangul es el sistema de escritura más científico y hermoso del mundo.\nExplora los principios y la belleza de su creación.",

    "principles.label": "Principios de Creación",
    "principles.title": "Principios de Creación",
    "principles.desc": "El Hangul no es solo un sistema de escritura — es una gran invención que combina filosofía y ciencia",
    "principles.p1.title": "Cielo · Tierra · Humano",
    "principles.p1.subtitle": "天地人",
    "principles.p1.desc": "Las vocales se crearon basándose en los tres elementos cósmicos: Cielo (ㆍ), Tierra (ㅡ) y Humano (ㅣ). Los principios fundamentales del universo están contenidos en las letras.",
    "principles.p2.title": "Principio Pictográfico",
    "principles.p2.subtitle": "象形",
    "principles.p2.desc": "Las consonantes se modelaron según la forma de los órganos del habla: lengua, labios y garganta. La forma del sonido se convierte en la letra misma.",
    "principles.p3.title": "Adición de Trazos",
    "principles.p3.subtitle": "加劃",
    "principles.p3.desc": "Añadir trazos a las letras básicas hace que el sonido sea más fuerte: ㄱ→ㅋ, ㄴ→ㄷ→ㅌ. Un diseño sistemático y lógico.",

    "letters.label": "Letras",
    "letters.title": "Consonantes y Vocales",
    "letters.desc": "Cada letra encarna los principios del sonido",
    "letters.consonants": "Consonantes · 14",
    "letters.vowels": "Vocales · 10",

    "combine.label": "Interactivo",
    "combine.title": "Combinación de Letras",
    "combine.desc": "Selecciona componentes inicial, medio y final para combinar una sílaba Hangul",
    "combine.cho": "Inicial",
    "combine.cho.sub": "Choseong",
    "combine.jung": "Medio",
    "combine.jung.sub": "Jungseong",
    "combine.jong": "Final",
    "combine.jong.sub": "Jongseong (opcional)",
    "combine.result": "Resultado",

    "philosophy.label": "Filosofía",
    "philosophy.title": "Amor por el Pueblo",
    "philosophy.desc": "La compasión de un rey por su pueblo dio origen al sistema de escritura más científico del mundo",
    "philosophy.quote.attr": "— Prefacio del Hunminjeongeum, Rey Sejong",
    "philosophy.stat.year": "Año de Creación",
    "philosophy.stat.initial": "Letras Originales",
    "philosophy.stat.modern": "Letras Actuales",
    "philosophy.stat.syllables": "Sílabas Posibles",

    "cards.title": "Explora el Mundo del Hangul",
    "cards.history.title": "Historia del Hangul",
    "cards.history.desc": "Un viaje de 580 años desde su creación en 1443 hasta un sistema de escritura global",
    "cards.hangulday.title": "Día del Hangul",
    "cards.hangulday.desc": "El único país que dedicó un día festivo nacional a su alfabeto",
    "cards.quotes.title": "Palabras de Elogio",
    "cards.quotes.desc": "Lo que dicen los académicos más renombrados del mundo sobre la grandeza del Hangul",
    "cards.news.title": "Noticias del Hangul",
    "cards.news.desc": "Cobertura mediática global del Hangul en CNN, NYT y más",
    "cards.posters.title": "Galería de Letras",
    "cards.posters.desc": "Experimenta la belleza de las letras Hangul a través de pósters",

    "footer.desc": "Un sitio web dedicado a compartir la belleza del Hangul",
    "footer.unesco": "Patrimonio de la Memoria del Mundo de la UNESCO · Inscrito en 1997",

    "history.title": "Historia del Hangul",
    "history.desc": "Desde la creación del Rey Sejong en 1443 hasta convertirse en un sistema de escritura de clase mundial. 580 años de persecución, renacimiento, sacrificio y gloria. Haz clic en cada evento para leer las historias ocultas.",

    "hangulday.subtitle": "9 de octubre · Fiesta Nacional de Corea",
    "hangulday.desc": "Corea del Sur es el único país del mundo que dedicó una fiesta nacional a su sistema de escritura. El Día del Hangul celebra el nacimiento de la escritura que el Rey Sejong creó para su pueblo, y recuerda las historias de amor y sacrificio detrás de ella.",
    "hangulday.factsTitle": "Estatus Global del Hangul",
    "hangulday.globalTitle": "Hangul en el Mundo",
    "hangulday.viewMore": "Saber más →",
    "hangulday.modalHistory": "Historia",
    "hangulday.modalSignificance": "✨ Significado",
    "hangulday.quoteAttr": "Rey Sejong",
    "hangulday.quoteSource": "Prefacio Real del Hunminjeongeum",
    "hangulday.modalDetail": "Detalles",

    "quotes.title": "Palabras que Honran al Hangul",
    "quotes.desc": "Bellas palabras dejadas por quienes reconocieron el valor del Hangul. Haz clic para leer las historias detrás de estas palabras.",
    "quotes.modalWho": "Sobre esta persona",
    "quotes.modalContext": "📖 Contexto de esta cita",
    "quotes.modalTitle": " — Sus palabras",

    "news.title": "Noticias del Hangul",
    "news.desc": "Historias de orgullo sobre el Hangul a las que el mundo presta atención.",
    "news.cta": "Si tiene buenos artículos o noticias sobre el Hangul, háganoslo saber. Difundamos juntos el valor del Hangul.",

    "player.unmute": "Activar música",
    "player.mute": "Desactivar música",
  },
};

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType>({
  locale: "ko",
  setLocale: () => {},
  t: (key) => key,
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem("locale") as Locale;
    return saved && translations[saved] ? saved : "ko";
  });

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key: string): string => {
    return translations[locale]?.[key] || translations.ko[key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
