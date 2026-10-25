import { LifestyleItem } from '../types';

export const lifestyleItems: LifestyleItem[] = [
  {
    id: 'everyday',
    title: 'Workspace',
    category: 'Everyday',
    caption: 'My desk setup when I actually keep it tidy.',
    imagePath: '/images/lifestyle-1.jpg',
    aspect: 'portrait',
    hasRealPhoto: false, // Set to true once you add your photo to public/images/lifestyle-1.jpg
    locationTag: 'Desk Setup',
    isConfigured: true
  },
  {
    id: 'fitness',
    title: 'Gym',
    category: 'Fitness',
    caption: 'Consistent lifting splits and working toward running 5 km.',
    imagePath: '/images/lifestyle-2.jpg',
    aspect: 'square',
    hasRealPhoto: false, // Set to true once you add your photo to public/images/lifestyle-2.jpg
    locationTag: 'Training',
    isConfigured: true
  },
  {
    id: 'cafes',
    title: 'Coffee',
    category: 'Cafés',
    caption: 'Taking a screen break with a solid brew.',
    imagePath: '/images/lifestyle-3.jpg',
    aspect: 'landscape',
    hasRealPhoto: false, // Set to true once you add your photo to public/images/lifestyle-3.jpg
    locationTag: 'Bangalore',
    isConfigured: true
  },
  {
    id: 'exploration',
    title: 'City Walk',
    category: 'Exploration',
    caption: 'An afternoon walk around town to clear my head.',
    imagePath: '/images/lifestyle-4.jpg',
    aspect: 'landscape',
    hasRealPhoto: false, // Set to true once you add your photo to public/images/lifestyle-4.jpg
    locationTag: 'Bangalore',
    isConfigured: true
  },
  {
    id: 'style',
    title: 'Off-Duty',
    category: 'Style',
    caption: 'Dressing slightly above “computer science student”.',
    imagePath: '/images/lifestyle-5.jpg',
    aspect: 'portrait',
    hasRealPhoto: false, // Set to true once you add your photo to public/images/lifestyle-5.jpg
    locationTag: 'Weekend',
    isConfigured: true
  },
  {
    id: 'moments',
    title: 'Evening',
    category: 'Moments',
    caption: 'Bangalore sky doing its golden hour thing.',
    imagePath: '/images/lifestyle-6.jpg',
    aspect: 'square',
    hasRealPhoto: false, // Set to true once you add your photo to public/images/lifestyle-6.jpg
    locationTag: 'Golden Hour',
    isConfigured: true
  }
];
