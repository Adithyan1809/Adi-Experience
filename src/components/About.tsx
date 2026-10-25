import React from 'react';
import { motion } from 'framer-motion';
import { aboutData, personalInfo } from '../data/personal';
import { Heart, Target, Sparkles, CheckCircle2, Flame } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 border-t border-editorial relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-terracotta/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-terracotta tracking-widest uppercase">
              <span>02</span>
              <span className="text-stone">/</span>
              <span>About Me</span>
            </div>
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
                <p key={i} className="first-letter:text-4xl first-letter:font-serif first-letter:text-terracotta first-letter:mr-1 first-letter:float-left first-letter:leading-none">
                  {para}
                </p>
              ))}
            </div>

            {/* Ambitions Section */}
            <div className="pt-6 border-t border-editorial space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-terracotta uppercase">
                <Target className="w-3.5 h-3.5" />
                <span>What I'm Working Towards</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {aboutData.ambitions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-charcoal/60 border border-editorial hover:border-terracotta/40 transition-colors duration-300 rounded-sm flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-mono text-stone mb-3">0{idx + 1}</span>
                    <h3 className="font-serif text-lg text-ivory font-medium mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Values in Relationships & Life */}
            <div className="pt-6 border-t border-editorial space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-terracotta uppercase">
                <Heart className="w-3.5 h-3.5" />
                <span>What I Value In People</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {aboutData.values.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 bg-charcoal/40 border border-editorial-subtle rounded-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-terracotta shrink-0" />
                    <span className="text-xs sm:text-sm text-ivory/90 font-medium">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Quirks, Editable Fast Facts & Editorial Accent (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Quirks & Humor Card */}
            <div className="p-6 sm:p-8 bg-charcoal/80 border border-editorial relative rounded-sm shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-editorial-subtle">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-terracotta">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Quirks & Self-Awareness</span>
                </div>
                <span className="text-[10px] font-mono text-stone">100% UNFILTERED</span>
              </div>

              <div className="space-y-4">
                {aboutData.quirks.map((quirk, idx) => (
                  <div key={idx} className="flex gap-3 text-xs sm:text-sm text-ivory/85 leading-relaxed font-sans">
                    <span className="font-serif italic text-terracotta text-base leading-none">“</span>
                    <p>{quirk}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Facts (with clear editable indicators) */}
            <div className="p-6 sm:p-8 bg-obsidian-light border border-editorial rounded-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-editorial-subtle">
                <span className="text-xs font-mono tracking-widest uppercase text-stone">
                  Fast Dossier
                </span>
                <span className="text-[10px] font-mono text-terracotta uppercase">
                  Centralized In personal.ts
                </span>
              </div>

              <dl className="divide-y divide-editorial-subtle text-xs sm:text-sm">
                {aboutData.facts.map((fact, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <dt className="text-stone font-mono text-xs">{fact.label}</dt>
                    <dd className="text-ivory font-medium text-right flex items-center gap-1.5">
                      <span>{fact.value}</span>
                      {fact.isEditable && (
                        <span
                          title="Editable in src/data/personal.ts"
                          className="w-1.5 h-1.5 rounded-full bg-terracotta/70"
                        />
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Subtle Signature / Seal */}
            <div className="p-5 border border-editorial-subtle bg-charcoal/20 flex items-center justify-between text-xs text-stone font-mono">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-terracotta" />
                <span>{personalInfo.fullName}</span>
              </div>
              <span className="italic font-serif text-ivory/60 text-sm">adi.exp // 2024</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
