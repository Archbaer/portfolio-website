<script>
  import { onMount } from 'svelte';
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
  <div class="content">
    <h1>
      <span class="glow">DANIEL</span> <span class="white">KEBAILI</span><span class="cursor" aria-hidden="true"></span>
    </h1>
    <div class="rule"></div>
    <p class="tagline">{site.role}</p>

    <div class="boot" aria-label="Terminal boot sequence">
      {#each typed as line}
        <div class="boot-line">
          <span class="prompt">{line.prompt}</span>{line.text}{#if line.ok && !line.typing}<span class="ok">[OK]</span>{/if}
        </div>
      {/each}
      {#if bootDone}<span class="cursor" aria-hidden="true"></span>{/if}
    </div>

    <div class="socials">
      <a href={site.links.github} target="_blank" rel="noopener" aria-label="GitHub">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
      </a>
      <a href={site.links.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.27 2.2-3.27 4.48V24H8V8z" />
        </svg>
      </a>
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
    font-size: clamp(1.75rem, 8vw, 5.5rem);
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
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-size: 1.05rem;
    margin: 0 0 2rem;
  }
  .boot {
    min-height: 6.5rem;
    margin-bottom: 1.75rem;
    font-size: 0.85rem;
    color: var(--text-dim);
  }
  .socials {
    display: flex;
    gap: 1.4rem;
    margin-bottom: 2.25rem;
  }
  .socials a {
    display: inline-flex;
    color: var(--text);
    transition: color 0.2s, transform 0.2s, filter 0.2s;
  }
  .socials a:hover {
    color: var(--green);
    transform: translateY(-2px);
    filter: drop-shadow(0 0 6px rgba(52, 211, 153, 0.5));
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
