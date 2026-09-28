// ============================================================
// COLORIDO 2K26 — GALLERY MODULE
// Masonry grid, lightbox, keyboard navigation
// ============================================================

import { galleryImages } from '../data/announcements.js';
import { icons } from './icons.js';

let currentImageIndex = 0;

export function initGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = galleryImages
    .map(
      (img, i) => `
      <div class="gallery-item ${img.size}" data-index="${i}">
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
    });
  });

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
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
  if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
  openLightbox();
}
