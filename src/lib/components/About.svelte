<script>
  import SectionHeading from './SectionHeading.svelte';
  import site from '../data/site.config.js';
</script>

<section id="about">
  <SectionHeading title="About" />
  <div class="columns">
    <div class="bio">
      <h3><span class="dim">$</span> whoami</h3>
      {#each site.bio as paragraph}
        <p>{paragraph}</p>
      {/each}
      <div class="stats">
        {#each site.stats as stat}
          <div class="stat card">
            <span class="stat-label">{stat.label}</span>
            <span class="stat-value">{stat.value}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="panel card">
      <div class="panel-head">
        <span class="lights" aria-hidden="true"></span>
        <span class="path">~/about — profile.ts</span>
      </div>
      <div class="panel-body">
        {#each site.stack as group}
          <div class="group">
            <span class="group-name">// {group.group}</span>
            <ul>
              {#each group.items as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 6rem max(2rem, 8vw);
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-top: 2.5rem;
    align-items: start;
  }
  h3 {
    margin: 0 0 1rem;
    letter-spacing: 0.1em;
    font-size: 1.1rem;
  }
  .dim {
    color: var(--text-dim);
  }
  p {
    color: var(--text);
  }
  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-top: 2rem;
  }
  .stat {
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    border-radius: 10px;
  }
  .stat-label {
    color: var(--text-dim);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
  }
  .stat-value {
    color: var(--green);
    font-size: 0.9rem;
  }
  .panel {
    border-radius: 14px;
    overflow: hidden;
  }
  .panel-head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 1rem;
    border-bottom: var(--border);
    background: rgba(0, 0, 0, 0.3);
  }
  .lights,
  .lights::before,
  .lights::after {
    content: '';
    display: inline-block;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--green-dim);
  }
  .lights {
    position: relative;
    margin-right: 18px;
  }
  .lights::before {
    position: absolute;
    left: 13px;
    top: 0;
  }
  .lights::after {
    position: absolute;
    left: 26px;
    top: 0;
  }
  .path {
    color: var(--text-dim);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
  }
  .panel-body {
    padding: 1.25rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  .group-name {
    color: var(--text-dim);
    font-size: 0.75rem;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  li {
    border: var(--border);
    border-radius: 999px;
    padding: 0.2rem 0.7rem;
    font-size: 0.72rem;
    color: var(--green);
    background: rgba(52, 211, 153, 0.05);
  }
  @media (max-width: 900px) {
    .columns {
      grid-template-columns: 1fr;
    }
  }
</style>
