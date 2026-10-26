import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, ExternalLink, VolumeX, Sparkles, Disc, Radio, ArrowDown } from 'lucide-react';
import { spotifyConfig } from '../data/spotify';
import { SpotifyPlaylist } from '../types';

export const SpotifySection: React.FC = () => {
  // Only display configured playlists, or fallback to first if none configured yet
  const configuredPlaylists = spotifyConfig.playlists.filter((p) => p.isConfigured);
  const displayPlaylists = configuredPlaylists.length > 0 ? configuredPlaylists : spotifyConfig.playlists;

  const [activePlaylistId, setActivePlaylistId] = useState<string>(displayPlaylists[0]?.id || 'on-repeat');
  const [ambientPausedNotice, setAmbientPausedNotice] = useState<boolean>(false);

  const activePlaylist: SpotifyPlaylist | undefined = displayPlaylists.find(
    (p) => p.id === activePlaylistId
  ) || displayPlaylists[0];

  const handlePlaylistSelect = (id: string) => {
    setActivePlaylistId(id);
    // Coordinate audio: pause ambient loop so sounds do not clash
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('adi:pause-ambient'));
      setAmbientPausedNotice(true);
    }
  };

  const notifyPauseAmbient = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('adi:pause-ambient'));
      setAmbientPausedNotice(true);
    }
  };

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
      {/* Ambient background glow */}
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

          {/* External Spotify Profile Link */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={spotifyConfig.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={notifyPauseAmbient}
              className="inline-flex items-center gap-2 px-4 py-2 border border-editorial hover:border-terracotta text-stone-light hover:text-ivory transition-colors text-xs font-mono uppercase tracking-wider rounded-sm focus:outline-none focus:ring-1 focus:ring-terracotta"
            >
              <Disc className="w-3.5 h-3.5 text-terracotta" />
              <span>Spotify Profile</span>
              <ExternalLink className="w-3 h-3 text-stone" />
            </a>
          </div>
        </div>

        {/* Audio coordination banner if ambient was paused */}
        <AnimatePresence>
          {ambientPausedNotice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-3 bg-charcoal/80 border border-editorial-subtle rounded-sm flex items-center justify-between text-xs font-mono text-stone"
            >
              <div className="flex items-center gap-2">
                <VolumeX className="w-3.5 h-3.5 text-terracotta" />
                <span>Ambient site soundtrack paused for music playback.</span>
              </div>
              <button
                type="button"
                onClick={() => setAmbientPausedNotice(false)}
                className="text-[10px] uppercase text-stone-light hover:text-ivory underline ml-4 focus:outline-none"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Playlist Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8 border-b border-editorial-subtle pb-4" role="tablist">
          {displayPlaylists.map((playlist) => {
            const isActive = playlist.id === activePlaylistId;
            return (
              <button
                key={playlist.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${playlist.id}`}
                id={`tab-${playlist.id}`}
                onClick={() => handlePlaylistSelect(playlist.id)}
                className={`px-4 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2 border focus:outline-none focus:ring-1 focus:ring-terracotta ${
                  isActive
                    ? 'bg-charcoal border-terracotta text-ivory shadow-md'
                    : 'bg-obsidian border-editorial text-stone hover:border-terracotta/40 hover:text-ivory'
                }`}
              >
                <Radio className={`w-3 h-3 ${isActive ? 'text-terracotta' : 'text-stone'}`} />
                <span>{playlist.title}</span>
                <span className="text-[10px] text-stone/60 hidden sm:inline">• {playlist.category}</span>
              </button>
            );
          })}
        </div>

        {/* Active Playlist Detail & Embed */}
        {activePlaylist && (
          <div
            id={`panel-${activePlaylist.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activePlaylist.id}`}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Editorial Metadata Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-charcoal/60 border border-editorial rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-terracotta">
                  {activePlaylist.category}
                </span>
                <span className="text-[10px] font-mono text-stone">
                  {activePlaylist.isConfigured ? 'Live Embed' : 'Curated Concept'}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light">
                  {activePlaylist.title}
                </h3>
                <p className="text-xs font-mono text-stone mt-1">
                  {activePlaylist.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-light font-sans font-light leading-relaxed pt-2 border-t border-editorial-subtle">
                {activePlaylist.description}
              </p>

              <div className="pt-4 flex items-center justify-between">
                <a
                  href={activePlaylist.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={notifyPauseAmbient}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-terracotta hover:text-ivory transition-colors uppercase tracking-wider focus:outline-none focus:underline"
                >
                  <span>Open in Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <span className="text-[10px] font-mono text-stone/60">
                  Direct playback
                </span>
              </div>
            </div>

            {/* Embedded Player or Tasteful Editorial Plate */}
            <div className="lg:col-span-7">
              {activePlaylist.isConfigured && activePlaylist.embedUrl ? (
                <div className="rounded-sm overflow-hidden border border-editorial bg-charcoal shadow-2xl">
                  <iframe
                    title={`Spotify Player - ${activePlaylist.title}`}
                    src={activePlaylist.embedUrl}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="w-full bg-charcoal"
                  />
                </div>
              ) : (
                /* Elegant Editorial Placeholder Plate when playlist is not yet bound to a personal URI */
                <div className="p-8 sm:p-12 bg-charcoal/40 border border-dashed border-editorial rounded-sm flex flex-col justify-between min-h-[300px]">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian border border-editorial text-[11px] font-mono text-stone">
                      <Sparkles className="w-3 h-3 text-terracotta" />
                      <span>Ready for your Spotify Playlist</span>
                    </div>

                    <h4 className="font-serif text-2xl text-ivory font-light">
                      {activePlaylist.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-stone font-sans leading-relaxed max-w-lg">
                      To feature your actual Spotify playlist here, open Spotify, copy your playlist link or embed URI, and add it to <code className="text-terracotta font-mono text-xs">src/data/spotify.ts</code> with <code className="text-terracotta font-mono text-xs">isConfigured: true</code>.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-editorial-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-xs font-mono text-stone/80">
                      Supports tracks, albums, or full playlists
                    </span>

                    <a
                      href={spotifyConfig.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={notifyPauseAmbient}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ivory text-obsidian text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-ivory-muted transition-colors focus:outline-none focus:ring-1 focus:ring-terracotta"
                    >
                      <span>Explore on Spotify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
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
