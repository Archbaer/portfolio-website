<script>
  import { onMount, tick } from 'svelte';
  import '../app.css';
  import MatrixRain from '../lib/components/MatrixRain.svelte';
  import LangToggle from '../lib/components/LangToggle.svelte';
  import { initLang } from '../lib/i18n.svelte.js';
  let { children } = $props();

  onMount(async () => {
    initLang();
    await tick(); // zh text rendered — safe to reveal page (see zh-pending in app.html)
    document.documentElement.classList.remove('zh-pending');
  });
</script>

<MatrixRain />
<LangToggle />
<div class="page">
  {@render children()}
</div>

<style>
  .page {
    position: relative;
    z-index: 1;
  }
</style>
