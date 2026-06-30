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
              <span class="release-tag">${escapeHtml(rel.tag_name || "")}</span>
              <span style="color:var(--ink);font-weight:500;">${escapeHtml(rel.name || rel.tag_name || "")}</span>
              ${rel.prerelease ? '<span class="badge-pre">pre-release</span>' : ""}
              ${idx === 0 ? '<span class="badge-latest">latest</span>' : ""}
            </div>
            <div class="mono" style="font-size:12px;color:var(--ink-faint);margin-top:8px;">
              ${escapeHtml(formatDate(rel.published_at))}${asset ? " · " + escapeHtml(asset.name) + " · " + escapeHtml(size) : ""}
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0;">
            <a href="${rel.html_url}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm" data-testid="release-notes-${idx}">Notes</a>
            <a href="${downloadUrl}" class="btn btn-primary btn-sm" data-testid="release-download-${idx}">Download</a>
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
