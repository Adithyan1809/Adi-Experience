import React, { useState } from 'react';
import { Camera } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: 'portrait' | 'landscape' | 'square' | 'hero';
  caption?: string;
  badge?: string;
  category?: string;
  hasRealPhoto?: boolean;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  aspect = 'portrait',
  caption,
  badge,
  category,
  hasRealPhoto = false,
}) => {
  const [loadError, setLoadError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Map aspect to Tailwind classes
  const aspectClass = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/10]',
    square: 'aspect-square',
    hero: 'aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4]',
  }[aspect];

  // If user has supplied their genuine photo, attempt to load it
  if (hasRealPhoto && !loadError) {
    return (
      <div
        className={`relative overflow-hidden bg-charcoal border border-editorial group transition-all duration-700 ${aspectClass} ${className}`}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setLoadError(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />
      </div>
    );
  }

  // Tasteful, intentional editorial artwork plate (clearly a temporary graphic, not pretending to be a photograph of Adi)
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b from-[#242424] via-[#1c1c1c] to-[#161616] border border-editorial group transition-all duration-500 ${aspectClass} ${className}`}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
        {/* Corner framing marks */}
        <div className="absolute top-3 left-3 text-stone-dark text-xs font-mono select-none">+</div>
        <div className="absolute top-3 right-3 text-stone-dark text-xs font-mono select-none">+</div>
        <div className="absolute bottom-3 left-3 text-stone-dark text-xs font-mono select-none">+</div>
        <div className="absolute bottom-3 right-3 text-stone-dark text-xs font-mono select-none">+</div>

        {/* Top meta */}
        <div className="flex items-center justify-between w-full z-10">
          <span className="text-[10px] uppercase tracking-wider text-stone font-mono">
            {category || 'Visual Frame'}
          </span>
          {badge && (
            <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-charcoal text-stone-light border border-editorial">
              {badge}
            </span>
          )}
        </div>

        {/* Center monogram & title */}
        <div className="my-auto flex flex-col items-center justify-center text-center py-4 z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-ivory/15 flex items-center justify-center mb-4 bg-obsidian/40 backdrop-blur-sm group-hover:border-terracotta/40 transition-colors">
            {aspect === 'hero' ? (
              <span className="font-serif italic text-3xl sm:text-4xl text-ivory/80 group-hover:text-terracotta transition-colors">
                A
              </span>
            ) : (
              <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-stone group-hover:text-terracotta transition-colors" />
            )}
          </div>
          <h4 className="font-serif text-lg sm:text-xl text-ivory/90 font-medium px-4 leading-snug">
            {alt}
          </h4>
          <p className="text-xs text-stone mt-1.5 max-w-[260px] font-sans">
            {caption || 'A snapshot from daily life in Bangalore.'}
          </p>
        </div>

        {/* Bottom indicator */}
        <div className="flex items-center justify-between w-full pt-4 border-t border-editorial-subtle z-10 text-[10px] font-mono text-stone">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta/70" />
            <span>Visual Frame</span>
          </div>
          <span className="text-stone/70">Bangalore</span>
        </div>

        {/* Subtle noise pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F2EBDD_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
    </div>
  );
};
