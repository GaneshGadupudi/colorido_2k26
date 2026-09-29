// ============================================================
// COLORIDO 2K26 — SPONSORS MODULE
// ============================================================

import { sponsors } from '../data/announcements.js';

export function initSponsors() {
  const container = document.getElementById('sponsorsContainer');
  if (!container) return;

  const tiers = [...new Set(sponsors.map((s) => s.tier))];

  container.innerHTML = tiers
    .map(
      (tier) => `
    <div class="sponsor-tier">
      <h3>${tier}</h3>
      <div class="sponsor-grid">
        ${sponsors
          .filter((s) => s.tier === tier)
          .map(
            (s) => `
          <div class="sponsor-card">
            <div class="sponsor-logo">${s.logo}</div>
            <div class="sponsor-name">${s.name}</div>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `,
    )
    .join('');
}
