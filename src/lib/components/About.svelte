<script>
  import SectionHeading from './SectionHeading.svelte';
  import site from '../data/site.config.js';
</script>

<section id="about">
  <SectionHeading title="About" />
  {#each site.bio as paragraph}
    <p>{paragraph}</p>
  {/each}
</section>

<style>
  section {
    padding: 4rem max(2rem, 8vw);
    max-width: 900px;
  }
  p {
    color: var(--text);
  }
</style>
