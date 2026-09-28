// ============================================================
// COLORIDO 2K26 — PAGE SHELL
// Injects the shared header/footer and wires up the site-wide
// behavior every page needs: mobile nav, active-link indicator,
// back-to-top, in-page smooth scroll and scroll-reveal.
// Each page calls initShell('<page-id>') once, on DOMContentLoaded.
// ============================================================

import { renderHeader, renderFooter } from './partials.js';
import { initNavIndicator } from './nav-indicator.js';
import { initScrollReveal } from './reveal.js';
import { createFocusTrap } from './focus-trap.js';

// Past this point the navbar tucks away while scrolling down and
// returns as soon as the user scrolls up.
const HIDE_AFTER = 320;

function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastY = window.scrollY;
  let ticking = false;

  function update() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 30);
    const menuOpen = document.body.classList.contains('menu-open');
    const focusInside = navbar.contains(document.activeElement);
    navbar.classList.toggle('nav-hidden', y > HIDE_AFTER && y > lastY && !menuOpen && !focusInside);
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  // Keyboard users tabbing into the nav always get it back
  navbar.addEventListener('focusin', () => navbar.classList.remove('nav-hidden'));
  update();
}

function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileMenuBackdrop');
  const trap = createFocusTrap(menu);
  const desktop = window.matchMedia('(min-width: 769px)');

  function open() {
    menu.hidden = false;
    backdrop.hidden = false;
    // next frame so the slide-in transition runs from the hidden state
    requestAnimationFrame(() => {
      menu.classList.add('open');
      backdrop.classList.add('open');
    });
    document.body.classList.add('menu-open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    trap.activate();
  }

  function close({ restoreFocus = true } = {}) {
    if (!menu.classList.contains('open')) return;
    menu.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    if (restoreFocus) trap.deactivate();
    setTimeout(() => {
      if (!menu.classList.contains('open')) {
        menu.hidden = true;
        backdrop.hidden = true;
      }
    }, 300);
  }

  toggle.addEventListener('click', () => (menu.classList.contains('open') ? close() : open()));
  backdrop.addEventListener('click', () => close());
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => close({ restoreFocus: false })));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
  desktop.addEventListener('change', (e) => {
    if (e.matches) close({ restoreFocus: false });
  });
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

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

export function initShell(activePage) {
  document.getElementById('site-header').innerHTML = renderHeader(activePage);
  document.getElementById('site-footer').innerHTML = renderFooter();

  initNavbar();
  initMobileMenu();
  initNavIndicator();
  initBackToTop();
  initSmoothScroll();
  initScrollReveal();
}
