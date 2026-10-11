<script>
  import Nav from '../../../lib/components/Nav.svelte';
  import MatrixRain from '../../../lib/components/MatrixRain.svelte';
  let { data } = $props();
  const project = $derived(data.project);
</script>

<svelte:head>
  <title>{project.name} — Archbaer</title>
</svelte:head>

<div class="bg"><MatrixRain opacity={0.12} /></div>
<Nav />
<main>
  <a class="back" href="/#work">← Work</a>
  <span class="index">{project.index}</span>
  <h1 class="glow">{project.name}</h1>
  <p class="tagline">{project.tagline}</p>
  <p class="desc">{project.description}</p>
  <ul class="tags">
    {#each project.tags as tag}
      <li>{tag}</li>
    {/each}
  </ul>
  <a class="repo" href={project.repo}>View on GitHub →</a>
</main>

<style>
  .bg {
    position: fixed;
    inset: 0;
    z-index: 0;
  }
  main {
    position: relative;
    z-index: 1;
    max-width: 760px;
    margin: 0 auto;
    padding: 8rem 2rem 4rem;
  }
  .back {
    color: var(--text-dim);
    font-size: 0.85rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .index {
    display: block;
    margin-top: 3rem;
    color: var(--text-dim);
  }
  h1 {
    margin: 0.5rem 0;
    letter-spacing: 0.15em;
    font-size: clamp(1.75rem, 5vw, 3rem);
  }
  .tagline {
    color: var(--text);
    font-size: 1.05rem;
  }
  .desc {
    color: var(--text-dim);
  }
  .tags {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .tags li {
    border: var(--border);
    padding: 0.2rem 0.6rem;
    font-size: 0.75rem;
    color: var(--green);
  }
  .repo {
    display: inline-block;
    margin-top: 1.5rem;
    letter-spacing: 0.1em;
  }
</style>
