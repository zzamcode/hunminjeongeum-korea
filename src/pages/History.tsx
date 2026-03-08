import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { useI18n, type Locale } from "@/lib/i18n";

type Event = {
  year: string;
  title: string;
  desc: string;
  accent: string;
  detail: string;
};

const eventsData: Record<Locale, Event[]> = {
  ko: [
    { year: "1443", title: "훈민정음 창제", desc: "세종대왕이 새로운 문자 체계를 창제하였다.", accent: "vermillion", detail: "1443년 음력 12월, 세종대왕은 세상에 없던 새로운 문자를 만들어냈습니다. 이 문자가 바로 훈민정음, 오늘날의 한글입니다.\n\n당시 조선의 공식 문자는 한문이었습니다. 그러나 한문은 수천 개의 글자를 외워야 하는 어려운 문자였기에, 양반이 아닌 일반 백성은 평생을 살아도 자기 이름조차 쓰지 못하는 경우가 허다했습니다.\n\n세종은 이런 백성들의 처지를 깊이 안타깝게 여겼습니다. 그는 발음 기관의 모양을 본떠 자음을 만들고, 하늘(ㆍ)·땅(ㅡ)·사람(ㅣ)의 원리로 모음을 설계했습니다. 세계 문자사에서 창제 원리가 명확히 밝혀진 문자는 한글이 유일합니다.\n\n최만리를 비롯한 일부 신하들은 '오랑캐의 짓'이라며 격렬히 반대했지만, 세종은 '내 백성을 위한 일'이라며 뜻을 꺾지 않았습니다." },
    { year: "1446", title: "훈민정음 반포", desc: "해례본과 함께 공식적으로 반포되었다.", accent: "gold", detail: "1446년 음력 9월 상한, 세종은 훈민정음을 공식적으로 세상에 알렸습니다. 이때 함께 발간된 것이 바로 '훈민정음 해례본'입니다.\n\n해례본은 정인지, 신숙주, 성삼문, 박팽년 등 집현전 학자 8인이 참여하여 만든 해설서입니다. 각 글자가 왜 그런 모양인지, 초성·중성·종성을 어떻게 조합하는지 상세하게 풀이해 놓았습니다.\n\n이것은 세계 문자사에서 전무후무한 일입니다. 이 해례본은 1997년 유네스코 세계기록유산에 등재되었습니다." },
    { year: "1504", title: "한글 사용 탄압", desc: "연산군이 한글 교육과 사용을 금지하였다.", accent: "vermillion", detail: "연산군 10년, 백성들이 한글로 벽보를 써서 폭군 연산군을 비방한 사건이 터졌습니다. 분노한 연산군은 한글 서적을 모조리 불태우고, 한글을 가르치거나 배우는 것 자체를 엄금했습니다.\n\n그러나 한글은 사라지지 않았습니다. 궁중의 여성들은 한글로 편지를 주고받았고, 민간에서는 소설과 가사를 한글로 기록했습니다." },
    { year: "1894", title: "공문식 반포", desc: "갑오개혁으로 한글이 공식 국문으로 채택되었다.", accent: "jade", detail: "448년 만의 명예 회복이었습니다. 1894년 갑오개혁 때 고종은 모든 법률과 칙령을 한글(국문)로 작성하도록 명했습니다.\n\n1896년에는 서재필이 《독립신문》을 한글 전용으로 발행하며, 일반 백성도 신문을 읽을 수 있는 시대를 열었습니다." },
    { year: "1910", title: "주시경의 한글 연구", desc: "주시경 선생이 '한글'이라는 이름을 처음 사용하였다.", accent: "gold", detail: "국어학자 주시경(1876~1914)은 한글 근대화의 아버지입니다. 그는 '한글'이라는 당당한 이름을 붙였습니다. '한'은 '크다'와 '하나'를 동시에 뜻하니, '크고 하나뿐인 글'이라는 의미입니다.\n\n주시경은 《국어문법》을 저술하여 한글의 문법 체계를 과학적으로 정리했고, 조선어강습원을 설립하여 한글을 체계적으로 가르쳤습니다.\n\n안타깝게도 38세에 과로로 세상을 떠났지만, 그의 제자들이 일제강점기 내내 한글을 지켜냈습니다." },
    { year: "1926", title: "가갸날 제정", desc: "조선어학회가 한글을 기념하기 시작했다.", accent: "vermillion", detail: "1926년, 조선어연구회는 훈민정음 반포 480주년을 맞아 '가갸날'을 제정했습니다. 일제의 감시 속에서도 한글을 기념한 것은 민족의 얼을 지키겠다는 선언이었습니다.\n\n1942년 '조선어학회 사건'으로 한글학자 33명이 검거되었고, 이윤재와 한징은 옥중에서 순국했습니다." },
    { year: "1940", title: "훈민정음 해례본 발견", desc: "경북 안동에서 해례본 원본이 발견되었다.", accent: "gold", detail: "1940년, 경북 안동의 한 고택에서 약 500년간 사라졌던 훈민정음 해례본 원본이 발견되었습니다. 간송 전형필 선생이 거금을 주고 이 책을 구입했습니다.\n\n해례본의 발견으로 한글의 과학적 창제 원리가 세상에 알려지게 되었고, 한글이 세계적으로 높이 평가받는 결정적 계기가 되었습니다. 현재 국보 제70호이자 유네스코 세계기록유산입니다." },
    { year: "1945", title: "광복과 한글 부활", desc: "일제 강점기 탄압에서 벗어나 한글이 부활했다.", accent: "jade", detail: "35년간의 어둠이 끝났습니다. 일제강점기 동안 일본은 우리말과 글을 말살하려 했습니다.\n\n그러나 한글은 살아남았습니다. 조선어학회 학자들이 목숨을 걸고 《조선말 큰사전》을 편찬했고, 광복 후 한글은 다시 나라의 공식 문자가 되었습니다." },
    { year: "1997", title: "유네스코 세계기록유산 등재", desc: "훈민정음 해례본이 세계기록유산으로 등재되었다.", accent: "vermillion", detail: "1997년 10월, 훈민정음 해례본이 유네스코 세계기록유산에 등재되었습니다. '문자 체계의 과학적 설계 원리가 기록된 유일한 사례'라는 평가를 받았습니다.\n\n같은 해부터 유네스코는 세종대왕의 이름을 딴 '세종대왕 문해상'을 수여하고 있습니다." },
    { year: "2009", title: "찌아찌아족 한글 채택", desc: "인도네시아 찌아찌아족이 한글을 채택하였다.", accent: "gold", detail: "2009년, 인도네시아 부톤섬의 소수민족 찌아찌아족이 자신들의 언어를 적기 위해 한글을 공식 문자로 채택했습니다.\n\n한글은 찌아찌아어의 복잡한 발음을 완벽하게 표기할 수 있었습니다. 세종대왕이 '천하의 모든 소리를 적을 수 있다'고 한 자부심이 580년 만에 현실이 된 것입니다." },
  ],
  en: [
    { year: "1443", title: "Creation of Hunminjeongeum", desc: "King Sejong created a new writing system.", accent: "vermillion", detail: "In December 1443, King Sejong created an entirely new writing system — Hunminjeongeum, today known as Hangul.\n\nAt the time, Classical Chinese was the official script of Joseon. However, it required memorizing thousands of characters, making it inaccessible to common people who could not even write their own names.\n\nSejong modeled consonants after the shape of speech organs (tongue, lips, throat) and designed vowels based on the principles of Heaven (ㆍ), Earth (ㅡ), and Human (ㅣ). Hangul is the only writing system in history whose creation principles are clearly documented.\n\nDespite fierce opposition from officials who called it 'the work of barbarians,' Sejong insisted it was 'for his people.'" },
    { year: "1446", title: "Promulgation of Hunminjeongeum", desc: "Officially promulgated with the Haerye commentary.", accent: "gold", detail: "In September 1446, Sejong officially proclaimed Hunminjeongeum to the world, along with the Haerye (explanatory commentary).\n\nThe Haerye was compiled by eight scholars of the Hall of Worthies, explaining why each letter has its shape and how to combine initial, medial, and final components. No other writing system in history has such complete documentation of its design principles.\n\nThe Haerye was inscribed as a UNESCO Memory of the World in 1997." },
    { year: "1504", title: "Suppression of Hangul", desc: "King Yeonsangun banned Hangul education and use.", accent: "vermillion", detail: "When commoners used Hangul to write protest posters criticizing the tyrannical King Yeonsangun, he banned all Hangul books and made it illegal to teach or learn the script.\n\nYet Hangul survived. Court women exchanged letters in Hangul, and popular novels like 'The Story of Hong Gildong' and 'Chunhyangjeon' were written in Hangul, deepening its roots among the people." },
    { year: "1894", title: "Gabo Reform Proclamation", desc: "Hangul was adopted as the official national script.", accent: "jade", detail: "After 448 years, Hangul was restored to its rightful place. During the Gabo Reform of 1894, King Gojong decreed that all laws and edicts must be written in Hangul.\n\nIn 1896, Seo Jae-pil published the 'Independent Newspaper' entirely in Hangul, enabling ordinary citizens to read the news for the first time." },
    { year: "1910", title: "Ju Si-gyeong's Research", desc: "Scholar Ju Si-gyeong first used the name 'Hangul.'", accent: "gold", detail: "Linguist Ju Si-gyeong (1876–1914) is the father of modern Korean linguistics. He gave the script its proud name 'Hangul,' where 'han' means both 'great' and 'one' — 'the one great script.'\n\nHe authored 'Korean Grammar,' systematically organizing Hangul's grammatical structure, and established a Korean language school. Though he passed away at just 38, his students — Choe Hyeon-bae, Kim Du-bong, and Yi Geuk-ro — defended Hangul throughout the Japanese colonial period." },
    { year: "1926", title: "First Gagya Day", desc: "The Korean Language Society began commemorating Hangul.", accent: "vermillion", detail: "In 1926, the Korean Language Research Society established 'Gagya Day' to mark the 480th anniversary of Hunminjeongeum's promulgation — an act of defiance under Japanese surveillance.\n\nIn 1942, the Japanese fabricated the 'Korean Language Society Incident,' arresting 33 Korean linguists. Two scholars — Yi Yun-jae and Han Jing — died in prison." },
    { year: "1940", title: "Discovery of the Haerye", desc: "The original Haerye manuscript was found in Andong.", accent: "gold", detail: "In 1940, the original Hunminjeongeum Haerye, lost for nearly 500 years, was miraculously discovered in an old house in Andong, Gyeongsang Province. Collector Jeon Hyeong-pil purchased it at great cost to protect it from Japanese cultural plunder.\n\nThis discovery revealed the scientific creation principles of Hangul to the world and became the decisive factor in its global recognition. It is now National Treasure No. 70 and a UNESCO Memory of the World." },
    { year: "1945", title: "Liberation and Hangul Revival", desc: "Hangul was revived after liberation from Japanese colonial rule.", accent: "jade", detail: "After 35 years of darkness, Korea was liberated. During the Japanese occupation, Japan attempted to eradicate the Korean language entirely.\n\nBut Hangul survived. Scholars of the Korean Language Society risked their lives to compile the 'Great Korean Dictionary,' and after liberation, Hangul was restored as the nation's official writing system." },
    { year: "1997", title: "UNESCO Memory of the World", desc: "The Hunminjeongeum Haerye was inscribed as UNESCO heritage.", accent: "vermillion", detail: "In October 1997, the Hunminjeongeum Haerye was inscribed as a UNESCO Memory of the World. UNESCO praised it as 'the only documented case of a scientifically designed writing system.'\n\nThat same year, UNESCO established the King Sejong Literacy Prize, awarded annually to individuals and organizations contributing to global literacy." },
    { year: "2009", title: "Cia-Cia Tribe Adopts Hangul", desc: "The Cia-Cia people of Indonesia adopted Hangul.", accent: "gold", detail: "In 2009, the Cia-Cia people of Buton Island, Indonesia — a minority group of about 80,000 with no written script — officially adopted Hangul to write their language.\n\nHangul could perfectly transcribe the complex sounds of the Cia-Cia language that Roman letters could not. King Sejong's pride that Hangul could 'write all sounds under heaven' became reality 580 years later." },
  ],
  ja: [
    { year: "1443", title: "訓民正音の創製", desc: "世宗大王が新しい文字体系を創製した。", accent: "vermillion", detail: "1443年12月、世宗大王はこの世になかった新しい文字を生み出しました。これが訓民正音、今日のハングルです。\n\n当時の朝鮮の公式文字は漢文でした。しかし何千もの文字を覚えなければならず、一般の民衆は一生自分の名前さえ書けない場合がほとんどでした。\n\n世宗は発音器官の形を模して子音を作り、天(ㆍ)・地(ㅡ)・人(ㅣ)の原理で母音を設計しました。創製原理が明確に記録された文字はハングルが世界で唯一です。\n\n一部の臣下は激しく反対しましたが、世宗は「民のためである」と意志を貫きました。" },
    { year: "1446", title: "訓民正音の頒布", desc: "解例本と共に公式に頒布された。", accent: "gold", detail: "1446年9月、世宗は訓民正音を公式に世に知らしめました。この時、解例本も刊行されました。\n\n解例本は集賢殿の学者8人が参加して作った解説書です。各文字の形の理由と、初声・中声・終声の組み合わせ方を詳細に説明しています。\n\nこの解例本は1997年にユネスコ世界記録遺産に登録されました。" },
    { year: "1504", title: "ハングル使用の弾圧", desc: "燕山君がハングルの教育と使用を禁止した。", accent: "vermillion", detail: "燕山君10年、民衆がハングルで壁報を書いて暴君を批判した事件が起きました。激怒した燕山君はハングルの書籍をすべて焼き、教育も禁止しました。\n\nしかしハングルは消えませんでした。宮中の女性たちはハングルで手紙を交わし、民間では小説がハングルで記録されました。" },
    { year: "1894", title: "公文式の頒布", desc: "甲午改革でハングルが公式国文として採択された。", accent: "jade", detail: "448年ぶりの名誉回復でした。1894年の甲午改革で、高宗はすべての法律と勅令をハングルで作成するよう命じました。\n\n1896年には、徐載弼が「独立新聞」をハングル専用で発行し、一般の民衆も新聞を読める時代を開きました。" },
    { year: "1910", title: "周時経のハングル研究", desc: "周時経先生が「ハングル」という名前を初めて使用した。", accent: "gold", detail: "国語学者の周時経(1876～1914)はハングル近代化の父です。「ハングル」という堂々とした名前を付けました。「ハン」は「大きい」と「一つ」を同時に意味し、「大きくて唯一の文字」という意味です。\n\n38歳で亡くなりましたが、彼の弟子たちが日本統治下でもハングルを守り抜きました。" },
    { year: "1926", title: "カギャの日制定", desc: "朝鮮語学会がハングルを記念し始めた。", accent: "vermillion", detail: "1926年、朝鮮語研究会は訓民正音頒布480周年を記念して「カギャの日」を制定しました。日本の監視下でもハングルを記念したことは、民族の魂を守るという宣言でした。\n\n1942年の「朝鮮語学会事件」で学者33人が逮捕され、2人が獄中で殉国しました。" },
    { year: "1940", title: "訓民正音解例本の発見", desc: "慶北安東で解例本の原本が発見された。", accent: "gold", detail: "1940年、慶北安東の旧家で約500年間失われていた訓民正音解例本の原本が発見されました。間松全鎣弼先生が大金を払ってこの本を購入しました。\n\n解例本の発見はハングルの科学的創製原理を世界に知らしめ、国宝第70号であり、ユネスコ世界記録遺産でもあります。" },
    { year: "1945", title: "光復とハングルの復活", desc: "日本統治からの解放後、ハングルが復活した。", accent: "jade", detail: "35年間の暗闇が終わりました。日本統治下で日本は韓国語と文字を抹殺しようとしました。\n\nしかしハングルは生き残りました。朝鮮語学会の学者たちが命がけで辞書を編纂し、光復後ハングルは再び国の公式文字となりました。" },
    { year: "1997", title: "ユネスコ世界記録遺産登録", desc: "訓民正音解例本が世界記録遺産に登録された。", accent: "vermillion", detail: "1997年10月、訓民正音解例本がユネスコ世界記録遺産に登録されました。「文字体系の科学的設計原理が記録された唯一の事例」という評価を受けました。\n\n同年からユネスコは世宗大王の名を冠した「世宗大王識字賞」を授与しています。" },
    { year: "2009", title: "チアチア族のハングル採択", desc: "インドネシアのチアチア族がハングルを採択した。", accent: "gold", detail: "2009年、インドネシア・ブトン島の少数民族チアチア族が自分たちの言語を表記するためにハングルを公式文字として採択しました。\n\nハングルはチアチア語の複雑な発音を完璧に表記できました。世宗大王の「天下のすべての音を書ける」という自負が580年後に現実となったのです。" },
  ],
  zh: [
    { year: "1443", title: "训民正音的创制", desc: "世宗大王创制了新的文字体系。", accent: "vermillion", detail: "1443年12月，世宗大王创造了一种全新的文字——训民正音，即今天的韩文。\n\n当时朝鲜的官方文字是汉文。然而汉文需要记忆数千个汉字，普通百姓终其一生也无法书写自己的名字。\n\n世宗模仿发音器官的形状创造了辅音，以天(ㆍ)、地(ㅡ)、人(ㅣ)的原理设计了元音。韩文是世界上唯一一种创制原理被明确记录的文字。\n\n尽管部分臣子激烈反对，世宗仍坚持「这是为了百姓」的信念。" },
    { year: "1446", title: "训民正音颁布", desc: "连同解例本一起正式颁布。", accent: "gold", detail: "1446年9月，世宗正式向世界宣布了训民正音，同时发行了解例本。\n\n解例本是由集贤殿8位学者编写的说明书，详细解释了每个字母的形状原因和组合方式。\n\n该解例本于1997年被列入联合国教科文组织世界记忆遗产。" },
    { year: "1504", title: "韩文使用遭到镇压", desc: "燕山君禁止了韩文的教育和使用。", accent: "vermillion", detail: "燕山君十年，百姓用韩文书写壁报批评暴君。愤怒的燕山君下令焚烧所有韩文书籍，禁止教学韩文。\n\n然而韩文并未消失。宫中女性用韩文通信，民间用韩文记录小说和歌词。" },
    { year: "1894", title: "公文式颁布", desc: "甲午改革使韩文成为官方文字。", accent: "jade", detail: "这是时隔448年的名誉恢复。1894年甲午改革时，高宗下令所有法律和敕令都用韩文书写。\n\n1896年，徐载弼以韩文专用发行了《独立新闻》，开启了普通百姓也能阅读报纸的时代。" },
    { year: "1910", title: "周时经的韩文研究", desc: "周时经先生首次使用「韩文」这一名称。", accent: "gold", detail: "语言学家周时经(1876～1914)是韩文现代化之父。他为文字取名「韩文」(Hangul)，其中「韩」同时意味着「伟大」和「唯一」。\n\n他虽然38岁英年早逝，但他的弟子们在日本殖民统治期间始终守护着韩文。" },
    { year: "1926", title: "设立纪念日", desc: "朝鲜语学会开始纪念韩文。", accent: "vermillion", detail: "1926年，朝鲜语研究会在训民正音颁布480周年之际设立了纪念日。在日本监视下纪念韩文，是守护民族灵魂的宣言。\n\n1942年的「朝鲜语学会事件」中，33名学者被逮捕，2人在狱中殉国。" },
    { year: "1940", title: "训民正音解例本被发现", desc: "解例本原件在庆北安东被发现。", accent: "gold", detail: "1940年，失踪近500年的训民正音解例本原件在庆北安东一座老宅中被发现。收藏家全镕弼先生以巨资购入此书。\n\n解例本的发现使韩文的科学创制原理广为人知。现为国宝第70号，也是联合国教科文组织世界记忆遗产。" },
    { year: "1945", title: "光复与韩文复兴", desc: "从日本殖民统治的压迫中解放，韩文得以复兴。", accent: "jade", detail: "35年的黑暗结束了。日本殖民时期，日本试图消灭韩国语言和文字。\n\n但韩文幸存了下来。朝鲜语学会的学者们冒着生命危险编纂字典，光复后韩文重新成为国家官方文字。" },
    { year: "1997", title: "列入UNESCO世界记忆遗产", desc: "训民正音解例本被列为世界记忆遗产。", accent: "vermillion", detail: "1997年10月，训民正音解例本被列入联合国教科文组织世界记忆遗产。被评价为"唯一记录了文字体系科学设计原理的文献"。\n\n同年起，联合国教科文组织设立了以世宗大王命名的"世宗大王扫盲奖"。" },
    { year: "2009", title: "印尼齐亚齐亚族采用韩文", desc: "印度尼西亚齐亚齐亚族采用韩文作为文字。", accent: "gold", detail: "2009年，印度尼西亚布顿岛的少数民族齐亚齐亚族——一个约8万人的无文字民族——正式采用韩文来书写其语言。\n\n韩文能完美表记齐亚齐亚语的复杂发音。世宗大王"能书写天下所有声音"的自豪，在580年后成为现实。" },
  ],
  es: [
    { year: "1443", title: "Creación del Hunminjeongeum", desc: "El Rey Sejong creó un nuevo sistema de escritura.", accent: "vermillion", detail: "En diciembre de 1443, el Rey Sejong creó un sistema de escritura completamente nuevo: el Hunminjeongeum, conocido hoy como Hangul.\n\nEn ese momento, el chino clásico era la escritura oficial de Joseon. Sin embargo, requería memorizar miles de caracteres, haciéndolo inaccesible para la gente común que no podía ni escribir su propio nombre.\n\nSejong modeló las consonantes según la forma de los órganos del habla y diseñó las vocales basándose en los principios del Cielo (ㆍ), la Tierra (ㅡ) y el Humano (ㅣ). Es el único sistema de escritura cuyo principio de creación está documentado.\n\nA pesar de la feroz oposición, Sejong insistió: 'Es por mi pueblo.'" },
    { year: "1446", title: "Promulgación del Hunminjeongeum", desc: "Promulgado oficialmente con el comentario Haerye.", accent: "gold", detail: "En septiembre de 1446, Sejong proclamó oficialmente el Hunminjeongeum junto con el Haerye, un manual explicativo compilado por ocho eruditos.\n\nEl Haerye explica por qué cada letra tiene su forma y cómo combinar los componentes. Ningún otro sistema de escritura tiene tal documentación.\n\nFue inscrito como Patrimonio de la Memoria del Mundo de la UNESCO en 1997." },
    { year: "1504", title: "Supresión del Hangul", desc: "El Rey Yeonsangun prohibió la educación y el uso del Hangul.", accent: "vermillion", detail: "Cuando los plebeyos usaron Hangul para escribir carteles de protesta contra el tiránico Yeonsangun, éste prohibió todos los libros en Hangul y declaró ilegal enseñar o aprender la escritura.\n\nSin embargo, el Hangul sobrevivió. Las mujeres de la corte intercambiaban cartas en Hangul, y las novelas populares se escribían en Hangul." },
    { year: "1894", title: "Proclamación de la Reforma Gabo", desc: "El Hangul fue adoptado como escritura oficial nacional.", accent: "jade", detail: "Después de 448 años, el Hangul fue restaurado. Durante la Reforma Gabo de 1894, el Rey Gojong decretó que todas las leyes debían escribirse en Hangul.\n\nEn 1896, Seo Jae-pil publicó el 'Periódico Independiente' enteramente en Hangul, permitiendo que los ciudadanos comunes leyeran noticias por primera vez." },
    { year: "1910", title: "Investigación de Ju Si-gyeong", desc: "El erudito Ju Si-gyeong usó por primera vez el nombre 'Hangul.'", accent: "gold", detail: "El lingüista Ju Si-gyeong (1876-1914) es el padre de la lingüística coreana moderna. Dio a la escritura su orgulloso nombre 'Hangul,' donde 'han' significa tanto 'grande' como 'único.'\n\nAunque falleció a los 38 años, sus discípulos defendieron el Hangul durante todo el período colonial japonés." },
    { year: "1926", title: "Primer Día Gagya", desc: "La Sociedad de la Lengua Coreana comenzó a conmemorar el Hangul.", accent: "vermillion", detail: "En 1926 se estableció el 'Día Gagya' para conmemorar el 480º aniversario de la promulgación del Hunminjeongeum, un acto de desafío bajo vigilancia japonesa.\n\nEn 1942, los japoneses arrestaron a 33 lingüistas coreanos. Dos de ellos murieron en prisión." },
    { year: "1940", title: "Descubrimiento del Haerye", desc: "El manuscrito original del Haerye fue encontrado en Andong.", accent: "gold", detail: "En 1940, el Haerye original, perdido durante casi 500 años, fue descubierto milagrosamente en una antigua casa de Andong. El coleccionista Jeon Hyeong-pil lo adquirió a gran costo.\n\nEste descubrimiento reveló los principios científicos del Hangul al mundo. Ahora es Tesoro Nacional Nº 70 y Patrimonio de la Memoria de la UNESCO." },
    { year: "1945", title: "Liberación y Renacimiento del Hangul", desc: "El Hangul revivió tras la liberación del dominio colonial japonés.", accent: "jade", detail: "Tras 35 años de oscuridad, Corea fue liberada. Durante la ocupación, Japón intentó erradicar el idioma coreano por completo.\n\nPero el Hangul sobrevivió. Los eruditos arriesgaron sus vidas para compilar diccionarios, y tras la liberación, el Hangul fue restaurado como la escritura oficial." },
    { year: "1997", title: "Patrimonio de la Memoria de la UNESCO", desc: "El Haerye fue inscrito como patrimonio de la UNESCO.", accent: "vermillion", detail: "En octubre de 1997, el Haerye fue inscrito como Patrimonio de la Memoria del Mundo de la UNESCO, reconocido como 'el único caso documentado de un sistema de escritura diseñado científicamente.'\n\nDesde ese año, la UNESCO otorga el Premio de Alfabetización Rey Sejong." },
    { year: "2009", title: "El pueblo Cia-Cia adopta el Hangul", desc: "El pueblo Cia-Cia de Indonesia adoptó el Hangul.", accent: "gold", detail: "En 2009, los Cia-Cia de la isla Buton en Indonesia, una minoría de unos 80.000 habitantes sin escritura propia, adoptaron oficialmente el Hangul.\n\nEl Hangul pudo transcribir perfectamente los sonidos complejos de su idioma. El orgullo del Rey Sejong de que 'puede escribir todos los sonidos bajo el cielo' se hizo realidad 580 años después." },
  ],
};

