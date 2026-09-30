import { initShell } from '../shell.js';
import { initRegistration } from '../registration.js';

document.addEventListener('DOMContentLoaded', () => {
  // Shell first so the header/footer always render, even if the form fails to initialise
  initShell('register');
  try {
    initRegistration();
  } catch (err) {
    console.error('Registration form failed to initialise:', err);
  }
});
