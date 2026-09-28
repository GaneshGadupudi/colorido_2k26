import { initShell } from '../shell.js';
import { initCountdown } from '../countdown.js';
import { initTicker } from '../ticker.js';

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initTicker();
  initShell('home');
});
