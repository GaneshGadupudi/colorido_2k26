// ============================================================
// COLORIDO 2K26 — ANNOUNCEMENTS MODULE
// ============================================================

import { announcements } from '../data/announcements.js';

export function initAnnouncements() {
  const list = document.getElementById('announcementsList');
  if (!list) return;

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
