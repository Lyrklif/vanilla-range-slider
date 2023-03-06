import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

const base = '/vanilla-range-slider/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createHtmlPlugin({ minify: true })],
  base,
});
