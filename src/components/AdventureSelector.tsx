import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adventureVersions } from '../data/personal';
import { Compass, Sparkles, Flame, Heart, RotateCcw, MessageCircle } from 'lucide-react';

const iconByVersion = {
  curious: Compass,
  chaotic: Flame,
  softie: Heart,
};

export const AdventureSelector: React.FC = () => {
  const [selectedVersionId, setSelectedVersionId] = useState<'curious' | 'chaotic' | 'softie'>('curious');

  const selected = adventureVersions.find((v) => v.id === selectedVersionId) || adventureVersions[0];

  return (
    <section id="adventure" className="py-24 sm:py-32 border-t border-editorial relative bg-obsidian-light/40 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-terracotta tracking-widest uppercase">
            <span>07</span>
            <span className="text-stone">/</span>
            <span>Interactive State</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
            Which version of me are we meeting today?
          </h2>
          <p className="text-stone text-sm font-sans leading-relaxed">
            Depending on caffeine levels, the current phase of the moon, or whether my code compiled without throwing a segmentation fault.
          </p>
        </div>

        {/* 3 Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {adventureVersions.map((version) => {
            const Icon = iconByVersion[version.id];
            const isSelected = selectedVersionId === version.id;

            return (
              <button
                key={version.id}
                onClick={() => setSelectedVersionId(version.id)}
                className={`p-6 rounded-sm border text-left transition-all duration-300 relative group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-charcoal border-terracotta shadow-xl'
                    : 'bg-obsidian/70 border-editorial hover:border-terracotta/40 hover:bg-charcoal/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`p-2 rounded-sm border transition-colors ${
                        isSelected
                          ? 'bg-terracotta text-ivory border-terracotta'
                          : 'bg-obsidian border-editorial text-stone group-hover:text-terracotta'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-stone uppercase tracking-wider">
                      {version.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-ivory font-medium">
                    {version.title}
                  </h3>
                </div>
                <p className="text-xs text-stone mt-3 font-sans line-clamp-2">
                  {version.tagline}
                </p>
                {isSelected && (
                  <div className="absolute -bottom-[1px] left-6 right-6 h-[2px] bg-terracotta" />
                )}
              </button>
            );
          })}
        </div>

        {/* Revealed Adventure Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-12 bg-charcoal border border-editorial rounded-sm shadow-2xl relative"
          >
            {/* Corner crosshairs */}
            <div className="absolute top-3 left-3 text-stone-dark text-xs font-mono select-none">+</div>
            <div className="absolute top-3 right-3 text-stone-dark text-xs font-mono select-none">+</div>

            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-editorial-subtle gap-4">
              <div>
                <span className="text-xs font-mono text-terracotta uppercase tracking-widest block mb-1">
                  Active Persona // {selected.badge}
                </span>
                <h4 className="font-serif text-3xl sm:text-4xl text-ivory font-light">
                  {selected.title}
                </h4>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-stone bg-obsidian px-3 py-1.5 rounded-sm border border-editorial">
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                <span>{selected.vibe}</span>
              </div>
            </div>

            {/* Main Narrative */}
            <p className="text-base sm:text-lg text-stone-light font-light leading-relaxed my-8 font-sans">
              {selected.description}
            </p>

            {/* Highlighted behavioral clues */}
            <div className="space-y-3 mb-8">
              <span className="text-xs font-mono text-stone uppercase tracking-wider block">
                Field Notes & Warning Signs:
              </span>
              <ul className="space-y-2">
                {selected.highlightPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-ivory/85">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Conversation Starter Callout */}
            <div className="p-4 sm:p-5 bg-obsidian/80 border border-editorial-subtle rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-terracotta shrink-0" />
                <span className="text-xs sm:text-sm text-ivory/90 font-medium">
                  {selected.suggestedTopic}
                </span>
              </div>
              <button
                onClick={() => {
                  const el = document.querySelector('#contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-mono uppercase tracking-wider text-terracotta hover:text-ivory transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Bring this up →
              </button>
            </div>

            {/* Reset control */}
            <div className="mt-6 pt-4 border-t border-editorial-subtle flex justify-end">
              <button
                onClick={() => setSelectedVersionId('curious')}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-stone hover:text-ivory transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset selection</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
