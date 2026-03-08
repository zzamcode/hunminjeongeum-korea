import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const newsItems = [
  {
    title: "South Korea brought K-pop and K-dramas to the world. The Korean language could be next",
    source: "CNN",
    date: "2023.01.17",
    desc: "한류의 세계적 확산과 함께 한국어 학습 열풍이 전 세계적으로 급증하고 있다는 CNN의 심층 보도. 한글의 배우기 쉬운 구조가 이 성장을 뒷받침하고 있다고 분석합니다.",
    url: "https://www.cnn.com/2023/01/17/asia/korean-language-learning-rise-hallyu-intl-hnk-dst",
    tag: "CNN",
  },
  {
    title: "South Korea's Latest Export: Its Alphabet",
    source: "The New York Times",
    date: "2009.09.11",
    desc: "인도네시아 찌아찌아족이 고유 문자가 없어 한글을 공식 표기 문자로 채택한 사건을 NYT가 보도. '한국의 최신 수출품은 알파벳'이라는 제목이 화제가 되었습니다.",
    url: "https://archive.nytimes.com/www.nytimes.com/2009/09/12/world/asia/12script.html",
    tag: "NYT",
  },
  {
    title: "South Korea marks 580 years of Hangeul with yearlong celebrations",
    source: "UPI",
    date: "2026.01.29",
    desc: "훈민정음 반포 580주년을 맞아 한국이 1년간의 대규모 기념행사를 진행한다는 UPI 통신의 보도. 한글의 역사적 가치와 세계적 위상을 조명합니다.",
    url: "https://www.upi.com/Top_News/World-News/2026/01/29/national-hangeul-museum-580th-anniversary-promulgation-Hunminjeongeum/4361769744967/",
    tag: "UPI",
  },
  {
    title: "The World's Most Incredible Alphabet",
    source: "Asia Society",
    date: "",
    desc: "아시아소사이어티가 한글을 '세계에서 가장 놀라운 알파벳'으로 소개. 발음 기관의 모양을 본뜬 자음 설계와 체계적 조합 원리를 상세히 해설합니다.",
    url: "https://asiasociety.org/education/worlds-most-incredible-alphabet",
    tag: "Asia Society",
  },
  {
    title: "170:1 경쟁률 '세종학당 한국어 대회' 대상에 몽골 엥흐 우일스씨",
    source: "조선일보",
    date: "2023.10.11",
    desc: "제577돌 한글날을 맞아 열린 세종학당 한국어 대회에서 몽골 울란바토르 세종학당의 엥흐 우일스씨가 170:1의 경쟁률을 뚫고 대상을 수상했습니다.",
    url: "https://www.chosun.com/culture-life/culture_general/2023/10/11/WBWZJL35MZDS3GDKCQETELHD6U/",
    tag: "조선일보",
  },
  {
    title: "Why learning Hangul is the best travel hack for South Korea",
    source: "The Age (Australia)",
    date: "2026.03.03",
    desc: "호주 유력 일간지 The Age가 한글을 '90분이면 배울 수 있는 최고의 여행 꿀팁'으로 소개. 한글의 놀라운 학습 용이성을 체험 기반으로 전합니다.",
    url: "https://theage.com.au/traveller/inspiration/this-korean-party-trick-made-me-a-hit-with-the-locals-20260220-p5o41b.html",
    tag: "The Age",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const News = () => {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-6 hanji-texture">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl md:text-7xl font-black text-vermillion mb-6">
              한글 소식
            </div>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              세계가 주목하는 한글, 그 자랑스러운 이야기들을 모았습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
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

      {/* CTA */}
      <section className="py-16 px-6 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            한글 관련 좋은 기사나 소식이 있다면 알려주세요. 함께 한글의 가치를 알려갑시다.
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default News;
