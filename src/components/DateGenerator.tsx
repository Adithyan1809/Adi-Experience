import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { dateIdeas } from '../data/dateIdeas';
import { DateIdea } from '../types';
import { Dices, MapPin, Clock, Coffee } from 'lucide-react';

export const DateGenerator: React.FC = () => {
  const [currentIdea, setCurrentIdea] = useState<DateIdea>(dateIdeas[0]);
  const [isRolling, setIsRolling] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  const rollNewIdea = () => {
    setIsRolling(true);

    // Pick an idea different from current
    let nextIndex = Math.floor(Math.random() * dateIdeas.length);
    if (dateIdeas[nextIndex].id === currentIdea.id) {
      nextIndex = (nextIndex + 1) % dateIdeas.length;
    }

    setTimeout(() => {
      setCurrentIdea(dateIdeas[nextIndex]);
      setIsRolling(false);
      setRollCount((prev) => prev + 1);

      // Trigger celebratory micro-confetti
      try {
        confetti({
          particleCount: 28,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#F2EBDD', '#A64B42', '#8C8B83'],
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback gracefully if canvas is unavailable
      }
    }, 300);
  };

  return (
    <section id="date-generator" className="py-24 sm:py-32 border-t border-editorial relative bg-obsidian overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-terracotta/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 text-center">
        {/* Section Header */}
        <div className="space-y-4 max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-terracotta tracking-widest uppercase">
            <span>08</span>
            <span className="text-stone">/</span>
            <span>Zero-Pressure Generator</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
            Plan our hypothetical first date.
          </h2>
          <p className="text-stone text-sm font-sans leading-relaxed">
            Strictly hypothetical, completely unpretentious, and guaranteed to include either artisanal caffeine or questionable decision-making.
          </p>
        </div>

        {/* Date Idea Card Display */}
        <div className="relative mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdea.id}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 bg-charcoal border border-editorial rounded-sm text-left shadow-2xl relative"
            >
              {/* Framing accents */}
              <div className="absolute top-3 left-3 text-stone-dark text-xs font-mono select-none">+</div>
              <div className="absolute top-3 right-3 text-stone-dark text-xs font-mono select-none">+</div>
              <div className="absolute bottom-3 left-3 text-stone-dark text-xs font-mono select-none">+</div>
              <div className="absolute bottom-3 right-3 text-stone-dark text-xs font-mono select-none">+</div>

              {/* Tag / Vibe Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-editorial-subtle">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-terracotta/20 text-terracotta border border-terracotta/30 text-[10px] font-mono uppercase tracking-wider">
                    {currentIdea.tag}
                  </span>
                  <span className="text-xs font-mono text-stone">
                    {currentIdea.vibe}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-stone">
                  <Clock className="w-3.5 h-3.5 text-terracotta" />
                  <span>{currentIdea.duration}</span>
                </div>
              </div>

              {/* Idea Title */}
              <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-medium my-6 leading-snug">
                {currentIdea.title}
              </h3>

              {/* Description */}
              <p className="text-base sm:text-lg text-stone-light font-light leading-relaxed mb-6 font-sans">
                {currentIdea.description}
              </p>

              {/* Location Tag */}
              <div className="pt-6 border-t border-editorial-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                  <span className="font-sans text-ivory/80">{currentIdea.location}</span>
                </div>
                <span className="font-mono text-[11px] text-stone">
                  Idea #{rollCount + 1} • Configurable in dateIdeas.ts
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Generator Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={rollNewIdea}
            disabled={isRolling}
            className="w-full sm:w-auto px-8 py-4 bg-terracotta text-ivory hover:bg-terracotta-hover transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2.5 shadow-xl hover:shadow-terracotta/20 transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
            <span>{rollCount === 0 ? 'Plan our hypothetical first date' : 'Roll another idea'}</span>
          </button>

          <button
            onClick={() => {
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 border border-editorial hover:border-ivory text-ivory text-xs font-semibold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <Coffee className="w-4 h-4 text-terracotta" />
            <span>Let's make it real</span>
          </button>
        </div>

        <p className="text-[11px] font-mono text-stone mt-6">
          No automated calendar invites, no venue bookings, just good ideas.
        </p>
      </div>
    </section>
  );
};
