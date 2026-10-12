<script>
  import { onMount } from 'svelte';
  import Cityscape from './Cityscape.svelte';
  import site from '../data/site.config.js';

  const BOOT_LINES = [
    { prompt: 'C:\\>', text: ' initializing portfolio...' },
    { prompt: '>', text: ' loading projects', ok: true },
    { prompt: '>', text: ' connecting visuals', ok: true },
    { prompt: '>', text: ' ready.' }
  ];

  let typed = $state([]);
  let bootDone = $state(false);

  onMount(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      typed = BOOT_LINES;
      bootDone = true;
      return;
    }
    let line = 0;
    let char = 0;
    const timer = setInterval(() => {
      const current = BOOT_LINES[line];
      char++;
      typed = [
        ...BOOT_LINES.slice(0, line),
        { ...current, text: current.text.slice(0, char), typing: true }
      ];
      if (char >= current.text.length) {
        line++;
        char = 0;
        if (line >= BOOT_LINES.length) {
          typed = BOOT_LINES;
          bootDone = true;
          clearInterval(timer);
        }
      }
    }, 28);
    return () => clearInterval(timer);
  });
</script>

<section class="hero">
  <Cityscape />
  <div class="content">
    <h1>
      <span class="glow">PORT</span><span class="white">FOLIO</span><span class="cursor" aria-hidden="true"></span>
    </h1>
    <div class="rule"></div>
    <p class="tagline">{site.name} — {site.role}</p>

    <div class="boot" aria-label="Terminal boot sequence">
      {#each typed as line}
        <div class="boot-line">
          <span class="prompt">{line.prompt}</span>{line.text}{#if line.ok && !line.typing}<span class="ok">[OK]</span>{/if}
        </div>
      {/each}
      {#if bootDone}<span class="cursor" aria-hidden="true"></span>{/if}
    </div>

    <a class="pill-btn" href="#work">Explore Work <span aria-hidden="true">→</span></a>
  </div>
  <a class="scroll-cue" href="#work" aria-label="Scroll to work">
    <span>scroll</span>
    <span class="chev" aria-hidden="true">↓</span>
  </a>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  .content {
    position: relative;
    z-index: 2;
    padding: 0 max(2rem, 8vw);
    max-width: 720px;
  }
  h1 {
    margin: 0;
    font-size: clamp(2.5rem, 7vw, 5.5rem);
    letter-spacing: 0.15em;
    font-weight: 700;
    line-height: 1.05;
    white-space: nowrap;
  }
  h1 .cursor {
    width: 0.35em;
    height: 0.85em;
    vertical-align: -0.05em;
    margin-left: 0.08em;
  }
  .white {
    color: #e8f5ee;
    font-weight: 400;
    text-shadow: 0 0 18px rgba(232, 245, 238, 0.15);
  }
  .rule {
    width: 64px;
    border-top: 2px solid var(--text);
    margin: 1.25rem 0;
  }
  .tagline {
    color: var(--text-dim);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin: 0 0 2rem;
  }
  .boot {
    min-height: 6.5rem;
    margin-bottom: 2rem;
    font-size: 0.85rem;
    color: var(--text-dim);
  }
  .boot-line {
    white-space: pre-wrap;
  }
  .prompt {
    color: var(--green);
  }
  .ok {
    color: var(--green);
    margin-left: 1.5rem;
  }
  .scroll-cue {
    position: absolute;
    right: max(2rem, 6vw);
    bottom: 3rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.4em;
    font-size: 0.65rem;
  }
  .chev {
    color: var(--green);
    animation: drift 2s ease-in-out infinite;
  }
  @keyframes drift {
    50% { transform: translateY(6px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .chev { animation: none; }
  }
  @media (max-width: 560px) {
    .scroll-cue { display: none; }
  }
</style>
