import { SpotifyConfig } from '../types';

/**
 * Spotify Configuration for "The Listening Room"
 *
 * To connect your real Spotify playlists:
 * 1. Open Spotify, right click your playlist > Share > "Copy link to playlist" or "Copy embed code".
 * 2. Paste the URL into `embedUrl` formatted as:
 *    https://open.spotify.com/embed/playlist/<PLAYLIST_ID>?utm_source=generator&theme=0
 * 3. Set `isConfigured: true`.
 * 4. Add your public Spotify profile link in `profileUrl`.
 */
export const spotifyConfig: SpotifyConfig = {
  sectionHeading: 'A little of what I listen to.',
  sectionSubtitle: 'Soundtracks for late nights, deep work sprints, and everyday wandering.',
  // Replace with your public Spotify profile URL:
  profileUrl: 'https://open.spotify.com/',
  playlists: [
    {
      id: 'on-repeat',
      title: 'On Repeat',
      subtitle: 'Current high rotation',
      description: 'A mix of electronic grooves, alternative tracks, and songs currently carrying my week.',
      category: 'Rotation',
      // Example format: https://open.spotify.com/embed/playlist/YOUR_PLAYLIST_ID?utm_source=generator&theme=0
      embedUrl: '',
      spotifyUrl: 'https://open.spotify.com/',
      isConfigured: false
    },
    {
      id: 'after-hours',
      title: 'After Hours',
      subtitle: 'Late night quietude',
      description: 'Downtempo, warm analog synthesizers, and moody instrumentals for when the city goes quiet.',
      category: 'Late Night',
      embedUrl: '',
      spotifyUrl: 'https://open.spotify.com/',
      isConfigured: false
    },
    {
      id: 'focus-mode',
      title: 'Focus Mode',
      subtitle: 'Deep flow states',
      description: 'Minimal techno, ambient textures, and film scores for deep engineering sessions.',
      category: 'Focus',
      embedUrl: '',
      spotifyUrl: 'https://open.spotify.com/',
      isConfigured: false
    }
  ]
};
