import { useState, useCallback } from "react";
import { Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const playlist = [
  "MrNeTVM1fYw",
  "JgujsLFO7yo",
  "HyTmG2aaQTg",
  "4ST1ksBbiaw",
  "kOlP6bizEwk",
  "6iSRFRCC-LI",
];

const YouTubePlayer = () => {
  const { t } = useI18n();
  const [muted, setMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoId = playlist[currentIndex];
  // Only loop the current single video, don't pass the full playlist to avoid double-play
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&mute=${muted ? 1 : 0}&enablejsapi=1`;

  const toggleMute = () => setMuted((prev) => !prev);

  const nextTrack = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, []);

  return (
    <>
      <iframe
        key={`${videoId}-${muted}`}
        src={src}
        className="fixed w-0 h-0 opacity-0 pointer-events-none"
        allow="autoplay; encrypted-media"
        title="Background music"
      />

      {/* 한국형 음악 플레이어 */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative flex items-center gap-0 rounded-sm overflow-hidden shadow-xl border border-border/60"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--ink) / 0.92), hsl(var(--ink) / 0.85))',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* 좌측 장식 — 세로 주홍 라인 */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-vermillion" />

          {/* 한글 장식 텍스트 */}
          <div className="absolute -top-0.5 left-2 text-[8px] tracking-[0.3em] text-vermillion/60 font-bold select-none pointer-events-none">
            음악
          </div>

          <button
            onClick={prevTrack}
            className="relative w-10 h-11 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            title="Previous"
          >
            <SkipBack size={13} />
          </button>

          {/* 중앙 음소거 토글 */}
          <button
            onClick={toggleMute}
            className="relative w-11 h-11 flex items-center justify-center text-primary-foreground group"
            title={muted ? t("player.unmute") : t("player.mute")}
          >
            <div className="absolute inset-1 rounded-full border border-vermillion/40" />
            {muted ? (
              <VolumeX size={16} className="relative z-10 group-hover:scale-110 transition-transform text-primary-foreground/80" />
            ) : (
              <Volume2 size={16} className="relative z-10 group-hover:scale-110 transition-transform text-vermillion" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="relative w-10 h-11 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            title="Next"
          >
            <SkipForward size={13} />
          </button>

          {/* 우측 장식 — 세로 금색 라인 */}
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gold/50" />
        </div>

        {/* 트랙 인디케이터 */}
        <div className="flex justify-center gap-1 mt-1.5">
          {playlist.map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-colors ${
                i === currentIndex ? "bg-vermillion" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default YouTubePlayer;
