import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, ExternalLink, VolumeX, Play, Disc, Radio, ArrowDown, Music } from 'lucide-react';
import { spotifyConfig, toSpotifyUri, toSpotifyEmbedUrl, isValidSpotifyUrl, favoriteMusicItems } from '../data/spotify';
import { SpotifyPlaylist, SpotifyEmbedController, SpotifyIFrameAPI } from '../types';

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (IFrameAPI: SpotifyIFrameAPI) => void;
    SpotifyIframeApi?: SpotifyIFrameAPI;
  }
}

// Singleton caching for the Spotify IFrame API script promise
let cachedIFrameAPI: SpotifyIFrameAPI | null = null;
let scriptLoadingPromise: Promise<SpotifyIFrameAPI> | null = null;

const loadSpotifyIframeApi = (): Promise<SpotifyIFrameAPI> => {
  if (cachedIFrameAPI) {
    return Promise.resolve(cachedIFrameAPI);
  }
  if (typeof window !== 'undefined' && window.SpotifyIframeApi) {
    cachedIFrameAPI = window.SpotifyIframeApi;
    return Promise.resolve(cachedIFrameAPI);
  }
  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  scriptLoadingPromise = new Promise<SpotifyIFrameAPI>((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window not available'));
      return;
    }

    // Register global callback before script injection
    const previousReady = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (IFrameAPI: SpotifyIFrameAPI) => {
      cachedIFrameAPI = IFrameAPI;
      window.SpotifyIframeApi = IFrameAPI;
      if (typeof previousReady === 'function') {
        previousReady(IFrameAPI);
      }
      resolve(IFrameAPI);
    };

    // Check if script is already present in DOM
    const existingScript = document.getElementById('spotify-iframe-api-script') as HTMLScriptElement | null;
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'spotify-iframe-api-script';
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
      script.async = true;
      script.onerror = () => {
        scriptLoadingPromise = null;
        reject(new Error('Failed to load Spotify iFrame API script'));
      };
      document.body.appendChild(script);
    } else {
      // If script tag already exists in DOM, monitor for window.SpotifyIframeApi
      const interval = setInterval(() => {
        if (window.SpotifyIframeApi) {
          clearInterval(interval);
          cachedIFrameAPI = window.SpotifyIframeApi;
          resolve(window.SpotifyIframeApi);
        }
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        if (!cachedIFrameAPI && !window.SpotifyIframeApi) {
          scriptLoadingPromise = null;
          reject(new Error('Spotify iFrame API script timeout'));
        }
      }, 5000);
    }
  });

  return scriptLoadingPromise;
};

/**
 * Reusable card image with smooth fade-in and graceful icon fallback
 */
const MusicCardImage: React.FC<{ src: string; alt: string; type: 'artist' | 'track' }> = ({
  src,
  alt,
  type
}) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className="relative w-full aspect-[168/71] rounded-xl overflow-hidden bg-[#242424] border border-white/5 flex items-center justify-center">
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#2a2a2a] to-[#1c1c1c] text-stone">
          {type === 'artist' ? (
            <Disc className="w-6 h-6 text-stone/40 animate-pulse" />
          ) : (
            <Music className="w-6 h-6 text-stone/40 animate-pulse" />
          )}
        </div>
      )}
    </div>
  );
};

