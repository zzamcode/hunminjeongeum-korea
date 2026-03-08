const FooterSection = () => {
  return (
    <footer className="py-16 px-6 border-t border-border hanji-texture">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-4xl font-black text-ink/20 mb-6">훈민정음</div>
        <p className="text-sm text-muted-foreground mb-2">
          한글의 아름다움을 알리기 위해 만들어진 웹사이트입니다
        </p>
        <p className="text-xs text-muted-foreground/60">
          유네스코 세계기록유산 · 1997년 등재
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
