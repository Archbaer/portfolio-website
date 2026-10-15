<script>
  import { page } from '$app/state';
  import { t } from '../lib/i18n.svelte.js';
</script>

<main>
  <h1 class="glow">{page.status}</h1>
  <p>{page.error?.message ?? t('error.lost')}</p>
  <a href="/">{t('error.back')}</a>
</main>

<style>
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  h1 {
    font-size: 4rem;
    margin: 0;
  }
  p {
    color: var(--text-dim);
  }
</style>
