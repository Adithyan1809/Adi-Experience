import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { favoritesData } from '../data/personal';
import { Music, Film, BookOpen, MapPin, Disc } from 'lucide-react';

const categoryIcons = {
  Music,
  Film,
  BookOpen,
  MapPin,
};

export const Favorites: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const currentGroup = favoritesData[activeTab];
  const Icon = (categoryIcons as any)[currentGroup.icon] || Disc;

  return (
    <section id="favorites" className="py-24 sm:py-32 border-t border-editorial relative bg-obsidian-light/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-terracotta tracking-wider uppercase">
              <span>09</span>
              <span className="text-stone">/</span>
              <span>Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
              A few things currently living rent-free in my head.
            </h2>
          </div>
          <p className="text-stone text-sm max-w-md font-sans leading-relaxed">
            Hans Zimmer scores, Bangalore coffee spots, books that changed how I work, and films that stick around.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="Favorites categories"
          className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-4 border-b border-editorial-subtle"
        >
          {favoritesData.map((group, idx) => {
            const TabIcon = (categoryIcons as any)[group.icon] || Disc;
            const isCurrent = activeTab === idx;

            return (
              <button
                key={group.category}
                role="tab"
                aria-selected={isCurrent}
                aria-controls={`fav-panel-${idx}`}
                id={`fav-tab-${idx}`}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-terracotta ${
                  isCurrent
                    ? 'bg-ivory text-obsidian font-semibold shadow-md'
                    : 'bg-charcoal text-stone hover:text-ivory border border-editorial hover:border-terracotta/40'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{group.category}</span>
              </button>
            );
          })}
        </div>

        {/* Content Showcase */}
        <motion.div
          key={currentGroup.category}
          id={`fav-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`fav-tab-${activeTab}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between text-xs font-mono text-stone pb-3">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-terracotta" />
              <span className="text-ivory font-medium uppercase tracking-wider">{currentGroup.category}</span>
            </div>
            <span>{currentGroup.description}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentGroup.items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-charcoal/80 border border-editorial hover:border-terracotta/40 transition-all duration-300 rounded-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone mb-4">
                    <span className="px-2 py-0.5 rounded-sm bg-obsidian border border-editorial-subtle text-terracotta">
                      {item.categoryTag}
                    </span>
                    <span>0{idx + 1}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-ivory font-medium group-hover:text-terracotta transition-colors mb-1 leading-snug">
                    {item.title}
                  </h3>

                  {item.artistOrAuthor && (
                    <span className="text-xs font-mono text-stone-light block mb-4">
                      {item.artistOrAuthor}
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone font-sans leading-relaxed pt-4 border-t border-editorial-subtle">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