const History = () => {
  const { t, locale } = useI18n();
  const events = eventsData[locale] || eventsData.ko;
  const [expandedSet, setExpandedSet] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setExpandedSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              {t("history.title")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("history.desc")}
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[1.5rem] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-[0.5px]" />

            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              const isExpanded = expandedSet.has(i);
              const accentColor =
                event.accent === "vermillion"
                  ? "text-vermillion border-vermillion bg-vermillion"
                  : event.accent === "gold"
                  ? "text-gold border-gold bg-gold"
                  : "text-jade border-jade bg-jade";
              const [textClass, borderClass] = accentColor.split(" ");

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative mb-16 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  } pl-14 md:pl-0`}
                >
                  <div
                    className={`absolute w-3 h-3 rounded-full border-2 ${borderClass} bg-background top-1 left-[1.5rem] -translate-x-1/2 md:left-auto ${
                      isLeft
                        ? "md:right-[-2rem] md:translate-x-1/2"
                        : "md:left-[-2rem] md:-translate-x-1/2"
                    }`}
                  />

                  <button onClick={() => toggle(i)} className="w-full text-left group">
                    <span className={`text-sm font-bold ${textClass} tracking-widest`}>
                      {event.year}
                    </span>
                    <div className="flex items-center justify-between mt-1 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
                      <ChevronDown
                        size={16}
                        className={`text-muted-foreground transition-transform flex-shrink-0 ml-2 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event.desc}</p>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-border">
                          {event.detail.split("\n\n").map((paragraph, pi) => (
                            <p key={pi} className="text-sm text-foreground/80 leading-[1.85] mb-3 last:mb-0">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default History;
