import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({ fallback: '404.html' }),
      prerender: { handleHttpError: 'warn' },
      csp: {
        mode: 'hash',
        directives: {
          'default-src': ['self'],
          'script-src': ['self'],
          'style-src': ['self', 'unsafe-inline'],
          'font-src': ['self', 'data:'],
          'img-src': ['self', 'data:'],
          'connect-src': ['self', 'https://api.web3forms.com'],
          'object-src': ['none'],
          'base-uri': ['none'],
          'form-action': ['self']
        }
      }
    })
  ],
  test: { include: ['tests/**/*.test.js'] }
});
