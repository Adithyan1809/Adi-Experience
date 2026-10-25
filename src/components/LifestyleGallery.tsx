import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lifestyleItems } from '../data/lifestyle';
import { LifestyleItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { Eye, X, MapPin } from 'lucide-react';

export const LifestyleGallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LifestyleItem | null>(null);

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
              Proof I occasionally leave the house.
            </h2>
          </div>
          <div className="max-w-md space-y-1">
            <p className="text-stone text-sm font-sans leading-relaxed">
              Quiet moments, workout sessions, cold brew runs, and Bangalore skies.
            </p>
            <span className="text-[11px] font-mono text-terracotta/80 block">
              Click any frame to view
            </span>
          </div>
        </div>

        {/* Magazine Asymmetric Collage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Card 1: Everyday Workspace (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm"
            role="button"
            tabIndex={0}
            onClick={() => setSelectedItem(lifestyleItems[0])}
            onKeyDown={(e) => handleKeyDown(e, lifestyleItems[0])}
            aria-label={`View ${lifestyleItems[0].title}`}
          >
            <div className="relative overflow-hidden rounded-sm">
              <ImageWithFallback
                src={lifestyleItems[0].imagePath}
                alt={lifestyleItems[0].title}
                aspect="portrait"
                category={lifestyleItems[0].category}
                badge={lifestyleItems[0].locationTag}
                caption={lifestyleItems[0].caption}
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
                  {lifestyleItems[0].category}
                </span>
                <h3 className="font-serif text-xl text-ivory font-medium group-hover:text-terracotta transition-colors">
                  {lifestyleItems[0].title}
                </h3>
              </div>
              <span className="text-xs font-mono text-stone">01</span>
            </div>
            <p className="text-xs text-stone mt-1">
              {lifestyleItems[0].caption}
            </p>
          </motion.div>

          {/* Cards 2 & 3: Gym & Cafés (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 2: Fitness */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedItem(lifestyleItems[1])}
              onKeyDown={(e) => handleKeyDown(e, lifestyleItems[1])}
              aria-label={`View ${lifestyleItems[1].title}`}
            >
              <div className="relative overflow-hidden rounded-sm">
                <ImageWithFallback
                  src={lifestyleItems[1].imagePath}
                  alt={lifestyleItems[1].title}
                  aspect="square"
                  category={lifestyleItems[1].category}
                  badge={lifestyleItems[1].locationTag}
                  caption={lifestyleItems[1].caption}
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
                    {lifestyleItems[1].category}
                  </span>
                  <h3 className="font-serif text-xl text-ivory font-medium group-hover:text-terracotta transition-colors">
                    {lifestyleItems[1].title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-stone">02</span>
              </div>
              <p className="text-xs text-stone mt-1">
                {lifestyleItems[1].caption}
              </p>
            </motion.div>

            {/* Card 3: Cafes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedItem(lifestyleItems[2])}
              onKeyDown={(e) => handleKeyDown(e, lifestyleItems[2])}
              aria-label={`View ${lifestyleItems[2].title}`}
            >
              <div className="relative overflow-hidden rounded-sm">
                <ImageWithFallback
                  src={lifestyleItems[2].imagePath}
                  alt={lifestyleItems[2].title}
                  aspect="square"
                  category={lifestyleItems[2].category}
                  badge={lifestyleItems[2].locationTag}
                  caption={lifestyleItems[2].caption}
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
                    {lifestyleItems[2].category}
                  </span>
                  <h3 className="font-serif text-xl text-ivory font-medium group-hover:text-terracotta transition-colors">
                    {lifestyleItems[2].title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-stone">03</span>
              </div>
              <p className="text-xs text-stone mt-1">
                {lifestyleItems[2].caption}
              </p>
            </motion.div>

            {/* Card 4: Exploration (Spans across both columns on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="sm:col-span-2 cursor-pointer group pt-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedItem(lifestyleItems[3])}
              onKeyDown={(e) => handleKeyDown(e, lifestyleItems[3])}
              aria-label={`View ${lifestyleItems[3].title}`}
            >
              <div className="relative overflow-hidden rounded-sm">
                <ImageWithFallback
                  src={lifestyleItems[3].imagePath}
                  alt={lifestyleItems[3].title}
                  aspect="landscape"
                  category={lifestyleItems[3].category}
                  badge={lifestyleItems[3].locationTag}
                  caption={lifestyleItems[3].caption}
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
                    {lifestyleItems[3].category}
                  </span>
                  <h3 className="font-serif text-xl text-ivory font-medium group-hover:text-terracotta transition-colors">
                    {lifestyleItems[3].title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-stone">04</span>
              </div>
              <p className="text-xs text-stone mt-1">
                {lifestyleItems[3].caption}
              </p>
            </motion.div>
          </div>

          {/* Cards 5 & 6 (Style & Sunset) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm"
            role="button"
            tabIndex={0}
            onClick={() => setSelectedItem(lifestyleItems[4])}
            onKeyDown={(e) => handleKeyDown(e, lifestyleItems[4])}
            aria-label={`View ${lifestyleItems[4].title}`}
          >
            <div className="relative overflow-hidden rounded-sm">
              <ImageWithFallback
                src={lifestyleItems[4].imagePath}
                alt={lifestyleItems[4].title}
                aspect="landscape"
                category={lifestyleItems[4].category}
                badge={lifestyleItems[4].locationTag}
                caption={lifestyleItems[4].caption}
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-mono text-terracotta uppercase tracking-wider">
                  {lifestyleItems[4].category}
                </span>
                <h3 className="font-serif text-xl text-ivory font-medium group-hover:text-terracotta transition-colors">
                  {lifestyleItems[4].title}
                </h3>
              </div>
              <span className="text-xs font-mono text-stone">05</span>
            </div>
            <p className="text-xs text-stone mt-1">
              {lifestyleItems[4].caption}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-6 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm"
            role="button"
            tabIndex={0}
            onClick={() => setSelectedItem(lifestyleItems[5])}
            onKeyDown={(e) => handleKeyDown(e, lifestyleItems[5])}
            aria-label={`View ${lifestyleItems[5].title}`}
          >
            <div className="relative overflow-hidden rounded-sm">
              <ImageWithFallback
                src={lifestyleItems[5].imagePath}
                alt={lifestyleItems[5].title}
                aspect="landscape"
                category={lifestyleItems[5].category}
                badge={lifestyleItems[5].locationTag}
                caption={lifestyleItems[5].caption}
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] font-mono text-terracotta uppercase tracking-wider">
                  {lifestyleItems[5].category}
                </span>
                <h3 className="font-serif text-xl text-ivory font-medium group-hover:text-terracotta transition-colors">
                  {lifestyleItems[5].title}
                </h3>
              </div>
              <span className="text-xs font-mono text-stone">06</span>
            </div>
            <p className="text-xs text-stone mt-1">
              {lifestyleItems[5].caption}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Interactive Lightbox / Detail Modal */}
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
                <div className="pt-3 border-t border-editorial-subtle flex items-center justify-between text-[11px] font-mono text-stone">
                  <span>Photo path: {selectedItem.imagePath}</span>
                  <span className="text-terracotta/90">Editable in lifestyle.ts</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
