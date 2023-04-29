import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import replaceAllInserter from 'string.prototype.replaceall';

replaceAllInserter.shim();

const isProd = process.env.NODE_ENV !== 'development';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  base: '/vanilla-range-slider/',
  ...(isProd && { publicDir: false }),
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    // https://vitejs.dev/guide/build.html#library-mode
    lib: {
      entry: path.resolve(__dirname, 'src/plugin/index.ts'),
      name: 'vanilla-range-slider',
      fileName: 'vanilla-range-slider',
      formats: ['es', 'cjs', 'umd'],
    },
  },
});
