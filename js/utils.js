export function formatBytes(b) {
  if (b === null || b === undefined) return "";
  const units = ["B", "KB", "MB", "GB"];
  let i = 0,
    n = b;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i++;
  }
  return `${n.toFixed(n < 10 ? 1 : 0)} ${units[i]}`;
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso || "";
  }
}

export function platformFromName(name) {
  const n = (name || "").toLowerCase();
  if (n.endsWith(".apk")) return "Android";
  if (n.endsWith(".exe") || n.endsWith(".msi")) return "Windows";
  if (n.endsWith(".dmg") || n.endsWith(".pkg")) return "macOS";
  if (
    n.endsWith(".deb") ||
    n.endsWith(".rpm") ||
    n.endsWith(".appimage") ||
    n.endsWith(".tar.gz")
  )
    return "Linux";
  return "File";
}

export function escapeHtml(s) {
  return (s || "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
}

export function renderChangelog(body) {
  if (!body) return "";
  const lines = body.split(/\r?\n/);
  let html = "";
  let inList = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (/^[-*]\s+/.test(line)) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${escapeHtml(line.replace(/^[-*]\s+/, ""))}</li>`;
    } else {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
      if (line) html += `<p>${escapeHtml(line)}</p>`;
    }
  }
  if (inList) html += "</ul>";
  return html;
}
