<script>
  import SectionHeading from './SectionHeading.svelte';
  import ProjectCard from './ProjectCard.svelte';
  import projects from '../data/projects.json';
</script>

<section id="work">
  <SectionHeading title="Work" />
  <div class="grid">
    {#each projects as project (project.slug)}
      <ProjectCard {project} />
    {/each}
  </div>
</section>

<style>
  section {
    padding: 4rem max(2rem, 8vw);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
  }
  @media (max-width: 900px) {
    .grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 560px) {
    .grid { grid-template-columns: 1fr; }
  }
</style>
