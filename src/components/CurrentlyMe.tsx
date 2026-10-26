import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { currentlyItems } from '../data/personal';
import {
  BookOpen,
  Code,
  Headphones,
  Tv,
  Dumbbell,
  Sparkles,
  ChevronDown,
  Clock,
  ArrowDown
} from 'lucide-react';

const iconMap = {
  'book-open': BookOpen,
  'code': Code,
  'headphones': Headphones,
  'tv': Tv,
  'dumbbell': Dumbbell,
  'sparkles': Sparkles,
};

export const CurrentlyMe: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(currentlyItems[0].id);

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
    const el = document.getElementById('music-room');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="currently" className="py-24 sm:py-32 border-t border-editorial relative bg-charcoal/30 scroll-snap-chapter overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3">
            <span className="text-xs font-mono text-terracotta tracking-wider uppercase">
              Current Focus
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
              Lately, I&rsquo;ve been&hellip;
            </h2>
          </div>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-obsidian border border-editorial text-xs font-mono text-stone max-w-sm">
            <Clock className="w-3.5 h-3.5 text-terracotta shrink-0" />
            <span>Updated: Autumn 2024</span>
          </div>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentlyItems.map((item, idx) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onClick={() => toggleExpand(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                className={`p-6 rounded-sm border cursor-pointer transition-all duration-300 relative flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                  isExpanded
                    ? 'bg-charcoal border-terracotta/50 shadow-xl'
                    : 'bg-obsidian-light/70 border-editorial hover:border-terracotta/30 hover:bg-charcoal/50'
                }`}
              >
                <div>
                  {/* Top Row: Icon + Label + Expand Indicator */}
                  <div className="flex items-center justify-between pb-4 border-b border-editorial-subtle mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-sm bg-obsidian border border-editorial text-terracotta">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono tracking-wider text-stone uppercase">
                        {item.label}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-stone transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-terracotta' : ''
                      }`}
                    />
                  </div>

                  {/* Main Value */}
                  <h3 className="font-serif text-xl sm:text-2xl text-ivory font-medium leading-snug">
                    {item.value}
                  </h3>
                </div>

                {/* Expandable Detail */}
                <div className="mt-4">
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs sm:text-sm text-stone-light font-sans leading-relaxed pt-2 border-t border-editorial-subtle">
                          {item.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Next Chapter Cue */}
        <div className="mt-16 sm:mt-20 pt-6 border-t border-editorial-subtle flex items-center justify-between text-xs font-mono text-stone">
          <span className="hidden sm:inline">CHAPTER 04 / LATELY</span>
          <button
            onClick={scrollToNext}
            className="flex items-center gap-2 hover:text-ivory transition-colors group cursor-pointer mx-auto sm:mx-0 focus:outline-none"
            aria-label="Advance to The Listening Room"
          >
            <span className="uppercase text-[11px] tracking-wider text-stone group-hover:text-ivory">
              Next: The Listening Room
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-terracotta group-hover:translate-y-0.5 transition-transform" />
          </button>
          <span className="hidden sm:inline">04 / 09</span>
        </div>
      </div>
    </section>
  );
};
