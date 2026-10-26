export interface PersonalInfo {
  name: string;
  fullName: string;
  role: string;
  college: string;
  specialization: string;
  location: string;
  tagline: string;
  heroHeadline: string;
  heroSupporting: string;
  heroPhoto: {
    src: string;
    hasRealPhoto: boolean;
    alt: string;
    caption: string;
  };
  links: {
    website: string;
    github: string;
    linkedin: string;
    instagram?: string;
    email: string;
  };
}

export interface AboutFact {
  label: string;
  value: string;
  isEditable?: boolean;
}

export interface LifestyleItem {
  id: string;
  title: string;
  category: 'Everyday' | 'Fitness' | 'Cafés' | 'Exploration' | 'Style' | 'Moments';
  caption: string;
  imagePath: string;
  aspect: 'portrait' | 'landscape' | 'square';
  hasRealPhoto: boolean;
  locationTag?: string;
  isConfigured?: boolean;
}

export interface CurrentlyItem {
  id: string;
  label: string;
  value: string;
  detail: string;
  iconName: 'book-open' | 'code' | 'headphones' | 'tv' | 'dumbbell' | 'sparkles';
  updatedAt?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  timeframe: string;
  description: string;
  problem: string;
  challenge: string;
  learned?: string;
  tags: string[];
  imagePath?: string;
  demoUrl?: string;
  repoUrl?: string;
  status: 'Live' | 'In Progress' | 'Prototype' | 'Featured';
}

export interface ResearchItem {
  title: string;
  venue: string;
  status: string;
  description: string;
}

export interface PersonalityPrompt {
  id: string;
  question: string;
  answer: string;
  tagline: string;
  category: 'Lifestyle' | 'Quirk' | 'Deep Dive' | 'Curiosity' | 'Observation';
  icon: string;
  isConfigured?: boolean;
}

export interface MusicTrackConfig {
  title: string;
  artist: string;
  src: string;
  defaultVolume: number; // 0.0 to 1.0
}
