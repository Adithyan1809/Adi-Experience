import {
  PersonalInfo,
  AboutFact,
  CurrentlyItem,
  PersonalityPrompt,
  ResearchItem,
  MusicTrackConfig
} from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Adi',
  fullName: 'Adithyan Prakash',
  role: 'AI/ML Engineering Student & Builder',
  college: 'Dayananda Sagar Academy of Technology & Management',
  specialization: 'Artificial Intelligence & Machine Learning',
  location: 'Bangalore, India',
  tagline: 'A little bit of code. A little bit of chaos.',
  heroHeadline: 'A little bit of code.\nA little bit of chaos.',
  heroSupporting: "I'm Adi, an AI/ML engineering student in Bangalore. I like building things, going down the occasional rabbit hole, and trying to keep life bigger than a screen.",
  heroPhoto: {
    src: '/images/hero.jpg',
    // Set to true once you place your genuine portrait in public/images/hero.jpg
    hasRealPhoto: false,
    alt: 'Portrait of Adi',
    caption: 'AI/ML student at DSATM, Bangalore'
  },
  links: {
    website: 'https://www.adithyanp.me/',
    github: 'https://github.com/Adithyan1809',
    linkedin: 'https://www.linkedin.com/in/adithyan-prakash/',
    // Add your Instagram profile URL here when ready to publish:
    instagram: '',
    email: 'contact@adithyanp.me'
  }
};

export const musicConfig: MusicTrackConfig = {
  title: 'Ambient Theme',
  artist: 'Original Instrumental',
  src: '/audio/adi-theme.mp3',
  defaultVolume: 0.18
};

export const aboutData = {
  heading: "So, who am I when my laptop's closed?",
  subheading: "A few genuine details behind the terminal and the projects.",
  introParagraphs: [
    "I'm Adi, an engineering student at Dayananda Sagar Academy of Technology & Management in Bangalore, specializing in Artificial Intelligence and Machine Learning. I like building practical software, exploring data engineering and cloud systems, and turning technical concepts into products that actually work.",
    "Outside the screen, I care about fitness, gym training, and consistent self-improvement. There is usually an occasional curiosity rabbit hole, and plenty I'm still figuring out like everyone else."
  ],
  focusAreas: [
    {
      title: 'AI & Data Engineering',
      description: 'Interested in real-time machine learning, data pipelines, Big Data, and cloud infrastructure.'
    },
    {
      title: 'Gym & Consistency',
      description: 'Treating daily training and physical routines as anchors for focus, stamina, and mental clarity.'
    },
    {
      title: 'Practical Software',
      description: 'Building tools that solve real human friction rather than just writing code for the sake of it.'
    }
  ],
  researchHighlight: {
    title: 'AI-Based Emergency Mustering',
    venue: 'Paper Submitted to IEEE',
    status: 'Co-Author',
    description: 'Researched real-time computer vision and personnel tracking algorithms for rapid post-incident facility accountability.'
  } as ResearchItem,
  facts: [
    { label: 'Location', value: 'Bangalore, India', isEditable: false },
    { label: 'Education', value: 'DSATM (B.E. in AI & ML)', isEditable: false },
    { label: 'Experience', value: 'Technical Lead Intern at SMAP Technologies', isEditable: false },
    { label: 'Current Focus', value: 'AI/ML, Data Systems & Cloud', isEditable: false },
    { label: 'Fitness Goal', value: 'Running 5 km continuously', isEditable: true }
  ] as AboutFact[]
};

export const currentlyItems: CurrentlyItem[] = [
  {
    id: 'building',
    label: 'Currently Building',
    value: 'Practical AI & Web Prototypes',
    detail: 'Refining WellNest and exploring real-time agent architectures.',
    iconName: 'code'
  },
  {
    id: 'learning',
    label: 'Currently Learning',
    value: 'Data Systems & Cloud Architectures',
    detail: 'Deepening hands-on skills across Big Data pipelines, distributed processing, and cloud deployment.',
    iconName: 'book-open'
  },
  {
    id: 'fitness',
    label: 'Current Fitness Goal',
    value: 'Running 5 km continuously',
    detail: 'Building aerobic endurance alongside regular gym training splits.',
    iconName: 'dumbbell'
  },
  {
    id: 'projects',
    label: 'Next Milestone',
    value: 'Shipping open-source tools',
    detail: 'Documenting and publishing clean repositories for recent engineering projects.',
    iconName: 'sparkles'
  }
];

export const personalityPrompts: PersonalityPrompt[] = [
  {
    id: 'harmless-habit',
    question: 'A harmless habit of mine',
    answer: "I will open 14 browser tabs of articles I swear I'm going to read over the weekend, leave them open for two weeks, and then quietly close them all without reading a single word.",
    tagline: 'Guilty of optimistic tab hoarding',
    category: 'Quirk',
    icon: 'AlertCircle',
    isConfigured: true
  },
  {
    id: 'rabbit-holes',
    question: 'What gets me down a multi-hour rabbit hole',
    answer: "Understanding how complex systems work under the hood — whether that's distributed database architectures, how movie soundtracks are mixed, or why a specific piece of software feels delightfully snappy.",
    tagline: 'Fascinated by how things tick',
    category: 'Curiosity',
    icon: 'Compass',
    isConfigured: true
  },
  {
    id: 'talk-for-hours',
    question: 'Something I could talk about for hours',
    answer: 'Emerging AI systems, why certain film scores hit you right in the chest, or whatever weird engineering bug kept me up until 2 AM.',
    tagline: 'Deep dives and good conversation',
    category: 'Deep Dive',
    icon: 'MessageSquare',
    isConfigured: true
  },
  {
    id: 'opinion-defend',
    question: "An opinion I'm happy to defend",
    answer: 'Simple software with five features done exceptionally well beats bloated products with fifty half-baked features every single time. Also, honest filter coffee beats overpriced café syrups.',
    tagline: 'Simplicity over bloat',
    category: 'Lifestyle',
    icon: 'Coffee',
    isConfigured: true
  },
  {
    id: 'slow-afternoon',
    question: 'My kind of slow afternoon',
    answer: 'Grabbing a solid coffee, browsing second-hand bookstores or walking through a leafy corner of Bangalore with zero rush, and having an unhurried conversation.',
    tagline: 'Unhurried and grounded',
    category: 'Lifestyle',
    icon: 'Sun',
    isConfigured: true
  },
  {
    id: 'three-small-things',
    question: 'Three small things that make my day better',
    answer: '1. When code compiles on the first try.\n2. Bangalore weather right after a sudden afternoon shower.\n3. Finding a great instrumental track on loop while working.',
    tagline: 'The quiet daily wins',
    category: 'Observation',
    icon: 'Smile',
    isConfigured: true
  },
  {
    id: 'plan-rarely-turn-down',
    question: 'A plan I rarely turn down',
    answer: "Exploring a neighborhood spot I've never visited, trying street food or an unfamiliar café, and laughing when spontaneous plans take an unexpected detour.",
    tagline: 'Always up for spontaneous exploration',
    category: 'Observation',
    icon: 'Sparkles',
    isConfigured: true
  }
];
