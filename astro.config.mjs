import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://okbexx.github.io',
  base: '/',
  build: {
    inlineStylesheets: 'always',
  },
});
