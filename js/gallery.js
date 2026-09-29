// ============================================================
// COLORIDO 2K26 — GALLERY MODULE
// Masonry grid, lightbox, keyboard navigation
// ============================================================

import { fetchGalleryImages } from './services/galleryService.js';
import { icons } from './icons.js';
import { createFocusTrap } from './focus-trap.js';
import { showLoading, showError, showEmpty, hideState } from './data-state.js';

let galleryImages = [];
let currentImageIndex = 0;
let lightboxFocusTrap = null;

export async function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const state = document.getElementById('galleryState');
  if (!grid) return;

  grid.innerHTML = '';
  showLoading(state, 'Loading gallery…');

  try {
    galleryImages = await fetchGalleryImages();
  } catch (err) {
    showError(state, err.message, () => initGallery());
    return;
  }

  if (galleryImages.length === 0) {
    showEmpty(state, 'No photos have been added to the gallery yet.');
    return;
  }

  hideState(state);
  renderGallery();

  // Lightbox controls
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));

  // Click outside to close
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');

  grid.innerHTML = galleryImages
    .map(
      (img, i) => `
      <div class="gallery-item ${img.size}" data-index="${i}" role="button" tabindex="0" aria-label="View image: ${img.alt}">
        <img src="${img.url}" alt="${img.alt}" loading="lazy" />
        <div class="gallery-zoom-icon">${icons.zoom}</div>
      </div>
    `,
    )
    .join('');

  grid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      currentImageIndex = parseInt(item.dataset.index, 10);
      openLightbox();
      activateLightboxFocusTrap();
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        currentImageIndex = parseInt(item.dataset.index, 10);
        openLightbox();
        activateLightboxFocusTrap();
      }
    });
  });
}

function openLightbox() {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const image = galleryImages[currentImageIndex];

  img.src = image.url;
  img.alt = image.alt;
  caption.textContent = `${currentImageIndex + 1} / ${galleryImages.length} — ${image.alt}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('open')) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  if (lightboxFocusTrap) {
    lightboxFocusTrap.deactivate();
    lightboxFocusTrap = null;
  }
}

function activateLightboxFocusTrap() {
  if (lightboxFocusTrap) return;
  lightboxFocusTrap = createFocusTrap(document.getElementById('lightbox'));
  lightboxFocusTrap.activate();
}

function navigateLightbox(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
  if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
  openLightbox();
}
