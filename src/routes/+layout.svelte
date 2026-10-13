<script>
  import '../app.css';
  import MatrixRain from '../lib/components/MatrixRain.svelte';
  let { children } = $props();
</script>

<MatrixRain />
<div class="page">
  {@render children()}
</div>

<style>
  .page {
    position: relative;
    z-index: 1;
  }
</style>
