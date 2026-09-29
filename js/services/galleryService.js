// ============================================================
// COLORIDO 2K26 — GALLERY SERVICE
// ============================================================

import { getClient } from './base.js';

export async function fetchGalleryImages() {
  const { data, error } = await getClient()
    .from('gallery_images')
    .select('id, url, alt, size, sort_order')
    .order('sort_order', { ascending: true });

  if (error) throw new Error(`Could not load the gallery: ${error.message}`);
  return data ?? [];
}
