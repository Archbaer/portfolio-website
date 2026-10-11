<script>
  import { page } from '$app/state';
</script>

<main>
  <h1 class="glow">{page.status}</h1>
  <p>{page.error?.message ?? 'Lost in the matrix.'}</p>
  <a href="/">← Back to reality</a>
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
