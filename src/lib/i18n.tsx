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
