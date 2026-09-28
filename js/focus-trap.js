// ============================================================
// COLORIDO 2K26 — FOCUS TRAP UTILITY
// Keeps keyboard focus inside an open dialog and restores it
// to the element that opened the dialog when it closes.
// ============================================================

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function createFocusTrap(container) {
  let previouslyFocused = null;

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;
    const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetParent !== null,
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return {
    activate() {
      previouslyFocused = document.activeElement;
      container.addEventListener('keydown', handleKeydown);
      const focusable = container.querySelectorAll(FOCUSABLE_SELECTOR);
      (focusable[0] || container).focus();
    },
    deactivate() {
      container.removeEventListener('keydown', handleKeydown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
      previouslyFocused = null;
    },
  };
}
