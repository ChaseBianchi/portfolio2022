// Homepage hero: a simulated delivery run. The visitor assigns a ticket and acts as the human
// at both approval gates. Everything runs in the browser; no model or network calls.
(() => {
  'use strict';
  const root = document.querySelector('[data-run]');
  if (!root) return;
  const $ = (s, r = root) => r.querySelector(s);
  const $$ = (s, r = root) => [...r.querySelectorAll(s)];
  const reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(done => setTimeout(done, reduced ? ms * 0.15 : ms));
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const WORD_LIMIT = 60;
  const TICKETS = {
    brief: {
      key: 'CB-101',
      title: 'Brief me on Chase in 30 seconds',
      plan: ['Lead with the current role', 'Cover four years of delivery work in one sentence', 'End with the unconventional part'],
      revision: 'Three sentences, no adjectives',
      heading: 'The 30-second brief',
      body: 'Associate Director and Senior Forward Deployed Engineer at Vista Equity Partners. Four years at Slalom building enterprise platforms, then agentic delivery systems and developer tooling. Before software: a decade as a professional poker player and a World Series of Poker bracelet.',
      links: [['Read the full path', '#path']],
    },
    work: {
      key: 'CB-102',
      title: 'Show me the agentic delivery work',
      plan: ['Pull the agentic delivery case study', 'Lead with the outcome and its number', 'Link the engineering decisions'],
      revision: 'Say what the visitor just did',
      heading: 'Non-firing prototype to production rollout in under five weeks',
      body: 'An event-driven agent fleet that moves a ticket through planning, implementation, review, and human approval, with two mandatory gates, bounded retries, and durable state. You just ran a small model of it and approved at both gates.',
      links: [['Open the case study', '/work/agentic-delivery/'], ['See all four', '#work']],
    },
    poker: {
      key: 'CB-103',
      title: 'Why does a poker player build agent systems?',
      plan: ['Explain the connection in plain terms', 'Skip the metaphors', 'Offer something to try instead of a claim'],
      revision: 'Keep it to one idea',
      heading: 'Both are decisions under uncertainty',
      body: 'Poker taught me to grade a decision by its expected value, not by how one hand turned out. Agent systems need the same discipline: explicit state, bounded risk, and a person at the points where judgment matters.',
      links: [['Test it in the decision lab', '#lab']],
    },
    resume: {
      key: 'CB-104',
      title: 'Get me the resume',
      plan: ['Locate the current resume', 'Confirm it lists the Vista role', 'Hand over the page and the PDF'],
      revision: 'Put the PDF link first',
      heading: 'Resume, current as of November 2026',
      body: 'Two pages. Vista Equity Partners from November 2026, Slalom from 2022 to 2026, and the agentic delivery, AI Hub, and developer enablement work in detail.',
      links: [['Open the resume', '/resume/'], ['Download the PDF', '/assets/chase-bianchi-resume.pdf']],
    },
  };
  const STAGES = [
    ['ticket', 'Ticket assigned'],
    ['planner', 'Planner is working'],
    ['gate1', 'Gate 1: waiting for your approval'],
    ['builder', 'Builder is working'],
    ['reviewer', 'Reviewer is checking'],
    ['gate2', 'Gate 2: waiting for your approval'],
    ['shipped', 'Shipped'],
  ];

  const graph = $('.graph');
  const status = $('[data-run-status]');
  const runId = $('[data-run-id]');
  const logBox = $('[data-run-log]');
  const panel = $('[data-run-panel]');
  const idlePanel = [...panel.childNodes].map(node => node.cloneNode(true));
  let busy = false;

  const log = (who, text) => {
    const line = el('p', 'log-line');
    line.append(el('span', `log-who who-${who}`, who), el('span', null, text));
    logBox.append(line);
    logBox.scrollTop = logBox.scrollHeight;
  };

  // Send a few dots down the edge leading into the stage that just started.
  const pulseEdge = index => {
    const path = $(`[data-edge="${index}"]`);
    const layer = $('.particles');
    if (reduced || !path?.getTotalLength || !layer || !window.requestAnimationFrame) return;
    const length = path.getTotalLength();
    [0, 140, 280].forEach(delay => {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3.5');
      layer.append(dot);
      const start = performance.now() + delay;
      const step = now => {
        const t = Math.min(Math.max((now - start) / 650, 0), 1);
        const point = path.getPointAtLength(length * t);
        dot.setAttribute('cx', point.x);
        dot.setAttribute('cy', point.y);
        if (t < 1) requestAnimationFrame(step); else dot.remove();
      };
      requestAnimationFrame(step);
    });
  };

  const setStage = name => {
    const index = STAGES.findIndex(([id]) => id === name);
    graph.classList.toggle('idle', index < 0);
    $$('.node').forEach((node, i) => {
      node.classList.toggle('done', index >= 0 && (i < index || name === 'shipped'));
      node.classList.toggle('active', i === index && name !== 'shipped');
    });
    $$('.edge').forEach((edge, i) => edge.classList.toggle('done', i < index));
    status.textContent = index < 0 ? 'Waiting for a ticket' : STAGES[index][1];
    if (index > 0) pulseEdge(index - 1);
    const node = $$('.node')[index];
    if (node) root.dispatchEvent(new CustomEvent('run:stage', { bubbles: true, detail: node.getBoundingClientRect() }));
  };

  // Render a gate and resolve with 'approve' or 'reject' when the visitor decides.
  const gate = ({ label, title, content, approve, reject }) => new Promise(resolve => {
    const card = el('div', 'gate');
    const actions = el('div', 'gate-actions');
    const yes = el('button', 'button', approve);
    yes.type = 'button';
    yes.addEventListener('click', () => resolve('approve'));
    actions.append(yes);
    if (reject) {
      const no = el('button', 'text-button', reject);
      no.type = 'button';
      no.addEventListener('click', () => resolve('reject'));
      actions.append(no);
    }
    card.append(el('p', 'gate-label', label), el('h3', null, title), content, actions);
    panel.replaceChildren(card);
    yes.focus({ preventScroll: true });
  });

  const planList = steps => {
    const list = el('ol', 'gate-plan');
    steps.forEach(step => list.append(el('li', null, step)));
    return list;
  };
  const preview = ticket => {
    const box = el('div', 'gate-preview');
    box.append(el('strong', null, ticket.heading), el('p', null, ticket.body));
    return box;
  };

  const deliver = (ticket, stats) => {
    const card = el('div', 'deliverable');
    const links = el('div', 'deliverable-links');
    ticket.links.forEach(([text, href], i) => {
      const link = el('a', i ? 'text-link' : 'button', text);
      link.href = href;
      links.append(link);
    });
    const again = el('button', 'text-button', 'Run another ticket');
    again.type = 'button';
    again.addEventListener('click', reset);
    card.append(
      el('p', 'gate-label', `${ticket.key} · shipped`),
      el('h3', null, ticket.heading),
      el('p', null, ticket.body),
      links,
      el('p', 'run-stats', `${stats.approvals} human approvals · ${stats.changes} change request${stats.changes === 1 ? '' : 's'} · 1 retry · ${stats.seconds}s`),
      again,
    );
    panel.replaceChildren(card);
    links.firstChild.focus({ preventScroll: true });
  };

  const run = async id => {
    const ticket = TICKETS[id];
    if (!ticket || busy) return;
    busy = true;
    const started = Date.now();
    const words = ticket.body.split(/\s+/).length;
    let changes = 0;
    let plan = ticket.plan;
    runId.textContent = ticket.key;
    logBox.replaceChildren();
    panel.replaceChildren();

    setStage('ticket');
    log('ticket', `${ticket.key} assigned: “${ticket.title}”`);
    await wait(700);
    setStage('planner');
    log('planner', 'reading the ticket and the published pages');
    await wait(900);
    log('planner', `plan drafted, ${plan.length} steps`);
    await wait(500);

    setStage('gate1');
    while (await gate({ label: 'Gate 1 · plan review · your call', title: 'Approve this plan?', content: planList(plan), approve: 'Approve plan', reject: changes ? null : 'Request changes' }) === 'reject') {
      changes += 1;
      panel.replaceChildren();
      log('you', 'requested changes to the plan');
      setStage('planner');
      await wait(800);
      plan = [...ticket.plan, ticket.revision];
      log('planner', `plan revised, added: ${ticket.revision.toLowerCase()}`);
      await wait(400);
      setStage('gate1');
    }
    panel.replaceChildren();
    log('you', 'plan approved');

    setStage('builder');
    log('builder', 'assembling the answer in an isolated workspace');
    await wait(900);
    log('builder', `draft 1 is ${words + 41} words, limit is ${WORD_LIMIT}. retry 1 of 2`);
    await wait(900);
    log('builder', `draft 2 is ${words} words`);
    await wait(500);

    const review = async () => {
      setStage('reviewer');
      const target = ticket.links[0][1];
      const found = target.startsWith('#') ? !!document.getElementById(target.slice(1)) : true;
      await wait(700);
      log('reviewer', `word limit ${words <= WORD_LIMIT ? 'passed' : 'failed'}, link target ${target} ${found ? 'resolves' : 'missing'}`);
      await wait(500);
      setStage('gate2');
    };
    await review();
    let sentBack = false;
    while (await gate({ label: 'Gate 2 · change review · your call', title: 'Ship this answer?', content: preview(ticket), approve: 'Ship it', reject: sentBack ? null : 'Send it back' }) === 'reject') {
      sentBack = true;
      changes += 1;
      panel.replaceChildren();
      log('you', 'sent the change back');
      setStage('builder');
      await wait(800);
      log('builder', 'rechecked every claim against the published pages, no edits needed');
      await wait(400);
      await review();
    }
    log('you', 'change approved');
    setStage('shipped');
    log('shipped', `${ticket.key} delivered`);
    deliver(ticket, { approvals: 2, changes, seconds: Math.max(1, Math.round((Date.now() - started) / 1000)) });
    busy = false;
  };

  const bindTickets = () => $$('[data-ticket]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    run(link.dataset.ticket);
  }));
  function reset() {
    busy = false;
    runId.textContent = 'idle';
    logBox.replaceChildren();
    panel.replaceChildren(...idlePanel.map(node => node.cloneNode(true)));
    setStage(null);
    bindTickets();
    $('[data-ticket]')?.focus({ preventScroll: true });
  }
  root.classList.add('live');
  bindTickets();

  // Background field: a dot grid that brightens near the cursor and ripples when a stage starts.
  const canvas = document.querySelector('.stage-field');
  const ctx = !reduced && window.matchMedia && window.requestAnimationFrame ? canvas?.getContext?.('2d') : null;
  if (ctx) {
    const stage = canvas.parentElement;
    const GAP = 30;
    const pointer = { x: -999, y: -999 };
    let ripples = [];
    let width = 0;
    let height = 0;
    let visible = true;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = stage.clientWidth;
      height = stage.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const local = (x, y) => {
      const box = canvas.getBoundingClientRect();
      return { x: x - box.left, y: y - box.top };
    };
    stage.addEventListener('pointermove', e => Object.assign(pointer, local(e.clientX, e.clientY)));
    stage.addEventListener('pointerleave', () => Object.assign(pointer, { x: -999, y: -999 }));
    stage.addEventListener('run:stage', e => {
      const box = e.detail;
      ripples.push({ ...local(box.left + box.width / 2, box.top + box.height / 2), born: performance.now() });
    });
    const draw = now => {
      requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      ripples = ripples.filter(r => now - r.born < 1600);
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          let glow = Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / 170);
          for (const r of ripples) {
            const age = (now - r.born) / 1600;
            const ring = Math.abs(Math.hypot(x - r.x, y - r.y) - age * 520);
            if (ring < 46) glow = Math.max(glow, (1 - ring / 46) * (1 - age));
          }
          ctx.fillStyle = glow > 0.02 ? `rgba(255,122,77,${0.16 + glow * 0.84})` : 'rgba(243,239,230,0.13)';
          ctx.beginPath();
          ctx.arc(x, y, 1.1 + glow * 1.9, 0, 6.2832);
          ctx.fill();
        }
      }
    };
    resize();
    window.addEventListener('resize', resize);
    if (window.IntersectionObserver) new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(stage);
    requestAnimationFrame(draw);
  }
})();
