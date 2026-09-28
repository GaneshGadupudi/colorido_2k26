// ============================================================
// COLORIDO 2K26 — SCHEDULE MODULE
// Day tabs, type filters, time-slot timeline (parallel events
// grouped together), a live "Now / Up next" banner during the
// fest, deep links (?day=2&type=sports) and .ics export.
// ============================================================

import { schedule, scheduleDays } from '../data/schedule.js';
import { icons } from './icons.js';
import { openEventModal, bindEventModal } from './events.js';

// All fest times are IST, so "now" works for visitors in any timezone
const IST_OFFSET = '+05:30';
// The data only has start times; the last slot of a day is treated as this long
const LAST_SLOT_MINUTES = 120;

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'sports', label: 'Sports' },
];

const TYPE_LABELS = {
  cultural: 'Cultural',
  sports: 'Sports',
  ceremony: 'General',
  break: 'Break',
};

const state = { day: 'day1', filter: 'all' };

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── TIME HELPERS ──────────────────────────────────────────
function toMinutes(time) {
  const [, h, m, period] = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  let hours = Number(h) % 12;
  if (period.toUpperCase() === 'PM') hours += 12;
  return hours * 60 + Number(m);
}

function slotDate(isoDate, minutes) {
  const hh = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mm = String(minutes % 60).padStart(2, '0');
  return new Date(`${isoDate}T${hh}:${mm}:00${IST_OFFSET}`);
}

function formatDay(isoDate, options) {
  return new Date(`${isoDate}T12:00:00${IST_OFFSET}`).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', ...options });
}

// Groups a day's items into time slots, each with a start and end Date
function buildSlots(dayKey) {
  const day = schedule[dayKey];
  const byTime = new Map();
  day.items.forEach((item) => {
    const minutes = toMinutes(item.time);
    if (!byTime.has(minutes)) byTime.set(minutes, { time: item.time, minutes, items: [] });
    byTime.get(minutes).items.push(item);
  });

  const slots = [...byTime.values()].sort((a, b) => a.minutes - b.minutes);
  slots.forEach((slot, i) => {
    const endMinutes = slots[i + 1] ? slots[i + 1].minutes : slot.minutes + LAST_SLOT_MINUTES;
    slot.start = slotDate(day.isoDate, slot.minutes);
    slot.end = slotDate(day.isoDate, endMinutes);
  });
  return slots;
}

// Finds the live slot and the one after it, across all three days
function findNow(now = Date.now()) {
  const all = scheduleDays.flatMap((dayKey) => buildSlots(dayKey).map((slot) => ({ ...slot, dayKey })));
  const liveIndex = all.findIndex((s) => now >= s.start.getTime() && now < s.end.getTime());
  const live = all[liveIndex] || null;
  const next = all.find((s) => s.start.getTime() > now) || null;

  return {
    live,
    next,
    before: now < all[0].start.getTime(),
    after: now >= all[all.length - 1].end.getTime(),
    first: all[0],
  };
}

function slotStatus(slot, now = Date.now()) {
  if (now >= slot.end.getTime()) return 'past';
  if (now >= slot.start.getTime()) return 'live';
  return 'upcoming';
}

function slotSummary(slot) {
  const names = slot.items.filter((i) => i.type !== 'break').map((i) => i.activity);
  if (!names.length) return slot.items[0].activity;
  return names.length > 2 ? `${names.slice(0, 2).join(', ')} +${names.length - 2} more` : names.join(' & ');
}

// ── URL STATE ─────────────────────────────────────────────
function readUrlState() {
  const params = new URLSearchParams(window.location.search);
  const dayNum = Number(params.get('day'));
  const type = params.get('type');

  if (dayNum >= 1 && dayNum <= scheduleDays.length) {
    state.day = scheduleDays[dayNum - 1];
  } else {
    // During the fest, open on today's tab
    const { live, next } = findNow();
    const today = (live || next)?.dayKey;
    // en-CA formats as YYYY-MM-DD, matching isoDate
    const todayIso = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    if (today && schedule[today].isoDate === todayIso) state.day = today;
  }

  if (FILTERS.some((f) => f.id === type)) state.filter = type;
}

function writeUrlState() {
  const params = new URLSearchParams();
  params.set('day', String(scheduleDays.indexOf(state.day) + 1));
  if (state.filter !== 'all') params.set('type', state.filter);
  history.replaceState(null, '', `${window.location.pathname}?${params}`);
}

