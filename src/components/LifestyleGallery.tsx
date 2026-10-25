import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lifestyleItems } from '../data/lifestyle';
import { LifestyleItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Eye, X, MapPin } from 'lucide-react';

export const LifestyleGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LifestyleItem | null>(null);

  // Only render configured lifestyle frames
  const activeItems = lifestyleItems.filter((item) => item.isConfigured !== false);

  const handleKeyDown = (e: React.KeyboardEvent, item: LifestyleItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedItem(item);
    }
  };

  return (
    <section id="lifestyle" className="py-24 sm:py-32 border-t border-editorial relative bg-obsidian-dark/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-terracotta tracking-wider uppercase">
              <span>03</span>
              <span className="text-stone">/</span>
              <span>Visual Log</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
              A few actual snapshots from my world.
            </h2>
          </div>
          <div className="max-w-md space-y-1">
            <p className="text-stone text-sm font-sans leading-relaxed">
              Quiet moments, workout sessions, and glimpses of everyday life in Bangalore.
            </p>
            <span className="text-[11px] font-mono text-terracotta/80 block">
              Click any frame to inspect details
            </span>
          </div>
        </div>

        {/* Magazine Asymmetric Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {activeItems.map((item, idx) => {
            // Determine column span based on index for balanced asymmetric editorial composition
            const colSpan =
              idx === 0
                ? 'lg:col-span-5'
                : idx === 3
                ? 'sm:col-span-2 lg:col-span-7'
                : idx >= 4
                ? 'lg:col-span-6'
                : 'sm:col-span-1 lg:col-span-3.5';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className={`${colSpan} cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm`}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                aria-label={`View ${item.title}`}
              >
                <div className="relative overflow-hidden rounded-sm">
                  <ImageWithFallback
                    src={item.imagePath}
                    alt={item.title}
                    aspect={item.aspect}
                    category={item.category}
                    badge={item.locationTag}
                    caption={item.caption}
                    hasRealPhoto={item.hasRealPhoto}
                  />
                  <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <span className="p-3 bg-obsidian/80 backdrop-blur-md rounded-full text-ivory border border-editorial flex items-center gap-2 text-xs font-mono">
                      <Eye className="w-3.5 h-3.5 text-terracotta" />
                      <span>View</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-terracotta uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xl text-ivory font-medium group-hover:text-terracotta transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-stone">0{idx + 1}</span>
                </div>
                <p className="text-xs text-stone mt-1">
                  {item.caption}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/90 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-2xl w-full bg-charcoal border border-editorial rounded-sm overflow-hidden shadow-2xl p-6 sm:p-8 space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 text-stone hover:text-ivory transition-colors z-20 focus:outline-none focus:ring-1 focus:ring-terracotta"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-terracotta tracking-wider uppercase">
                <span>{selectedItem.category}</span>
                {selectedItem.locationTag && (
                  <>
                    <span className="text-stone">•</span>
                    <span className="text-stone">{selectedItem.locationTag}</span>
                  </>
                )}
              </div>

              {/* Large Image Frame */}
              <div className="max-h-[50vh] overflow-hidden rounded-sm">
                <ImageWithFallback
                  src={selectedItem.imagePath}
                  alt={selectedItem.title}
                  aspect="landscape"
                  category={selectedItem.category}
                  badge={selectedItem.locationTag}
                  caption={selectedItem.caption}
                  hasRealPhoto={selectedItem.hasRealPhoto}
                />
              </div>

              {/* Detail Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 id="lightbox-title" className="font-serif text-2xl text-ivory font-medium">
                    {selectedItem.title}
                  </h3>
                  {selectedItem.locationTag && (
                    <span className="flex items-center gap-1.5 text-xs text-stone font-mono">
                      <MapPin className="w-3.5 h-3.5 text-terracotta" />
                      {selectedItem.locationTag}
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-light leading-relaxed font-sans">
                  {selectedItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
