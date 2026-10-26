import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export interface SectionTarget {
  id: string;
  number: string;
  title: string;
}

const chapters: SectionTarget[] = [
  { id: 'hero', number: '01', title: 'Intro' },
  { id: 'about', number: '02', title: 'About' },
  { id: 'lifestyle', number: '03', title: 'Cadence' },
  { id: 'currently', number: '04', title: 'Lately' },
  { id: 'music-room', number: '05', title: 'Listening' },
  { id: 'personality', number: '06', title: 'Little Things' },
  { id: 'archive', number: '07', title: 'Archive' },
  { id: 'projects', number: '08', title: 'Work' },
  { id: 'contact', number: '09', title: 'Say Hello' }
];

/**
 * Slim Top Scroll Progress Bar
 */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-charcoal/40"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-terracotta via-terracotta to-ivory origin-left shadow-[0_0_10px_rgba(166,75,66,0.6)]"
        style={{ scaleX }}
      />
    </div>
  );
};

/**
 * Desktop Vertical Section-Navigation Rail
 */
export const VerticalNavRail: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Active section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 select-none"
      aria-label="Section chapters"
    >
      <div className="flex flex-col items-center gap-3 py-3 px-2 rounded-full bg-obsidian/75 backdrop-blur-md border border-editorial shadow-2xl">
        {chapters.map((chapter) => {
          const isActive = activeSection === chapter.id;
          const isHovered = hoveredSection === chapter.id;

          return (
            <div
              key={chapter.id}
              className="relative flex items-center justify-center group"
              onMouseEnter={() => setHoveredSection(chapter.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              {/* Tooltip Label (Floats to the left) */}
              <div
                className={`absolute right-8 px-2.5 py-1 rounded-sm bg-charcoal/95 border border-editorial shadow-xl text-[10px] font-mono uppercase tracking-wider text-ivory whitespace-nowrap pointer-events-none transition-all duration-200 ${
                  isHovered || (isActive && false)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-1'
                }`}
                aria-hidden="true"
              >
                <span className="text-terracotta mr-1.5">{chapter.number}</span>
                <span>{chapter.title}</span>
              </div>

              {/* Navigation Dot Button */}
              <button
                type="button"
                onClick={() => scrollToSection(chapter.id)}
                aria-label={`Jump to chapter ${chapter.number}: ${chapter.title}`}
                aria-current={isActive ? 'step' : undefined}
                className={`relative flex items-center justify-center p-1 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                  isActive ? 'scale-110' : 'hover:scale-110'
                }`}
              >
                {/* Visual marker */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2 h-4 bg-terracotta shadow-[0_0_8px_rgba(166,75,66,0.8)]'
                      : 'w-1.5 h-1.5 bg-stone/40 hover:bg-ivory'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
