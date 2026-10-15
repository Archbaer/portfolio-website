<script>
  import ScrambleText from './ScrambleText.svelte';
  import { iconFor } from '../icons.js';
  import { getLang } from '../i18n.svelte.js';

  let { project } = $props();
  let nameScramble;
</script>

<article class="row">
  <header>
    <span class="index">{project.index}</span>
    <h3>
      <a href={project.repo} target="_blank" rel="noopener" onmouseenter={() => nameScramble.play()}>
        <ScrambleText bind:this={nameScramble} text={project.name} />
      </a>
    </h3>
    <a class="repo" href={project.repo} target="_blank" rel="noopener">
      github.com/Archbaer/{project.name} <span aria-hidden="true">↗</span>
    </a>
  </header>

  <p class="desc">{getLang() === 'zh' ? project.description_zh : project.description}</p>

  <ul class="stack">
    {#each project.tags as tag}
      {@const icon = iconFor(tag)}
      <li title={tag}>
        {#if icon}
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path d={icon.path} />
          </svg>
        {/if}
        <span>{tag}</span>
      </li>
    {/each}
  </ul>
</article>

<style>
  .row {
    padding: 1.5rem 0;
    border-top: var(--border);
  }
  .row:last-child {
    border-bottom: var(--border);
  }
  header {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
    flex-wrap: wrap;
  }
  .index {
    color: var(--text-dim);
    font-size: 0.8rem;
  }
  h3 {
    margin: 0;
    font-size: clamp(1.3rem, 3vw, 1.9rem);
    letter-spacing: 0.08em;
    font-weight: 700;
  }
  h3 a {
    color: var(--text);
    transition: color 0.2s, text-shadow 0.2s;
  }
  h3 a:hover {
    color: var(--green);
    text-shadow: var(--glow-soft);
  }
  .repo {
    margin-left: auto;
    color: var(--text-dim);
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }
  .repo:hover {
    color: var(--green);
  }
  .desc {
    color: var(--text-dim);
    max-width: 70ch;
    margin: 0.6rem 0 0.9rem;
  }
  .stack {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .stack li {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    border: var(--border);
    border-radius: 999px;
    padding: 0.25rem 0.8rem;
    font-size: 0.72rem;
    color: var(--green);
    background: rgba(52, 211, 153, 0.05);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .stack li:hover {
    border-color: rgba(52, 211, 153, 0.5);
    box-shadow: var(--glow-soft);
  }
  @media (max-width: 560px) {
    .repo {
      margin-left: 0;
      width: 100%;
    }
  }
</style>
