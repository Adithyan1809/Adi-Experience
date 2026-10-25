import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { LifestyleGallery } from './components/LifestyleGallery';
import { CurrentlyMe } from './components/CurrentlyMe';
import { Personality } from './components/Personality';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-obsidian text-ivory selection:bg-terracotta selection:text-ivory">
      {/* Subtle Analog Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Main Content Layout */}
      <Navbar />

      <main>
        <Hero />
        <About />
        <LifestyleGallery />
        <CurrentlyMe />
        <Personality />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
