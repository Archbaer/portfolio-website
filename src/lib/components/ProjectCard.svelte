<script>
  let { project } = $props();
</script>

<a class="card project" href="/projects/{project.slug}">
  <div class="visual v{project.index}"></div>
  <div class="meta">
    <span class="index">{project.index}</span>
    <h3>{project.name}</h3>
    <span class="arrow" aria-hidden="true">→</span>
    <p>{project.tagline}</p>
    <span class="view">View Project <span aria-hidden="true">→</span></span>
  </div>
</a>

<style>
  .project {
    display: flex;
    flex-direction: column;
    color: var(--text);
  }
  .visual {
    height: 140px;
    background:
      repeating-linear-gradient(0deg, transparent 0 3px, rgba(52, 211, 153, 0.06) 3px 4px),
      radial-gradient(ellipse at 50% 120%, rgba(52, 211, 153, 0.25), transparent 60%),
      var(--bg);
    border-bottom: var(--border);
  }
  .v02 { background:
      repeating-linear-gradient(90deg, transparent 0 3px, rgba(52, 211, 153, 0.06) 3px 4px),
      radial-gradient(circle at 50% 40%, rgba(52, 211, 153, 0.2), transparent 55%),
      var(--bg); }
  .v03 { background:
      repeating-linear-gradient(45deg, transparent 0 6px, rgba(52, 211, 153, 0.05) 6px 7px),
      radial-gradient(ellipse at 80% 20%, rgba(52, 211, 153, 0.22), transparent 55%),
      var(--bg); }
  .v04 { background:
      repeating-linear-gradient(0deg, transparent 0 3px, rgba(52, 211, 153, 0.06) 3px 4px),
      radial-gradient(circle at 20% 80%, rgba(52, 211, 153, 0.2), transparent 50%),
      var(--bg); }
  .v05 { background:
      repeating-linear-gradient(90deg, transparent 0 5px, rgba(52, 211, 153, 0.05) 5px 6px),
      radial-gradient(ellipse at 50% 0%, rgba(52, 211, 153, 0.22), transparent 55%),
      var(--bg); }
  .v06 { background:
      repeating-linear-gradient(135deg, transparent 0 5px, rgba(52, 211, 153, 0.05) 5px 6px),
      radial-gradient(circle at 70% 70%, rgba(52, 211, 153, 0.2), transparent 55%),
      var(--bg); }
  .meta {
    padding: 1rem 1.25rem 1.25rem;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: baseline;
    gap: 0.25rem 1rem;
  }
  .index {
    color: var(--text-dim);
    font-size: 0.8rem;
  }
  h3 {
    margin: 0;
    font-size: 1rem;
    letter-spacing: 0.05em;
  }
  .arrow {
    color: var(--green);
  }
  .view {
    grid-column: 1 / -1;
    justify-self: start;
    margin-top: 0.9rem;
    padding: 0.45rem 1.1rem;
    border: 1px solid rgba(52, 211, 153, 0.35);
    border-radius: 999px;
    color: var(--green);
    background: rgba(52, 211, 153, 0.05);
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.65rem;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .project:hover .view {
    background: rgba(52, 211, 153, 0.14);
    box-shadow: var(--glow-soft);
  }
  p {
    grid-column: 1 / -1;
    margin: 0.25rem 0 0;
    color: var(--text-dim);
    font-size: 0.85rem;
  }
</style>
