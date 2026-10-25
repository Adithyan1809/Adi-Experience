import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { LifestyleGallery } from './components/LifestyleGallery';
import { CurrentlyMe } from './components/CurrentlyMe';
import { Projects } from './components/Projects';
import { Personality } from './components/Personality';
import { AdventureSelector } from './components/AdventureSelector';
import { DateGenerator } from './components/DateGenerator';
import { Favorites } from './components/Favorites';
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
        <Projects />
        <Personality />
        <AdventureSelector />
        <DateGenerator />
        <Favorites />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
