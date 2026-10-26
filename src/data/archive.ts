import { ArchiveEntry } from '../types';

/**
 * Personal Archive: "Things worth remembering."
 *
 * Each entry can be enabled or disabled with `isConfigured: true | false`.
 * Dates, categories, tags, and extended content are entirely optional.
 * Only configured entries with valid titles and summaries are rendered publicly.
 */
export const archiveData = {
  heading: 'Things worth remembering.',
  subheading: 'A small, quiet collection of observations and notes kept along the way.',
  entries: [
    {
      id: 'simplicity-over-bloat',
      title: 'On simplicity over bloat',
      category: 'Observation',
      summary: 'Simple tools with five features done exceptionally well beat bloated products with fifty half-baked features every single time.',
      content: 'The hardest part of building software is rarely the raw complexity; it is having the restraint to remove friction and respect the user’s attention rather than constantly demanding applause.',
      tag: 'Engineering Craft',
      isConfigured: true
    },
    {
      id: 'archive-entry-2',
      title: '',
      category: '',
      date: '',
      summary: '',
      content: '',
      tag: '',
      isConfigured: false
    },
    {
      id: 'archive-entry-3',
      title: '',
      category: '',
      date: '',
      summary: '',
      content: '',
      tag: '',
      isConfigured: false
    }
  ] as ArchiveEntry[]
};
