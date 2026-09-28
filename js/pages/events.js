import { initShell } from '../shell.js';
import { initEvents } from '../events.js';

document.addEventListener('DOMContentLoaded', () => {
  initEvents();
  initShell('events');
});
