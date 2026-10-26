import { SpotifyConfig } from '../types';

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
 * To connect your real Spotify playlists:
 * 1. Open Spotify, right-click your playlist or album > Share > "Copy link to playlist" (or "Copy embed code").
 * 2. Paste the URL into `embedUrl`.
 * 3. Set `isConfigured: true`.
 * 4. (Optional) Add your real Spotify profile link in `profileUrl`.
 *
 * Unconfigured playlists and generic homepage links are automatically hidden.
 */
export const spotifyConfig: SpotifyConfig = {
  sectionHeading: 'A little of what I listen to.',
  sectionSubtitle: 'Soundtracks for late nights, deep work sprints, and everyday wandering.',
  // Add your real public Spotify profile URL here when ready (e.g. https://open.spotify.com/user/YOUR_ID):
  profileUrl: '',
  playlists: [
    {
      id: 'on-repeat',
      title: 'On Repeat',
      subtitle: 'Current high rotation',
      description: 'Downtempo beats, melodic textures, and grooves carrying my week.',
      category: 'Rotation',
      embedUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
      spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
      isConfigured: true
    },
    {
      id: 'after-hours',
      title: 'After Hours',
      subtitle: 'Late night quietude',
      description: 'Warm analog synthesizers, mellow chords, and nocturnal soundscapes.',
      category: 'Late Night',
      embedUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4wta20Jg5ne',
      spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4wta20Jg5ne',
      isConfigured: true
    },
    {
      id: 'focus-mode',
      title: 'Focus Mode',
      subtitle: 'Deep flow states',
      description: 'Minimal electronic soundscapes and ambient frequencies for deep engineering sessions.',
      category: 'Focus',
      embedUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
      spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
      isConfigured: true
    }
  ]
};
