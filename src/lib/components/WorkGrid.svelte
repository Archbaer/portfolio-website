<script>
  import SectionHeading from './SectionHeading.svelte';
  import WorkRow from './WorkRow.svelte';
  import projects from '../data/projects.json';
</script>

<section id="work">
  <SectionHeading title="Selected Work" />
  <div class="rows">
    {#each projects as project (project.slug)}
      <WorkRow {project} />
    {/each}
  </div>
</section>

<style>
  section {
    padding: 6rem max(2rem, 8vw);
  }
  .rows {
    margin-top: 2rem;
  }
</style>
