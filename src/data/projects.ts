import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'wellnest',
    title: 'WellNest',
    role: 'Creator & Builder',
    timeframe: '2024',
    description: 'A simple, quiet web sanctuary for daily journaling and mindful check-ins without sensory overload.',
    story: 'Built it because most self-care apps felt like they were screaming at me with notifications and paid subscriptions just to breathe. The challenge was keeping the UI stripped-back, calm, and distraction-free while still feeling warm.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Wellness'],
    demoUrl: 'https://www.adithyanp.me/',
    repoUrl: 'https://github.com/Adithyan1809',
    status: 'Featured'
  },
  {
    id: 'resumepilot',
    title: 'ResumePilot',
    role: 'AI Builder',
    timeframe: '2024',
    description: 'An AI tool that provides actual structural critiques on resumes rather than just counting keyword matches.',
    story: 'Job hunting is stressful enough without guessing what automated screeners see. I built this to test LLMs on giving contextual, actionable feedback that sounds like an honest mentor rather than a robotic keyword counter.',
    tags: ['Python', 'LLMs', 'FastAPI', 'NLP'],
    demoUrl: undefined, // In progress
    repoUrl: 'https://github.com/Adithyan1809',
    status: 'Featured'
  },
  {
    id: 'project-iris',
    title: 'Project IRIS',
    role: 'Developer',
    timeframe: '2023 — 2024',
    description: 'A computer vision facial recognition platform built for fast, automated classroom attendance.',
    story: 'Built to kill the 15-minute manual roll call ritual. The fun technical challenge was getting lightweight CNN models to verify faces in real-time under uneven campus lighting without lagging on consumer hardware.',
    tags: ['Python', 'OpenCV', 'PyTorch', 'Computer Vision'],
    demoUrl: undefined,
    repoUrl: 'https://github.com/Adithyan1809',
    status: 'Prototype'
  }
];
