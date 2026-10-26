import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'wellnest',
    title: 'WellNest',
    role: 'Full Stack Builder',
    timeframe: 'Side Project',
    description: 'A mental wellness web application providing daily reflection, mood journaling, and grounding tools without sensory overload.',
    problem: 'Many wellness apps feel cluttered with notifications and ads. I wanted to build a clean, quiet space focused purely on intentional check-ins.',
    challenge: 'Architecting a lightweight, calm React interface paired with a Django REST backend and MongoDB for flexible journaling storage.',
    learned: 'Designing calming UI states and managing cross-stack state between Django and React.',
    tags: ['React', 'Django', 'MongoDB', 'REST APIs'],
    demoUrl: undefined,
    repoUrl: 'https://github.com/Adithyan1809',
    status: 'Featured'
  },
  {
    id: 'project-iris',
    title: 'Project IRIS',
    role: 'Computer Vision & AI Developer',
    timeframe: 'Applied AI Project',
    description: 'A real-time facial-recognition platform built for institutional attendance and identity verification across live video streams.',
    problem: 'Manual roll-call is time-consuming and unreliable. I wanted to explore low-latency, real-time facial detection and recognition at scale.',
    challenge: 'Optimizing computer vision pipelines to handle concurrent camera feeds with anti-spoofing verification under uneven campus lighting.',
    learned: 'Handling concurrent video frame buffers and optimizing inference latency under resource constraints.',
    tags: ['Python', 'OpenCV', 'PyTorch', 'Computer Vision'],
    demoUrl: undefined,
    repoUrl: 'https://github.com/Adithyan1809',
    status: 'Featured'
  },
  {
    id: 'resumepilot',
    title: 'ResumePilot',
    role: 'AI Engineer',
    timeframe: 'AI Intelligence Project',
    description: 'An AI-powered career platform that analyzes resumes, maps skills, and offers structured narrative critiques.',
    problem: 'Applicants often face opaque applicant tracking systems without actionable feedback on how their experience is actually perceived.',
    challenge: 'Structuring multi-stage LLM analysis pipelines to evaluate contextual impact and role alignment rather than naive keyword counting.',
    learned: 'Prompt chaining, deterministic schema validation, and structured extraction from semi-structured PDF text.',
    tags: ['Python', 'LLM Pipelines', 'FastAPI', 'NLP'],
    demoUrl: undefined,
    repoUrl: 'https://github.com/Adithyan1809',
    status: 'In Progress'
  }
];
