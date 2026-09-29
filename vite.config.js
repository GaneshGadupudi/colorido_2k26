import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname);

export default defineConfig({
  root,
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        events: resolve(root, 'events.html'),
        schedule: resolve(root, 'schedule.html'),
        register: resolve(root, 'register.html'),
        announcements: resolve(root, 'announcements.html'),
        gallery: resolve(root, 'gallery.html'),
        results: resolve(root, 'results.html'),
        sponsors: resolve(root, 'sponsors.html'),
        contact: resolve(root, 'contact.html'),
      },
    },
  },
});
