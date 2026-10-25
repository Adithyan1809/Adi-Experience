import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, SlidersHorizontal } from 'lucide-react';
import { musicConfig } from '../data/personal';

export const MusicPlayer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem('adi_music_vol');
    return saved !== null ? Math.max(0, Math.min(1, parseFloat(saved))) : musicConfig.defaultVolume;
  });
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
    audio.loop = true;

    // Check if user previously paused intentionally
    const userPaused = localStorage.getItem('adi_music_paused') === 'true';

    if (!userPaused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {
            // Autoplay blocked by browser policy — show friendly enable control
            setIsPlaying(false);
            setAutoplayBlocked(true);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem('adi_music_paused', 'true');
    } else {
      audio.volume = isMuted ? 0 : volume;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
          localStorage.removeItem('adi_music_paused');
        })
        .catch(() => {
          setAutoplayBlocked(true);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      audio.volume = volume > 0 ? volume : 0.18;
      setIsMuted(false);
      if (volume === 0) setVolume(0.18);
      if (!isPlaying) togglePlay();
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    localStorage.setItem('adi_music_vol', String(newVol));
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  if (hasError) return null;

  return (
    <div
      className={`relative inline-flex items-center text-xs font-mono transition-all duration-300 ${
        compact ? 'scale-90 sm:scale-100' : ''
      }`}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={musicConfig.src}
        preload="metadata"
        onError={() => setHasError(true)}
      />

      {/* Music Player Container */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
          isPlaying && !isMuted
            ? 'bg-charcoal/90 border-terracotta/40 shadow-sm'
            : autoplayBlocked
            ? 'bg-terracotta/15 border-terracotta/50 text-terracotta'
            : 'bg-obsidian/80 border-editorial text-stone'
        }`}
      >
        {/* Play / Pause Toggle Button */}
        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-terracotta text-ivory hover:text-terracotta transition-colors"
          aria-label={isPlaying ? 'Pause background soundtrack' : 'Play background soundtrack'}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-terracotta" />
          ) : (
            <Play className="w-3.5 h-3.5 text-terracotta fill-terracotta/20" />
          )}

          {/* Equalizer animation bars or label */}
          {isPlaying && !isMuted ? (
            <div className="flex items-end gap-[2px] h-3 w-3 px-[1px]" aria-hidden="true">
              <span className="w-[2px] bg-terracotta rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
              <span className="w-[2px] bg-terracotta rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
              <span className="w-[2px] bg-terracotta rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-1.5" />
            </div>
          ) : (
            <Music className="w-3 h-3 text-stone" />
          )}
        </button>

        {/* Status text / Autoplay notice */}
        <span
          onClick={togglePlay}
          className="cursor-pointer text-[11px] tracking-wider select-none truncate max-w-[120px] sm:max-w-[150px] text-ivory/80 hover:text-ivory transition-colors"
        >
          {autoplayBlocked && !isPlaying ? (
            <span className="text-terracotta font-medium">Enable sound</span>
          ) : isPlaying ? (
            <span>Soundtrack</span>
          ) : (
            <span className="text-stone">Sound off</span>
          )}
        </span>

        {/* Volume & Mute Controls */}
        <div className="flex items-center gap-1 pl-1 border-l border-editorial-subtle">
          <button
            onClick={toggleMute}
            className="p-1 text-stone hover:text-ivory transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-terracotta rounded-full"
            aria-label={isMuted ? 'Unmute soundtrack' : 'Mute soundtrack'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-stone" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-terracotta" />
            )}
          </button>

          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            className="p-1 text-stone hover:text-ivory transition-colors hidden sm:inline-block focus:outline-none"
            aria-label="Adjust volume"
            title="Adjust volume"
          >
            <SlidersHorizontal className="w-3 h-3 text-stone" />
          </button>
        </div>
      </div>

      {/* Floating Volume Slider Popover */}
      {showVolumeSlider && (
        <div
          className="absolute top-full mt-2 right-0 p-2.5 bg-charcoal border border-editorial rounded-sm shadow-xl z-50 flex items-center gap-2"
          role="region"
          aria-label="Volume control slider"
        >
          <span className="text-[10px] text-stone font-mono">Vol</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-obsidian accent-terracotta rounded cursor-pointer"
            aria-label="Volume slider"
          />
          <span className="text-[10px] text-ivory/80 font-mono w-6 text-right">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      )}
    </div>
  );
};
