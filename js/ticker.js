// ============================================================
// COLORIDO 2K26 — ANNOUNCEMENT TICKER
// ============================================================

import { tickerText } from '../data/announcements.js';

export function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  const items = tickerText
    .split('  •  ')
    .map((text) => `<span>${text.trim()}</span>`)
    .join('');
  track.innerHTML = items + items;
}
