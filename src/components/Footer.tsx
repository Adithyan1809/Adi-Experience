import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Sparkles, X, Mail } from 'lucide-react';
import { personalInfo, easterEggConfig } from '../data/personal';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [tapCount, setTapCount] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMonogramTrigger = () => {
    if (isUnlocked) return;

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    const nextCount = tapCount + 1;
    if (nextCount >= easterEggConfig.triggerCount) {
      setIsUnlocked(true);
      setTapCount(0);
    } else {
      setTapCount(nextCount);
      // Reset counter if inactive for 4 seconds
      resetTimerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 4000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMonogramTrigger();
    } else if (e.key === 'Escape' && isUnlocked) {
      setIsUnlocked(false);
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const openContactFromSecret = () => {
    setIsUnlocked(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 border-t border-editorial bg-obsidian-dark text-stone text-xs font-mono relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 space-y-6">
        {/* Unlocked Secret Backstage Pass Toast */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="p-5 sm:p-6 bg-charcoal border border-terracotta/50 rounded-sm shadow-2xl relative"
              role="region"
              aria-label="Backstage secret card"
            >
              <button
                type="button"
                onClick={() => setIsUnlocked(false)}
                className="absolute top-4 right-4 p-1.5 text-stone hover:text-ivory transition-colors focus:outline-none focus:ring-1 focus:ring-terracotta"
                aria-label="Dismiss secret note"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono text-terracotta uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{easterEggConfig.title}</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-light font-sans font-light leading-relaxed max-w-2xl">
                {easterEggConfig.message}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={openContactFromSecret}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-terracotta text-ivory text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-terracotta-hover transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span>{easterEggConfig.actionPrompt}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsUnlocked(false)}
                  className="px-3 py-2 border border-editorial text-stone hover:text-ivory text-xs font-mono uppercase tracking-wider rounded-sm transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Standard Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
          {/* Left: Signature & Monogram Easter Egg */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleMonogramTrigger}
              onKeyDown={handleKeyDown}
              className={`w-7 h-7 rounded-full border flex items-center justify-center font-serif italic text-xs transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta cursor-pointer select-none ${
                tapCount > 0
                  ? 'border-terracotta text-terracotta scale-105 bg-terracotta/10'
                  : 'border-ivory/20 bg-charcoal text-ivory hover:border-terracotta/70'
              }`}
              title={tapCount > 0 ? `${easterEggConfig.triggerCount - tapCount} more...` : 'A'}
              aria-label="Monogram"
            >
              A
            </button>
            <p className="text-stone-light">
              Made by Adi, with questionable amounts of overthinking.
            </p>
          </div>

          {/* Center: Social links */}
          <div className="flex items-center gap-6 uppercase tracking-wider text-[11px]">
            <a
              href={personalInfo.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory transition-colors focus:outline-none focus:underline"
            >
              Portfolio
            </a>
            <span>•</span>
            <a
              href={personalInfo.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory transition-colors inline-flex items-center gap-1.5 focus:outline-none focus:underline"
            >
              <GithubIcon className="w-3.5 h-3.5 text-stone hover:text-ivory" />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <a
              href={personalInfo.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ivory transition-colors inline-flex items-center gap-1.5 focus:outline-none focus:underline"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-stone hover:text-ivory" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Right: Year & Back to top button */}
          <div className="flex items-center gap-6">
            <span>© {currentYear} Adi. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2 border border-editorial rounded-sm hover:border-terracotta hover:text-ivory transition-colors group flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-terracotta"
              aria-label="Back to top"
            >
              <span className="text-[10px] uppercase tracking-wider">Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-terracotta group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
