import {
  formatBytes,
  formatDate,
  platformFromName,
  escapeHtml,
} from "./utils.js";
import { REPO } from "./github.js";

function pickAsset(rel) {
  return (
    (rel.assets || []).find((a) => a.name.toLowerCase().endsWith(".apk")) ||
    rel.assets?.[0]
  );
}

export function renderLatest(rel) {
  const asset = pickAsset(rel);
  const downloadUrl = asset?.browser_download_url || rel.html_url;
  const tag = rel.tag_name || "";

  const navVersion = document.getElementById("nav-version");
  const heroBtn = document.getElementById("hero-download-btn");
  const heroVersion = document.getElementById("hero-download-version");

  if (navVersion) navVersion.textContent = tag;
  if (heroBtn) heroBtn.href = downloadUrl;
  if (heroVersion) heroVersion.textContent = tag;
}

export function renderReleases(releases) {
  const list = document.getElementById("releases-list");
  if (!list) return;
  if (!releases || !releases.length) {
    list.innerHTML = `<div style="padding:24px;color:var(--ink-faint);font-size:14px;">No releases found.</div>`;
    return;
  }
  list.innerHTML = releases
    .map((rel, idx) => {
      const asset = pickAsset(rel);
      const downloadUrl = asset?.browser_download_url || rel.html_url;
      const size = asset ? formatBytes(asset.size) : "";
      return `
        <div class="release-row" data-testid="release-row-${idx}">
          <div style="min-width:0;">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <span style="color:var(--ink);font-weight:500;">${escapeHtml(rel.name || rel.tag_name || "")}</span>
              ${rel.prerelease ? '<span class="badge-pre">pre-release</span>' : ""}
              ${idx === 0 ? '<span class="badge-latest">latest</span>' : ""}
            </div>
            <div class="mono" style="font-size:12px;color:var(--ink-faint);margin-top:8px;">
              ${escapeHtml(formatDate(rel.published_at))}${asset ? " · <span class=\"release-filename\">" + escapeHtml(asset.name) + "</span> · " + escapeHtml(size) : ""}
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0;">
            <a href="${rel.html_url}" target="_blank" rel="noopener" class="release-notes-btn btn btn-ghost btn-sm" data-testid="release-notes-${idx}">Notes</a>
            <a href="${downloadUrl}" class="btn btn-primary btn-sm" data-testid="release-download-${idx}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span class="download-text">Download</span></a>
          </div>
        </div>`;
    })
    .join("");
}

export function renderError(msg) {
  const list = document.getElementById("releases-list");
  if (list) {
    list.innerHTML = `<div style="padding:24px;color:var(--ink-faint);font-size:14px;">Unable to fetch releases. <a href="https://github.com/${REPO}/releases" target="_blank" rel="noopener" style="text-decoration:underline;color:var(--ink);">View on GitHub</a>.</div>`;
  }
}
