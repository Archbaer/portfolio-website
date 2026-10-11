<script>
  import MatrixRain from './MatrixRain.svelte';
  import Cityscape from './Cityscape.svelte';
  import site from '../data/site.config.js';
</script>

<section class="hero">
  <MatrixRain opacity={0.3} />
  <Cityscape />
  <div class="content">
    <h1 class="glow">PORTFOLIO</h1>
    <div class="rule"></div>
    <p>{site.name} — {site.role}</p>
  </div>
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
  }
  h1 {
    margin: 0;
    font-size: clamp(2.5rem, 8vw, 6rem);
    letter-spacing: 0.35em;
    font-weight: 700;
  }
  .rule {
    width: 64px;
    border-top: 2px solid var(--text);
    margin: 1rem 0;
  }
  p {
    color: var(--text-dim);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-size: 0.8rem;
  }
</style>
