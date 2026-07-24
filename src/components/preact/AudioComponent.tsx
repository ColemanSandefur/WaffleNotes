import { PauseIcon, PlayIcon } from "lucide-preact";
import { useEffect, useRef, useState } from "preact/hooks";

export interface AudioComponentProps {
  src: string;
}

export default function AudioComponent({ src }: AudioComponentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Playback error:", err);
        }
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsPlaying(false);
    setCurrentTime(0);
    audio.load();
  }, [src]);

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Calculate percentage reactively
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div class="audio-player p-2 flex flex-row gap-2 gap-y-4 rounded-sm border border-border">
      <button
        type="button"
        class="play-btn size-10 bg-primary text-primary-foreground rounded-md flex items-center justify-center text-2xl"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div class="flex flex-col grow gap-2">
        <div class="flex justify-between items-center font-mono text-xs text-muted-foreground">
          <span>Listen to Sermon</span>
          <span class="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div class="flex items-center justify-center grow">
          <input
            type="range"
            class="progress-bar w-full h-1 rounded-full appearance-none cursor-pointer accent-secondary-foreground"
            value={currentTime}
            min="0"
            max={duration || 0}
            style={{
              background: `linear-gradient(to right, var(--primary) ${progressPercent}%, var(--border) ${progressPercent}%)`,
            }}
            onInput={(e) => {
              const val = Number((e.target as HTMLInputElement).value);
              if (audioRef.current) {
                audioRef.current.currentTime = val;
                setCurrentTime(val);
              }
            }}
          />
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
