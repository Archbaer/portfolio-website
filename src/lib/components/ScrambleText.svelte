<script>
  import { onMount } from 'svelte';
  import { scrambleFrame } from '../scramble.js';

  let { text } = $props();

  let display = $state('');
  let el;
  let raf;

  export function play() {
    cancelAnimationFrame(raf);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      display = text;
      return;
    }
    const start = performance.now();
    const DURATION = 900;
    function tick(now) {
      const p = Math.min((now - start) / DURATION, 1);
      display = scrambleFrame(text, p);
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  });
</script>

<span bind:this={el}>{display || text}</span>
