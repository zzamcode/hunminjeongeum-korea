import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useI18n, type Locale } from "@/lib/i18n";

type NewsItem = {
  title: string;
  source: string;
  date: string;
  desc: string;
  url: string;
  tag: string;
};

const newsData: Record<Locale, NewsItem[]> = {
  ko: [
    { title: "South Korea brought K-pop and K-dramas to the world. The Korean language could be next", source: "CNN", date: "2023.01.17", desc: "한류의 세계적 확산과 함께 한국어 학습 열풍이 전 세계적으로 급증하고 있다는 CNN의 심층 보도. 한글의 배우기 쉬운 구조가 이 성장을 뒷받침하고 있다고 분석합니다.", url: "https://www.cnn.com/2023/01/17/asia/korean-language-learning-rise-hallyu-intl-hnk-dst", tag: "CNN" },
    { title: "South Korea's Latest Export: Its Alphabet", source: "The New York Times", date: "2009.09.11", desc: "인도네시아 찌아찌아족이 고유 문자가 없어 한글을 공식 표기 문자로 채택한 사건을 NYT가 보도. '한국의 최신 수출품은 알파벳'이라는 제목이 화제가 되었습니다.", url: "https://archive.nytimes.com/www.nytimes.com/2009/09/12/world/asia/12script.html", tag: "NYT" },
    { title: "South Korea marks 580 years of Hangeul with yearlong celebrations", source: "UPI", date: "2026.01.29", desc: "훈민정음 반포 580주년을 맞아 한국이 1년간의 대규모 기념행사를 진행한다는 UPI 통신의 보도. 한글의 역사적 가치와 세계적 위상을 조명합니다.", url: "https://www.upi.com/Top_News/World-News/2026/01/29/national-hangeul-museum-580th-anniversary-promulgation-Hunminjeongeum/4361769744967/", tag: "UPI" },
    { title: "The World's Most Incredible Alphabet", source: "Asia Society", date: "", desc: "아시아소사이어티가 한글을 '세계에서 가장 놀라운 알파벳'으로 소개. 발음 기관의 모양을 본뜬 자음 설계와 체계적 조합 원리를 상세히 해설합니다.", url: "https://asiasociety.org/education/worlds-most-incredible-alphabet", tag: "Asia Society" },
    { title: "170:1 경쟁률 '세종학당 한국어 대회' 대상에 몽골 엥흐 우일스씨", source: "조선일보", date: "2023.10.11", desc: "제577돌 한글날을 맞아 열린 세종학당 한국어 대회에서 몽골 울란바토르 세종학당의 엥흐 우일스씨가 170:1의 경쟁률을 뚫고 대상을 수상했습니다.", url: "https://www.chosun.com/culture-life/culture_general/2023/10/11/WBWZJL35MZDS3GDKCQETELHD6U/", tag: "조선일보" },
    { title: "Why learning Hangul is the best travel hack for South Korea", source: "The Age (Australia)", date: "2026.03.03", desc: "호주 유력 일간지 The Age가 한글을 '90분이면 배울 수 있는 최고의 여행 꿀팁'으로 소개. 한글의 놀라운 학습 용이성을 체험 기반으로 전합니다.", url: "https://theage.com.au/traveller/inspiration/this-korean-party-trick-made-me-a-hit-with-the-locals-20260220-p5o41b.html", tag: "The Age" },
  ],
  en: [
    { title: "South Korea brought K-pop and K-dramas to the world. The Korean language could be next", source: "CNN", date: "2023.01.17", desc: "CNN's in-depth report on how the global spread of Hallyu has led to a surge in Korean language learning worldwide, with Hangul's easy-to-learn structure supporting this growth.", url: "https://www.cnn.com/2023/01/17/asia/korean-language-learning-rise-hallyu-intl-hnk-dst", tag: "CNN" },
    { title: "South Korea's Latest Export: Its Alphabet", source: "The New York Times", date: "2009.09.11", desc: "NYT's coverage of the Cia-Cia tribe in Indonesia adopting Hangul as their official writing system, with the headline 'South Korea's latest export is its alphabet' making waves.", url: "https://archive.nytimes.com/www.nytimes.com/2009/09/12/world/asia/12script.html", tag: "NYT" },
    { title: "South Korea marks 580 years of Hangeul with yearlong celebrations", source: "UPI", date: "2026.01.29", desc: "UPI reports on South Korea's yearlong celebrations marking the 580th anniversary of the promulgation of Hunminjeongeum, highlighting the historical value and global status of Hangul.", url: "https://www.upi.com/Top_News/World-News/2026/01/29/national-hangeul-museum-580th-anniversary-promulgation-Hunminjeongeum/4361769744967/", tag: "UPI" },
    { title: "The World's Most Incredible Alphabet", source: "Asia Society", date: "", desc: "Asia Society introduces Hangul as 'the world's most incredible alphabet,' detailing the consonant design based on speech organs and the systematic combination principles.", url: "https://asiasociety.org/education/worlds-most-incredible-alphabet", tag: "Asia Society" },
    { title: "170:1 competition at Sejong Institute Korean Contest", source: "Chosun Ilbo", date: "2023.10.11", desc: "At the Sejong Institute Korean Language Contest held on the 577th Hangul Day, Enkh Uils from Mongolia's Ulaanbaatar Sejong Institute won the grand prize with a 170:1 competition ratio.", url: "https://www.chosun.com/culture-life/culture_general/2023/10/11/WBWZJL35MZDS3GDKCQETELHD6U/", tag: "Chosun" },
    { title: "Why learning Hangul is the best travel hack for South Korea", source: "The Age (Australia)", date: "2026.03.03", desc: "Australia's The Age introduces Hangul as 'the best travel hack you can learn in 90 minutes,' sharing an experience-based account of Hangul's remarkably easy learning curve.", url: "https://theage.com.au/traveller/inspiration/this-korean-party-trick-made-me-a-hit-with-the-locals-20260220-p5o41b.html", tag: "The Age" },
  ],
  ja: [
    { title: "South Korea brought K-pop and K-dramas to the world. The Korean language could be next", source: "CNN", date: "2023.01.17", desc: "韓流の世界的拡散とともに韓国語学習ブームが世界中で急増しているというCNNの深層報道。ハングルの学びやすい構造がこの成長を支えていると分析。", url: "https://www.cnn.com/2023/01/17/asia/korean-language-learning-rise-hallyu-intl-hnk-dst", tag: "CNN" },
    { title: "South Korea's Latest Export: Its Alphabet", source: "The New York Times", date: "2009.09.11", desc: "インドネシアのチアチア族がハングルを公式表記文字として採択した事件をNYTが報道。「韓国の最新輸出品はアルファベット」という見出しが話題に。", url: "https://archive.nytimes.com/www.nytimes.com/2009/09/12/world/asia/12script.html", tag: "NYT" },
    { title: "South Korea marks 580 years of Hangeul with yearlong celebrations", source: "UPI", date: "2026.01.29", desc: "訓民正音頒布580周年を迎え、韓国が1年間の大規模記念行事を行うというUPI通信の報道。ハングルの歴史的価値と世界的地位を照明。", url: "https://www.upi.com/Top_News/World-News/2026/01/29/national-hangeul-museum-580th-anniversary-promulgation-Hunminjeongeum/4361769744967/", tag: "UPI" },
    { title: "The World's Most Incredible Alphabet", source: "Asia Society", date: "", desc: "アジアソサエティがハングルを「世界で最も驚くべきアルファベット」として紹介。発音器官の形を模した子音設計と体系的な組み合わせ原理を詳しく解説。", url: "https://asiasociety.org/education/worlds-most-incredible-alphabet", tag: "Asia Society" },
    { title: "170:1の競争率「世宗学堂韓国語大会」大賞にモンゴルのエンフ・ウイルスさん", source: "朝鮮日報", date: "2023.10.11", desc: "第577回ハングルの日に開催された世宗学堂韓国語大会で、モンゴル・ウランバートル世宗学堂のエンフ・ウイルスさんが170:1の競争率を突破して大賞を受賞。", url: "https://www.chosun.com/culture-life/culture_general/2023/10/11/WBWZJL35MZDS3GDKCQETELHD6U/", tag: "朝鮮日報" },
    { title: "Why learning Hangul is the best travel hack for South Korea", source: "The Age (Australia)", date: "2026.03.03", desc: "豪州の有力紙The Ageがハングルを「90分で学べる最高の旅行ハック」として紹介。ハングルの驚くべき学習のしやすさを体験ベースで伝える。", url: "https://theage.com.au/traveller/inspiration/this-korean-party-trick-made-me-a-hit-with-the-locals-20260220-p5o41b.html", tag: "The Age" },
  ],
  zh: [
    { title: "South Korea brought K-pop and K-dramas to the world. The Korean language could be next", source: "CNN", date: "2023.01.17", desc: "CNN深度报道：随着韩流在全球的传播，全世界掀起了学习韩语的热潮。韩文易学的结构是推动这一增长的关键因素。", url: "https://www.cnn.com/2023/01/17/asia/korean-language-learning-rise-hallyu-intl-hnk-dst", tag: "CNN" },
    { title: "South Korea's Latest Export: Its Alphabet", source: "The New York Times", date: "2009.09.11", desc: "《纽约时报》报道印尼齐亚齐亚族因无文字而采用韩文作为官方书写系统。"韩国最新的出口产品是它的字母"这一标题引发广泛关注。", url: "https://archive.nytimes.com/www.nytimes.com/2009/09/12/world/asia/12script.html", tag: "NYT" },
    { title: "South Korea marks 580 years of Hangeul with yearlong celebrations", source: "UPI", date: "2026.01.29", desc: "UPI报道韩国为纪念训民正音颁布580周年举行为期一年的大规模庆祝活动，彰显韩文的历史价值和世界地位。", url: "https://www.upi.com/Top_News/World-News/2026/01/29/national-hangeul-museum-580th-anniversary-promulgation-Hunminjeongeum/4361769744967/", tag: "UPI" },
    { title: "The World's Most Incredible Alphabet", source: "Asia Society", date: "", desc: "亚洲协会将韩文介绍为"世界上最不可思议的字母"，详细解说了模仿发音器官形状的辅音设计和系统的组合原理。", url: "https://asiasociety.org/education/worlds-most-incredible-alphabet", tag: "Asia Society" },
    { title: "170:1竞争率「世宗学堂韩语大赛」大奖得主——蒙古恩赫·乌伊尔斯", source: "朝鲜日报", date: "2023.10.11", desc: "在第577届韩文日举办的世宗学堂韩语大赛中，蒙古乌兰巴托世宗学堂的恩赫·乌伊尔斯以170:1的竞争率脱颖而出获得大奖。", url: "https://www.chosun.com/culture-life/culture_general/2023/10/11/WBWZJL35MZDS3GDKCQETELHD6U/", tag: "朝鲜日报" },
    { title: "Why learning Hangul is the best travel hack for South Korea", source: "The Age (Australia)", date: "2026.03.03", desc: "澳大利亚权威日报The Age将韩文介绍为"90分钟就能学会的最佳旅行窍门"，基于体验分享韩文令人惊叹的易学性。", url: "https://theage.com.au/traveller/inspiration/this-korean-party-trick-made-me-a-hit-with-the-locals-20260220-p5o41b.html", tag: "The Age" },
  ],
  es: [
    { title: "South Korea brought K-pop and K-dramas to the world. The Korean language could be next", source: "CNN", date: "2023.01.17", desc: "Reportaje de CNN sobre cómo la expansión global del Hallyu ha provocado un auge en el aprendizaje del coreano en todo el mundo, con la estructura fácil de aprender del Hangul como factor clave.", url: "https://www.cnn.com/2023/01/17/asia/korean-language-learning-rise-hallyu-intl-hnk-dst", tag: "CNN" },
    { title: "South Korea's Latest Export: Its Alphabet", source: "The New York Times", date: "2009.09.11", desc: "El NYT informa sobre la tribu Cia-Cia de Indonesia adoptando el Hangul como sistema de escritura oficial. El titular 'La última exportación de Corea del Sur es su alfabeto' causó sensación.", url: "https://archive.nytimes.com/www.nytimes.com/2009/09/12/world/asia/12script.html", tag: "NYT" },
    { title: "South Korea marks 580 years of Hangeul with yearlong celebrations", source: "UPI", date: "2026.01.29", desc: "UPI informa sobre las celebraciones de un año en Corea del Sur por el 580º aniversario de la promulgación del Hunminjeongeum, destacando el valor histórico y el estatus global del Hangul.", url: "https://www.upi.com/Top_News/World-News/2026/01/29/national-hangeul-museum-580th-anniversary-promulgation-Hunminjeongeum/4361769744967/", tag: "UPI" },
    { title: "The World's Most Incredible Alphabet", source: "Asia Society", date: "", desc: "Asia Society presenta el Hangul como 'el alfabeto más increíble del mundo,' detallando el diseño de consonantes basado en los órganos del habla y los principios de combinación sistemática.", url: "https://asiasociety.org/education/worlds-most-incredible-alphabet", tag: "Asia Society" },
    { title: "Competición 170:1 en el Concurso Coreano del Instituto Sejong", source: "Chosun Ilbo", date: "2023.10.11", desc: "En el Concurso de Coreano del Instituto Sejong celebrado en el 577º Día del Hangul, Enkh Uils del Instituto Sejong de Ulán Bator ganó el gran premio con una competencia de 170:1.", url: "https://www.chosun.com/culture-life/culture_general/2023/10/11/WBWZJL35MZDS3GDKCQETELHD6U/", tag: "Chosun" },
    { title: "Why learning Hangul is the best travel hack for South Korea", source: "The Age (Australia)", date: "2026.03.03", desc: "El diario australiano The Age presenta el Hangul como 'el mejor truco de viaje que puedes aprender en 90 minutos,' compartiendo una experiencia sobre la facilidad de aprendizaje del Hangul.", url: "https://theage.com.au/traveller/inspiration/this-korean-party-trick-made-me-a-hit-with-the-locals-20260220-p5o41b.html", tag: "The Age" },
  ],
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const News = () => {
  const { t, locale } = useI18n();
  const newsItems = newsData[locale] || newsData.ko;

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 px-6 hanji-texture">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl md:text-7xl font-black text-vermillion mb-6">
              {t("news.title")}
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {t("news.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-5">
          {newsItems.map((item, i) => (
            <motion.a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="block bg-card border border-border rounded-sm p-6 md:p-8 hover:shadow-md hover:border-vermillion/30 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-[10px] font-bold tracking-widest text-vermillion bg-vermillion/10 px-2 py-0.5 rounded-sm">
                      {item.tag}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.source} · {item.date}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-vermillion transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <ExternalLink
                  size={18}
                  className="text-muted-foreground group-hover:text-vermillion transition-colors mt-1 shrink-0"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            {t("news.cta")}
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default News;
