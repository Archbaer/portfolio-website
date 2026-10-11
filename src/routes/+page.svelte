<script>
  import Nav from '../lib/components/Nav.svelte';
  import Hero from '../lib/components/Hero.svelte';
  import WorkGrid from '../lib/components/WorkGrid.svelte';
  import About from '../lib/components/About.svelte';
  import Contact from '../lib/components/Contact.svelte';
  import Footer from '../lib/components/Footer.svelte';
</script>

<svelte:head>
  <title>Archbaer — Portfolio</title>
</svelte:head>

<Nav />
<main>
  <Hero />
  <WorkGrid />
  <About />
  <Contact />
</main>
<Footer />
