import { useI18n } from "@/lib/i18n";

const FooterSection = () => {
  const { t } = useI18n();

  return (
    <footer className="relative py-20 px-6 border-t border-border hanji-texture overflow-hidden">
      {/* Decorative top border — 단청 style */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-vermillion via-gold to-jade" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Seal-style 훈민정음 */}
        <div className="inline-flex items-center justify-center border-2 border-vermillion/30 px-6 py-3 mb-8" style={{ transform: "rotate(-2deg)" }}>
          <span className="text-4xl font-black text-vermillion/40 tracking-widest">훈민정음</span>
        </div>

        <p className="text-sm text-muted-foreground mb-2">
          {t("footer.desc")}
        </p>
        <p className="text-xs text-muted-foreground/60">
          {t("footer.unesco")}
        </p>

        {/* Decorative bottom element */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="w-8 h-px bg-border" />
          <span className="text-xs text-muted-foreground/40">ㅎ ㅏ ㄴ ㄱ ㅡ ㄹ</span>
          <span className="w-8 h-px bg-border" />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
