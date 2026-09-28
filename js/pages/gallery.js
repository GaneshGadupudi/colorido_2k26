import { initShell } from '../shell.js';
import { initGallery } from '../gallery.js';

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initShell('gallery');
});