// ── RENDER: TABS ──────────────────────────────────────────
function renderTabs() {
  const tabs = document.getElementById('scheduleTabs');
  tabs.innerHTML = scheduleDays
    .map((dayKey) => {
      const day = schedule[dayKey];
      const selected = dayKey === state.day;
      return `
      <button class="schedule-tab${selected ? ' active' : ''}" role="tab" id="tab-${dayKey}" data-day="${dayKey}"
        aria-selected="${selected}" aria-controls="schedulePanel" tabindex="${selected ? '0' : '-1'}">
        <span class="schedule-tab-label">${day.label}</span>
        <span class="schedule-tab-date">${formatDay(day.isoDate, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
      </button>
    `;
    })
    .join('');
}

function renderFilters() {
  const filters = document.getElementById('scheduleFilters');
  filters.innerHTML = FILTERS.map(
    (f) => `
    <button class="schedule-filter${f.id === state.filter ? ' active' : ''}" data-filter="${f.id}" aria-pressed="${f.id === state.filter}">
      ${f.id !== 'all' ? `<span class="type-dot type-${f.id}" aria-hidden="true"></span>` : ''}${f.label}
    </button>
  `,
  ).join('');
}

// ── RENDER: LIVE BANNER ───────────────────────────────────
function renderNow() {
  const banner = document.getElementById('scheduleNow');
  const { live, next, before, after, first } = findNow();

  if (after) {
    banner.innerHTML = `
      <div class="now-block">
        <span class="now-label">That's a wrap</span>
        <p class="now-title">COLORIDO 2K26 is over — thank you for being part of it.</p>
      </div>
      <a class="now-action" href="results.html">See results →</a>`;
    banner.hidden = false;
    return;
  }

  if (before) {
    const days = Math.ceil((first.start.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    banner.innerHTML = `
      <div class="now-block">
        <span class="now-label">${days <= 1 ? 'Almost here' : `${days} days to go`}</span>
        <p class="now-title">Doors open ${formatDay(schedule[first.dayKey].isoDate, { weekday: 'long', day: 'numeric', month: 'long' })} at ${first.time} — ${slotSummary(first)}</p>
      </div>
      <a class="now-action" href="register.html">Register →</a>`;
    banner.hidden = false;
    return;
  }

  const block = (slot, label, modifier) => `
    <div class="now-block${modifier}">
      <span class="now-label">${modifier ? '<span class="pulse-dot"></span>' : ''}${label}</span>
      <p class="now-title"><strong>${slot.time}</strong> ${slotSummary(slot)}</p>
    </div>`;

  banner.innerHTML = [
    live ? block(live, 'Happening now', ' is-live') : '',
    next ? block(next, 'Up next', '') : '',
    `<button class="now-action" type="button" data-jump="${(live || next).dayKey}">Jump to it →</button>`,
  ].join('');
  banner.hidden = false;
}

// ── RENDER: TIMELINE ──────────────────────────────────────
function renderCard(item) {
  const inner = `
    <span class="type-tag type-${item.type}">${TYPE_LABELS[item.type]}</span>
    <span class="slot-card-title">${item.activity}</span>
    <span class="slot-card-venue">${icons['map-pin']} ${item.venue}</span>
    ${item.eventId ? '<span class="slot-card-cta">Rules, fee &amp; register →</span>' : ''}
  `;
  return item.eventId
    ? `<button class="slot-card type-${item.type}" type="button" data-event-id="${item.eventId}">${inner}</button>`
    : `<div class="slot-card type-${item.type}">${inner}</div>`;
}

function renderTimeline({ animate = true } = {}) {
  const day = schedule[state.day];
  const timeline = document.getElementById('scheduleTimeline');
  const empty = document.getElementById('scheduleEmpty');
  const summary = document.getElementById('scheduleSummary');

  const slots = buildSlots(state.day)
    .map((slot) => ({
      ...slot,
      items: slot.items.filter((item) => state.filter === 'all' || item.type === state.filter),
    }))
    .filter((slot) => slot.items.length);

  const eventCount = slots.flatMap((s) => s.items).filter((i) => i.eventId).length;
  const venues = new Set(slots.flatMap((s) => s.items).filter((i) => i.type !== 'break').map((i) => i.venue));
  summary.innerHTML = `
    <h2 class="schedule-summary-day">${formatDay(day.isoDate, { weekday: 'long', day: 'numeric', month: 'long' })}</h2>
    <p class="schedule-summary-meta">${eventCount} competition${eventCount === 1 ? '' : 's'} · ${venues.size} venue${venues.size === 1 ? '' : 's'} · ${slots[0]?.time ?? ''} onwards</p>
  `;

  empty.hidden = slots.length > 0;
  timeline.innerHTML = slots
    .map((slot) => {
      const status = slotStatus(slot);
      const [clock, period] = slot.time.split(' ');
      const isBreak = slot.items.length === 1 && slot.items[0].type === 'break';

      if (isBreak) {
        const item = slot.items[0];
        return `
        <div class="slot slot-break is-${status}" data-minutes="${slot.minutes}">
          <span class="slot-break-line" aria-hidden="true"></span>
          <span class="slot-break-text">${slot.time} · ${item.activity} · ${item.venue}</span>
          <span class="slot-break-line" aria-hidden="true"></span>
        </div>`;
      }

      return `
      <div class="slot is-${status}" data-minutes="${slot.minutes}">
        <div class="slot-time">
          <span class="slot-clock">${clock}<small>${period}</small></span>
          ${status === 'live' ? '<span class="slot-live"><span class="pulse-dot"></span>Live</span>' : ''}
          ${slot.items.length > 1 ? `<span class="slot-parallel">${slot.items.length} at once</span>` : ''}
        </div>
        <div class="slot-items${slot.items.length > 1 ? ` is-parallel cols-${slot.items.length === 3 ? 3 : 2}` : ''}">
          ${slot.items.map(renderCard).join('')}
        </div>
      </div>`;
    })
    .join('');

  document.getElementById('schedulePanel').setAttribute('aria-labelledby', `tab-${state.day}`);
  document.getElementById('calendarDayLabel').textContent = day.label.replace('Day 0', 'Day ');

  if (animate && window.gsap && !reducedMotion()) {
    window.gsap.fromTo(timeline.children, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.035, ease: 'power2.out', clearProps: 'opacity,transform' });
  }
}

function render() {
  renderTabs();
  renderFilters();
  renderTimeline();
  writeUrlState();
}

// ── CALENDAR EXPORT ───────────────────────────────────────
function icsStamp(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

function icsEscape(text) {
  return text.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1');
}

function downloadCalendar() {
  const day = schedule[state.day];
  const events = buildSlots(state.day).flatMap((slot) =>
    slot.items
      .filter((item) => item.type !== 'break' && (state.filter === 'all' || item.type === state.filter))
      .map((item, i) => [
        'BEGIN:VEVENT',
        `UID:${state.day}-${slot.minutes}-${i}@colorido2k26`,
        `DTSTAMP:${icsStamp(new Date())}`,
        `DTSTART:${icsStamp(slot.start)}`,
        `DTEND:${icsStamp(slot.end)}`,
        `SUMMARY:${icsEscape(`${item.activity} — COLORIDO 2K26`)}`,
        `LOCATION:${icsEscape(`${item.venue}, R.V.R. & J.C. College of Engineering, Guntur`)}`,
        'END:VEVENT',
      ].join('\r\n')),
  );

  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//COLORIDO 2K26//Schedule//EN', ...events, 'END:VCALENDAR'].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const link = Object.assign(document.createElement('a'), {
    href: url,
    download: `colorido-2k26-${day.label.toLowerCase().replace(' ', '-')}.ics`,
  });
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

// ── INTERACTION ───────────────────────────────────────────
function selectDay(dayKey, focus = false) {
  state.day = dayKey;
  render();
  if (focus) document.getElementById(`tab-${dayKey}`).focus();
}

function bindEvents() {
  const tabs = document.getElementById('scheduleTabs');

  tabs.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-day]');
    if (tab) selectDay(tab.dataset.day);
  });

  // Arrow keys move between tabs (WAI-ARIA tabs pattern)
  tabs.addEventListener('keydown', (e) => {
    const index = scheduleDays.indexOf(state.day);
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: scheduleDays.length - 1 };
    if (!(e.key in moves)) return;
    e.preventDefault();
    const target = (moves[e.key] + scheduleDays.length) % scheduleDays.length;
    selectDay(scheduleDays[target], true);
  });

  document.getElementById('scheduleFilters').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-filter]');
    if (!chip) return;
    state.filter = chip.dataset.filter;
    render();
  });

  document.getElementById('scheduleTimeline').addEventListener('click', (e) => {
    const card = e.target.closest('[data-event-id]');
    if (card) openEventModal(card.dataset.eventId);
  });

  document.getElementById('scheduleNow').addEventListener('click', (e) => {
    const jump = e.target.closest('[data-jump]');
    if (!jump) return;
    state.filter = 'all';
    selectDay(jump.dataset.jump);
    const target = document.querySelector('.slot.is-live') || document.querySelector('.slot.is-upcoming');
    target?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'center' });
  });

  document.getElementById('calendarBtn').addEventListener('click', downloadCalendar);

  bindEventModal();
}

export function initSchedule() {
  if (!document.getElementById('scheduleTabs')) return;

  readUrlState();
  render();
  renderNow();
  bindEvents();

  // Keep live/past states fresh while the page stays open
  setInterval(() => {
    renderNow();
    renderTimeline({ animate: false });
  }, 60 * 1000);
}
