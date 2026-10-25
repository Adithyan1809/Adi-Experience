export interface PersonalInfo {
  name: string;
  fullName: string;
  role: string;
  specialization: string;
  location: string;
  tagline: string;
  heroHeadline: string;
  heroSupporting: string;
  links: {
    website: string;
    github: string;
    linkedin: string;
    instagram?: string;
    email?: string;
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
  placeholderHint: string;
  locationTag?: string;
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
  story: string;
  tags: string[];
  imagePath?: string;
  demoUrl?: string;
  repoUrl?: string;
  status: 'Live' | 'In Progress' | 'Prototype' | 'Featured';
}

export interface PersonalityPrompt {
  id: string;
  question: string;
  answer: string;
  tagline: string;
  category: 'Lifestyle' | 'Dating' | 'Quirk' | 'Deep Dive';
  icon: string;
}

export interface AdventureVersion {
  id: 'curious' | 'chaotic' | 'softie';
  title: string;
  tagline: string;
  vibe: string;
  badge: string;
  description: string;
  highlightPoints: string[];
  suggestedTopic: string;
}

export interface DateIdea {
  id: string;
  title: string;
  location: string;
  vibe: string;
  description: string;
  tag: string;
  duration: string;
}

export interface FavoriteItem {
  title: string;
  artistOrAuthor?: string;
  categoryTag: string;
  note: string;
  link?: string;
}

export interface FavoriteGroup {
  category: string;
  description: string;
  icon: string;
  items: FavoriteItem[];
}
