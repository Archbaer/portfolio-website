<nav>
  <a href="/" class="brand glow">PORTFOLIO</a>
  <div class="links">
    <a href="/#work">Work</a>
    <a href="/#about">About</a>
    <a href="/#contact">Contact</a>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: min(1100px, calc(100% - 2rem));
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.25rem;
    background: rgba(4, 16, 8, 0.85);
    border: var(--border);
    z-index: 10;
    backdrop-filter: blur(4px);
  }
  .brand {
    letter-spacing: 0.4em;
    font-weight: 700;
    font-size: 0.85rem;
  }
  .links {
    display: flex;
    gap: 2rem;
  }
  .links a {
    color: var(--text);
    text-transform: uppercase;
    letter-spacing: 0.3em;
    font-size: 0.75rem;
  }
  .links a:hover {
    color: var(--green);
    text-shadow: 0 0 8px rgba(0, 255, 65, 0.8);
  }
</style>
