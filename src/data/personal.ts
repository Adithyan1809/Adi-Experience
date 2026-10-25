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
  role: 'AI/ML Engineering Student',
  specialization: 'Artificial Intelligence & Machine Learning',
  location: 'Bangalore, India',
  tagline: 'A little bit of code. A little bit of chaos.',
  heroHeadline: 'A little bit of code.\nA little bit of chaos.',
  heroSupporting: 'AI/ML student by day. Trying to get my life together by… also day.',
  links: {
    website: 'https://www.adithyanp.me/',
    github: 'https://github.com/Adithyan1809',
    linkedin: 'https://www.linkedin.com/in/adithyan-prakash/',
    // Add your personal Instagram URL here when ready (e.g. 'https://instagram.com/yourhandle')
    instagram: '',
    email: 'contact@adithyanp.me'
  }
};

export const aboutData = {
  heading: "So, who am I when my laptop's closed?",
  subheading: "A little context behind the code, the late-night tea runs, and the rabbit holes.",
  introParagraphs: [
    "I'm Adi, an AI/ML engineering student in Bangalore. I like building things, getting better at things, and occasionally going down a rabbit hole that absolutely did not need three hours of research.",
    "When I'm away from code, you'll usually find me trying to hit a gym PR, hunting down decent iced coffee, arguing about music, or wandering around the city without a strict destination."
  ],
  ambitions: [
    {
      title: 'Building Things That Matter',
      description: 'Focusing on software that people actually find useful and delightful, not just toy tech demos.'
    },
    {
      title: 'Staying Consistent',
      description: 'Treating the gym and daily routines as anchors so my brain does not fry during hectic weeks.'
    },
    {
      title: 'Good Conversations',
      description: 'Surrounding myself with people who are curious, easy to laugh with, and do not take themselves too seriously.'
    }
  ],
  values: [
    'Good food & unhurried coffee',
    'Curiosity without taking yourself too seriously',
    'People who text back with actual enthusiasm',
    'Laughing when plans inevitably get derailed'
  ],
  quirks: [
    "I will genuinely debate anyone on the optimal playlist structure for a 15-minute drive.",
    "Strong believer that solving a stubborn bug feels better than three shots of espresso.",
    "I buy physical books with great intentions and then read them in three-day hyperfocus bursts."
  ],
  facts: [
    { label: 'Current Base', value: 'Bangalore, India', isEditable: false },
    { label: 'Studying', value: 'AI & Machine Learning', isEditable: false },
    { label: 'Coffee Order', value: 'Cold brew or honest filter coffee', isEditable: true },
    { label: 'Off-Duty Mode', value: 'Gym, good food & long walks', isEditable: true },
    { label: 'Current Goal', value: 'Sub-25 min 5k & shipping my next build', isEditable: true }
  ] as AboutFact[]
};

export const currentlyItems: CurrentlyItem[] = [
  {
    id: 'learning',
    label: 'Currently Learning',
    value: 'Autonomous AI Agents',
    detail: 'Exploring how agents reason and collaborate without burning through my API credits.',
    iconName: 'book-open'
  },
  {
    id: 'building',
    label: 'Currently Building',
    value: 'Side projects & interactive tools',
    detail: 'Iterating on WellNest and cooking up small web prototypes just because they are fun to build.',
    iconName: 'code'
  },
  {
    id: 'listening',
    label: 'Currently Listening To',
    value: 'Indie folk & late-night acoustics',
    detail: 'Lord Huron, Gregory Alan Isakov, and anything with moody acoustic guitars on loop.',
    iconName: 'headphones'
  },
  {
    id: 'reading',
    label: 'Currently Reading / Watching',
    value: 'Sci-fi & essays on human habits',
    detail: 'Enjoying thought-provoking essays on focus, craft, and whatever good mini-series is streaming.',
    iconName: 'tv'
  },
  {
    id: 'fitness',
    label: 'Current Fitness Goal',
    value: '5-day lifting split & 5k endurance',
    detail: 'Staying disciplined with progressive overload and trying not to skip cardio on leg days.',
    iconName: 'dumbbell'
  },
  {
    id: 'forward',
    label: 'Looking Forward To',
    value: 'A weekend road trip outside Bangalore',
    detail: 'Escaping into the greenery around Karnataka with good music and zero laptop screen time.',
    iconName: 'sparkles'
  }
];

