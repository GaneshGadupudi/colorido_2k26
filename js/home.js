// ============================================================
// COLORIDO 2K26 — HOME PAGE SECTIONS
// Renders the home page previews (stats, featured events, the
// three-day glance, gallery, announcements, sponsors) from the
// same data files the dedicated pages use, so the home page
// never drifts out of sync with them.
// ============================================================

import { events } from '../data/events.js';
import { schedule, scheduleDays } from '../data/schedule.js';
import { announcements, sponsors, galleryImages } from '../data/announcements.js';
import { icons } from './icons.js';
import { openEventModal, bindEventModal } from './events.js';

// Matches the "Last Date for Registration" announcement (05 Oct 2026, 11:59 PM)
const REGISTRATION_DEADLINE = new Date('2026-10-05T23:59:00').getTime();

const FEATURED_IDS = [
  'dance-group',
  'music-group',
  'choreoday',
  'fashion-show',
  'basketball-boys',
  'throwball-girls',
];

// Schedule rows that are logistics rather than something to look forward to
const ROUTINE_ACTIVITY = /lunch|reporting|registration|check-in|warm-up/i;

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── REGISTRATION DEADLINE ─────────────────────────────────
function initDeadline() {
  const hero = document.getElementById('heroDeadline');
  const cta = document.getElementById('ctaDeadline');
  const msLeft = REGISTRATION_DEADLINE - Date.now();

  if (msLeft <= 0) {
    if (hero) hero.textContent = 'Registrations are closed — see you at the fest!';
    return;
  }

  const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
  const when = daysLeft === 1 ? 'today' : `in ${daysLeft} days`;
  if (hero) hero.innerHTML = `<span class="pulse-dot"></span> Registrations close ${when} — 05 Oct, 11:59 PM`;
  if (cta) cta.textContent = `Registrations close ${when} (05 Oct, 11:59 PM). Pick your event, fill in your details, and you're in — it takes about two minutes.`;
}

// ── STATS ─────────────────────────────────────────────────
function initStats() {
  const grid = document.getElementById('statsGrid');
  if (!grid) return;

  const stats = [
    { value: events.length, label: 'Events' },
    { value: scheduleDays.length, label: 'Days' },
    { value: events.filter((e) => e.category === 'Cultural').length, label: 'Cultural' },
    { value: events.filter((e) => e.category === 'Sports').length, label: 'Sports' },
  ];

  grid.innerHTML = stats
    .map(
      (s) => `
    <div class="stat">
      <div class="stat-value" data-count="${s.value}">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `,
    )
    .join('');

  const gsap = window.gsap;
  if (!gsap || !window.ScrollTrigger || reducedMotion()) return;

  grid.querySelectorAll('.stat-value').forEach((el) => {
    const counter = { n: 0 };
    el.textContent = '0';
    gsap.to(counter, {
      n: Number(el.dataset.count),
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(counter.n); },
      scrollTrigger: { trigger: grid, start: 'top 90%', once: true },
    });
  });
}

// ── FEATURED EVENTS ───────────────────────────────────────
function renderFeatured(category) {
  const grid = document.getElementById('featuredGrid');
  const featured = FEATURED_IDS
    .map((id) => events.find((e) => e.id === id))
    .filter((e) => e && (category === 'all' || e.category === category));

  grid.innerHTML = featured
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
      <button class="event-details-btn" type="button">View Details</button>
    </article>
  `,
    )
    .join('');

  grid.querySelectorAll('.event-card').forEach((card) => {
    card.addEventListener('click', () => openEventModal(card.dataset.eventId));
  });
}

function initFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  renderFeatured('all');

  const tabs = document.querySelectorAll('.events-tab[data-featured]');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-pressed', String(t === tab));
      });
      renderFeatured(tab.dataset.featured);
      if (window.gsap && !reducedMotion()) {
        window.gsap.fromTo(grid.children, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' });
      }
    });
  });

  bindEventModal();
}

// ── THREE DAYS AT A GLANCE ────────────────────────────────
function initDays() {
  const grid = document.getElementById('daysGrid');
  if (!grid) return;

  grid.innerHTML = scheduleDays
    .map((key, i) => {
      const day = schedule[key];
      const highlights = day.items.filter((item) => !ROUTINE_ACTIVITY.test(item.activity));
      const shown = highlights.slice(0, 5);
      const more = highlights.length - shown.length;
      return `
      <a class="day-card" href="schedule.html?day=${i + 1}">
        <header class="day-card-header">
          <span class="day-card-label">${day.label}</span>
          <span class="day-card-date">${day.date}</span>
        </header>
        <ul class="day-card-list">
          ${shown
            .map(
              (item) => `
            <li>
              <span class="day-card-time">${item.time}</span>
              <span class="day-card-activity">${item.activity}<small>${item.venue}</small></span>
            </li>
          `,
            )
            .join('')}
        </ul>
        <p class="day-card-more">${more > 0 ? `+ ${more} more · ` : ''}See full day →</p>
      </a>
    `;
    })
    .join('');
}

// ── GALLERY PREVIEW ───────────────────────────────────────
function initGalleryPreview() {
  const grid = document.getElementById('homeGallery');
  if (!grid) return;

  grid.innerHTML = galleryImages
    .slice(0, 5)
    .map(
      (img) => `
    <a class="home-gallery-item" href="gallery.html" aria-label="Open gallery: ${img.alt}">
      <img src="${img.url}" alt="${img.alt}" loading="lazy" />
    </a>
  `,
    )
    .join('');
}

// ── LATEST ANNOUNCEMENTS ──────────────────────────────────
function initLatest() {
  const list = document.getElementById('homeAnnouncements');
  if (!list) return;

  list.innerHTML = announcements
    .slice(-3)
    .reverse()
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

// ── SPONSOR MARQUEE ───────────────────────────────────────
function initSponsorStrip() {
  const track = document.getElementById('sponsorTrack');
  if (!track) return;

  const item = (s, hidden) => `
    <div class="sponsor-chip"${hidden ? ' aria-hidden="true"' : ''}>
      <span class="sponsor-logo">${s.logo}</span>
      <span class="sponsor-name">${s.name}</span>
    </div>
  `;
  // Second copy makes the loop seamless; it's hidden from screen readers
  track.innerHTML = sponsors.map((s) => item(s, false)).join('') + sponsors.map((s) => item(s, true)).join('');
}

export function initHome() {
  initDeadline();
  initStats();
  initFeatured();
  initDays();
  initGalleryPreview();
  initLatest();
  initSponsorStrip();
}
