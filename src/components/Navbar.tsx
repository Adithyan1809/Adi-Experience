import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/personal';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'My World', href: '#lifestyle' },
  { label: 'Currently', href: '#currently' },
  { label: 'Projects', href: '#projects' },
  { label: 'The Fun Stuff', href: '#personality' },
  { label: 'Say Hello', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll detection and active section spying
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['hero', 'about', 'lifestyle', 'currently', 'projects', 'personality', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-obsidian/85 backdrop-blur-md border-b border-editorial py-4 shadow-xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero');
            }}
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-terracotta"
            aria-label="Adi — Back to top"
          >
            <div className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center bg-charcoal group-hover:border-terracotta transition-colors duration-300">
              <span className="font-serif italic text-lg font-medium text-ivory group-hover:text-terracotta transition-colors">
                A
              </span>
            </div>
            <span className="font-serif text-xl tracking-widest font-semibold text-ivory uppercase group-hover:text-ivory-muted transition-colors">
              {personalInfo.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={`text-xs uppercase tracking-wider transition-all duration-300 relative py-1 focus:outline-none focus:text-ivory ${
                    isActive
                      ? 'text-ivory font-medium'
                      : 'text-stone hover:text-ivory'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-terracotta transition-all duration-300" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action / Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#contact');
              }}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider px-4 py-2 rounded-sm border border-terracotta/40 text-ivory hover:bg-terracotta hover:border-terracotta transition-all duration-300 font-medium focus:outline-none focus:ring-1 focus:ring-terracotta"
            >
              <span>Coffee sometime?</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-terracotta hover:text-ivory transition-colors" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-ivory hover:text-terracotta transition-colors focus:outline-none focus:ring-1 focus:ring-terracotta rounded-sm"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl md:hidden transition-all duration-500 flex flex-col justify-between px-8 py-24 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col space-y-6 pt-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-stone">
            Menu
          </span>
          {navLinks.map((link, idx) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`font-serif text-3xl transition-colors flex items-center justify-between border-b border-editorial-subtle pb-3 ${
                  isActive ? 'text-terracotta italic' : 'text-ivory hover:text-terracotta'
                }`}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-stone">0{idx + 1}</span>
              </a>
            );
          })}
        </div>

        {/* Mobile Drawer Footer */}
        <div className="pt-8 border-t border-editorial flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-stone">
            <span>{personalInfo.location}</span>
            <span className="text-terracotta">AI & Engineering</span>
          </div>
          <button
            onClick={() => scrollTo('#contact')}
            className="w-full text-center py-3 bg-terracotta text-ivory font-medium text-xs uppercase tracking-widest rounded-sm mt-2 focus:outline-none focus:ring-2 focus:ring-ivory"
          >
            Say hello
          </button>
        </div>
      </div>
    </>
  );
};
