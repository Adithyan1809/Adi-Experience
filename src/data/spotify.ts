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
 * To customize or connect your personal Spotify playlists:
 * 1. Open Spotify, right-click any playlist or album > Share > "Copy link to playlist".
 * 2. Paste the URL into `embedUrl` and `spotifyUrl`.
 * 3. Update `title`, `subtitle`, `description`, and `category` to accurately reflect your curation.
 * 4. Set `isConfigured: true` (or `false` to hide until ready).
 * 5. (Optional) Paste your public Spotify profile link into `profileUrl` (e.g. "https://open.spotify.com/user/YOUR_ID").
 *
 * Playlists marked `isConfigured: false` or with blank/generic URLs are automatically hidden.
 * The Spotify profile link remains hidden until a valid non-empty public profile URL is provided.
 */
export const spotifyConfig: SpotifyConfig = {
  sectionHeading: 'A little of what I listen to.',
  sectionSubtitle: 'Curated soundtracks for late nights, deep work sprints, and quiet mornings.',
  // Add your real public Spotify profile URL here when ready (e.g. https://open.spotify.com/user/YOUR_ID):
  profileUrl: '',
  playlists: [
    {
      id: 'on-repeat',
      title: 'Lo-Fi Beats',
      subtitle: 'Curated downtime rotation',
      description: 'Chilled instrumental hip-hop and downtempo beats for casual listening and unwinding.',
      category: 'Rotation',
      embedUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
      spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
      isConfigured: true
    },
    {
      id: 'after-hours',
      title: 'Late Night Jazz',
      subtitle: 'Nocturnal soundscapes',
      description: 'Mellow brass, acoustic piano, and subtle rhythms for quiet evenings and late reading.',
      category: 'Late Night',
      embedUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4wta20Jg5ne',
      spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX4wta20Jg5ne',
      isConfigured: true
    },
    {
      id: 'focus-mode',
      title: 'Deep Focus',
      subtitle: 'Ambient engineering soundtrack',
      description: 'Atmospheric ambient textures, minimalist drones, and calm synths designed for sustained concentration.',
      category: 'Focus',
      embedUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
      spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM',
      isConfigured: true
    }
  ]
};
