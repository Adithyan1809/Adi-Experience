import { ArchiveEntry } from '../types';

export const archiveData = {
  heading: 'Things worth remembering.',
  subheading: 'A small collection of quiet milestones, honest observations, and lessons learned along the way.',
  entries: [
    {
      id: 'building-friction',
      title: 'On building things that matter',
      date: 'Autumn 2024',
      category: 'Observation',
      summary: "The hardest part of software isn't the algorithmic complexity; it's caring enough about edge cases to make something feel effortless.",
      content: "Early on, it is tempting to believe that technical novelty is the primary mark of good work. But the most durable tools disappear into the background—they simply eliminate friction and respect the user's attention without demanding applause.",
      tag: 'Craft & Engineering',
      isConfigured: true
    },
    {
      id: 'endurance-habits',
      title: 'Unglamorous consistency',
      date: 'Summer 2024',
      category: 'Lesson',
      summary: 'Showing up when you have zero inspiration is what actually builds stamina over months.',
      content: 'Whether working toward a 5 km continuous run or diagnosing a stubborn distributed systems bug at 1 AM, enthusiasm only lasts forty-eight hours. What carries the rest is quiet, repeatable, stubborn habit.',
      tag: 'Endurance',
      isConfigured: true
    },
    {
      id: 'bangalore-cadence',
      title: 'The Bangalore weather clause',
      date: 'Monsoon 2024',
      category: 'Discovery',
      summary: 'Every outdoor plan in this city is strictly provisional until four in the afternoon.',
      content: 'Learning to pivot when a sudden afternoon shower turns roads into waterways is Bangalore’s unofficial initiation. It turns out to be a solid reminder that spontaneous detours often make for much better stories anyway.',
      tag: 'Life in Bangalore',
      isConfigured: true
    }
  ] as ArchiveEntry[]
};
