import { initShell } from '../shell.js';
import { initRegistration } from '../registration.js';

document.addEventListener('DOMContentLoaded', () => {
  initRegistration();
  initShell('register');
});
