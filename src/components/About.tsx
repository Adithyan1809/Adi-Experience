import React from 'react';
import { motion } from 'framer-motion';
import { aboutData, personalInfo } from '../data/personal';
import { Target, FileText, ArrowDown } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export const About: React.FC = () => {
  const scrollToNext = () => {
    const el = document.getElementById('lifestyle');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 sm:py-32 border-t border-editorial relative scroll-snap-chapter overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-terracotta/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3">
            <span className="text-xs font-mono text-terracotta tracking-wider uppercase">
              About
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight max-w-2xl">
              {aboutData.heading}
            </h2>
          </div>
          <p className="text-stone text-sm max-w-md font-sans leading-relaxed">
            {aboutData.subheading}
          </p>
        </div>

        {/* Editorial Layout: Left Narrative, Right Highlights & Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Narrative (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-10"
          >
            {/* Story Paragraphs */}
            <div className="space-y-6 text-base sm:text-lg text-stone-light font-light leading-relaxed">
              {aboutData.introParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'first-letter:text-4xl first-letter:font-serif first-letter:text-terracotta first-letter:mr-2.5 first-letter:float-left first-letter:leading-none'
                      : ''
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Core Focus Areas */}
            <div className="pt-6 border-t border-editorial space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-terracotta uppercase">
                <Target className="w-3.5 h-3.5" />
                <span>What I'm focused on</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aboutData.focusAreas.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-charcoal/60 border border-editorial hover:border-terracotta/40 transition-colors duration-300 rounded-sm flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-serif text-lg text-ivory font-medium mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Highlight Card */}
            {aboutData.researchHighlight && (
              <div className="p-5 bg-charcoal/40 border border-editorial rounded-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-terracotta">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Research Activity</span>
                  </span>
                  <span className="text-stone font-mono">{aboutData.researchHighlight.status}</span>
                </div>
                <h4 className="font-serif text-xl text-ivory font-medium">
                  {aboutData.researchHighlight.title}
                </h4>
                <p className="text-xs text-stone font-mono">
                  {aboutData.researchHighlight.venue}
                </p>
                <p className="text-xs text-stone-light font-sans pt-1">
                  {aboutData.researchHighlight.description}
                </p>
              </div>
            )}
          </motion.div>

          {/* Right Column: Image Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Decorative Framing Accent */}
            <div className="absolute -top-3 -right-3 w-full h-full border border-terracotta/30 rounded-none pointer-events-none -z-10 translate-x-1 translate-y-1" />

            {/* Editorial Image Card */}
            <div className="relative rounded-sm overflow-hidden border border-editorial bg-charcoal shadow-2xl">
              <ImageWithFallback
                src={personalInfo.heroPhoto.src}
                alt={personalInfo.fullName}
                aspect="hero"
                category="Portrait"
                badge="Adi"
                caption="AI/ML student at DSATM, Bangalore"
                hasRealPhoto={true}
                className="w-full"
              />

              {/* Integrated Editorial Footer */}
              <div className="p-4 bg-obsidian-light/95 backdrop-blur-sm border-t border-editorial flex items-center justify-between text-xs font-mono">
                <span className="text-ivory font-medium tracking-wide">
                  {personalInfo.fullName}
                </span>
                <span className="text-terracotta">
                  {personalInfo.location}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Next Chapter Cue */}
        <div className="mt-16 sm:mt-20 pt-6 border-t border-editorial-subtle flex items-center justify-between text-xs font-mono text-stone">
          <span className="hidden sm:inline">CHAPTER 02 / ABOUT</span>
          <button
            onClick={scrollToNext}
            className="flex items-center gap-2 hover:text-ivory transition-colors group cursor-pointer mx-auto sm:mx-0 focus:outline-none"
            aria-label="Advance to Snapshots section"
          >
            <span className="uppercase text-[11px] tracking-wider text-stone group-hover:text-ivory">
              Next: Everyday Snapshots
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-terracotta group-hover:translate-y-0.5 transition-transform" />
          </button>
          <span className="hidden sm:inline">02 / 09</span>
        </div>
      </div>
    </section>
  );
};
