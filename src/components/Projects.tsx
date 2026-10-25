import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projects';
import { GithubIcon } from './Icons';
import { ExternalLink, Sparkles, Lock, ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string>(projectsData[0].id);

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-editorial relative bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-terracotta tracking-widest uppercase">
              <span>05</span>
              <span className="text-stone">/</span>
              <span>Engineering & Craft</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
              Things I'm Building
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="text-stone text-sm font-sans leading-relaxed">
              Code as an instrument for solving actual human friction. These aren't corporate résumé bullet points; they are things I cared enough about to build from scratch.
            </p>
            <a
              href="https://github.com/Adithyan1809"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-terracotta hover:text-ivory transition-colors uppercase tracking-wider"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Explore GitHub Repository Index</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Editorial Project Story List / Feature Showcase */}
        <div className="space-y-8">
          {projectsData.map((project, idx) => {
            const isSelected = activeProject === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                onClick={() => setActiveProject(project.id)}
                className={`p-6 sm:p-10 rounded-sm border transition-all duration-500 relative cursor-pointer ${
                  isSelected
                    ? 'bg-charcoal border-terracotta/60 shadow-2xl'
                    : 'bg-obsidian-light/50 border-editorial hover:border-terracotta/30'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number, Title, Status (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-stone">0{idx + 1}</span>
                      <span className="w-8 h-[1px] bg-editorial" />
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-obsidian border border-editorial text-ivory/80">
                        {project.status}
                      </span>
                      <span className="text-xs font-mono text-stone ml-auto">
                        {project.timeframe}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-medium tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs font-mono text-terracotta uppercase tracking-wider">
                      {project.role}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-sm bg-obsidian/70 border border-editorial-subtle text-stone-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Narrative Story & Actions (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                    <div className="space-y-4">
                      <p className="text-base sm:text-lg text-ivory/90 font-light leading-relaxed">
                        {project.description}
                      </p>
                      <div className="p-4 bg-obsidian/60 border border-editorial-subtle rounded-sm">
                        <span className="text-[10px] font-mono text-stone uppercase tracking-widest block mb-1">
                          The Story Behind It
                        </span>
                        <p className="text-xs sm:text-sm text-stone leading-relaxed font-sans">
                          {project.story}
                        </p>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-editorial-subtle">
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-ivory text-obsidian text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-ivory-muted transition-colors"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-obsidian text-stone text-xs font-mono tracking-wider rounded-sm border border-editorial-subtle cursor-default">
                          <Lock className="w-3 h-3 text-stone" />
                          <span>Private Preview</span>
                        </span>
                      )}

                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 border border-editorial hover:border-terracotta text-ivory text-xs font-mono uppercase tracking-wider rounded-sm transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5 text-stone" />
                          <span>Source Code</span>
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-stone">Repository upon request</span>
                      )}

                      <span className="ml-auto text-[11px] font-mono text-stone hidden sm:inline">
                        Verified Destination
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small Footer Callout */}
        <div className="mt-12 p-6 border border-editorial bg-charcoal/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-terracotta" />
            <span className="text-ivory/80">More experiments and research logs on GitHub</span>
          </div>
          <a
            href="https://github.com/Adithyan1809"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta hover:text-ivory uppercase tracking-widest font-semibold flex items-center gap-1"
          >
            <span>Visit @Adithyan1809</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
