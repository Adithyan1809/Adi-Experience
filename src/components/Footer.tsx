import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-editorial bg-obsidian-dark text-stone text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Signature */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full border border-ivory/20 flex items-center justify-center bg-charcoal text-ivory font-serif italic text-xs">
            A
          </div>
          <p className="text-stone-light">
            Made by Adi, with questionable amounts of overthinking.
          </p>
        </div>

        {/* Center: Social links */}
        <div className="flex items-center gap-6 uppercase tracking-widest text-[11px]">
          <a
            href={personalInfo.links.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ivory transition-colors"
          >
            Portfolio
          </a>
          <span>•</span>
          <a
            href={personalInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ivory transition-colors inline-flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5 text-stone hover:text-ivory" />
            <span>GitHub</span>
          </a>
          <span>•</span>
          <a
            href={personalInfo.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ivory transition-colors inline-flex items-center gap-1.5"
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
            className="p-2 border border-editorial rounded-sm hover:border-terracotta hover:text-ivory transition-colors group flex items-center gap-1.5"
            aria-label="Back to top"
          >
            <span className="text-[10px] uppercase tracking-wider">Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-terracotta group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
