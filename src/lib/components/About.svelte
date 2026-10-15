<script>
  import { onMount } from 'svelte';
  import SectionHeading from './SectionHeading.svelte';
  import ScrambleText from './ScrambleText.svelte';
  import site from '../data/site.config.js';
  import { t } from '../i18n.svelte.js';

  const DURATION = 2400;
  const STAGGER = 150;

  // scrambler index layout: bio | stats | education (x2 each) | stack (name + items per group) | interests
  // lengths from en dict — zh arrays are parity-tested to match
  const stackBase = t('about.bio').length + t('about.stats').length + t('about.educationList').length * 2;
  const stackCount = site.stack.reduce((n, g) => n + 1 + g.items.length, 0);
  const groupBase = (gi) => stackBase + site.stack.slice(0, gi).reduce((n, g) => n + 1 + g.items.length, 0);

  let section;
  let scramblers = [];
  let playedOnce = false;

  function playAll() {
    scramblers.forEach((s, i) => s.play(i * STAGGER));
  }

  function resetAll() {
    scramblers.forEach((s) => s.reset());
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !playedOnce) {
          playedOnce = true;
          playAll();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  });
</script>

<section id="about" aria-label="About" bind:this={section} onmouseenter={playAll} onmouseleave={resetAll}>
  <SectionHeading title={t('heading.about')} />
  <div class="columns">
    <div class="bio">
      <h3><span class="dim">$</span> whoami</h3>
      {#each t('about.bio') as paragraph, i}
        <p><ScrambleText bind:this={scramblers[i]} text={paragraph} duration={DURATION} auto={false} /></p>
      {/each}
      <div class="stats">
        {#each t('about.stats') as stat, i}
          <div class="stat card">
            <span class="stat-label">{stat.label}</span>
            <span class="stat-value">
              <ScrambleText bind:this={scramblers[t('about.bio').length + i]} text={stat.value} duration={DURATION} auto={false} />
            </span>
          </div>
        {/each}
      </div>

      <div class="cyber edu-panel">
        <h4><span class="dim">//</span> {t('about.education')}</h4>
        {#each t('about.educationList') as edu, i}
          <div class="edu">
            <span class="edu-degree">
              <ScrambleText bind:this={scramblers[t('about.bio').length + t('about.stats').length + i * 2]} text={edu.degree} duration={DURATION} auto={false} />
            </span>
            <span class="edu-school">
              <ScrambleText bind:this={scramblers[t('about.bio').length + t('about.stats').length + i * 2 + 1]} text="{edu.school} — {edu.years}" duration={DURATION} auto={false} />
            </span>
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
        {#each site.stack as group, gi}
          <div class="group">
            <span class="group-name">
              <ScrambleText bind:this={scramblers[groupBase(gi)]} text="// {t('about.stackGroups')[gi]}" duration={DURATION} auto={false} />
            </span>
            <ul>
              {#each group.items as item, ii}
                <li>
                  <ScrambleText bind:this={scramblers[groupBase(gi) + 1 + ii]} text={item} duration={DURATION} auto={false} />
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="panels">
    <div class="cyber">
      <h4><span class="dim">//</span> {t('about.interests')}</h4>
      <ul class="interests">
        {#each t('about.interestsList') as interest, i}
          <li>
            <ScrambleText bind:this={scramblers[stackBase + stackCount + i]} text={interest} duration={DURATION} auto={false} />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2.5rem max(2rem, 8vw);
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1.25rem;
    align-items: start;
  }
  h3 {
    margin: 0 0 1rem;
    letter-spacing: 0.1em;
    font-size: 1.1rem;
  }
  h4 {
    margin: 0 0 1.25rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-size: 0.8rem;
    color: var(--green);
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
  .panel ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .panel li {
    border: var(--border);
    border-radius: 999px;
    padding: 0.2rem 0.7rem;
    font-size: 0.72rem;
    color: var(--green);
    background: rgba(52, 211, 153, 0.05);
  }

  /* cyberpunk panels: angular clipped corners + scanlines + neon edge */
  .panels {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .cyber {
    position: relative;
    padding: 1.5rem 1.75rem 1.75rem;
    background: var(--bg-panel);
    border: var(--border);
    border-left: 2px solid var(--green);
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%);
    overflow: hidden;
  }
  .cyber::after {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent 0 2px,
      rgba(52, 211, 153, 0.03) 2px 3px
    );
    pointer-events: none;
  }
  .edu-panel {
    margin-top: 1.5rem;
  }
  .edu {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .edu + .edu {
    margin-top: 1rem;
  }
  .edu-degree {
    color: var(--text);
    font-size: 0.95rem;
  }
  .edu-school {
    color: var(--text-dim);
    font-size: 0.8rem;
  }
  .interests {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .interests li {
    border: 1px solid rgba(52, 211, 153, 0.35);
    padding: 0.3rem 0.8rem;
    font-size: 0.78rem;
    color: var(--green);
    background: rgba(52, 211, 153, 0.05);
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  @media (max-width: 900px) {
    .columns,
    .panels {
      grid-template-columns: 1fr;
    }
  }
</style>
