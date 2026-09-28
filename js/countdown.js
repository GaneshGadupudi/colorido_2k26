// ============================================================
// COLORIDO 2K26 — COUNTDOWN MODULE
// ============================================================

// Matches Day 1 reporting time from data/schedule.js (15 OCT 2026, 08:30 AM)
const COUNTDOWN_TARGET = new Date('2026-10-15T08:30:00').getTime();

export function initCountdown() {
  const days = document.getElementById('cdDays');
  if (!days) return;

  function update() {
    const distance = COUNTDOWN_TARGET - Date.now();

    if (distance < 0) {
      ['cdDays', 'cdHours', 'cdMinutes', 'cdSeconds'].forEach((id) => {
        document.getElementById(id).textContent = '00';
      });
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('cdDays').textContent = String(d).padStart(2, '0');
    document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
    document.getElementById('cdMinutes').textContent = String(m).padStart(2, '0');
    document.getElementById('cdSeconds').textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}
