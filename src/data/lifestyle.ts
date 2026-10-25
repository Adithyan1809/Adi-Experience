import { LifestyleItem } from '../types';

export const lifestyleItems: LifestyleItem[] = [
  {
    id: 'everyday',
    title: 'Workspace',
    category: 'Everyday',
    caption: 'My desk when I actually have it together.',
    imagePath: '/images/lifestyle-1.jpg',
    aspect: 'portrait',
    placeholderHint: 'Desk setup, notebook or laptop moment',
    locationTag: 'Bangalore'
  },
  {
    id: 'fitness',
    title: 'Gym',
    category: 'Fitness',
    caption: 'Lifting heavy things to keep the mental static at bay.',
    imagePath: '/images/lifestyle-2.jpg',
    aspect: 'square',
    placeholderHint: 'Gym or training session snapshot',
    locationTag: 'Morning Routine'
  },
  {
    id: 'cafes',
    title: 'Cold Brews',
    category: 'Cafés',
    caption: 'Hunting for Bangalore’s best cold brew. Open to recommendations.',
    imagePath: '/images/lifestyle-3.jpg',
    aspect: 'landscape',
    placeholderHint: 'Coffee cup, pour-over or café table',
    locationTag: 'Indiranagar'
  },
  {
    id: 'exploration',
    title: 'City Walks',
    category: 'Exploration',
    caption: 'Church Street on a Sunday afternoon.',
    imagePath: '/images/lifestyle-4.jpg',
    aspect: 'landscape',
    placeholderHint: 'Church Street or Bangalore canopy',
    locationTag: 'Central Bangalore'
  },
  {
    id: 'style',
    title: 'Off-Duty',
    category: 'Style',
    caption: 'Dressing slightly above “computer science student”.',
    imagePath: '/images/lifestyle-5.jpg',
    aspect: 'portrait',
    placeholderHint: 'Personal style snapshot or portrait',
    locationTag: 'Weekend Fit'
  },
  {
    id: 'moments',
    title: 'Dusk',
    category: 'Moments',
    caption: 'Bangalore sky doing its golden hour thing.',
    imagePath: '/images/lifestyle-6.jpg',
    aspect: 'square',
    placeholderHint: 'Sunset sky or quiet evening view',
    locationTag: 'Golden Hour'
  }
];
