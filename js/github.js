const REPO = "khuza08/pulse";
const API_LATEST = `https://api.github.com/repos/${REPO}/releases/latest`;
const API_ALL = `https://api.github.com/repos/${REPO}/releases?per_page=10`;

export { REPO };

export async function fetchReleases() {
  const [latestRes, allRes] = await Promise.all([
    fetch(API_LATEST, { headers: { Accept: "application/vnd.github+json" } }),
    fetch(API_ALL, { headers: { Accept: "application/vnd.github+json" } }),
  ]);

  if (!latestRes.ok) throw new Error(`HTTP ${latestRes.status}`);
  const latest = await latestRes.json();
  const all = allRes.ok ? await allRes.json() : [latest];

  return { latest, all };
}
