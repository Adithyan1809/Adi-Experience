import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: 'portrait' | 'landscape' | 'square' | 'hero';
  caption?: string;
  badge?: string;
  category?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  aspect = 'portrait',
  caption,
  badge,
  category,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Map aspect to Tailwind classes
  const aspectClass = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/10]',
    square: 'aspect-square',
    hero: 'aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4]',
  }[aspect];

  return (
    <div
      className={`relative overflow-hidden bg-charcoal border border-editorial group transition-all duration-700 ${aspectClass} ${className}`}
    >
      {/* Real image tag if not errored */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Editorial Intentional Fallback Card (shown if image missing or still loading) */}
      {(hasError || !isLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-b from-[#242424] via-[#1a1a1a] to-[#141414] transition-opacity duration-500 ${
            hasError ? 'opacity-100' : isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Subtle crosshair framing markers */}
          <div className="absolute top-3 left-3 text-stone-dark text-xs font-mono select-none">+</div>
          <div className="absolute top-3 right-3 text-stone-dark text-xs font-mono select-none">+</div>
          <div className="absolute bottom-3 left-3 text-stone-dark text-xs font-mono select-none">+</div>
          <div className="absolute bottom-3 right-3 text-stone-dark text-xs font-mono select-none">+</div>

          {/* Top meta */}
          <div className="flex items-center justify-between w-full z-10">
            <span className="text-[10px] uppercase tracking-widest text-stone font-mono">
              {category || 'Editorial Plate'}
            </span>
            {badge && (
              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-terracotta/20 text-terracotta border border-terracotta/30">
                {badge}
              </span>
            )}
          </div>

          {/* Center visual monogram & editorial seal */}
          <div className="my-auto flex flex-col items-center justify-center text-center py-4 z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-ivory/15 flex items-center justify-center mb-4 bg-obsidian/40 backdrop-blur-sm group-hover:border-terracotta/40 transition-colors">
              <span className="font-serif italic text-3xl sm:text-4xl text-ivory/80 group-hover:text-ivory transition-colors">
                A
              </span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-ivory/90 font-medium px-4 leading-snug">
              {alt}
            </h4>
            <p className="text-xs text-stone mt-1.5 max-w-[260px] font-sans">
              {caption || 'A quiet, unhurried moment captured in Bangalore.'}
            </p>
          </div>

          {/* Bottom metadata */}
          <div className="flex items-end justify-between w-full pt-4 border-t border-editorial-subtle z-10">
            <div className="flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-widest text-stone/70">
                FRAME // 35MM NOIR
              </span>
              <span className="text-[10px] text-ivory/60 font-sans">
                {src.replace(/^\//, '')}
              </span>
            </div>
            <span className="text-[9px] font-mono text-terracotta/80 tracking-wide uppercase">
              REPLACEABLE ASSET
            </span>
          </div>

          {/* Subtle noise grain inside fallback */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F2EBDD_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>
      )}

      {/* Hover lighting vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />
    </div>
  );
};
