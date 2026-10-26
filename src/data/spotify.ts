import { SpotifyConfig, FavoriteMusicItem } from '../types';

/**
 * Extracts a normalized Spotify URI (e.g. spotify:playlist:...) from any web URL or URI.
 */
export const toSpotifyUri = (raw?: string): string | null => {
  if (!raw) return null;
  const trimmed = raw.trim();

  // Handle existing Spotify URI scheme: spotify:playlist:xxx
  if (/^spotify:(playlist|album|track|artist):[a-zA-Z0-9]+/.test(trimmed)) {
    return trimmed.split('?')[0];
  }

  // Handle standard or embed web URLs: open.spotify.com/(embed/)?(playlist|album|track|artist)/xxx
  const match = trimmed.match(/open\.spotify\.com\/(?:embed\/)?(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
  if (match) {
    return `spotify:${match[1]}:${match[2]}`;
  }

  return null;
};

/**
 * Converts any Spotify URL or URI into a clean official embed URL.
 */
export const toSpotifyEmbedUrl = (raw: string): string => {
  const uri = toSpotifyUri(raw);
  if (uri) {
    const [, type, id] = uri.split(':');
    return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  }
  return raw.trim();
};

/**
 * Validates whether a playlist embed URL is a legitimate, configured Spotify resource.
 */
export const isValidSpotifyUrl = (url?: string): boolean => {
  if (!url) return false;
  return toSpotifyUri(url) !== null;
};

/**
 * Spotify Configuration for "The Listening Room"
 *
 * Current configuration: Single primary playlist as requested.
 * (Tabs are automatically hidden when only 1 playlist is active).
 */
export const spotifyConfig: SpotifyConfig = {
  sectionHeading: 'The Listening Room',
  sectionSubtitle: 'Soundtracks for late nights, deep work sprints, and everyday wandering.',
  // Add your real public Spotify profile URL here when ready:
  profileUrl: '',
  playlists: [
    {
      id: 'adi-curation',
      title: 'Current Rotation',
      subtitle: 'Personal Curation',
      description: 'The tracks, grooves, and nocturnal soundscapes carrying my days in Bangalore.',
      category: 'Rotation',
      embedUrl: 'https://open.spotify.com/playlist/7cALwbrGI4Fxh1JYsJqNNh?si=F6OQNXZdRoaD1Nfwz7wXgw',
      spotifyUrl: 'https://open.spotify.com/playlist/7cALwbrGI4Fxh1JYsJqNNh?si=F6OQNXZdRoaD1Nfwz7wXgw',
      isConfigured: true
    }
  ]
};

/**
 * Top Favourite Tracks & Artists
 * Curated list matching the user's high rotation selection.
 */
export const favoriteMusicItems: FavoriteMusicItem[] = [
  // Top Artists
  {
    id: 'the-weeknd',
    name: 'The Weeknd',
    subtext: 'r&b / soul',
    type: 'artist',
    image: '/images/music/the-weeknd.jpg',
    spotifyUrl: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ'
  },
  {
    id: 'sza',
    name: 'SZA',
    subtext: 'r&b / r&b/soul',
    type: 'artist',
    image: '/images/music/sza.jpg',
    spotifyUrl: 'https://open.spotify.com/artist/7tYKF4w9nC0nq9CsPZTHte'
  },
  {
    id: 'seedhe-maut',
    name: 'Seedhe Maut',
    subtext: 'desi hip hop / hindi hip hop',
    type: 'artist',
    image: '/images/music/seedhe-maut.jpg',
    spotifyUrl: 'https://open.spotify.com/artist/2oBG74gAocPMFv6Ij9ykdo'
  },
  {
    id: 'gesaffelstein',
    name: 'Gesaffelstein',
    subtext: 'electronic',
    type: 'artist',
    image: '/images/music/gesaffelstein.jpg',
    spotifyUrl: 'https://open.spotify.com/artist/3hteYQFiMFbJY7wS0xDymP'
  },
  // Top Tracks
  {
    id: 'parda-hata-do',
    name: 'Parda Hata Do - Trap Mix',
    subtext: 'Asha Bhosle, Mohammed Rafi',
    type: 'track',
    image: '/images/music/parda-hata-do.jpg',
    spotifyUrl: 'https://open.spotify.com/search/Parda%20Hata%20Do%20Trap%20Mix',
    isSearch: true
  },
  {
    id: 'seven',
    name: 'Seven (feat. Latto)',
    subtext: 'Jung Kook, Latto',
    type: 'track',
    image: '/images/music/seven.jpg',
    spotifyUrl: 'https://open.spotify.com/track/7x9aauaA9cu6tyfpHnqDLo'
  },
  {
    id: 'i-was-never-there',
    name: 'I Was Never There',
    subtext: 'The Weeknd, Gesaffelstein',
    type: 'track',
    image: '/images/music/i-was-never-there.jpg',
    spotifyUrl: 'https://open.spotify.com/track/5rgnyXr2PXFWsAnPFew077'
  },
  {
    id: 'the-hills',
    name: 'The Hills',
    subtext: 'The Weeknd',
    type: 'track',
    image: '/images/music/the-hills.jpg',
    spotifyUrl: 'https://open.spotify.com/track/7fBv7CLKzipRcf62qq9509'
  }
];
