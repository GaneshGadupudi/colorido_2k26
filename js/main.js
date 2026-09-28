// ============================================================
// COLORIDO 2K26 — MAIN MODULE
// Imports and initializes all sub-modules + shared features
// ============================================================

import { initEvents, closeEventModal } from './events.js';
import { initSchedule } from './schedule.js';
import { initRegistration } from './registration.js';
import { initGallery } from './gallery.js';
import { announcements, tickerText, results, sponsors, faqs } from '../data/announcements.js';
import { icons } from './icons.js';

// ── COUNTDOWN TARGET DATE ──────────────────────────────────
// Change this date to update the countdown
const COUNTDOWN_TARGET = new Date('2026-12-20T09:00:00').getTime();

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  // Scroll appearance
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navToggle.classList.contains('active'));
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================================
// ACTIVE NAVIGATION
// ============================================================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    let current = '';

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================================
// COUNTDOWN TIMER
// ============================================================
function initCountdown() {
  function update() {
    const now = Date.now();
    const distance = COUNTDOWN_TARGET - now;

    if (distance < 0) {
      ['cdDays', 'cdHours', 'cdMinutes', 'cdSeconds'].forEach((id) => {
        document.getElementById(id).textContent = '00';
      });
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
    document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cdMinutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cdSeconds').textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// ============================================================
// TICKER
// ============================================================
function initTicker() {
  const track = document.getElementById('tickerTrack');
  // Duplicate content for seamless loop
  const items = tickerText
    .split('  •  ')
    .map((text) => `<span>${text.trim()}</span>`)
    .join('');
  track.innerHTML = items + items;
}

// ============================================================
// ANNOUNCEMENTS
// ============================================================
function initAnnouncements() {
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

// ============================================================
// RESULTS
// ============================================================
function initResults() {
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

// ============================================================
// SPONSORS
// ============================================================
function initSponsors() {
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

// ============================================================
// FAQ ACCORDION
// ============================================================
function initFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;

  list.innerHTML = faqs
    .map(
      (faq, i) => `
    <div class="faq-item" data-index="${i}">
      <button class="faq-question" aria-expanded="false">
        <span>${faq.question}</span>
        <span class="faq-icon">${icons.chevron}</span>
      </button>
      <div class="faq-answer">
        <p>${faq.answer}</p>
      </div>
    </div>
  `,
    )
    .join('');

  list.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      list.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ============================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  );

  document.querySelectorAll('.reveal, .stagger').forEach((el) => observer.observe(el));
}

// ============================================================
// BACK TO TOP
// ============================================================
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================================
// INIT ALL
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initActiveNav();
  initCountdown();
  initTicker();
  initAnnouncements();
  initResults();
  initSponsors();
  initFAQ();
  initEvents();
  initSchedule();
  initRegistration();
  initGallery();
  initScrollReveal();
  initBackToTop();
  initSmoothScroll();
});
