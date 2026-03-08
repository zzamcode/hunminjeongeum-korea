import { useState, useCallback, useEffect } from "react";
import { Volume2, VolumeX, SkipForward, SkipBack } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";

const playlist = [
  "MrNeTVM1fYw",
  "JgujsLFO7yo",
  "HyTmG2aaQTg",
  "4ST1ksBbiaw",
  "kOlP6bizEwk",
  "6iSRFRCC-LI",
];

const TOAST_SHOWN_KEY = "hangul-music-toast-shown";

const YouTubePlayer = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [muted, setMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(TOAST_SHOWN_KEY);
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        toast({
          description: t("player.toast"),
        });
        sessionStorage.setItem(TOAST_SHOWN_KEY, "1");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const videoId = playlist[currentIndex];
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

      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-px">
        <button
          onClick={prevTrack}
          className="h-8 w-8 flex items-center justify-center bg-background/90 backdrop-blur-sm border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground rounded-l-sm"
          title="Previous"
        >
          <SkipBack size={12} />
        </button>

        <button
          onClick={toggleMute}
          className="h-8 w-9 flex items-center justify-center bg-background/90 backdrop-blur-sm border-y border-border hover:bg-muted transition-colors text-foreground"
          title={muted ? t("player.unmute") : t("player.mute")}
        >
          {muted ? (
            <VolumeX size={14} className="text-muted-foreground" />
          ) : (
            <Volume2 size={14} className="text-vermillion" />
          )}
        </button>

        <button
          onClick={nextTrack}
          className="h-8 w-8 flex items-center justify-center bg-background/90 backdrop-blur-sm border border-border hover:bg-muted transition-colors text-muted-foreground hover:text-foreground rounded-r-sm"
          title="Next"
        >
          <SkipForward size={12} />
        </button>
      </div>
    </>
  );
};

export default YouTubePlayer;
