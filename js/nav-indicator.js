// ============================================================
// COLORIDO 2K26 — SLIDING NAV INDICATOR (GSAP)
// Positions a small underline beneath the current page's nav
// link. Each page statically renders its own active link (see
// partials.js), so this only needs to track layout, not scroll.
//
// GSAP is loaded as a plain <script> tag from a CDN (see the
// <head> of every page) so this reads the resulting window global.
// ============================================================

const gsap = window.gsap;

export function initNavIndicator() {
  const nav = document.getElementById('navLinks');
  const indicator = document.getElementById('navIndicator');
  if (!nav || !indicator) return;

  function syncToActiveLink() {
    const active = nav.querySelector('a.active');
    if (!active) {
      gsap.set(indicator, { opacity: 0 });
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const linkRect = active.getBoundingClientRect();
    gsap.set(indicator, {
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }

  syncToActiveLink();
  window.addEventListener('resize', syncToActiveLink);
}
