<script>
  import { onMount } from 'svelte';
  import { shouldAnimate, nextDrops } from '../rain.js';

  let { opacity = 0.35 } = $props();

  const CHARS = 'アイウエオカキクケコサシスセソ0123456789';
  const FONT = 16;
  let canvas;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w, h, drops, raf;

    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      drops = Array(Math.floor(w / FONT)).fill(0).map(() => Math.floor(Math.random() * -h / FONT)) ;
      if (!shouldAnimate(reduced)) draw(); // canvas.width assignment clears bitmap — repaint static frame
    }

    function draw() {
      ctx.fillStyle = 'rgba(3, 8, 5, 0.08)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#34d399';
      ctx.font = `${FONT}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(ch, i * FONT, drops[i]);
      }
      drops = nextDrops(drops, drops.length, h, FONT);
    }

    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    function onVisibility() {
      if (document.hidden) cancelAnimationFrame(raf);
      else loop();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (shouldAnimate(reduced)) {
      ctx.fillStyle = '#030805';
      ctx.fillRect(0, 0, w, h);
      loop();
      document.addEventListener('visibilitychange', onVisibility);
    } else {
      draw(); // single static frame
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  });
</script>

<canvas bind:this={canvas} style:opacity aria-hidden="true"></canvas>

<style>
  canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
