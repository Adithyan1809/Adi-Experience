import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, ExternalLink, VolumeX, Play, Disc, Radio, ArrowDown, Music } from 'lucide-react';
import { spotifyConfig, toSpotifyUri, toSpotifyEmbedUrl, isValidSpotifyUrl } from '../data/spotify';
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
    }
  });

  return scriptLoadingPromise;
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
  const [apiLoadFailed, setApiLoadFailed] = useState<boolean>(false);

  const iframeContainerRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<SpotifyEmbedController | null>(null);
  const currentLoadedUriRef = useRef<string | null>(null);
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
  const handlePlaybackStarted = () => {
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
          detail: { userInitiated: false, source: 'spotify-playback' }
        })
      );
      setAmbientAudioPaused(true);
    }
  };

  // Manual pause handoff
  const handleManualPause = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('adi:pause-ambient', {
          detail: { userInitiated: false, source: 'manual-handoff' }
        })
      );
      setAmbientAudioPaused(true);
    }
  };

  // Manual resume ambient audio on user demand
  const handleResumeAmbient = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('adi:resume-ambient'));
      setAmbientAudioPaused(false);
    }
  };

  // Initialize Spotify iFrame Player API controller or update via loadUri()
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
          // If loadUri failed, allow re-initialization
          controllerRef.current = null;
        }
      }
      return;
    }

    // 2. Controller does not exist yet; attach to rendered container element
    const container = iframeContainerRef.current;
    if (!container) return;

    let isCancelled = false;

    loadSpotifyIframeApi()
      .then((IFrameAPI) => {
        if (isCancelled || !iframeContainerRef.current) return;

        // If another effect pass created the controller, use loadUri
        if (controllerRef.current) {
          controllerRef.current.loadUri(targetUri);
          currentLoadedUriRef.current = targetUri;
          return;
        }

        // Clear container content before controller initialization
        iframeContainerRef.current.innerHTML = '';

        IFrameAPI.createController(
          iframeContainerRef.current,
          {
            uri: targetUri,
            width: '100%',
            height: 352
          },
          (controller) => {
            if (isCancelled) {
              controller.destroy?.();
              return;
            }

            controllerRef.current = controller;
            currentLoadedUriRef.current = targetUri;

            // Listen to both playback_started and playback_update for robust detection
            controller.addListener('playback_started', () => {
              handlePlaybackStarted();
            });

            controller.addListener('playback_update', (e: unknown) => {
              const eventData = e as { data?: { isPaused?: boolean } } | undefined;
              if (eventData?.data && !eventData.data.isPaused) {
                handlePlaybackStarted();
              }
            });
          }
        );
      })
      .catch(() => {
        // Fallback gracefully if API cannot be loaded
        if (!isCancelled) {
          setApiLoadFailed(true);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [hasConfiguredPlaylists, activePlaylist]);

  // Clean up controller on component unmount only
  useEffect(() => {
    return () => {
      if (controllerRef.current?.destroy) {
        controllerRef.current.destroy();
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

                {/* Honest Manual Handoff Button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleManualPause}
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

              {/* Official Spotify Embed Player Container */}
              <div className="lg:col-span-7">
                {/* 
                  The container attached to iframeContainerRef where Spotify iFrame API attaches the controller.
                  If the API script fails to load, a graceful fallback iframe is rendered inside.
                */}
                <div
                  ref={iframeContainerRef}
                  id="spotify-iframe-container"
                  className="w-full min-h-[352px] rounded-sm overflow-hidden border border-editorial bg-charcoal shadow-2xl relative flex items-center justify-center"
                >
                  {apiLoadFailed && (
                    <iframe
                      title={`Spotify Player - ${activePlaylist.title}`}
                      src={toSpotifyEmbedUrl(activePlaylist.embedUrl)}
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="w-full bg-charcoal"
                    />
                  )}
                  {!apiLoadFailed && !controllerRef.current && (
                    <div className="p-8 text-center text-xs font-mono text-stone space-y-2">
                      <Music className="w-6 h-6 text-terracotta mx-auto animate-pulse" />
                      <span>Loading Spotify Player...</span>
                    </div>
                  )}
                </div>
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
