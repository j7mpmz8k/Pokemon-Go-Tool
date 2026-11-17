import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'static',
    emptyOutDir: false,
    lib: {
      entry: 'src/pogo.ts',
      formats: ['es'],
      fileName: () => 'pogo.js',
    },
  },
});
