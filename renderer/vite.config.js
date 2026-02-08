import { defineConfig } from 'vite';

export default defineConfig({
    base: '/isometric-atlanta/',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
});
