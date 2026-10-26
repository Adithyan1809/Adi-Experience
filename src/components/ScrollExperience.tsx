import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { chapters, chapterIds } from '../data/chapters';

/**
 * Reusable IntersectionObserver-based Active Section Hook
 */
export const useActiveSection = (sectionIds: string[], defaultSection = 'hero'): string => {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    // Fast boundary check helper for extreme top and bottom of the page
    const checkScrollEdges = (): boolean => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY < 80) {
        setActiveSection(sectionIds[0] || defaultSection);
        return true;
      }
      if (scrollY + windowHeight >= documentHeight - 60) {
        setActiveSection(sectionIds[sectionIds.length - 1] || defaultSection);
        return true;
      }
      return false;
    };

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        // Respect top and bottom boundaries first
        if (checkScrollEdges()) return;

        let bestId = '';
        let highestRatio = 0;

        ratios.forEach((ratio, id) => {
          if (ratio > highestRatio) {
            highestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId && highestRatio > 0.05) {
          setActiveSection((prev) => (prev === bestId ? prev : bestId));
        }
      },
      {
        root: null,
        // Focus observation on the reading zone (middle 45% of viewport)
        rootMargin: '-20% 0px -35% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    const onScroll = () => {
      checkScrollEdges();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    checkScrollEdges();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [sectionIds, defaultSection]);

  return activeSection;
};

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
  const activeSection = useActiveSection(chapterIds, 'hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="hidden lg:flex fixed right-3 xl:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 select-none"
      aria-label="Chapter navigation"
    >
      <div className="flex flex-col items-center gap-3 py-3 px-1.5 rounded-full bg-obsidian/85 backdrop-blur-md border border-editorial shadow-2xl">
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
              {/* Tooltip Label (Floats to the left, only visible when hovered/focused) */}
              <div
                className={`absolute right-9 px-2.5 py-1 rounded-sm bg-charcoal/95 border border-editorial shadow-2xl text-[10px] font-mono uppercase tracking-wider text-ivory whitespace-nowrap pointer-events-none transition-all duration-200 z-50 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1'
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
                onFocus={() => setHoveredSection(chapter.id)}
                onBlur={() => setHoveredSection(null)}
                aria-label={`Jump to chapter ${chapter.number}: ${chapter.title}`}
                aria-current={isActive ? 'step' : undefined}
                className={`relative flex items-center justify-center p-1 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta ${
                  isActive ? 'scale-110' : 'hover:scale-110'
                }`}
              >
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
