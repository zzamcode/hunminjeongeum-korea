import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const newsItems = [
  {
    title: "170:1 경쟁률 '세종학당 한국어 대회' 대상에 몽골 엥흐 우일스씨",
    source: "조선일보",
    date: "2023.10.11",
    desc: "제577돌 한글날을 맞아 열린 세종학당 한국어 대회에서 몽골 울란바토르 세종학당의 엥흐 우일스씨가 170:1의 경쟁률을 뚫고 대상을 수상했습니다.",
    url: "https://www.chosun.com/culture-life/culture_general/2023/10/11/WBWZJL35MZDS3GDKCQETELHD6U/",
    tag: "세종학당",
  },
  {
    title: "AI 시대, 인류가 꿈꿀 수 있는 최고의 문자는 한글",
    source: "Korea IT Times",
    date: "2024",
    desc: "AI와 양자컴퓨팅 시대에 한글의 과학적 구조가 디지털 처리에 최적화된 문자임이 재조명되고 있습니다. 자질 문자로서의 체계적 설계가 빛을 발합니다.",
    url: "https://www.koreaittimes.com/news/articleView.html?idxno=135068",
    tag: "AI·과학",
  },
  {
    title: "AI 양자 시대, 한글이 세계 문맹 퇴치의 보편 과학 문자로 부상",
    source: "Korea IT Times",
    date: "2026.01",
    desc: "유네스코 세종대왕 문해상의 정신을 이어, AI 양자 시대에 한글이 전 세계 문맹 퇴치를 위한 보편적 과학 문자로 주목받고 있습니다.",
    url: "https://www.koreaittimes.com/news/articleView.html?idxno=126114",
    tag: "글로벌",
  },
  {
    title: "578살 한글, 세계에서 가장 우수한 글자",
    source: "전남구례신문",
    date: "2024",
    desc: "지구상 210개국 중 자기 말과 글을 함께 가진 나라는 50여 개국. 그중에서도 한글은 과학성·독창성·실용성 모든 면에서 세계 최고의 문자로 평가받습니다.",
    url: "https://www.newsgurye.com/news/articleView.html?idxno=125",
    tag: "칼럼",
  },
  {
    title: "AI가 말하는 한글: '세계적으로 위대한 문자'",
    source: "MS투데이",
    date: "2023",
    desc: "AI에게 한글에 대해 물었더니 돌아온 대답은 단호했습니다. '한글은 세계적으로 위대한 문자입니다.' 그 이유를 조목조목 분석합니다.",
    url: "https://mstoday.co.kr/news/articleView.html?idxno=85579",
    tag: "AI·과학",
  },
  {
    title: "훈민정음을 다시 생각하다 — 한글엔 우주론적 이진법이 담겨있다",
    source: "서울파이낸스",
    date: "2024",
    desc: "한글의 모음 체계에 숨겨진 천지인(天地人) 철학과 이진법적 구조. 580년 전 설계된 문자가 현대 컴퓨터 과학의 원리를 품고 있었습니다.",
    url: "https://www.seoulfn.com/news/articleView.html?idxno=534315",
    tag: "철학·과학",
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
