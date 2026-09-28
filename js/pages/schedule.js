import { initShell } from '../shell.js';
import { initSchedule } from '../schedule.js';

document.addEventListener('DOMContentLoaded', () => {
  initSchedule();
  initShell('schedule');
});
