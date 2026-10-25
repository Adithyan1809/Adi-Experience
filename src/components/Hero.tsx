import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowDown, Sparkles, Coffee } from 'lucide-react';
import { personalInfo } from '../data/personal';
import { ImageWithFallback } from './ImageWithFallback';

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
      {/* Background ambient editorial subtle glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-ivory/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Tagline / Meta row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-editorial text-xs font-mono text-stone tracking-widest uppercase"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-ivory/80">Available for good coffee & great conversations</span>
        </div>
        <div className="flex items-center gap-2 text-stone hover:text-ivory transition-colors">
          <MapPin className="w-3.5 h-3.5 text-terracotta" />
          <span>{personalInfo.location}</span>
        </div>
      </motion.div>

      {/* Main Hero Editorial Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto py-10 lg:py-16">
        {/* Left Column: Editorial Headline & Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center space-y-8"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-charcoal border border-editorial text-xs tracking-wider text-ivory/80 font-mono">
            <Sparkles className="w-3 h-3 text-terracotta" />
            <span>AI & Machine Learning Student</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-light text-ivory leading-[1.08] tracking-tight">
            An engineer by degree.{' '}
            <span className="italic font-normal text-terracotta block sm:inline">
              A work in progress
            </span>{' '}
            by choice.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl text-stone-light max-w-xl font-sans leading-relaxed font-light">
            Building interesting things, chasing better versions of myself, and occasionally pretending I know where my life is going.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo('#about')}
              className="px-7 py-3.5 bg-ivory text-obsidian hover:bg-ivory-muted transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm shadow-lg hover:shadow-ivory/10 transform hover:-translate-y-0.5"
            >
              Get to know me
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="px-7 py-3.5 border border-terracotta/50 text-ivory hover:bg-terracotta hover:border-terracotta transition-all duration-300 text-xs font-semibold uppercase tracking-widest rounded-sm flex items-center gap-2 group"
            >
              <Coffee className="w-3.5 h-3.5 text-terracotta group-hover:text-ivory transition-colors" />
              <span>Let's get coffee</span>
            </button>
          </div>

          {/* Micro Note */}
          <div className="pt-2 flex items-center gap-3 text-xs text-stone/80 font-mono">
            <span>Specializing in AI/ML</span>
            <span>•</span>
            <span>Bangalore, India</span>
            <span>•</span>
            <span className="text-terracotta/90">Curious by nature</span>
          </div>
        </motion.div>

        {/* Right Column: Hero Portrait Plate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          {/* Decorative Framing Accent */}
          <div className="absolute -top-3 -right-3 w-full h-full border border-terracotta/30 rounded-none pointer-events-none -z-10 translate-x-1 translate-y-1" />

          {/* Portrait Image with Graceful Intentional Fallback */}
          <ImageWithFallback
            src="/images/hero.jpg"
            alt="Adi — Personal Portrait"
            aspect="hero"
            category="EDITORIAL PORTRAIT // VOL. 01"
            badge="BANGALORE"
            caption="Engineering student, AI builder, and espresso enthusiast."
            className="shadow-2xl"
          />

          {/* Subtle Floating Annotation Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -bottom-5 -left-4 sm:-left-6 bg-obsidian/90 backdrop-blur-md border border-editorial p-3 sm:p-4 rounded-sm shadow-xl max-w-[240px] z-20"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-terracotta uppercase tracking-wider mb-1">
              <span>● Status</span>
              <span className="text-stone">Today</span>
            </div>
            <p className="text-xs text-ivory/90 font-sans leading-tight">
              Probably debugging a model or looking for Bangalore's best cold brew.
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
        <span className="hidden sm:inline">01 // INTRODUCTION</span>
        <button
          onClick={() => scrollTo('#about')}
          className="flex items-center gap-2 hover:text-ivory transition-colors group cursor-pointer mx-auto sm:mx-0"
          aria-label="Scroll down to About section"
        >
          <span className="uppercase text-[11px] tracking-widest text-stone group-hover:text-ivory">
            Scroll to explore
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-terracotta group-hover:translate-y-1 transition-transform" />
        </button>
        <span className="hidden sm:inline text-right">THE ADI EXPERIENCE</span>
      </motion.div>
    </section>
  );
};