export const personalityPrompts: PersonalityPrompt[] = [
  {
    id: 'harmless-red-flag',
    question: 'My most harmless red flag',
    answer: "I will open 14 browser tabs of articles I swear I'm going to read 'this weekend', leave them open for two weeks like hostages, and then close them all without reading a single word.",
    tagline: 'Guilty of optimistic tab hoarding',
    category: 'Quirk',
    icon: 'AlertCircle'
  },
  {
    id: 'controversial-food-opinion',
    question: 'My controversial food opinion',
    answer: 'Traditional South Indian filter coffee in a humble steel tumbler beats an expensive café cappuccino every single time. Also, pineapple on pizza is fine if the crust is good—stop pretending it offended your ancestors.',
    tagline: 'Prepared to defend this',
    category: 'Lifestyle',
    icon: 'Coffee'
  },
  {
    id: 'ideal-sunday',
    question: 'My ideal Sunday',
    answer: 'Wake up without an alarm, strong coffee, zero plans before noon, a solid gym workout, and then either getting lost in an indie bookstore or sitting on a terrace with good music until dusk.',
    tagline: 'Slow mornings & unhurried coffee',
    category: 'Lifestyle',
    icon: 'Sun'
  },
  {
    id: 'talk-for-hours',
    question: 'Something I could talk about for hours',
    answer: 'Why movie soundtracks hit you right in the chest, the weird psychology behind our daily habits, or how AI is either going to solve everything or just automate sending bad emails faster.',
    tagline: 'Rabbit holes guaranteed',
    category: 'Deep Dive',
    icon: 'MessageSquare'
  },
  {
    id: 'perfect-first-date',
    question: 'My idea of a great first date',
    answer: 'Grabbing good coffee, taking an aimless walk where neither of us checks the phone, and ending up laughing at something completely stupid.',
    tagline: 'Low pressure, easy laughter',
    category: 'Dating',
    icon: 'Sparkles'
  },
  {
    id: 'three-small-things',
    question: 'Three small things that make me happy',
    answer: '1. The smell of Bangalore right after a sudden afternoon rain.\n2. Finding a song so good you listen to it 12 times in a row.\n3. When code compiles on the first try (rare, magical).',
    tagline: 'The everyday wins',
    category: 'Lifestyle',
    icon: 'Smile'
  },
  {
    id: 'green-flags',
    question: 'What immediately catches my attention',
    answer: 'People who are genuinely curious about how things work, remember little offhand comments from weeks ago, and can laugh when plans completely fall apart.',
    tagline: 'Effortless warmth & wit',
    category: 'Dating',
    icon: 'Heart'
  }
];

export const adventureVersions: AdventureVersion[] = [
  {
    id: 'curious',
    title: 'The Curious One',
    tagline: "Deep conversations, rabbit holes, and 'wait, how does that work?'",
    vibe: 'Thoughtful & inquisitive',
    badge: 'Curious',
    description: "The version that reads Wikipedia at 1 AM, gets fascinated by how ordinary things are designed, and wants to know your hot takes on everything from sci-fi to psychology.",
    highlightPoints: [
      'Will ask about the backstory of your weirdest interest',
      'Loves wandering through bookstores and quiet spots',
      'Always has a random documentary or article recommendation'
    ],
    suggestedTopic: "Ask me: What's a rabbit hole you fell down recently?"
  },
  {
    id: 'chaotic',
    title: 'The Chaotic One',
    tagline: 'Fast humor, spontaneous coffee runs, and playful banter',
    vibe: 'Spontaneous & energetic',
    badge: 'High Energy',
    description: "Equal parts banter, questionable spontaneous decisions, and meme curation. Might convince you to try a sketchy-looking street food cart because 'the reviews said the uncle has been there since 1984.'",
    highlightPoints: [
      'Will challenge you to an intensely competitive Mario Kart race',
      'Finds the funny side when plans go completely sideways',
      'Considers teasing an essential friendship language'
    ],
    suggestedTopic: "Ask me: What's the most unhinged idea you've had that actually worked?"
  },
  {
    id: 'softie',
    title: 'The Low-Key One',
    tagline: 'Unrushed coffee, quiet observations, and great playlists',
    vibe: 'Calm & easygoing',
    badge: 'Relaxed',
    description: "The relaxed side that appreciates comfortable silences, makes hyper-specific music playlists for long drives, and believes the best evenings are the unhurried ones.",
    highlightPoints: [
      'Notices the small details and remembers offhand comments',
      'Prefers a quiet corner over a crowded club any day',
      'Believes good company makes any ordinary spot memorable'
    ],
    suggestedTopic: "Ask me: What's a song or album that always puts you in a good mood?"
  }
];

