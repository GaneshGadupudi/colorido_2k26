// ============================================================
// COLORIDO 2K26 — DATA STATE HELPER
// Shared loading / error / empty rendering for any page section
// backed by an async Supabase fetch. Keeps every page's fetch
// wiring identical: showLoading -> fetch -> hideState + render,
// or showError with a retry button wired to the same loader.
// ============================================================

export function showLoading(el, message = 'Loading…') {
  if (!el) return;
  el.hidden = false;
  el.className = 'data-state data-state-loading';
  el.innerHTML = `<span class="data-state-spinner" aria-hidden="true"></span><span>${message}</span>`;
}

export function showError(el, message, onRetry) {
  if (!el) return;
  el.hidden = false;
  el.className = 'data-state data-state-error';
  el.innerHTML = `
    <p role="alert">${message}</p>
    ${onRetry ? '<button type="button" class="btn btn-outline data-state-retry">Try Again</button>' : ''}
  `;
  if (onRetry) {
    el.querySelector('.data-state-retry').addEventListener('click', onRetry);
  }
}

export function showEmpty(el, message) {
  if (!el) return;
  el.hidden = false;
  el.className = 'data-state data-state-empty';
  el.innerHTML = `<p>${message}</p>`;
}

export function hideState(el) {
  if (!el) return;
  el.hidden = true;
  el.innerHTML = '';
}
