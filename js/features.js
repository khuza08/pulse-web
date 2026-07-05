import { escapeHtml } from "./utils.js";

const FEATURES = [
  {
    t: "YouTube Music",
    d: "Play almost any song or video from YouTube Music.",
  },
  { t: "Local playback", d: "Play music stored directly on your device." },
  {
    t: "Background play",
    d: "Keep listening with the screen off, no interruptions.",
  },
  { t: "Offline cache", d: "Cache songs for offline playback anywhere." },
  {
    t: "Universal search",
    d: "Find songs, albums, artists, videos and playlists.",
  },
  { t: "Discover", d: "Find new tracks tailored by mood and genre." },
  { t: "Import playlists", d: "Bring in your existing YouTube playlists." },
  { t: "Synced lyrics", d: "Fetch, display and edit synchronized lyrics." },
  { t: "Cloud sync", d: "Manage playlists locally or sync to the cloud." },
  { t: "Material You", d: "Highly customizable, dynamic themes." },
  {
    t: "Audio normalize",
    d: "Even loudness for a balanced listening session.",
  },
  {
    t: "Android Auto",
    d: "Listen on the road with full Android Auto support.",
  },
];

export function renderFeatures(target) {
  target.innerHTML = FEATURES.map(
    (f, i) => `
      <div class="feature-card" data-testid="feature-card-${i}">
        <div class="feature-title">${escapeHtml(f.t)}</div>
        <p class="feature-desc">${escapeHtml(f.d)}</p>
      </div>`,
  ).join("");
}
