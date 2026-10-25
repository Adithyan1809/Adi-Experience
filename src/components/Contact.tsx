import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/personal';
import { ContactModal } from './ContactModal';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import {
  Globe,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const hasInstagram = Boolean(personalInfo.links.instagram && personalInfo.links.instagram.trim() !== '');

  return (
    <>
      <section id="contact" className="py-28 sm:py-36 border-t border-editorial relative bg-obsidian overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="p-8 sm:p-16 bg-charcoal border border-editorial rounded-sm text-center relative shadow-2xl"
          >
            {/* Corner film framing markers */}
            <div className="absolute top-4 left-4 text-stone-dark text-xs font-mono select-none">+</div>
            <div className="absolute top-4 right-4 text-stone-dark text-xs font-mono select-none">+</div>
            <div className="absolute bottom-4 left-4 text-stone-dark text-xs font-mono select-none">+</div>
            <div className="absolute bottom-4 right-4 text-stone-dark text-xs font-mono select-none">+</div>

            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-obsidian border border-editorial text-xs font-mono text-terracotta uppercase tracking-wider mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Say Hello</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl sm:text-6xl md:text-6xl text-ivory font-light tracking-tight max-w-2xl mx-auto leading-[1.1]">
              Your turn.
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-stone-light max-w-xl mx-auto font-sans font-light leading-relaxed my-8">
              If something here caught your attention, you have a recommendation, or you just want to say hello, my inbox is open.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 mb-10">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-ivory text-obsidian hover:bg-ivory-muted transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm shadow-xl hover:shadow-ivory/10 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-terracotta"
              >
                Say hello
              </button>

              {hasInstagram ? (
                <a
                  href={personalInfo.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 border border-editorial hover:border-terracotta text-ivory transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-terracotta"
                >
                  <InstagramIcon className="w-4 h-4 text-terracotta group-hover:text-ivory transition-colors" />
                  <span>Find me on Instagram</span>
                </a>
              ) : (
                <a
                  href={personalInfo.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 border border-editorial hover:border-terracotta text-ivory transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-terracotta"
                >
                  <LinkedinIcon className="w-4 h-4 text-terracotta group-hover:text-ivory transition-colors" />
                  <span>Connect on LinkedIn</span>
                </a>
              )}
            </div>

            {/* Social and Web Links */}
            <div className="pt-8 border-t border-editorial-subtle flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-wider text-stone">
              <a
                href={personalInfo.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors flex items-center gap-1.5 focus:outline-none focus:underline"
              >
                <Globe className="w-3.5 h-3.5 text-terracotta" />
                <span>adithyanp.me</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors flex items-center gap-1.5 focus:outline-none focus:underline"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-terracotta" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors flex items-center gap-1.5 focus:outline-none focus:underline"
              >
                <GithubIcon className="w-3.5 h-3.5 text-terracotta" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accessible Contact Modal */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};
