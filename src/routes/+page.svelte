<script>
  import Hero from '../lib/components/Hero.svelte';
  import WorkGrid from '../lib/components/WorkGrid.svelte';
  import About from '../lib/components/About.svelte';
  import Contact from '../lib/components/Contact.svelte';
  import { getLang, t } from '../lib/i18n.svelte.js';
</script>

<svelte:head>
  <title>{t('meta.title')}</title>
  <meta name="description" content={t('meta.description')} />
</svelte:head>

<main>
  {#key getLang()}
    <Hero />
    <WorkGrid />
    <About />
  {/key}
  <Contact />
</main>
