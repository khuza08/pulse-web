import { renderFeatures } from "./features.js";
import { fetchReleases } from "./github.js";
import { renderLatest, renderReleases, renderError } from "./releases-view.js";

document.getElementById("year").textContent = new Date().getFullYear();

renderFeatures(document.querySelector('[data-testid="features-grid"]'));

async function init() {
  try {
    const { latest, all } = await fetchReleases();
    renderLatest(latest);
    renderReleases(all);
  } catch (err) {
    console.error(err);
    renderError(err.message);
  }
}
init();

// smooth-scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});
