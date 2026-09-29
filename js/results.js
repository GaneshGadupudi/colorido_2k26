// ============================================================
// COLORIDO 2K26 — RESULTS MODULE
// ============================================================

import { fetchResults } from './services/resultsService.js';
import { showLoading, showError, showEmpty, hideState } from './data-state.js';

export async function initResults() {
  const grid = document.getElementById('resultsGrid');
  const state = document.getElementById('resultsState');
  if (!grid) return;

  let currentTab = 'cultural';
  let results = { cultural: [], sports: [] };

  function renderResults() {
    const data = results[currentTab];

    if (data.length === 0) {
      grid.innerHTML = '';
      showEmpty(state, 'Results for this category have not been published yet.');
      return;
    }

    hideState(state);
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

  grid.innerHTML = '';
  showLoading(state, 'Loading results…');

  try {
    results = await fetchResults();
  } catch (err) {
    showError(state, err.message, () => initResults());
    return;
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
