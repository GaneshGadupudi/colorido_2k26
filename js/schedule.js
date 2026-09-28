// ============================================================
// COLORIDO 2K26 — SCHEDULE MODULE
// Handles schedule tab switching and timeline rendering
// ============================================================

import { schedule, scheduleDays } from '../data/schedule.js';

let currentDay = 'day1';

export function renderSchedule() {
  const container = document.getElementById('scheduleTimeline');
  const label = document.getElementById('scheduleDayLabel');
  if (!container) return;

  const dayData = schedule[currentDay];
  label.textContent = `${dayData.label} — ${dayData.date}`;

  container.innerHTML = dayData.items
    .map(
      (item, i) => `
      <div class="schedule-item">
        <div class="schedule-dot">${String(i + 1).padStart(2, '0')}</div>
        <div class="schedule-content">
          <div class="schedule-time">${item.time}</div>
          <div class="schedule-activity">${item.activity}</div>
          <div class="schedule-venue">${item.venue}</div>
        </div>
      </div>
    `,
    )
    .join('');
}

export function initSchedule() {
  // Build tabs
  const tabsContainer = document.getElementById('scheduleTabs');
  if (!tabsContainer) return;

  tabsContainer.innerHTML = scheduleDays
    .map(
      (day) =>
        `<button class="schedule-tab ${day === currentDay ? 'active' : ''}" data-day="${day}">${schedule[day].label}</button>`,
    )
    .join('');

  tabsContainer.querySelectorAll('.schedule-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.schedule-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      currentDay = tab.dataset.day;
      renderSchedule();
    });
  });

  renderSchedule();
}
