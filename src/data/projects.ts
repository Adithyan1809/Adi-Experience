import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'wellnest',
    title: 'WellNest',
    role: 'Creator & Full Stack Lead',
    timeframe: '2024 — Present',
    description: 'A thoughtful mental wellness platform designed to provide calm digital sanctuaries, mood journaling, and guided mindfulness tools without sensory overload.',
    story: 'Born from noticing how overwhelming modern self-care apps have become. WellNest simplifies emotional check-ins, provides grounding exercises, and pairs users with structured self-reflection prompts that respect their mental space.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Mental Wellness'],
    demoUrl: 'https://www.adithyanp.me/', // Verified personal domain
    repoUrl: 'https://github.com/Adithyan1809', // Main GitHub profile
    status: 'Featured'
  },
  {
    id: 'resumepilot',
    title: 'ResumePilot',
    role: 'AI Engineer & Builder',
    timeframe: '2024',
    description: 'An AI-powered career intelligence engine that analyzes resumes, maps skills to dynamic market requirements, and gives actionable structural critiques.',
    story: 'Most resume checkers simply keyword-stuff. ResumePilot uses semantic embeddings and tailored LLM prompts to understand contextual impact, phrasing precision, and career progression narrative.',
    tags: ['Python', 'OpenAI / Gemini API', 'FastAPI', 'Vector Search', 'NLP'],
    demoUrl: undefined, // Non-clickable placeholder / Private preview
    repoUrl: 'https://github.com/Adithyan1809',
    status: 'Featured'
  },
  {
    id: 'project-iris',
    title: 'Project IRIS',
    role: 'Computer Vision Developer',
    timeframe: '2023 — 2024',
    description: 'A high-accuracy, edge-optimized facial recognition attendance and identity verification system built for real-time institutional environments.',
    story: 'Designed to eliminate slow queues and manual logging. IRIS leverages lightweight CNN models, liveness verification to prevent spoofing, and resilient pipeline caching for seamless campus operations.',
    tags: ['Python', 'OpenCV', 'PyTorch', 'Facial Recognition', 'Edge Computing'],
    demoUrl: undefined,
    repoUrl: 'https://github.com/Adithyan1809',
    status: 'Live'
  },
  {
    id: 'neural-canvas',
    title: 'Cognitive Canvas',
    role: 'Creator & Researcher',
    timeframe: '2024',
    description: 'Experimental interactive sandbox exploring autonomous multi-agent reasoning, dynamic graph orchestration, and real-time LLM memory retrieval.',
    story: 'An experimental playground where multiple specialized AI agents debate, collaborate, and synthesize solutions to complex open-ended problems.',
    tags: ['AI Agents', 'LangGraph', 'TypeScript', 'Vector Databases'],
    demoUrl: undefined,
    repoUrl: 'https://github.com/Adithyan1809',
    status: 'Prototype'
  }
];
