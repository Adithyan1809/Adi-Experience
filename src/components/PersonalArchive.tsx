import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Calendar, Tag, ChevronDown, ArrowDown } from 'lucide-react';
import { archiveData } from '../data/archive';
import { ArchiveEntry } from '../types';

export const PersonalArchive: React.FC = () => {
  // Only show configured entries
  const entries: ArchiveEntry[] = archiveData.entries.filter(
    (e) => e.isConfigured !== false && e.title.trim() !== ''
  );

  const [expandedId, setExpandedId] = useState<string | null>(entries[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand(id);
    }
  };

  const scrollToNext = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (entries.length === 0) {
    return null;
  }

  return (
    <section
      id="archive"
      className="py-24 sm:py-32 border-t border-editorial relative bg-obsidian scroll-snap-chapter overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-terracotta/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-terracotta uppercase tracking-wider">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Personal Archive</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
              {archiveData.heading}
            </h2>
            <p className="text-sm sm:text-base text-stone-light font-sans font-light leading-relaxed">
              {archiveData.subheading}
            </p>
          </div>

          <div className="text-xs font-mono text-stone">
            <span>{entries.length} Entries Recorded</span>
          </div>
        </div>

        {/* Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entries.map((entry, idx) => {
            const isExpanded = expandedId === entry.id;

            return (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.12 }}
                onClick={() => toggleExpand(entry.id)}
                onKeyDown={(e) => handleKeyDown(e, entry.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                className={`p-6 sm:p-8 rounded-sm border cursor-pointer transition-all duration-300 relative flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                  isExpanded
                    ? 'bg-charcoal border-terracotta/50 shadow-2xl'
                    : 'bg-charcoal/40 border-editorial hover:border-terracotta/30 hover:bg-charcoal/70'
                }`}
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-editorial-subtle mb-5">
                    <span className="text-[11px] font-mono tracking-wider text-terracotta uppercase">
                      {entry.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-stone">
                      <Calendar className="w-3 h-3 text-stone/80" />
                      <span>{entry.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-light leading-snug mb-3">
                    {entry.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-stone-light font-sans leading-relaxed italic border-l-2 border-terracotta/40 pl-3 my-4">
                    &ldquo;{entry.summary}&rdquo;
                  </p>
                </div>

                {/* Extended Content & Tag */}
                <div className="mt-4 pt-4 border-t border-editorial-subtle">
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pb-4"
                      >
                        <p className="text-xs sm:text-sm text-stone-light font-sans font-light leading-relaxed">
                          {entry.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between pt-1">
                    {entry.tag ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-stone uppercase tracking-wider">
                        <Tag className="w-2.5 h-2.5 text-terracotta" />
                        <span>{entry.tag}</span>
                      </span>
                    ) : <span />}

                    <span className="text-[11px] font-mono text-stone hover:text-ivory flex items-center gap-1">
                      <span>{isExpanded ? 'Less' : 'Read entry'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-terracotta' : ''
                        }`}
                      />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Next Chapter Cue */}
        <div className="mt-16 sm:mt-20 pt-6 border-t border-editorial-subtle flex items-center justify-between text-xs font-mono text-stone">
          <span className="hidden sm:inline">CHAPTER 07 / ARCHIVE</span>
          <button
            onClick={scrollToNext}
            className="flex items-center gap-2 hover:text-ivory transition-colors group cursor-pointer mx-auto sm:mx-0 focus:outline-none"
            aria-label="Advance to Projects section"
          >
            <span className="uppercase text-[11px] tracking-wider text-stone group-hover:text-ivory">
              Next: Selected Work
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-terracotta group-hover:translate-y-0.5 transition-transform" />
          </button>
          <span className="hidden sm:inline">07 / 09</span>
        </div>
      </div>
    </section>
  );
};
