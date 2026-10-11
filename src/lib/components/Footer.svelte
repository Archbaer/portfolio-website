<footer>
  <div class="links">
    <a href="/#work">Work</a>
    <span aria-hidden="true">|</span>
    <a href="/#about">About</a>
    <span aria-hidden="true">|</span>
    <a href="/#contact">Contact</a>
  </div>
  <div class="glyphs" aria-hidden="true">□ ○ △</div>
</footer>

<style>
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem max(2rem, 8vw);
    border-top: var(--border);
    color: var(--text-dim);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
  }
  .links {
    display: flex;
    gap: 1rem;
  }
  .links a {
    color: var(--text-dim);
  }
  .links a:hover {
    color: var(--green);
  }
</style>
