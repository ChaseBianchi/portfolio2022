(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const menu = $('.menu-toggle');
  const nav = $('#nav-links');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('open', open);
  });
  $$('a', nav || document).forEach(a => a.addEventListener('click', () => {
    if (menu) menu.setAttribute('aria-expanded', 'false');
    nav?.classList.remove('open');
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav?.classList.contains('open')) {
      nav.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); menu?.focus();
    }
  });
  $$('.copy-email').forEach(button => button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('cbianchi@protonmail.com'); button.textContent = 'Email address copied'; }
    catch { button.textContent = 'cbianchi@protonmail.com'; }
  }));
  $$('.contact-form').forEach(form => form.addEventListener('submit', e => {
    e.preventDefault(); if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const name = String(fields.get('name')).trim();
    const email = String(fields.get('email')).trim();
    const message = String(fields.get('message')).trim();
    if (!name || !message) { $('.form-status', form).textContent = 'Please add your name and a message.'; return; }
    const body = `Hi Chase,\n\n${message}\n\n${name}\n${email}`;
    location.href = `mailto:cbianchi@protonmail.com?subject=${encodeURIComponent('A conversation with ' + name)}&body=${encodeURIComponent(body)}`;
    $('.form-status', form).textContent = 'Your email app should open. You can also write directly to cbianchi@protonmail.com.';
  }));
  $$('[data-pipeline]').forEach(widget => {
    let stage = 0;
    const descriptions = [
      'A useful workflow starts with a clear task. Explore the checkpoints.',
      'The agent proposes a plan. A person checks the scope and acceptance criteria before implementation begins.',
      'Plan approved. The agent implements the change in an isolated workspace, with bounded retries and explicit state.',
      'Validation is complete in this example. A person reviews the change and its evidence before approval.',
      'Both human gates passed. The change and its operational context are ready for handoff.'
    ];
    const labels = ['Run walkthrough →', 'Approve the plan →', 'Validate the change →', 'Approve the change →', 'Walkthrough complete ✓'];
    const update = () => {
      $$('.flow-step', widget).forEach((step, i) => {
        step.classList.toggle('active', i === Math.min(stage, 3));
        step.classList.toggle('complete', i < stage);
      });
      $('.flow-status', widget).textContent = descriptions[stage];
      $('.pipeline-next', widget).textContent = labels[stage];
      $('.pipeline-next', widget).disabled = stage === 4;
    };
    $('.pipeline-next', widget)?.addEventListener('click', () => { stage = Math.min(stage + 1, 4); update(); });
    $('.pipeline-reset', widget)?.addEventListener('click', () => { stage = 0; update(); });
  });

  const projectData = $('#project-data');
  if (projectData) {
    const projects = JSON.parse(projectData.textContent);
    const selectNode = id => {
      const project = projects.find(p => p.id === id);
      if (!project) return;
      $$('.map-node').forEach(node => {
        const selected = node.dataset.node === id;
        node.classList.toggle('selected', selected);
        node.setAttribute('aria-pressed', String(selected));
      });
      const values = { '#map-number': project.number, '#map-category': project.category, '#map-title': project.title, '#map-summary': project.summary, '#map-metric': project.metric, '#map-metric-label': project.metricLabel };
      Object.entries(values).forEach(([selector, value]) => { $(selector).textContent = value; });
      $('#map-link').href = `/work/${project.id}/`;
    };
    $$('.map-node').forEach(node => node.addEventListener('click', () => selectNode(node.dataset.node)));
  }

})();
