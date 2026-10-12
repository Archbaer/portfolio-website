<script>
  import { onMount } from 'svelte';
  import { scrambleFrame } from '../scramble.js';

  let { text, duration = 900, delay = 0, auto = true } = $props();

  let display = $state('');
  let el;
  let raf;
  let timer;

  export function play(delayOverride) {
    cancelAnimationFrame(raf);
    clearTimeout(timer);
    const wait = delayOverride ?? delay;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      display = text;
      return;
    }
    timer = setTimeout(() => {
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        display = scrambleFrame(text, p);
        if (p < 1) raf = requestAnimationFrame(tick);
      }
      raf = requestAnimationFrame(tick);
    }, delay);
  }

  export function reset() {
    cancelAnimationFrame(raf);
    clearTimeout(timer);
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    display = reduced ? text : scrambleFrame(text, 0);
  }

  onMount(() => {
    if (!auto) {
      reset();
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
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
      clearTimeout(timer);
      observer.disconnect();
    };
  });
</script>

<span bind:this={el}>{display || text}</span>
