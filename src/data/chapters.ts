export interface SectionTarget {
  id: string;
  number: string;
  title: string;
}

export const chapters: SectionTarget[] = [
  { id: 'hero', number: '01', title: 'Intro' },
  { id: 'about', number: '02', title: 'About' },
  { id: 'lifestyle', number: '03', title: 'Cadence' },
  { id: 'currently', number: '04', title: 'Lately' },
  { id: 'music-room', number: '05', title: 'Listening' },
  { id: 'personality', number: '06', title: 'Little Things' },
  { id: 'archive', number: '07', title: 'Archive' },
  { id: 'projects', number: '08', title: 'Work' },
  { id: 'contact', number: '09', title: 'Say Hello' }
];

export const chapterIds: string[] = chapters.map((c) => c.id);
