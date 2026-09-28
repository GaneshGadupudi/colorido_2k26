import { initShell } from '../shell.js';
import { initSponsors } from '../sponsors.js';

document.addEventListener('DOMContentLoaded', () => {
  initSponsors();
  initShell('sponsors');
});
