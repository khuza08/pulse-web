export function renderWaveform(target, count = 28) {
  const bars = [];
  for (let i = 0; i < count; i++) {
    const height = 18 + Math.round(Math.random() * 82);
    const delay = (Math.random() * 1.2).toFixed(2);
    const duration = (1.1 + Math.random() * 0.8).toFixed(2);
    bars.push(
      `<div class="bar" style="height:${height}%;animation-delay:-${delay}s;animation-duration:${duration}s;"></div>`,
    );
  }
  target.innerHTML = bars.join("");
}
