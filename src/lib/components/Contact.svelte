<script>
  import SectionHeading from './SectionHeading.svelte';
  import site from '../data/site.config.js';
</script>

<section id="contact">
  <SectionHeading title="Contact" />
  <ul>
    <li><a href={site.links.github}>GitHub</a></li>
    <li><a href={site.links.linkedin}>LinkedIn</a></li>
    <li><a href="mailto:{site.links.email}">{site.links.email}</a></li>
  </ul>
</section>

<style>
  section {
    padding: 4rem max(2rem, 8vw);
  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }
  a {
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-size: 0.85rem;
  }
  a:hover {
    text-shadow: 0 0 8px rgba(0, 255, 65, 0.8);
  }
</style>
