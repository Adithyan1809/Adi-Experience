import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { LifestyleGallery } from './components/LifestyleGallery';
import { CurrentlyMe } from './components/CurrentlyMe';
import { SpotifySection } from './components/SpotifySection';
import { Personality } from './components/Personality';
import { PersonalArchive } from './components/PersonalArchive';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollProgress, VerticalNavRail } from './components/ScrollExperience';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-obsidian text-ivory selection:bg-terracotta selection:text-ivory">
      {/* Subtle Analog Film Grain Overlay */}
      <div className="film-grain" aria-hidden="true" />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Main Content Layout */}
      <Navbar />

      {/* Desktop Vertical Section-Navigation Rail */}
      <VerticalNavRail />

      <main>
        <Hero />
        <About />
        <LifestyleGallery />
        <CurrentlyMe />
        <SpotifySection />
        <Personality />
        <PersonalArchive />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
