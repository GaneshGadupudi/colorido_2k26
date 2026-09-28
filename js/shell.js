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

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navToggle.classList.contains('active'));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });
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
  initNavIndicator();
  initBackToTop();
  initSmoothScroll();
  initScrollReveal();
}
