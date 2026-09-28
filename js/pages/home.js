import { initShell } from '../shell.js';
import { initCountdown } from '../countdown.js';
import { initTicker } from '../ticker.js';
import { initHome } from '../home.js';

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initTicker();
  // Render sections before the shell so scroll-reveal picks up their children
  initHome();
  initShell('home');
});
