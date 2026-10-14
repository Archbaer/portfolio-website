import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  WEB3FORMS: {
    public: true,
    static: true, // inlined at build time — public key, safe to expose
    // optional locally so builds/tests pass without it; must be set in Vercel
    schema: (value) => value ?? ''
  }
});
