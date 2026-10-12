<script>
  import { onMount } from 'svelte';

  let active = $state('');

  const sections = [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) active = e.target.id;
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  });
</script>

<nav>
  <a href="/" class="brand glow">PORTFOLIO</a>
  <div class="links">
    {#each sections as s}
      <a href="/#{s.id}" class:active={active === s.id}>
        <span class="dot" aria-hidden="true"></span>{s.label}
      </a>
    {/each}
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    padding: 0.7rem 1.6rem;
    background: rgba(6, 20, 12, 0.55);
    border: var(--border);
    border-radius: 999px;
    z-index: 10;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }
  .brand {
    letter-spacing: 0.35em;
    font-weight: 700;
    font-size: 0.8rem;
  }
  .links {
    display: flex;
    gap: 1.8rem;
  }
  .links a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--text);
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: 0.7rem;
    transition: color 0.2s, text-shadow 0.2s;
  }
  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--green);
    opacity: 0;
    box-shadow: 0 0 6px rgba(52, 211, 153, 0.9);
    transition: opacity 0.2s;
  }
  .links a.active .dot {
    opacity: 1;
  }
  .links a.active,
  .links a:hover {
    color: var(--green);
    text-shadow: 0 0 10px rgba(52, 211, 153, 0.5);
  }
  @media (max-width: 560px) {
    nav {
      gap: 1.2rem;
      padding: 0.6rem 1rem;
      width: calc(100% - 1.5rem);
    }
    .brand {
      letter-spacing: 0.15em;
      font-size: 0.7rem;
    }
    .links {
      gap: 0.9rem;
    }
    .links a {
      letter-spacing: 0.08em;
      font-size: 0.62rem;
    }
  }
</style>
