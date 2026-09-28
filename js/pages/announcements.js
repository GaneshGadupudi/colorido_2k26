import { initShell } from '../shell.js';
import { initAnnouncements } from '../announcements.js';

document.addEventListener('DOMContentLoaded', () => {
  initAnnouncements();
  initShell('announcements');
});
