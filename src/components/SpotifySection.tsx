import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, ExternalLink, VolumeX, Play, Disc, Radio, ArrowDown, Music } from 'lucide-react';
import { spotifyConfig } from '../data/spotify';
import { SpotifyPlaylist } from '../types';

/**
 * Validates whether a given URL is a legitimate Spotify playlist, album, or track URL.
 */
export const isValidSpotifyUrl = (url?: string): boolean => {
  if (!url) return false;
  const trimmed = url.trim();
  if (
    trimmed === '' ||
    trimmed === 'https://open.spotify.com' ||
    trimmed === 'https://open.spotify.com/'
  ) {
    return false;
  }
  return /open\.spotify\.com\/(embed\/)?(playlist|album|track|artist)\/[a-zA-Z0-9]+/.test(trimmed) ||
         /spotify:(playlist|album|track|artist):[a-zA-Z0-9]+/.test(trimmed);
};

/**
 * Normalizes any valid Spotify URL/URI into an official embed URL.
 */
export const toSpotifyEmbedUrl = (rawUrl: string): string => {
  const trimmed = rawUrl.trim();
  if (trimmed.includes('open.spotify.com/embed/')) {
    return trimmed.includes('?') ? trimmed : `${trimmed}?utm_source=generator&theme=0`;
  }
  const match = trimmed.match(/open\.spotify\.com\/(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
  if (match) {
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
  }
  const uriMatch = trimmed.match(/spotify:(playlist|album|track|artist):([a-zA-Z0-9]+)/);
  if (uriMatch) {
    return `https://open.spotify.com/embed/${uriMatch[1]}/${uriMatch[2]}?utm_source=generator&theme=0`;
  }
  return trimmed;
};

export const SpotifySection: React.FC = () => {
  // Only display genuinely configured playlists with valid URLs
  const configuredPlaylists: SpotifyPlaylist[] = spotifyConfig.playlists.filter(
    (p) => p.isConfigured && isValidSpotifyUrl(p.embedUrl)
  );

  const hasConfiguredPlaylists = configuredPlaylists.length > 0;
  const [activePlaylistId, setActivePlaylistId] = useState<string>(
    configuredPlaylists[0]?.id || ''
  );
  const [ambientAudioPaused, setAmbientAudioPaused] = useState<boolean>(false);
  const [embedLoadError, setEmbedLoadError] = useState<boolean>(false);
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);

  // Check if profile URL is genuine and not a generic homepage link
  const hasRealProfileUrl = Boolean(
    spotifyConfig.profileUrl &&
    spotifyConfig.profileUrl.trim() !== '' &&
    spotifyConfig.profileUrl.trim() !== 'https://open.spotify.com' &&
    spotifyConfig.profileUrl.trim() !== 'https://open.spotify.com/' &&
    !spotifyConfig.profileUrl.includes('example.com')
  );

  const activePlaylist = configuredPlaylists.find((p) => p.id === activePlaylistId) || configuredPlaylists[0];

  // Pause ambient audio explicitly
  const pauseAmbientAudio = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('adi:pause-ambient'));
      setAmbientAudioPaused(true);
    }
  };

  // Resume ambient audio on user demand
  const resumeAmbientAudio = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('adi:resume-ambient'));
      setAmbientAudioPaused(false);
    }
  };

  // Initialize Spotify iFrame Player API for playback detection where available
  useEffect(() => {
    if (!hasConfiguredPlaylists || !activePlaylist) return;

    let isSubscribed = true;

    // Load Spotify IFrame API script if not already on the page
    const existingScript = document.getElementById('spotify-iframe-api');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'spotify-iframe-api';
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
      script.async = true;
      document.body.appendChild(script);
    }

    // Window callback invoked when Spotify API is ready
    (window as unknown as { onSpotifyIframeApiReady?: (IFrameAPI: unknown) => void }).onSpotifyIframeApiReady = (IFrameAPI: unknown) => {
      if (!isSubscribed || !iframeContainerRef.current) return;
      const api = IFrameAPI as {
        createController: (
          element: HTMLElement,
          options: { uri?: string; url?: string; width?: string; height?: string },
          callback: (controller: {
            addListener: (event: string, callback: (e: { data: { isPaused: boolean; position: number } }) => void) => void;
            destroy?: () => void;
          }) => void
        ) => void;
      };

      try {
        const embedUrl = toSpotifyEmbedUrl(activePlaylist.embedUrl);
        api.createController(
          iframeContainerRef.current,
          { url: embedUrl, width: '100%', height: '352' },
          (controller) => {
            if (!isSubscribed) return;
            controller.addListener('playback_update', (e) => {
              // Pause ambient audio only when playback actually begins
              if (!e.data.isPaused && e.data.position > 0) {
                pauseAmbientAudio();
              }
            });
          }
        );
      } catch {
        // Fallback gracefully to manual handoff if API init fails
      }
    };

    return () => {
      isSubscribed = false;
    };
  }, [hasConfiguredPlaylists, activePlaylist]);

  const scrollToNext = () => {
    const el = document.getElementById('personality');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="music-room"
      className="py-24 sm:py-32 border-t border-editorial relative bg-obsidian-dark/90 scroll-snap-chapter overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-terracotta/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-terracotta uppercase tracking-wider">
              <Headphones className="w-3.5 h-3.5" />
              <span>The Listening Room</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
              {spotifyConfig.sectionHeading}
            </h2>
            <p className="text-sm sm:text-base text-stone-light font-sans font-light leading-relaxed">
              {spotifyConfig.sectionSubtitle}
            </p>
          </div>

          {/* Real Spotify Profile Link (hidden if unconfigured) */}
          {hasRealProfileUrl && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href={spotifyConfig.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-editorial hover:border-terracotta text-stone-light hover:text-ivory transition-colors text-xs font-mono uppercase tracking-wider rounded-sm focus:outline-none focus:ring-1 focus:ring-terracotta"
              >
                <Disc className="w-3.5 h-3.5 text-terracotta" />
                <span>Spotify Profile</span>
                <ExternalLink className="w-3 h-3 text-stone" />
              </a>
            </div>
          )}
        </div>

        {/* Ambient soundtrack coordination notice & manual handoff */}
        <AnimatePresence>
          {ambientAudioPaused && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-3.5 bg-charcoal/90 border border-editorial rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-stone"
            >
              <div className="flex items-center gap-2 text-ivory/90">
                <VolumeX className="w-4 h-4 text-terracotta shrink-0" />
                <span>Ambient site soundtrack paused for external music listening.</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={resumeAmbientAudio}
                  className="inline-flex items-center gap-1.5 text-terracotta hover:text-ivory transition-colors uppercase tracking-wider text-[11px] font-semibold focus:outline-none focus:underline"
                >
                  <Play className="w-3 h-3 fill-terracotta" />
                  <span>Resume background track</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAmbientAudioPaused(false)}
                  className="text-[10px] uppercase text-stone hover:text-ivory focus:outline-none"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Display Configured Playlists OR Minimal Tasteful Placeholder */}
        {hasConfiguredPlaylists && activePlaylist ? (
          <div>
            {/* Playlist Selector Tabs (only shown if 2 or more configured) */}
            {configuredPlaylists.length > 1 && (
              <div
                className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 border-b border-editorial-subtle pb-4"
                role="tablist"
              >
                {configuredPlaylists.map((playlist) => {
                  const isActive = playlist.id === activePlaylistId;
                  return (
                    <button
                      key={playlist.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${playlist.id}`}
                      id={`tab-${playlist.id}`}
                      onClick={() => {
                        setActivePlaylistId(playlist.id);
                        setEmbedLoadError(false);
                      }}
                      className={`px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border focus:outline-none focus:ring-1 focus:ring-terracotta ${
                        isActive
                          ? 'bg-charcoal border-terracotta text-ivory shadow-md'
                          : 'bg-obsidian border-editorial text-stone hover:border-terracotta/40 hover:text-ivory'
                      }`}
                    >
                      <Radio className={`w-3 h-3 ${isActive ? 'text-terracotta' : 'text-stone'}`} />
                      <span>{playlist.title}</span>
                      {playlist.category && (
                        <span className="text-[10px] text-stone/60 hidden sm:inline">
                          • {playlist.category}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Active Playlist Detail & Embed */}
            <div
              id={`panel-${activePlaylist.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activePlaylist.id}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Editorial Metadata Card */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-charcoal/60 border border-editorial rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  {activePlaylist.category ? (
                    <span className="text-[11px] font-mono uppercase tracking-wider text-terracotta">
                      {activePlaylist.category}
                    </span>
                  ) : <span />}
                  <span className="text-[10px] font-mono text-stone">Spotify Embed</span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                    {activePlaylist.title}
                  </h3>
                  {activePlaylist.subtitle && (
                    <p className="text-xs font-mono text-stone mt-1">
                      {activePlaylist.subtitle}
                    </p>
                  )}
                </div>

                {activePlaylist.description && (
                  <p className="text-xs sm:text-sm text-stone-light font-sans font-light leading-relaxed pt-2 border-t border-editorial-subtle">
                    {activePlaylist.description}
                  </p>
                )}

                {/* Manual audio coordination handoff */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={pauseAmbientAudio}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-obsidian border border-editorial hover:border-terracotta text-stone hover:text-ivory text-[11px] font-mono uppercase tracking-wider rounded-sm transition-colors focus:outline-none"
                  >
                    <VolumeX className="w-3 h-3 text-terracotta" />
                    <span>Pause background soundtrack</span>
                  </button>
                </div>

                {/* Direct External Link */}
                {activePlaylist.spotifyUrl && (
                  <div className="pt-4 border-t border-editorial-subtle flex items-center justify-between">
                    <a
                      href={activePlaylist.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-terracotta hover:text-ivory transition-colors uppercase tracking-wider focus:outline-none focus:underline"
                    >
                      <span>Open in Spotify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Official Spotify Embed Player */}
              <div className="lg:col-span-7">
                {embedLoadError ? (
                  <div className="p-8 bg-charcoal border border-editorial rounded-sm text-center space-y-3">
                    <Music className="w-8 h-8 text-stone mx-auto" />
                    <h4 className="font-serif text-xl text-ivory">Playlist currently unavailable</h4>
                    <p className="text-xs text-stone font-sans max-w-sm mx-auto">
                      This Spotify embed could not be loaded directly. You can listen to it directly in Spotify.
                    </p>
                    {activePlaylist.spotifyUrl && (
                      <a
                        href={activePlaylist.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-ivory text-obsidian text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-ivory-muted transition-colors mt-2"
                      >
                        <span>Listen on Spotify</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="rounded-sm overflow-hidden border border-editorial bg-charcoal shadow-2xl">
                    <iframe
                      title={`Spotify Player - ${activePlaylist.title}`}
                      src={toSpotifyEmbedUrl(activePlaylist.embedUrl)}
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      onError={() => setEmbedLoadError(true)}
                      className="w-full bg-charcoal"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Minimal Tasteful Placeholder Plate when no playlists are configured */
          <div className="p-10 sm:p-14 bg-charcoal/40 border border-editorial rounded-sm text-center max-w-2xl mx-auto space-y-5">
            <div className="w-14 h-14 rounded-full border border-ivory/15 bg-obsidian flex items-center justify-center mx-auto text-terracotta">
              <Disc className="w-6 h-6 animate-[spin_20s_linear_infinite]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                The Listening Room is currently quiet.
              </h3>
              <p className="text-sm text-stone-light font-sans font-light leading-relaxed max-w-md mx-auto">
                Curating soundscapes for late-night engineering and quiet mornings. Real playlists will appear here once linked.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-stone">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta/70" />
              <span>Offline for curation</span>
            </div>
          </div>
        )}

        {/* Next Chapter Cue */}
        <div className="mt-16 sm:mt-20 pt-6 border-t border-editorial-subtle flex items-center justify-between text-xs font-mono text-stone">
          <span className="hidden sm:inline">CHAPTER 05 / SOUND</span>
          <button
            onClick={scrollToNext}
            className="flex items-center gap-2 hover:text-ivory transition-colors group cursor-pointer mx-auto sm:mx-0 focus:outline-none"
            aria-label="Advance to Little Things section"
          >
            <span className="uppercase text-[11px] tracking-wider text-stone group-hover:text-ivory">
              Next: Little Things
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-terracotta group-hover:translate-y-0.5 transition-transform" />
          </button>
          <span className="hidden sm:inline">05 / 09</span>
        </div>
      </div>
    </section>
  );
};
