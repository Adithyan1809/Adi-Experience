import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/personal';
import { ContactModal } from './ContactModal';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import {
  Globe,
  ArrowUpRight,
  Sparkles,
  Info
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showSocialNotice, setShowSocialNotice] = useState(false);

  const handleInstagramClick = () => {
    if (personalInfo.links.instagram) {
      window.open(personalInfo.links.instagram, '_blank', 'noopener,noreferrer');
    } else {
      setShowSocialNotice(true);
      setTimeout(() => setShowSocialNotice(false), 4000);
    }
  };

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
              <span>Let's Get Coffee</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl sm:text-6xl md:text-6xl text-ivory font-light tracking-tight max-w-2xl mx-auto leading-[1.1]">
              If you've made it this far,{' '}
              <span className="italic text-terracotta">we might get along.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-stone-light max-w-xl mx-auto font-sans font-light leading-relaxed my-8">
              Whether you came here out of curiosity, stayed for the questionable humor, or just wanted to see what an AI engineer does with a free weekend — hello.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 mb-10">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-ivory text-obsidian hover:bg-ivory-muted transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm shadow-xl hover:shadow-ivory/10 transform hover:-translate-y-0.5"
              >
                Say hello
              </button>

              <button
                onClick={handleInstagramClick}
                className="w-full sm:w-auto px-8 py-4 border border-editorial hover:border-terracotta text-ivory transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm flex items-center justify-center gap-2.5 group"
              >
                <InstagramIcon className="w-4 h-4 text-terracotta group-hover:text-ivory transition-colors" />
                <span>Find me on Instagram</span>
              </button>
            </div>

            {/* Social notice feedback if Instagram not yet set */}
            {showSocialNotice && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-obsidian border border-terracotta/40 text-stone-light text-xs font-mono max-w-md mx-auto mb-8 rounded-sm flex items-center gap-2 text-left"
              >
                <Info className="w-4 h-4 text-terracotta shrink-0" />
                <span>
                  Instagram handle is awaiting configuration in <code>src/data/personal.ts</code>. You can reach Adi directly via "Say hello" or LinkedIn!
                </span>
              </motion.div>
            )}

            {/* Social and Web Links */}
            <div className="pt-8 border-t border-editorial-subtle flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-widest text-stone">
              <a
                href={personalInfo.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-terracotta" />
                <span>adithyanp.me</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={personalInfo.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-terracotta" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={personalInfo.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ivory transition-colors flex items-center gap-1.5"
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
