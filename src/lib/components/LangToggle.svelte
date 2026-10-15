<script>
  import { getLang, setLang } from '../i18n.svelte.js';
</script>

<div class="lang-toggle" role="group" aria-label="Language">
  <button type="button" class:active={getLang() === 'en'} onclick={() => setLang('en')}>EN</button>
  <span class="sep" aria-hidden="true">|</span>
  <button type="button" class:active={getLang() === 'zh'} onclick={() => setLang('zh')}>中文</button>
</div>

<style>
  .lang-toggle {
    position: fixed;
    top: 1.25rem;
    right: max(1.25rem, 3vw);
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.9rem;
    border: var(--border);
    border-radius: 999px;
    background: var(--bg-panel);
    backdrop-filter: blur(8px);
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    color: var(--text-dim);
    cursor: pointer;
    transition: color 0.2s, text-shadow 0.2s;
  }
  button:hover {
    color: var(--text);
  }
  button.active {
    color: var(--green);
    text-shadow: var(--glow-soft);
  }
  .sep {
    color: var(--text-dim);
    opacity: 0.5;
  }
</style>
