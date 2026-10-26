import { SpotifyConfig } from '../types';

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
      description: 'Songs and grooves currently carrying my week.',
      category: 'Rotation',
      embedUrl: '',
      spotifyUrl: '',
      isConfigured: false
    },
    {
      id: 'after-hours',
      title: 'After Hours',
      subtitle: 'Late night quietude',
      description: 'Downtempo, warm analog synthesizers, and moody textures.',
      category: 'Late Night',
      embedUrl: '',
      spotifyUrl: '',
      isConfigured: false
    },
    {
      id: 'focus-mode',
      title: 'Focus Mode',
      subtitle: 'Deep flow states',
      description: 'Minimal electronic and ambient soundscapes for deep engineering sessions.',
      category: 'Focus',
      embedUrl: '',
      spotifyUrl: '',
      isConfigured: false
    }
  ]
};
