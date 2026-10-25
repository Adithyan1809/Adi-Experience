import {
  PersonalInfo,
  AboutFact,
  CurrentlyItem,
  PersonalityPrompt,
  AdventureVersion,
  FavoriteGroup
} from '../types';

export const personalInfo: PersonalInfo = {
  name: 'Adi',
  fullName: 'Adithyan Prakash',
  role: 'Engineering Student & AI/ML Developer',
  specialization: 'Artificial Intelligence & Machine Learning',
  location: 'Bangalore, India',
  tagline: 'An engineer by degree. A work in progress by choice.',
  heroHeadline: 'An engineer by degree.\nA work in progress by choice.',
  heroSupporting: 'Building interesting things, chasing better versions of myself, and occasionally pretending I know where my life is going.',
  links: {
    website: 'https://www.adithyanp.me/',
    github: 'https://github.com/Adithyan1809',
    linkedin: 'https://www.linkedin.com/in/adithyan-prakash/',
    // Editable: update with your personal Instagram handle
    instagram: '', // Leave empty or set e.g. 'https://instagram.com/yourhandle'
    // Editable: update with your preferred contact email
    email: 'contact@adithyanp.me'
  }
};

export const aboutData = {
  heading: "There's more to me than a GitHub repository.",
  subheading: "A little context behind the code, the late-night tea runs, and the ever-growing to-do lists.",
  introParagraphs: [
    "Most of my daylight hours are spent untangling deep learning architectures, debugging code, and pondering whether my machine learning model is actually generalizing or just memorizing my mistakes with supreme confidence.",
    "Outside the terminal, I'm someone driven by quiet curiosity. I care deeply about building physical strength, hunting for hidden specialty coffee spots across Bangalore, picking up new habits, and having long, rambling conversations that start with tech philosophy and somehow end with favorite music albums from 2016."
  ],
  ambitions: [
    {
      title: 'Mastering AI Systems',
      description: 'Going beyond toy models to architect intelligent, human-centric software that solves tangible real-world problems.'
    },
    {
      title: 'Physical & Mental Discipline',
      description: 'Treating the gym and personal routines not as obligations, but as daily anchors for clarity, focus, and longevity.'
    },
    {
      title: 'Meaningful Connections',
      description: 'Surrounding myself with people who are quietly ambitious, kind, laugh easily, and do not take themselves too seriously.'
    }
  ],
  values: [
    'Authenticity over performance',
    'Curiosity without pretension',
    'Showing up consistently',
    'Laughing at the absurdities of life'
  ],
  quirks: [
    "I will genuinely debate anyone on the optimal playlist structure for a night drive.",
    "Can spend 45 minutes researching the exact bean origin before ordering an iced Americano.",
    "Strong believer that solving a persistent bug is equivalent to a legal shot of espresso."
  ],
  facts: [
    { label: 'Current Base', value: 'Bangalore, India', isEditable: false },
    { label: 'Focus Field', value: 'Artificial Intelligence & ML', isEditable: false },
    { label: 'Morning Ritual', value: 'Black coffee & 10 mins silence', isEditable: true },
    { label: 'Fuel of Choice', value: 'Filter coffee or dark roast', isEditable: true },
    { label: 'Weekend Mode', value: 'Building ideas, gym & exploring', isEditable: true }
  ] as AboutFact[]
};

export const currentlyItems: CurrentlyItem[] = [
  {
    id: 'learning',
    label: 'Currently Learning',
    value: 'Multimodal AI & Agentic Architectures',
    detail: 'Deep diving into agentic reasoning frameworks, vision-language grounding, and high-performance inference.',
    iconName: 'book-open'
  },
  {
    id: 'building',
    label: 'Currently Building',
    value: 'Autonomous AI Tools & Personal Experiments',
    detail: 'Refining WellNest and experimenting with interactive intelligence prototypes.',
    iconName: 'code'
  },
  {
    id: 'listening',
    label: 'Currently Listening To',
    value: 'Late-Night Indie, Ambient & Acoustic Rhythms',
    detail: 'A curated mix of deep focus electronic, indie rock, and acoustic strings on repeat.',
    iconName: 'headphones'
  },
  {
    id: 'reading',
    label: 'Currently Reading / Watching',
    value: 'Essays on craft, focus, and human psychology',
    detail: 'Re-reading reflections on building enduring software and finding quiet moments in chaotic weeks.',
    iconName: 'tv'
  },
  {
    id: 'fitness',
    label: 'Current Fitness Goal',
    value: 'Strength progression & 10k pace consistency',
    detail: 'Hitting consistent 5-day training splits while maintaining functional mobility and stamina.',
    iconName: 'dumbbell'
  },
  {
    id: 'forward',
    label: 'Looking Forward To',
    value: 'New tech milestones & weekend road trips',
    detail: 'Shipping the next major version of my projects and escaping to the hills around Karnataka.',
    iconName: 'sparkles'
  }
];

