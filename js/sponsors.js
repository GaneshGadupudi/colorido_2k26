// ============================================================
// COLORIDO 2K26 — SPONSORS MODULE
// ============================================================

import { fetchSponsors } from './services/sponsorsService.js';
import { showLoading, showError, showEmpty, hideState } from './data-state.js';

export async function initSponsors() {
  const container = document.getElementById('sponsorsContainer');
  const state = document.getElementById('sponsorsState');
  if (!container) return;

  container.innerHTML = '';
  showLoading(state, 'Loading sponsors…');

  let sponsors;
  try {
    sponsors = await fetchSponsors();
  } catch (err) {
    showError(state, err.message, () => initSponsors());
    return;
  }

  if (sponsors.length === 0) {
    showEmpty(state, 'Sponsors will be announced soon.');
    return;
  }

  hideState(state);
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
