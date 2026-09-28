// ============================================================
// COLORIDO 2K26 — RESULTS MODULE
// ============================================================

import { results } from '../data/announcements.js';

export function initResults() {
  const grid = document.getElementById('resultsGrid');
  if (!grid) return;

  let currentTab = 'cultural';

  function renderResults() {
    const data = results[currentTab];
    grid.innerHTML = data
      .map(
        (r) => `
      <div class="result-card">
        <h3>${r.eventName}</h3>
        <div class="result-row">
          <span class="result-medal">🥇</span>
          <div class="result-info">
            <div class="result-position">Winner</div>
            <div class="result-name">${r.winner}</div>
          </div>
        </div>
        <div class="result-row">
          <span class="result-medal">🥈</span>
          <div class="result-info">
            <div class="result-position">Runner-up</div>
            <div class="result-name">${r.runnerUp}</div>
          </div>
        </div>
      </div>
    `,
      )
      .join('');
  }

  document.querySelectorAll('[data-results]').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-results]').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.results;
      renderResults();
    });
  });

  renderResults();
}
