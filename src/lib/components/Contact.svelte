<script>
  import { WEB3FORMS } from '$app/env/public';
  import SectionHeading from './SectionHeading.svelte';
  import site from '../data/site.config.js';
  import { sanitize, validateForm, LIMITS } from '../form.js';
  import { t } from '../i18n.svelte.js';

  let name = $state('');
  let email = $state('');
  let message = $state('');
  let botcheck = $state('');
  let errors = $state([]);
  let sending = $state(false);
  let sent = $state(false);

  async function submit() {
    const clean = {
      name: sanitize(name, LIMITS.name),
      email: sanitize(email, LIMITS.email),
      message: sanitize(message, LIMITS.message)
    };
    errors = validateForm(clean);
    if (errors.length > 0) return;

    sending = true;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS,
          ...clean,
          botcheck
        })
      });
      const data = await res.json();
      if (data.success) sent = true;
      else errors.push(`${t('form.send_failed')} — ${data.message || t('form.try_again')}`);
    } catch {
      errors.push(t('form.network_error'));
    } finally {
      sending = false;
    }
  }

  const socials = [
    {
      label: 'GitHub',
      href: site.links.github,
      icon: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z'
    },
    {
      label: 'LinkedIn',
      href: site.links.linkedin,
      icon: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-8.5c0-2.03-.04-4.64-2.83-4.64-2.83 0-3.27 2.2-3.27 4.48V24H8V8z'
    }
  ];
</script>

<section id="contact">
  <SectionHeading title={t('heading.contact')} />
  <div class="columns">
    <div class="socials">
      <p class="hint">{t('contact.hint')}</p>
      <ul>
        {#each socials as s}
          <li>
            <a href={s.href} target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d={s.icon} />
              </svg>
              <span>{s.label}</span>
              <span class="arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <form class="terminal card" onsubmit={(e) => { e.preventDefault(); submit(); }}>
      <div class="term-head">
        <span class="path">~/contact ~ $</span>
      </div>
      <div class="term-body">
        {#if sent}
          <p class="ok-line">&gt; {t('contact.validating')} <span class="ok">[OK]</span></p>
          <p class="ok-line">&gt; {t('contact.queued')} <span class="ok">[OK]</span></p>
          <p class="ok-line">&gt; {t('contact.thanks')}</p>
          <p class="ok-line">
            &gt; {t('contact.continue')}
            <a class="next-link" href={site.links.github} target="_blank" rel="noopener">github ↗</a>
            <a class="next-link" href={site.links.linkedin} target="_blank" rel="noopener">linkedin ↗</a>
            <span class="cursor" aria-hidden="true"></span>
          </p>
        {:else}
          <label>
            <span class="prompt">&gt; {t('contact.name')}</span>
            <input bind:value={name} type="text" autocomplete="name" maxlength={LIMITS.name} />
          </label>
          <label>
            <span class="prompt">&gt; {t('contact.email')}</span>
            <input bind:value={email} type="text" inputmode="email" autocomplete="email" maxlength={LIMITS.email} />
          </label>
          <label>
            <span class="prompt">&gt; {t('contact.message')}</span>
            <textarea bind:value={message} rows="4" maxlength={LIMITS.message}></textarea>
          </label>
          <!-- honeypot: humans never see or fill this; bots do -->
          <input class="hp" bind:value={botcheck} type="text" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <div role="alert">
            {#each errors as err}
              <p class="err">&gt; {t(err)}</p>
            {/each}
          </div>
          <button class="pill-btn" type="submit" disabled={sending}>$ {sending ? t('contact.sending') : t('contact.send')}</button>
        {/if}
      </div>
    </form>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2.5rem max(2rem, 8vw);
  }
  .columns {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 2rem;
    margin-top: 1.25rem;
    align-items: start;
  }
  .hint {
    color: var(--text-dim);
    font-size: 0.8rem;
    margin-top: 0;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  li a {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.85rem 1.1rem;
    border: var(--border);
    border-radius: 12px;
    color: var(--text);
    background: var(--bg-panel);
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  }
  li a:hover {
    border-color: rgba(52, 211, 153, 0.5);
    box-shadow: var(--glow-soft);
    transform: translateX(4px);
    color: var(--green);
  }
  .arrow {
    margin-left: auto;
    color: var(--text-dim);
  }
  .terminal {
    border-radius: 14px;
    overflow: hidden;
  }
  .term-head {
    padding: 0.6rem 1rem;
    border-bottom: var(--border);
    background: rgba(0, 0, 0, 0.3);
  }
  .path {
    color: var(--text-dim);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
  }
  .term-body {
    padding: 1.25rem 1.5rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }
  .prompt {
    color: var(--text-dim);
    font-size: 0.8rem;
  }
  input,
  textarea {
    background: rgba(0, 0, 0, 0.35);
    border: var(--border);
    border-radius: 8px;
    color: var(--text);
    font-family: inherit;
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    resize: vertical;
  }
  input:focus,
  textarea:focus {
    border-color: rgba(52, 211, 153, 0.55);
    box-shadow: 0 0 12px rgba(52, 211, 153, 0.15);
  }
  .err {
    margin: 0;
    color: #f87171;
    font-size: 0.8rem;
  }
  .hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
  }
  .ok-line {
    margin: 0;
    color: var(--text);
    font-size: 0.85rem;
  }
  .ok {
    color: var(--green);
  }
  .next-link {
    color: var(--green);
    margin-left: 0.75rem;
    border-bottom: 1px solid rgba(52, 211, 153, 0.35);
    transition: text-shadow 0.2s, border-color 0.2s;
  }
  .next-link:hover {
    text-shadow: var(--glow-soft);
    border-color: var(--green);
  }
  .pill-btn {
    align-self: flex-start;
  }
  @media (max-width: 900px) {
    .columns {
      grid-template-columns: 1fr;
    }
  }
</style>
