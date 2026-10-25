import {
  PersonalInfo,
  AboutFact,
  CurrentlyItem,
  PersonalityPrompt,
  AdventureVersion,
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
  heroSupporting: 'AI/ML engineering student in Bangalore, usually building something, learning something, or trying to be a little more consistent at both.',
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
    id: 'talk-for-hours',
    question: 'Something I could talk about for hours',
    answer: 'Emerging AI systems, why certain movie scores hit you right in the chest, or whatever weird engineering problem kept me up until 2 AM.',
    tagline: 'Rabbit holes guaranteed',
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
    id: 'weekend-style',
    question: 'My kind of weekend',
    answer: 'Waking up without an alarm, a solid gym workout, tinkering with a side project, and taking an unhurried walk in the evening without watching the clock.',
    tagline: 'Unrushed and grounding',
    category: 'Lifestyle',
    icon: 'Sun',
    isConfigured: true
  },
  {
    id: 'three-small-things',
    question: 'Three small things that make my day better',
    answer: '1. When code compiles on the first try.\n2. Bangalore weather right after a sudden afternoon shower.\n3. Finding a great instrumental track on loop while working.',
    tagline: 'The quiet daily wins',
    category: 'Lifestyle',
    icon: 'Smile',
    isConfigured: true
  },
  {
    id: 'first-date',
    question: 'A first-date idea I genuinely enjoy',
    answer: 'Grabbing good coffee, walking around an interesting part of town with zero rush, and laughing at something completely stupid.',
    tagline: 'Low pressure, natural conversation',
    category: 'Dating',
    icon: 'Sparkles',
    isConfigured: true
  }
];

export const adventureVersions: AdventureVersion[] = [
  {
    id: 'curious',
    title: 'The Curious One',
    tagline: "Deep conversations, rabbit holes, and 'wait, how does that work?'",
    vibe: 'Inquisitive & thoughtful',
    badge: 'Curious',
    description: "The side that gets genuinely fascinated by how complex systems work under the hood, reads technical deep-dives, and will ask you questions about your most obscure interests.",
    highlightPoints: [
      'Loves understanding the backstory behind how things were built',
      'Enjoys quiet spots and unhurried conversations',
      'Will happily debate technology, science, and ideas'
    ],
    suggestedTopic: "Ask me: What's a technical rabbit hole you fell down recently?"
  },
  {
    id: 'chaotic',
    title: 'The Chaotic One',
    tagline: 'Fast humor, spontaneous ideas, and playful banter',
    vibe: 'Spontaneous & energetic',
    badge: 'High Energy',
    description: "Equal parts banter, spontaneous decisions, and dry humor. Might convince you to try a random street food cart or challenge you to a friendly game where loser buys dessert.",
    highlightPoints: [
      'Finds the funny side when plans go completely sideways',
      'Considers teasing and playful banter essential',
      'Spontaneous about trying new food or places'
    ],
    suggestedTopic: "Ask me: What's the most unhinged idea you've had that actually worked?"
  },
  {
    id: 'softie',
    title: 'The Low-Key One',
    tagline: 'Unrushed coffee, quiet observations, and great background music',
    vibe: 'Calm & easygoing',
    badge: 'Relaxed',
    description: "The relaxed side that appreciates comfortable silences, peaceful evenings, good music, and believes the best conversations happen when nobody is in a rush.",
    highlightPoints: [
      'Notices the small details and remembers offhand comments',
      'Prefers a quiet corner over crowded venues',
      'Appreciates genuine conversation without performance'
    ],
    suggestedTopic: "Ask me: What's something that instantly puts you in a good mood?"
  }
];
