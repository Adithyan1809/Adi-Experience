import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowDown, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { ImageWithFallback } from './ImageWithFallback';
import { MusicPlayer } from './MusicPlayer';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pb-16 px-6 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient subtle glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-ivory/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Meta Bar with Location & Integrated Soundtrack Player */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-b border-editorial text-xs font-mono text-stone tracking-wider"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-terracotta" />
            <span className="text-ivory/80">{personalInfo.location}</span>
          </div>
          <span className="text-stone/40 hidden sm:inline">•</span>
          <span className="text-stone hidden sm:inline">{personalInfo.specialization}</span>
        </div>

        {/* Integrated Background Music Player */}
        <div className="flex items-center gap-2">
          <MusicPlayer />
        </div>
      </motion.div>

      {/* Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto py-10 lg:py-16">
        {/* Left Column: Headline & Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center space-y-7"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-charcoal border border-editorial text-xs tracking-wider text-ivory/80 font-mono">
            <span>Adi • DSATM Bangalore</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-ivory leading-[1.08] tracking-tight">
            A little bit of code.{' '}
            <span className="italic font-normal text-terracotta block sm:inline">
              A little bit of chaos.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-stone-light max-w-xl font-sans leading-relaxed font-light">
            {personalInfo.heroSupporting}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo('#about')}
              className="px-7 py-3.5 bg-ivory text-obsidian hover:bg-ivory-muted transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm shadow-lg hover:shadow-ivory/10 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              Get to know me
            </button>

            <button
              onClick={() => scrollTo('#personality')}
              className="px-7 py-3.5 border border-editorial hover:border-terracotta text-ivory hover:text-ivory transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-terracotta"
            >
              <span>The rest of the story</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone group-hover:text-terracotta transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* Right Column: Hero Portrait Slot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          {/* Decorative Framing Accent */}
          <div className="absolute -top-3 -right-3 w-full h-full border border-terracotta/30 rounded-none pointer-events-none -z-10 translate-x-1 translate-y-1" />

          {/* Portrait Image with Tasteful Editorial Frame */}
          <ImageWithFallback
            src={personalInfo.heroPhoto.src}
            alt={personalInfo.heroPhoto.alt}
            aspect="hero"
            category="Portrait"
            badge="Adi"
            caption={personalInfo.heroPhoto.caption}
            hasRealPhoto={personalInfo.heroPhoto.hasRealPhoto}
            className="shadow-2xl"
          />

          {/* Subtle Status Note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -bottom-5 -left-4 sm:-left-6 bg-obsidian/90 backdrop-blur-md border border-editorial p-3 sm:p-4 rounded-sm shadow-xl max-w-[240px] z-20"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-terracotta uppercase tracking-wider mb-1">
              <span>● Right Now</span>
            </div>
            <p className="text-xs text-ivory/90 font-sans leading-tight">
              Building projects, gym training, and exploring Bangalore.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Row / Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex items-center justify-between pt-8 border-t border-editorial text-xs text-stone font-mono tracking-wider"
      >
        <span className="hidden sm:inline">BANGALORE, IN</span>
        <button
          onClick={() => scrollTo('#about')}
          className="flex items-center gap-2 hover:text-ivory transition-colors group cursor-pointer mx-auto sm:mx-0 focus:outline-none focus:text-ivory"
          aria-label="Scroll down to About section"
        >
          <span className="uppercase text-[11px] tracking-widest text-stone group-hover:text-ivory">
            Scroll to explore
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-terracotta group-hover:translate-y-1 transition-transform" />
        </button>
        <span className="hidden sm:inline text-right">{personalInfo.fullName}</span>
      </motion.div>
    </section>
  );
};
