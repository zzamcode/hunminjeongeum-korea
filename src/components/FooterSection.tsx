import { useI18n } from "@/lib/i18n";

const FooterSection = () => {
  const { t } = useI18n();

  return (
    <footer className="py-16 px-6 border-t border-border hanji-texture">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-4xl font-black text-ink/20 mb-6">훈민정음</div>
        <p className="text-sm text-muted-foreground mb-2">
          {t("footer.desc")}
        </p>
        <p className="text-xs text-muted-foreground/60">
          {t("footer.unesco")}
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
