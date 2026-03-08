import { useState, useRef, useCallback, useEffect } from "react";
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoId = playlist[currentIndex];
  const playlistParam = playlist.join(",");
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${playlistParam}&controls=0&showinfo=0&rel=0&mute=${muted ? 1 : 0}&enablejsapi=1`;

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
        ref={iframeRef}
        key={`${videoId}-${muted}`}
        src={src}
        className="fixed w-0 h-0 opacity-0 pointer-events-none"
        allow="autoplay; encrypted-media"
        title="Background music"
      />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5">
        <button
          onClick={prevTrack}
          className="w-9 h-9 rounded-full bg-ink/80 backdrop-blur-sm text-primary-foreground flex items-center justify-center shadow-lg hover:bg-ink transition-colors"
          title="Previous"
        >
          <SkipBack size={14} />
        </button>
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-ink/80 backdrop-blur-sm text-primary-foreground flex items-center justify-center shadow-lg hover:bg-ink transition-colors group"
          title={muted ? t("player.unmute") : t("player.mute")}
        >
          {muted ? (
            <VolumeX size={18} className="group-hover:scale-110 transition-transform" />
          ) : (
            <Volume2 size={18} className="group-hover:scale-110 transition-transform" />
          )}
        </button>
        <button
          onClick={nextTrack}
          className="w-9 h-9 rounded-full bg-ink/80 backdrop-blur-sm text-primary-foreground flex items-center justify-center shadow-lg hover:bg-ink transition-colors"
          title="Next"
        >
          <SkipForward size={14} />
        </button>
      </div>
    </>
  );
};

export default YouTubePlayer;
