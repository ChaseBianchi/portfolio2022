(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const EMAIL = 'cbianchi@protonmail.com';

  // Theme: follows the system setting (set before first paint by the inline script in <head>)
  // until the visitor uses the toggle, which stores an explicit choice.
  const html = document.documentElement;
  const system = window.matchMedia?.('(prefers-color-scheme: dark)');
  const stored = () => { try { return localStorage.getItem('theme'); } catch { return null; } };
  const applyTheme = theme => {
    html.dataset.theme = theme;
    $$('meta[name="theme-color"]').forEach(meta => { meta.content = theme === 'dark' ? '#111315' : '#f3efe6'; });
    $$('.theme-toggle').forEach(button => {
      const other = theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', `Switch to ${other} mode`);
      $('[data-theme-label]', button).textContent = other[0].toUpperCase() + other.slice(1);
    });
    document.dispatchEvent(new Event('themechange'));
  };
  applyTheme(['light', 'dark'].includes(stored()) ? stored() : system?.matches ? 'dark' : 'light');
  system?.addEventListener?.('change', e => { if (!stored()) applyTheme(e.matches ? 'dark' : 'light'); });
  $$('.theme-toggle').forEach(button => button.addEventListener('click', () => {
    const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', next); } catch { /* private mode: the choice lasts for this page only */ }
    applyTheme(next);
  }));

  // Mobile navigation
  const menu = $('.menu-toggle');
  const nav = $('#nav-links');
  const closeNav = () => {
    nav?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  };
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open);
  });
  if (nav) $$('a', nav).forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav?.classList.contains('open')) {
      closeNav();
      menu?.focus();
    }
  });

  // Sticky top bar: slides away while scrolling down, returns on the way up, and marks the section in view.
  const bar = $('[data-topbar]');
  if (bar && nav) {
    const stage = $('.stage');
    const spy = $$('a[href^="/#"]', nav).map(link => [link, document.getElementById(link.getAttribute('href').slice(2))]).filter(([, section]) => section);
    let last = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      bar.classList.toggle('scrolled', y > 8);
      // On the homepage the bar stays dark while it sits over the dark hero.
      if (stage) bar.classList.toggle('dark', stage.getBoundingClientRect().bottom > bar.offsetHeight);
      if (y < 320 || nav.classList.contains('open')) bar.classList.remove('hidden');
      else if (y > last + 4) bar.classList.add('hidden');
      else if (y < last - 4) bar.classList.remove('hidden');
      last = y;
      let current = null;
      spy.forEach(([link, section]) => { if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) current = link; });
      spy.forEach(([link]) => (link === current ? link.setAttribute('aria-current', 'true') : link.removeAttribute('aria-current')));
    };
    window.addEventListener('scroll', update, { passive: true });
    bar.addEventListener('focusin', () => bar.classList.remove('hidden'));
    update();
  }

  // Contact: copy the address, or open a draft in the visitor's email app. Nothing is sent from here.
  $$('.copy-email').forEach(button => button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      button.textContent = 'Email address copied';
    } catch {
      button.textContent = EMAIL;
    }
  }));
  $$('.contact-form').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const name = String(fields.get('name')).trim();
    const email = String(fields.get('email')).trim();
    const message = String(fields.get('message')).trim();
    const status = $('.form-status', form);
    if (!name || !message) {
      status.textContent = 'Please add your name and a message.';
      return;
    }
    const body = `Hi Chase,\n\n${message}\n\n${name}\n${email}`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('A conversation with ' + name)}&body=${encodeURIComponent(body)}`;
    status.textContent = `Your email app should open. You can also write directly to ${EMAIL}.`;
  }));

  // Reveal below-the-fold blocks as they scroll in. Blocks already on screen are left alone.
  if (window.IntersectionObserver && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    const seen = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      seen.unobserve(entry.target);
    }), { rootMargin: '0px 0px -10% 0px' });
    $$('.section-head, .case-list li, .path-intro, .route li, .lab-grid, .focus-grid article, .contact-section > *, .case-body > section').forEach((block, i) => {
      if (block.getBoundingClientRect().top < innerHeight) return;
      block.classList.add('reveal');
      block.style.transitionDelay = `${(i % 4) * 70}ms`;
      seen.observe(block);
    });
  }

  // Illustrative delivery walkthrough on the agentic delivery case study.
  $$('[data-pipeline]').forEach(widget => {
    let stage = 0;
    const descriptions = [
      'A useful workflow starts with a clear task. Explore the checkpoints.',
      'The agent proposes a plan. A person checks the scope and acceptance criteria before implementation begins.',
      'Plan approved. The agent implements the change in an isolated workspace, with bounded retries and explicit state.',
      'Validation is complete in this example. A person reviews the change and its evidence before approval.',
      'Both human gates passed. The change and its operational context are ready for handoff.',
    ];
    const labels = ['Run walkthrough →', 'Approve the plan →', 'Validate the change →', 'Approve the change →', 'Walkthrough complete ✓'];
    const next = $('.pipeline-next', widget);
    const update = () => {
      $$('.flow-step', widget).forEach((step, i) => {
        step.classList.toggle('active', i === Math.min(stage, 3));
        step.classList.toggle('complete', i < stage);
      });
      $('.flow-status', widget).textContent = descriptions[stage];
      next.textContent = labels[stage];
      next.disabled = stage === 4;
    };
    next?.addEventListener('click', () => { stage = Math.min(stage + 1, 4); update(); });
    $('.pipeline-reset', widget)?.addEventListener('click', () => { stage = 0; update(); });
  });
})();
