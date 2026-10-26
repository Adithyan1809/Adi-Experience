import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import { GithubIcon } from './Icons';
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';

export const Projects: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(projectsData[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-24 sm:py-32 border-t border-editorial relative bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-editorial">
          <div className="space-y-3">
            <span className="text-xs font-mono text-terracotta tracking-wider uppercase">
              Projects
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-tight">
              Things I've been building.
            </h2>
          </div>
          <div className="max-w-md space-y-2">
            <p className="text-stone text-sm font-sans leading-relaxed">
              A few side projects and software experiments. Code built to solve actual problems and explore interesting architectures.
            </p>
            <a
              href="https://github.com/Adithyan1809"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-terracotta hover:text-ivory transition-colors uppercase tracking-wider focus:outline-none focus:underline"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Explore GitHub Repositories</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Project Card List */}
        <div className="space-y-6">
          {projectsData.map((project, idx) => {
            const isExpanded = expandedId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`p-6 sm:p-8 rounded-sm border transition-all duration-300 ${
                  isExpanded
                    ? 'bg-charcoal border-terracotta/50 shadow-xl'
                    : 'bg-obsidian-light/60 border-editorial hover:border-terracotta/30'
                }`}
              >
                {/* Collapsed Top Summary */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2.5 max-w-2xl">
                    <div className="flex items-center gap-3 text-xs font-mono">
                      <span className="text-terracotta uppercase tracking-wider font-medium">
                        {project.status === 'Featured' ? 'Featured Project' : 'In Progress'}
                      </span>
                      <span className="w-4 h-[1px] bg-editorial" />
                      <span className="text-stone">{project.timeframe}</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory font-medium tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-stone-light font-light leading-relaxed font-sans">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-sm bg-obsidian/70 border border-editorial-subtle text-stone"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Expand Trigger */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0 shrink-0">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 border border-editorial hover:border-terracotta text-ivory text-xs font-mono uppercase tracking-wider rounded-sm transition-colors focus:outline-none focus:ring-1 focus:ring-terracotta"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-stone" />
                        <span>GitHub Profile</span>
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-ivory text-obsidian text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-ivory-muted transition-colors"
                      >
                        <span>Live Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleExpand(project.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`project-details-${project.id}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-obsidian border border-editorial hover:border-terracotta text-ivory text-xs font-mono uppercase tracking-wider rounded-sm transition-colors focus:outline-none focus:ring-1 focus:ring-terracotta"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'Details'}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-terracotta transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Expanded Deep-Dive Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`project-details-${project.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-editorial-subtle grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-obsidian/70 border border-editorial-subtle rounded-sm">
                          <span className="text-[10px] font-mono text-terracotta uppercase tracking-wider block mb-1.5">
                            The Problem
                          </span>
                          <p className="text-xs sm:text-sm text-stone-light leading-relaxed font-sans font-light">
                            {project.problem}
                          </p>
                        </div>

                        <div className="p-4 bg-obsidian/70 border border-editorial-subtle rounded-sm">
                          <span className="text-[10px] font-mono text-terracotta uppercase tracking-wider block mb-1.5">
                            The Interesting Part
                          </span>
                          <p className="text-xs sm:text-sm text-stone-light leading-relaxed font-sans font-light">
                            {project.challenge}
                          </p>
                        </div>

                        <div className="p-4 bg-obsidian/70 border border-editorial-subtle rounded-sm">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-terracotta uppercase tracking-wider mb-1.5">
                            <Sparkles className="w-3 h-3 text-terracotta" />
                            <span>What I Learned</span>
                          </div>
                          <p className="text-xs sm:text-sm text-stone-light leading-relaxed font-sans font-light">
                            {project.learned || 'Hands-on system design and architecture considerations.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