export const personalityPrompts: PersonalityPrompt[] = [
  {
    id: 'ideal-sunday',
    question: 'My ideal Sunday',
    answer: 'Waking up without an alarm, an unhurried morning espresso, a crisp workout session, an afternoon reading or tinkering with code, followed by wandering through an indie bookstore or a quiet rooftop café at dusk.',
    tagline: 'Slow mornings & zero rush',
    category: 'Lifestyle',
    icon: 'Sun'
  },
  {
    id: 'green-flags',
    question: 'My green flags',
    answer: 'Being genuinely curious about how things work, remembering the small things someone mentioned weeks ago, showing emotional clarity, and possessing the rare ability to laugh when plans inevitably go sideways.',
    tagline: 'Warmth, empathy & wit',
    category: 'Dating',
    icon: 'Heart'
  },
  {
    id: 'harmless-red-flag',
    question: 'My most harmless red flag',
    answer: 'I will buy a new notebook with the utmost solemn promise to journal daily, use exactly two pages with gorgeous handwriting, and then start an entirely new text file on my laptop.',
    tagline: 'Guilty of optimistic stationery shopping',
    category: 'Quirk',
    icon: 'AlertCircle'
  },
  {
    id: 'controversial-food-opinion',
    question: 'My controversial food opinion',
    answer: 'A really good traditional South Indian filter coffee in a humble steel tumbler beats an overpriced artisan latte 9 times out of 10. And cold pizza the next morning deserves its own Michelin star.',
    tagline: 'Standing firm on this one',
    category: 'Lifestyle',
    icon: 'Coffee'
  },
  {
    id: 'talk-for-hours',
    question: 'Something I could talk about for hours',
    answer: 'The future of human-AI collaboration, why certain movie soundtracks evoke physical chills, the psychology of habits, and whatever random rabbit hole I hyper-focused on this Tuesday at 2:00 AM.',
    tagline: 'Rabbit holes guaranteed',
    category: 'Deep Dive',
    icon: 'MessageSquare'
  },
  {
    id: 'perfect-first-date',
    question: 'My idea of a great first date',
    answer: 'Low pressure, high chemistry: starting with an artisanal iced brew or matcha at a leafy café, an aimless stroll where conversation flows naturally, and ending with spontaneous dessert and zero awkward silences.',
    tagline: 'Zero awkwardness, genuine laughs',
    category: 'Dating',
    icon: 'Sparkles'
  },
  {
    id: 'three-small-things',
    question: 'Three small things that make me happy',
    answer: '1. The smell of petrichor on Bangalore asphalt.\n2. When a piece of code compiles and runs on the first attempt.\n3. Finding a song so good you immediately put it on loop for three days straight.',
    tagline: 'The quiet daily joys',
    category: 'Lifestyle',
    icon: 'Smile'
  }
];

export const adventureVersions: AdventureVersion[] = [
  {
    id: 'curious',
    title: 'The Curious One',
    tagline: 'Analytical, deep-thinking & obsessed with how things tick',
    vibe: 'Thoughtful conversation & quiet discovery',
    badge: 'Explorer Mode',
    description: "In this mode, I'm captivated by emerging science, philosophy of mind, obscure history, and the craft of engineering. Expect spontaneous questions, shared articles, and thoughtful tangents on everything from neural networks to the architecture of old cities.",
    highlightPoints: [
      'Asks "Wait, how does that actually work?" at least 4 times an hour',
      'Always has a book, paper, or odd documentary to recommend',
      'Loves bookstores where you can lose track of time'
    ],
    suggestedTopic: "Ask me: What's a technology that feels like magic to you?"
  },
  {
    id: 'chaotic',
    title: 'The Chaotic One',
    tagline: 'Spontaneous, witty & fueled by coffee and good banter',
    vibe: 'Fast humor & playful energy',
    badge: 'High Energy',
    description: "Equal parts banter, questionable spontaneous decisions, and meme curation. I might convince you to try the sketchiest-looking street food joint because 'the reviews said the uncle has been there since 1984,' or challenge you to an intensely competitive Mario Kart match.",
    highlightPoints: [
      'Unmatched sarcasm paired with a warm smile',
      'Will find the funny side of an otherwise disastrous travel delay',
      'Considers banter an essential love language'
    ],
    suggestedTopic: "Ask me: What is the most unhinged idea you've ever had that actually worked?"
  },
  {
    id: 'softie',
    title: 'The Softie',
    tagline: 'Attentive, romantic & genuinely appreciative of simple moments',
    vibe: 'Warmth, empathy & nostalgia',
    badge: 'Gentle Soul',
    description: "The side that notices when you take a deep breath, remembers how you take your tea, loves golden hour skies over Bangalore lakes, and believes the best moments in life are quiet, unhurried, and shared with someone special.",
    highlightPoints: [
      'Builds hyper-specific playlists tailored to mood and memory',
      'Believes thoughtful little gestures matter more than grand displays',
      'Always remembers the obscure thing you mentioned offhand'
    ],
    suggestedTopic: "Ask me: What's a memory you keep coming back to when you need to smile?"
  }
];