export const SpotifySection: React.FC = () => {
  // Only display genuinely configured playlists with valid Spotify URLs
  const configuredPlaylists: SpotifyPlaylist[] = spotifyConfig.playlists.filter(
    (p) => p.isConfigured && isValidSpotifyUrl(p.embedUrl)
  );

  const hasConfiguredPlaylists = configuredPlaylists.length > 0;
  const [activePlaylistId, setActivePlaylistId] = useState<string>(
    configuredPlaylists[0]?.id || ''
  );
  const [ambientAudioPaused, setAmbientAudioPaused] = useState<boolean>(false);
  const [apiLoadFailed, setApiLoadFailed] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  // Dedicated DOM target ref for Spotify iFrame API (contains NO React children)
  const embedTargetRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);
  const currentLoadedUriRef = useRef<string | null>(null);

  // Monotonically increasing setup ID ensures React Strict Mode replay cannot block setup
  const activeSetupIdRef = useRef<number>(0);
  const lastPauseTimestampRef = useRef<number>(0);

  // Check if profile URL is genuine and not a generic homepage link
  const hasRealProfileUrl = Boolean(
    spotifyConfig.profileUrl &&
    spotifyConfig.profileUrl.trim() !== '' &&
    spotifyConfig.profileUrl.trim() !== 'https://open.spotify.com' &&
    spotifyConfig.profileUrl.trim() !== 'https://open.spotify.com/' &&
    !spotifyConfig.profileUrl.includes('example.com')
  );

  const activePlaylist =
    configuredPlaylists.find((p) => p.id === activePlaylistId) || configuredPlaylists[0];

  // Pause ambient audio (differentiates automatic handoff from explicit user pause)
  const handleHandoff = useCallback((source: 'spotify-playback' | 'external-link' | 'manual') => {
    const now = Date.now();
    // Debounce repeated event dispatches within 1.5 seconds
    if (now - lastPauseTimestampRef.current < 1500) {
      return;
    }
    lastPauseTimestampRef.current = now;

    if (typeof window !== 'undefined') {
      // Dispatches event with userInitiated: false so localStorage preference is preserved
      window.dispatchEvent(
        new CustomEvent('adi:pause-ambient', {
          detail: { userInitiated: false, source }
        })
      );
      setAmbientAudioPaused(true);
    }
  }, []);

  // Manual pause handoff
  const handleManualPause = () => {
    handleHandoff('manual');
  };

  // External Spotify link handoff (Open in Spotify / Profile link)
  const handleExternalHandoff = () => {
    handleHandoff('external-link');
  };

  // Manual resume ambient audio on user demand
  const handleResumeAmbient = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('adi:resume-ambient'));
      setAmbientAudioPaused(false);
    }
  };

  // Initialize Spotify iFrame Player API controller or update via loadUri()
  // Handles React.StrictMode re-mounts cleanly without deadlock
  useEffect(() => {
    if (!hasConfiguredPlaylists || !activePlaylist) return;

    const targetUri = toSpotifyUri(activePlaylist.embedUrl);
    if (!targetUri) return;

    // 1. If controller already exists, use supported loadUri() without recreating iframe
    if (controllerRef.current) {
      if (currentLoadedUriRef.current !== targetUri) {
        try {
          controllerRef.current.loadUri(targetUri);
          currentLoadedUriRef.current = targetUri;
        } catch {
          // If loadUri failed, destroy and allow re-initialization
          try {
            controllerRef.current.destroy?.();
          } catch {}
          controllerRef.current = null;
        }
      }
      return;
    }

    const targetElement = embedTargetRef.current;
    if (!targetElement) return;

    // Monotonically increasing setup ID for this effect invocation
    const setupId = ++activeSetupIdRef.current;

    loadSpotifyIframeApi()
      .then((IFrameAPI) => {
        // If this setup pass was superseded by a newer render/effect or target element is unmounted
        if (activeSetupIdRef.current !== setupId || !embedTargetRef.current) {
          return;
        }

        // If another pass created the controller while waiting for API script
        if (controllerRef.current) {
          controllerRef.current.loadUri(targetUri);
          currentLoadedUriRef.current = targetUri;
          return;
        }

        IFrameAPI.createController(
          embedTargetRef.current,
          {
            uri: targetUri,
            width: '100%',
            height: 352
          },
          (controller) => {
            // Check if this pass was superseded or unmounted before callback returned
            if (activeSetupIdRef.current !== setupId) {
              try {
                controller.destroy?.();
              } catch {
                // Ignore destruction error if already detached
              }
              return;
            }

            controllerRef.current = controller;
            currentLoadedUriRef.current = targetUri;
            setIsPlayerReady(true);

            // Listen to playback_started and playback_update for robust audio coordination
            controller.addListener('playback_started', () => {
              handleHandoff('spotify-playback');
            });

            controller.addListener('playback_update', (e: unknown) => {
              const eventData = e as { data?: { isPaused?: boolean } } | undefined;
              if (eventData?.data && !eventData.data.isPaused) {
                handleHandoff('spotify-playback');
              }
            });

            controller.addListener('ready', () => {
              if (activeSetupIdRef.current === setupId) {
                setIsPlayerReady(true);
              }
            });
          }
        );
      })
      .catch((error) => {
        if (activeSetupIdRef.current === setupId) {
          console.warn('Spotify iFrame API loading failed, using fallback iframe', error);
          setApiLoadFailed(true);
        }
      });

    return () => {
      // In Strict Mode or on dependency change:
      // Invalidate setupId so in-flight async callbacks abort cleanly without deadlocking
      if (activeSetupIdRef.current === setupId) {
        activeSetupIdRef.current = 0;
      }
    };
  }, [hasConfiguredPlaylists, activePlaylist, handleHandoff]);

  // Clean up controller on component unmount only
  useEffect(() => {
    return () => {
      activeSetupIdRef.current = 0;
      if (controllerRef.current?.destroy) {
        try {
          controllerRef.current.destroy();
        } catch {
          // Ignore destruction race
        }
        controllerRef.current = null;
        currentLoadedUriRef.current = null;
      }
    };
  }, []);

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
                onClick={handleExternalHandoff}
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
                  onClick={handleResumeAmbient}
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

        {/* Display Configured Playlist OR Minimal Tasteful Placeholder */}
        {hasConfiguredPlaylists && activePlaylist ? (
          <div>
            {/* Playlist Selector Tabs (only shown if 2 or more configured) */}
            {configuredPlaylists.length > 1 && (
              <div
                className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 border-b border-editorial-subtle pb-4"
                role="tablist"
                aria-label="Spotify Playlists"
              >
                {configuredPlaylists.map((playlist) => {
                  const isActive = playlist.id === activePlaylist.id;
                  return (
                    <button
                      key={playlist.id}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${playlist.id}`}
                      id={`tab-${playlist.id}`}
                      onClick={() => {
                        setActivePlaylistId(playlist.id);
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

                {/* Honest Manual Handoff Control */}
                <div className="pt-2 flex items-center gap-3">
                  {ambientAudioPaused ? (
                    <button
                      type="button"
                      onClick={handleResumeAmbient}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-obsidian border border-editorial hover:border-terracotta text-stone hover:text-ivory text-[11px] font-mono uppercase tracking-wider rounded-sm transition-colors focus:outline-none"
                    >
                      <Play className="w-3 h-3 text-terracotta" />
                      <span>Resume background track</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleManualPause}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-obsidian border border-editorial hover:border-terracotta text-stone hover:text-ivory text-[11px] font-mono uppercase tracking-wider rounded-sm transition-colors focus:outline-none"
                    >
                      <VolumeX className="w-3 h-3 text-terracotta" />
                      <span>Pause background soundtrack</span>
                    </button>
                  )}
                </div>

                {/* Direct External Link */}
                {activePlaylist.spotifyUrl && (
                  <div className="pt-4 border-t border-editorial-subtle flex items-center justify-between">
                    <a
                      href={activePlaylist.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleExternalHandoff}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-terracotta hover:text-ivory transition-colors uppercase tracking-wider focus:outline-none focus:underline"
                    >
                      <span>Open in Spotify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* Official Spotify Embed Player Container */}
              <div className="lg:col-span-7">
                <div className="w-full min-h-[352px] h-[352px] rounded-sm overflow-hidden border border-editorial bg-charcoal shadow-2xl relative">
                  {apiLoadFailed ? (
                    /* Graceful fallback iframe if Spotify API script fails to load */
                    <iframe
                      key={activePlaylist.id}
                      title={`Spotify Player - ${activePlaylist.title}`}
                      src={toSpotifyEmbedUrl(activePlaylist.embedUrl)}
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="w-full h-[352px] bg-charcoal border-0 block"
                    />
                  ) : (
                    <>
                      {/*
                        Dedicated Spotify iFrame API Target Element:
                        React NEVER renders any children inside this DOM element.
                        Spotify iFrame API creates and manages the embedded iframe directly here.
                      */}
                      <div
                        ref={embedTargetRef}
                        id="spotify-embed-target"
                        className={`w-full h-[352px] transition-opacity duration-300 ${
                          isPlayerReady ? 'opacity-100' : 'opacity-0'
                        }`}
                      />

                      {/* Loading State Overlay (rendered outside the dedicated target) */}
                      {!isPlayerReady && (
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-xs font-mono text-stone space-y-2 bg-charcoal z-10 pointer-events-none"
                          aria-live="polite"
                        >
                          <Music className="w-6 h-6 text-terracotta mx-auto animate-pulse" />
                          <span>Loading Spotify Player...</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Favourite Tracks & Artists Grid (Matching Image 2) */}
            <div className="mt-16 sm:mt-20 pt-12 border-t border-editorial">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-terracotta uppercase tracking-wider block">
                    High Rotation
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                    Favourite Tracks & Artists
                  </h3>
                </div>
                <p className="text-xs text-stone font-mono">
                  Top artists & heavy rotation
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {favoriteMusicItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleExternalHandoff}
                    className="group relative bg-[#181818]/90 hover:bg-[#202020] border border-editorial hover:border-terracotta/40 rounded-2xl p-3 sm:p-3.5 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-0.5 focus:outline-none focus:ring-1 focus:ring-terracotta"
                  >
                    {/* Thumbnail Image with graceful fallback */}
                    <MusicCardImage src={item.image} alt={item.name} type={item.type} />

                    {/* Details & Spotify Badge */}
                    <div className="pt-3 flex items-end justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-semibold text-ivory truncate group-hover:text-white transition-colors">
                            {item.name}
                          </h4>
                          {item.isSearch && (
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-terracotta/20 text-terracotta border border-terracotta/30 shrink-0">
                              Search
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone truncate font-sans capitalize mt-0.5">
                          {item.subtext}
                        </p>
                      </div>

                      {/* Spotify Icon */}
                      <div className="shrink-0 p-1 text-[#1DB954] group-hover:scale-110 transition-transform">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.3c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.9-9.3-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4.1-1 7.6-.5 10.3 1.2.3.2.4.6.2.9zm1.5-3.3c-.3.4-.8.5-1.2.3-3-1.8-7.5-2.4-11-1.3-.4.1-.9-.1-1-.5-.1-.4.1-.9.5-1 4.1-1.2 9.1-.6 12.5 1.5.4.1.5.7.2 1zm.1-3.4c-3.6-2.1-9.5-2.3-12.9-1.3-.5.2-1.1-.1-1.3-.6-.2-.5.1-1.1.6-1.3 4-1.2 10.5-1 14.7 1.5.5.3.6.9.3 1.4-.3.5-.9.6-1.4.3z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                ))}
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
