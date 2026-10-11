import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({ fallback: '404.html' }),
      prerender: { handleHttpError: 'warn' }
    })
  ],
  test: { include: ['tests/**/*.test.js'] }
});