export const favoritesData: FavoriteGroup[] = [
  {
    category: 'Soundtrack & Vibes',
    description: 'Music that accompanies late-night coding or evening walks.',
    icon: 'Music',
    items: [
      {
        title: 'Late-Night Indie & Acoustic',
        artistOrAuthor: 'Lord Huron, Gregory Alan Isakov',
        categoryTag: 'Indie Folk',
        note: 'Warm guitars that feel like a night drive with the windows down.'
      },
      {
        title: 'Interstellar Soundtrack',
        artistOrAuthor: 'Hans Zimmer',
        categoryTag: 'Soundtrack',
        note: 'The ultimate sonic backdrop for existential late-night coding.'
      },
      {
        title: 'Ambient & Lo-Fi Focus',
        artistOrAuthor: 'Various Artists',
        categoryTag: 'Instrumental',
        note: 'Zero vocals, just pure rhythmic momentum for getting things done.'
      }
    ]
  },
  {
    category: 'Cinema & Stories',
    description: 'Stories that stick with me long after the credits roll.',
    icon: 'Film',
    items: [
      {
        title: 'Good Will Hunting',
        artistOrAuthor: 'Gus Van Sant',
        categoryTag: 'Drama',
        note: 'Vulnerability, raw human potential, and genuine friendship done right.'
      },
      {
        title: 'Interstellar & Inception',
        artistOrAuthor: 'Christopher Nolan',
        categoryTag: 'Sci-Fi',
        note: 'High-concept storytelling grounded by real emotional stakes.'
      },
      {
        title: 'Severance',
        artistOrAuthor: 'Dan Erickson / Ben Stiller',
        categoryTag: 'Series',
        note: 'Brilliantly eerie and funny critique of modern work culture and identity.'
      }
    ]
  },
  {
    category: 'Books & Insights',
    description: 'Reads that actually changed how I approach habits or craft.',
    icon: 'BookOpen',
    items: [
      {
        title: 'Atomic Habits',
        artistOrAuthor: 'James Clear',
        categoryTag: 'Habits',
        note: 'The compounding math of small 1% improvements every single day.'
      },
      {
        title: 'Shoe Dog',
        artistOrAuthor: 'Phil Knight',
        categoryTag: 'Memoir',
        note: 'Honest, chaotic, and refreshing chronicle of building Nike from zero.'
      },
      {
        title: 'Deep Work',
        artistOrAuthor: 'Cal Newport',
        categoryTag: 'Philosophy',
        note: 'The lost superpower of focused craftsmanship in a distracted world.'
      }
    ]
  },
  {
    category: 'Bangalore Corners',
    description: 'Spots in the city that never let me down.',
    icon: 'MapPin',
    items: [
      {
        title: 'Church Street & Blossom Book House',
        artistOrAuthor: 'Central Bangalore',
        categoryTag: 'Books & Walk',
        note: 'Browsing second-hand book stacks followed by street tea.'
      },
      {
        title: 'Cubbon Park on Sunday Mornings',
        artistOrAuthor: 'Central Bangalore',
        categoryTag: 'Nature',
        note: 'Tall bamboo canopy, happy dogs, and quiet air before traffic wakes up.'
      },
      {
        title: 'Traditional Brahmin Coffee Houses',
        artistOrAuthor: 'VV Puram & Basavanagudi',
        categoryTag: 'Food & Coffee',
        note: 'Crisp ghee dosas and piping-hot steel tumblers of filter coffee.'
      }
    ]
  }
];
