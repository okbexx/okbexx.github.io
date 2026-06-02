import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://okbexx.com',
  base: '/',
  build: {
    inlineStylesheets: 'always',
  },
});
