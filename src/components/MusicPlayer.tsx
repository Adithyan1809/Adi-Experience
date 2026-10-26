import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, SlidersHorizontal, X } from 'lucide-react';
import { musicConfig } from '../data/personal';

// Safe localStorage access guarded for private browsing & iframe restrictions
const getSafeStorage = (key: string, fallback: string): string => {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : fallback;
  } catch {
    return fallback;
  }
};

const setSafeStorage = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Graceful fallback when storage is denied
  }
};

export const MusicPlayer: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return getSafeStorage('adi_music_muted', 'false') === 'true';
  });
  const [volume, setVolume] = useState<number>(() => {
    const saved = getSafeStorage('adi_music_vol', String(musicConfig.defaultVolume));
    const parsed = parseFloat(saved);
    return !isNaN(parsed) ? Math.max(0, Math.min(1, parsed)) : musicConfig.defaultVolume;
  });
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  // Synchronize initial audio element state and handle autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.muted = isMuted;
    audio.volume = isMuted ? 0 : volume;

    const userPaused = getSafeStorage('adi_music_paused', 'false') === 'true';

    // Native audio event listeners for reliable state synchronization
    const onPlay = () => {
      setIsPlaying(true);
      setAutoplayBlocked(false);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    if (!userPaused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked by browser policy — show polite enable cue
          setIsPlaying(false);
          setAutoplayBlocked(true);
        });
      }
    }

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []);

  // Close volume popover when clicking outside or pressing Escape
  useEffect(() => {
    if (!showVolumeSlider) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowVolumeSlider(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showVolumeSlider]);

  // Clean play handler
  const playAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = isMuted;
    audio.volume = isMuted ? 0 : volume;

    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
          setSafeStorage('adi_music_paused', 'false');
        })
        .catch(() => {
          setAutoplayBlocked(true);
          setIsPlaying(false);
        });
    }
  }, [isMuted, volume]);

  // Clean pause handler
  const pauseAudio = useCallback((userInitiated = false) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    if (userInitiated) {
      setSafeStorage('adi_music_paused', 'true');
    }
  }, []);

  // Independent play/pause toggle
  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio(true);
    } else {
      playAudio();
    }
  };

  // Independent mute toggle (never causes race conditions or sets volume to 0)
  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Restore previous volume
      const restoredVol = volume > 0 ? volume : 0.18;
      audio.muted = false;
      audio.volume = restoredVol;
      setIsMuted(false);
      setVolume(restoredVol);
      setSafeStorage('adi_music_muted', 'false');
      setSafeStorage('adi_music_vol', String(restoredVol));
    } else {
      // Mute audio
      audio.muted = true;
      setIsMuted(true);
      setSafeStorage('adi_music_muted', 'true');
    }
  };

  // Volume slider handler
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setSafeStorage('adi_music_vol', String(newVol));

    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVol;
      if (newVol > 0 && isMuted) {
        audio.muted = false;
        setIsMuted(false);
        setSafeStorage('adi_music_muted', 'false');
      }
    }
  };

  if (hasError) return null;

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center text-xs font-mono transition-all duration-300 ${
        compact ? 'scale-90 sm:scale-100' : ''
      }`}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={musicConfig.src}
        preload="metadata"
      />

      {/* Main Bar Container */}
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
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-terracotta text-ivory hover:text-terracotta transition-colors text-left"
          aria-label={isPlaying ? 'Pause background soundtrack' : 'Play background soundtrack'}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 text-terracotta shrink-0" />
          ) : (
            <Play className="w-3.5 h-3.5 text-terracotta fill-terracotta/20 shrink-0" />
          )}

          {/* Equalizer animation bars or quiet icon */}
          {isPlaying && !isMuted ? (
            <div className="flex items-end gap-[2px] h-3 w-3 px-[1px] shrink-0" aria-hidden="true">
              <span className="w-[2px] bg-terracotta rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
              <span className="w-[2px] bg-terracotta rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
              <span className="w-[2px] bg-terracotta rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-1.5" />
            </div>
          ) : (
            <Music className="w-3 h-3 text-stone shrink-0" />
          )}

          {/* Status text / Autoplay notice */}
          <span className="text-[11px] tracking-wider select-none truncate max-w-[120px] sm:max-w-[150px] text-ivory/80 group-hover:text-ivory transition-colors ml-0.5">
            {autoplayBlocked && !isPlaying ? (
              <span className="text-terracotta font-medium">Enable sound</span>
            ) : isPlaying ? (
              <span>Soundtrack</span>
            ) : (
              <span className="text-stone">Sound off</span>
            )}
          </span>
        </button>

        {/* Mute and Mobile/Desktop Volume Controls */}
        <div className="flex items-center gap-1 pl-1 border-l border-editorial-subtle">
          {/* Mute Toggle Button */}
          <button
            type="button"
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

          {/* Volume Slider Popover Toggle Button (Accessible on Mobile and Desktop) */}
          <button
            type="button"
            onClick={() => setShowVolumeSlider((prev) => !prev)}
            aria-expanded={showVolumeSlider}
            aria-controls="music-volume-popover"
            className="p-1 text-stone hover:text-ivory transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-terracotta rounded-sm"
            aria-label={`Adjust volume, currently ${Math.round((isMuted ? 0 : volume) * 100)}%`}
            title="Adjust volume"
          >
            <SlidersHorizontal className="w-3 h-3 text-stone hover:text-terracotta transition-colors" />
          </button>
        </div>
      </div>

      {/* Floating Volume Slider Popover (Works on Mobile & Desktop) */}
      {showVolumeSlider && (
        <div
          id="music-volume-popover"
          role="region"
          aria-label="Volume settings"
          className="absolute top-full mt-2 right-0 p-3 bg-charcoal border border-editorial rounded-sm shadow-2xl z-50 flex items-center gap-3 min-w-[170px]"
        >
          <span className="text-[10px] text-stone font-mono uppercase tracking-wider">
            Vol
          </span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-1.5 bg-obsidian accent-terracotta rounded cursor-pointer"
            aria-label="Volume level"
          />

          <span className="text-[10px] text-ivory font-mono w-8 text-right font-medium">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setShowVolumeSlider(false)}
            className="p-1 text-stone hover:text-ivory ml-auto focus:outline-none"
            aria-label="Close volume settings"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