export const favoritesData: FavoriteGroup[] = [
  {
    category: 'Soundtrack & Vibes',
    description: 'Soundscapes that keep me focused while coding or accompany evening walks.',
    icon: 'Music',
    items: [
      {
        title: 'Midnight Focus & Indie Acoustics',
        artistOrAuthor: 'Curated Playlist',
        categoryTag: 'Music',
        note: 'Lo-fi beats, ambient instrumental, and mellow indie acoustic for flow state.'
      },
      {
        title: 'Interstellar Soundtrack',
        artistOrAuthor: 'Hans Zimmer',
        categoryTag: 'Soundtrack',
        note: 'The ultimate sonic backdrop for existential late-night coding sessions.'
      },
      {
        title: 'Modern Indie Rock & Folk',
        artistOrAuthor: 'Lord Huron, Gregory Alan Isakov',
        categoryTag: 'Favorites',
        note: 'Warm melodies that sound like a drive with the windows down.'
      }
    ]
  },
  {
    category: 'Cinema & Stories',
    description: 'Films and series that stay in memory long after the credits roll.',
    icon: 'Film',
    items: [
      {
        title: 'Good Will Hunting',
        artistOrAuthor: 'Gus Van Sant',
        categoryTag: 'Film',
        note: 'A timeless reminder about vulnerability, human potential, and genuine friendship.'
      },
      {
        title: 'Interstellar / Inception',
        artistOrAuthor: 'Christopher Nolan',
        categoryTag: 'Sci-Fi',
        note: 'Masterclasses in blending complex conceptual engineering with raw human emotion.'
      },
      {
        title: 'Severance',
        artistOrAuthor: 'Dan Erickson / Ben Stiller',
        categoryTag: 'Series',
        note: 'Brilliantly eerie commentary on modern work culture, identity, and isolation.'
      }
    ]
  },
  {
    category: 'Books & Insights',
    description: 'Reads that changed how I approach learning, habits, or life.',
    icon: 'BookOpen',
    items: [
      {
        title: 'Atomic Habits',
        artistOrAuthor: 'James Clear',
        categoryTag: 'Productivity',
        note: 'The compounding math of small 1% improvements every single day.'
      },
      {
        title: 'Shoe Dog',
        artistOrAuthor: 'Phil Knight',
        categoryTag: 'Memoir',
        note: 'Honest, chaotic, and inspiring chronicle of building something from zero.'
      },
      {
        title: 'Deep Work',
        artistOrAuthor: 'Cal Newport',
        categoryTag: 'Philosophy',
        note: 'The lost superpower of uninterrupted craftsmanship in a distracted world.'
      }
    ]
  },
  {
    category: 'Bangalore Corners',
    description: 'Spots in the city that always hit the right spot.',
    icon: 'MapPin',
    items: [
      {
        title: 'Quiet Specialty Cafés in Indiranagar & Koramangala',
        artistOrAuthor: 'Third Wave, Blue Tokai, Maverick & Farmer',
        categoryTag: 'Coffee',
        note: 'Top spots for iced pour-overs, notebook sketching, and peaceful focus.'
      },
      {
        title: 'Cubbon Park Early Mornings',
        artistOrAuthor: 'Central Bangalore',
        categoryTag: 'Nature',
        note: 'Crisp morning air, canopy trails, dogs playing, and total stillness before the traffic wakes.'
      },
      {
        title: 'Traditional Brahmin Coffee Houses',
        artistOrAuthor: 'VV Puram & Basavanagudi',
        categoryTag: 'Heritage Food',
        note: 'Crisp ghee roast dosas and steaming tumblers of filter coffee served at lightning speed.'
      }
    ]
  }
];
