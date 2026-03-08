import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const YouTubePlayer = () => {
  const { t } = useI18n();
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videoId = "MrNeTVM1fYw";
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&mute=${muted ? 1 : 0}&enablejsapi=1`;

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  return (
    <>
      {/* Hidden iframe for audio */}
      <iframe
        ref={iframeRef}
        key={muted ? "muted" : "unmuted"}
        src={src}
        className="fixed w-0 h-0 opacity-0 pointer-events-none"
        allow="autoplay; encrypted-media"
        title="Background music"
      />

      {/* Floating mute/unmute button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-ink/80 backdrop-blur-sm text-primary-foreground flex items-center justify-center shadow-lg hover:bg-ink transition-colors group"
        title={muted ? t("player.unmute") : t("player.mute")}
      >
        {muted ? (
          <VolumeX size={18} className="group-hover:scale-110 transition-transform" />
        ) : (
          <Volume2 size={18} className="group-hover:scale-110 transition-transform" />
        )}
      </button>
    </>
  );
};

export default YouTubePlayer;
