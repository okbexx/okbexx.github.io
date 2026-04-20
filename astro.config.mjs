import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://okbexx.github.io',
  base: '',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
