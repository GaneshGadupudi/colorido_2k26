// ============================================================
// COLORIDO 2K26 — ANNOUNCEMENTS MODULE
// ============================================================

import { fetchAnnouncements } from './services/announcementsService.js';
import { showLoading, showError, showEmpty, hideState } from './data-state.js';

export async function initAnnouncements() {
  const list = document.getElementById('announcementsList');
  const state = document.getElementById('announcementsState');
  if (!list) return;

  list.innerHTML = '';
  showLoading(state, 'Loading announcements…');

  let announcements;
  try {
    announcements = await fetchAnnouncements();
  } catch (err) {
    showError(state, err.message, () => initAnnouncements());
    return;
  }

  if (announcements.length === 0) {
    showEmpty(state, 'No announcements yet. Check back soon.');
    return;
  }

  hideState(state);
  list.innerHTML = announcements
    .map(
      (a) => `
    <article class="announcement-card">
      <span class="announcement-badge ${a.badge}">${a.badge}</span>
      <div class="announcement-content">
        <h3>${a.title}</h3>
        <div class="announcement-date">${a.date}</div>
        <p>${a.description}</p>
      </div>
    </article>
  `,
    )
    .join('');
}
