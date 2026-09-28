import { initShell } from '../shell.js';
import { initResults } from '../results.js';

document.addEventListener('DOMContentLoaded', () => {
  initResults();
  initShell('results');
});
