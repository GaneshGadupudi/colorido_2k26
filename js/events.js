// ============================================================
// COLORIDO 2K26 — EVENTS MODULE
// Handles event card rendering, filtering, search, and details
// ============================================================

import { events } from '../data/events.js';
import { icons } from './icons.js';
import { createFocusTrap } from './focus-trap.js';

let currentCategory = 'all';
let currentSearch = '';
let modalFocusTrap = null;

// ── RENDER EVENT CARDS ────────────────────────────────────
export function renderEvents() {
  const grid = document.getElementById('eventsGrid');
  const noEvents = document.getElementById('noEvents');
  if (!grid) return;

  const filtered = events.filter((e) => {
    const matchCategory = currentCategory === 'all' || e.category === currentCategory;
    const matchSearch =
      currentSearch === '' ||
      e.name.toLowerCase().includes(currentSearch) ||
      e.tagline.toLowerCase().includes(currentSearch) ||
      e.division.toLowerCase().includes(currentSearch);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noEvents.style.display = 'block';
    return;
  }

  noEvents.style.display = 'none';
  grid.innerHTML = filtered
    .map(
      (e) => `
    <article class="event-card" data-event-id="${e.id}">
      <span class="event-category-badge">${e.category}</span>
      <div class="event-icon">${icons[e.icon] || icons.circle}</div>
      <h3>${e.name}</h3>
      <div class="event-division">${e.division}</div>
      <p class="event-tagline">${e.tagline}</p>
      <div class="event-meta">
        <span class="event-meta-item">${icons.calendar} ${e.date}</span>
        <span class="event-meta-item">${icons['map-pin']} ${e.venue}</span>
      </div>
      <button class="event-details-btn" data-event-id="${e.id}">View Details</button>
    </article>
  `,
    )
    .join('');

  // Attach click handlers
  grid.querySelectorAll('.event-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.eventId;
      openEventModal(id);
    });
  });
}

// ── EVENT MODAL ───────────────────────────────────────────
export function openEventModal(eventId) {
  const event = events.find((e) => e.id === eventId);
  if (!event) return;

  const modal = document.getElementById('eventModal');
  const overlay = document.getElementById('eventModalOverlay');

  modal.innerHTML = `
    <button class="event-modal-close" id="eventModalClose" aria-label="Close">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="event-modal-header">
      <div class="badge-row">
        <span class="modal-badge category">${event.category}</span>
        <span class="modal-badge division">${event.division}</span>
      </div>
      <h2>${event.name}</h2>
      <p class="modal-tagline">${event.tagline}</p>
    </div>
    <div class="event-modal-section">
      <h3>About</h3>
      <p>${event.description}</p>
    </div>
    <div class="event-modal-section">
      <h3>Event Info</h3>
      <div class="event-modal-info-grid">
        <div class="event-modal-info-item"><div class="label">Event Date</div><div class="value">${event.date}</div></div>
        <div class="event-modal-info-item"><div class="label">Start Time</div><div class="value">${event.time}</div></div>
        <div class="event-modal-info-item"><div class="label">Venue</div><div class="value">${event.venue}</div></div>
        <div class="event-modal-info-item"><div class="label">Team Size</div><div class="value">${event.teamSize}</div></div>
        <div class="event-modal-info-item"><div class="label">Registration Fee</div><div class="value">${event.fee}</div></div>
      </div>
    </div>
    <div class="event-modal-section">
      <h3>Rules</h3>
      <ul class="event-modal-rules">
        ${event.rules.map((r) => `<li>${r}</li>`).join('')}
      </ul>
    </div>
    <div class="event-modal-section">
      <h3>Schedule</h3>
      <div class="event-modal-schedule">
        ${event.schedule
          .map(
            (s) => `
          <div class="event-modal-schedule-item">
            <span class="time">${s.time}</span>
            <span class="activity">${s.activity}</span>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
    <a href="register.html?event=${encodeURIComponent(event.id)}" class="btn btn-primary form-submit" id="modalRegisterBtn">Register Now</a>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  modal.querySelector('#eventModalClose').addEventListener('click', closeEventModal);

  modalFocusTrap = createFocusTrap(modal);
  modalFocusTrap.activate();
}

export function closeEventModal() {
  const overlay = document.getElementById('eventModalOverlay');
  if (!overlay.classList.contains('open')) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  if (modalFocusTrap) {
    modalFocusTrap.deactivate();
    modalFocusTrap = null;
  }
}

// ── INIT EVENT FILTERS ────────────────────────────────────
export function initEvents() {
  renderEvents();

  // Category tabs
  document.querySelectorAll('.events-tab[data-category]').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.events-tab[data-category]').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderEvents();
    });
  });

  // Search
  const searchInput = document.getElementById('eventSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      renderEvents();
    });
  }

  // Close modal on overlay click
  const overlay = document.getElementById('eventModalOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeEventModal();
    });
  }

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEventModal();
  });
}
