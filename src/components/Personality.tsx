import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalityPrompts } from '../data/personal';
import {
  Sun,
  Heart,
  AlertCircle,
  Coffee,
  MessageSquare,
  Sparkles,
  Smile,
  ChevronDown
} from 'lucide-react';

const iconMap = {
  Sun,
  Heart,
  AlertCircle,
  Coffee,
  MessageSquare,
  Sparkles,
  Smile,
};

export const Personality: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([personalityPrompts[0].id, personalityPrompts[1].id]);

  const togglePrompt = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => setOpenIds(personalityPrompts.map((p) => p.id));
  const collapseAll = () => setOpenIds([]);

  return (
    <section id="personality" className="py-24 sm:py-32 border-t border-editorial relative bg-charcoal/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-terracotta tracking-wider uppercase">
              <span>06</span>
              <span className="text-stone">/</span>
              <span>The Fun Stuff</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
              Important questions. Absolutely no stakes.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={expandAll}
              className="text-xs font-mono text-stone hover:text-ivory px-3 py-1.5 border border-editorial rounded-sm transition-colors uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-terracotta"
            >
              Reveal All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs font-mono text-stone hover:text-ivory px-3 py-1.5 border border-editorial rounded-sm transition-colors uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-terracotta"
            >
              Fold All
            </button>
          </div>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalityPrompts.map((item, idx) => {
            const Icon = (iconMap as any)[item.icon] || Sparkles;
            const isOpen = openIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`p-6 sm:p-7 rounded-sm border transition-all duration-300 relative ${
                  isOpen
                    ? 'bg-charcoal border-terracotta/50 shadow-xl'
                    : 'bg-obsidian-light/60 border-editorial hover:border-terracotta/30'
                }`}
              >
                {/* Header row as accessible button */}
                <button
                  type="button"
                  onClick={() => togglePrompt(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${item.id}`}
                  className="w-full text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta rounded-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-sm bg-obsidian border border-editorial text-terracotta shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone block">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-ivory font-medium mt-0.5">
                        {item.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-stone transition-transform duration-300 shrink-0 mt-1 ${
                      isOpen ? 'rotate-180 text-terracotta' : ''
                    }`}
                  />
                </button>

                {/* Subtag line */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-sans text-stone italic">
                    {item.tagline}
                  </span>
                  <span className="text-[10px] font-mono text-stone/70">
                    0{idx + 1}
                  </span>
                </div>

                {/* Expandable answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`answer-${item.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-editorial-subtle">
                        <p className="text-sm sm:text-base text-stone-light font-light leading-relaxed whitespace-pre-line font-sans">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
