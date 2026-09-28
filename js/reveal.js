// ============================================================
// COLORIDO 2K26 — SCROLL REVEAL (GSAP)
// Fades/lifts sections and grid items into view as the user
// scrolls. Replaces the old CSS nth-child stagger (capped at 12
// items) with a single JS-driven stagger that scales to any grid
// size, and skips the motion entirely for prefers-reduced-motion.
//
// GSAP + ScrollTrigger are loaded as plain <script> tags from a
// CDN (see the <head> of every page) so the site runs on any
// static server with no build step — this module just reads the
// resulting window globals.
// ============================================================

const gsap = window.gsap;
if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

export function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('.reveal, .stagger > *', { opacity: 1, y: 0 });
    return;
  }

  document.querySelectorAll('.reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      },
    );
  });

  document.querySelectorAll('.stagger').forEach((group) => {
    const items = group.children;
    if (!items.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: group,
          start: 'top 88%',
          once: true,
        },
      },
    );
  });
}
