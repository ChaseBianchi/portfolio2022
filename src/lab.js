// Homepage decision lab: a set of poker decisions, each played once and then 1,000 times.
// The simulation is real: every hand draws a river card from the 44 unseen cards and both hands are evaluated.
(() => {
  'use strict';
  const root = document.querySelector('[data-lab]');
  const Poker = globalThis.Poker;
  const DATA = globalThis.LAB_SCENARIOS;
  if (!root || !Poker || !DATA?.length) return;
  const $ = (s, r = root) => r.querySelector(s);
  const $$ = (s, r = root) => [...r.querySelectorAll(s)];
  const reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const later = (fn, ms) => setTimeout(fn, reduced ? 0 : ms);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const HANDS = 1000;
  const SUITS = { h: '♥', d: '♦', c: '♣', s: '♠' };
  const scenarios = DATA.map(row => {
    const [hero, board, villain, name, desc, pot, bet] = row.split('|');
    return { hero: Poker.split(hero), board: Poker.split(board), villain: Poker.split(villain), name, desc, pot: Number(pot), bet: Number(bet) };
  });

  const money = n => `${n < 0 ? '−⁠' : n > 0 ? '+' : ''}$${Math.abs(n).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  const rankOf = card => (card[0] === 'T' ? '10' : card[0]);
  const name = card => `${rankOf(card)}${SUITS[card[1]]}`;
  const cardNode = card => {
    const node = el('span', `card${'hd'.includes(card[1]) ? ' red' : ''}`);
    node.setAttribute('aria-label', name(card));
    node.append(el('b', null, rankOf(card)), el('i', null, SUITS[card[1]]));
    return node;
  };

  const slider = $('[data-lab-bet]');
  const betText = $('[data-lab-bettext]');
  const verdict = $('[data-lab-verdict]');
  const buttons = $$('[data-lab-act]');
  const rail = $('[data-lab-rail]');
  const canvas = $('canvas');
  const ctx = window.matchMedia && window.requestAnimationFrame ? canvas?.getContext?.('2d') : null;
  let index = 0;
  let spot = null;
  let runs = [];
  let timers = [];

  // Net result of calling `bet` when `card` comes on the river.
  const result = (card, bet) => (spot.rivers.win.includes(card) ? spot.pot + bet : spot.rivers.tie.includes(card) ? spot.pot / 2 : -bet);
  const draw = () => spot.unseen[Math.floor(Math.random() * spot.unseen.length)];
  const expected = bet => spot.equity * (spot.pot + 2 * bet) - bet;

  const amount = $('[data-lab-amount]');
  const presets = $$('[data-lab-preset]');
  const steppers = $$('[data-lab-step]');
  const callButton = $('[data-lab-act="call"]');
  const betControls = [slider, amount, ...presets, ...steppers];
  const lock = locked => [...buttons, ...betControls].forEach(control => { control.disabled = locked; });
  const presetBet = button => Math.round((spot.pot * Number(button.dataset.labPreset)) / 5) * 5;
  // Keep every bet control in step with the slider, which holds the value.
  const describeBet = () => {
    const bet = Number(slider.value);
    const [min, max] = [Number(slider.min), Number(slider.max)];
    amount.value = String(bet);
    callButton.textContent = `Call $${bet}`;
    slider.style.setProperty('--fill', `${((bet - min) / (max - min)) * 100}%`);
    presets.forEach(button => button.setAttribute('aria-pressed', String(presetBet(button) === bet)));
    betText.textContent = `Your opponent bets $${bet} into a $${spot.pot} pot. Call $${bet} to win $${spot.pot + bet}.`;
  };
  const showRiver = card => {
    const river = $('[data-lab-river]');
    const next = card ? cardNode(card) : el('span', 'card back');
    if (card) next.classList.add('dealt');
    else next.setAttribute('aria-label', 'River card, not yet dealt');
    next.setAttribute('data-lab-river', '');
    river.replaceWith(next);
  };
  const say = (headline, lines) => {
    verdict.replaceChildren();
    if (headline) verdict.append(el('strong', null, headline));
    lines.forEach(text => verdict.append(el('p', null, text)));
  };
  const idle = () => {
    timers.forEach(clearTimeout);
    timers = [];
    lock(false);
    showRiver(null);
    say(null, ['Call or fold?']);
  };

  const paint = progress => {
    if (!ctx) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width * ratio) { canvas.width = width * ratio; canvas.height = height * ratio; }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const css = getComputedStyle(root);
    const [ink, muted, line, accent] = ['--ink', '--muted', '--line', '--accent'].map(token => css.getPropertyValue(token).trim());
    const pad = { l: 8, r: 8, t: 14, b: 22 };
    const latest = runs[runs.length - 1];
    const peak = Math.max(spot.pot * 6, ...runs.flatMap(run => [Math.abs(run.ev * HANDS), ...run.data.map(Math.abs)])) * 1.08;
    const x = i => pad.l + (i / HANDS) * (width - pad.l - pad.r);
    const y = v => pad.t + (1 - (v + peak) / (2 * peak)) * (height - pad.t - pad.b);

    ctx.lineWidth = 1;
    ctx.strokeStyle = line;
    ctx.beginPath(); ctx.moveTo(x(0), y(0)); ctx.lineTo(x(HANDS), y(0)); ctx.stroke();
    ctx.fillStyle = muted;
    ctx.font = '11px ui-monospace, Consolas, monospace';
    ctx.fillText('$0', x(0) + 2, y(0) - 5);
    ctx.textAlign = 'right';
    ctx.fillText(`${HANDS.toLocaleString('en-US')} hands`, x(HANDS), height - 6);
    ctx.textAlign = 'left';
    if (!latest) { ctx.fillText('Your results will be drawn here.', x(0) + 2, height - 6); return; }

    // Expected value of calling at this bet size.
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = muted;
    ctx.beginPath(); ctx.moveTo(x(0), y(0)); ctx.lineTo(x(HANDS), y(latest.ev * HANDS)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText('dashed: expected', x(0) + 2, height - 6);

    runs.forEach((run, i) => {
      const isLatest = run === latest;
      const count = isLatest ? Math.max(1, Math.floor(progress * HANDS)) : HANDS;
      ctx.globalAlpha = isLatest ? 1 : 0.1 + 0.22 * (i / runs.length);
      ctx.strokeStyle = isLatest ? accent : ink;
      ctx.lineWidth = isLatest ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(x(0), y(0));
      for (let n = 0; n < count; n += 1) ctx.lineTo(x(n + 1), y(run.data[n]));
      ctx.stroke();
      if (isLatest) {
        ctx.fillStyle = accent;
        ctx.beginPath(); ctx.arc(x(count), y(run.data[count - 1]), 3.5, 0, 6.2832); ctx.fill();
      }
    });
    ctx.globalAlpha = 1;
  };
  const animate = () => {
    if (!ctx || reduced) { paint(1); return; }
    const start = performance.now();
    const frame = now => {
      const t = Math.min((now - start) / 1700, 1);
      paint(1 - (1 - t) ** 3);
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const act = choice => {
    const bet = Number(slider.value);
    const card = draw();
    const net = result(card, bet);
    const won = net > 0;
    const ev = expected(bet);
    lock(true);
    showRiver(card);
    const outcome = spot.rivers.tie.includes(card) ? 'split the pot' : won ? `win $${spot.pot + bet}` : `lose $${bet}`;
    const once = choice === 'call'
      ? `The river is the ${name(card)}. You ${outcome}.`
      : `You fold. The river would have been the ${name(card)}, and calling would have ${won ? 'won' : 'lost'}.`;
    say(null, [once, `Now the same decision, ${HANDS.toLocaleString('en-US')} times…`]);

    timers.push(later(() => {
      let total = 0;
      const data = Array.from({ length: HANDS }, () => (total += result(draw(), bet)));
      runs.push({ data, ev });
      if (runs.length > 7) runs.shift();
      animate();
      timers.push(later(() => {
        const good = (choice === 'call') === (ev > 0);
        const headline = choice === 'call' ? (good ? 'Good call.' : 'Losing call.') : (good ? 'Good fold.' : 'That fold cost you.');
        const lucky = choice === 'call' && won !== ev > 0
          ? (won ? 'It won this time. It is still a losing decision.' : 'It lost this time. It is still the right decision.')
          : null;
        const needed = bet / (spot.pot + 2 * bet) * 100;
        const had = spot.equity * 100;
        const twist = choice === 'fold' && won === good
          ? (won ? 'The river would have won. Folding was still right.' : 'The river missed. Calling was still right.')
          : lucky;
        const stat = (label, value, detail) => {
          const box = el('div', 'v-stat');
          box.append(el('dt', null, label), el('dd', 'v-value', value), el('dd', 'v-detail', detail));
          return box;
        };
        const stats = el('dl', 'v-stats');
        stats.append(
          stat('This hand', choice === 'call' ? money(net) || '$0' : '$0', choice === 'call' ? `River ${name(card)}` : `Folded · river ${name(card)}`),
          stat('Your equity', `${had.toFixed(1)}%`, `${spot.rivers.win.length} of ${spot.unseen.length} cards win · needed ${needed.toFixed(1)}%`),
          stat(`Calling, ${HANDS.toLocaleString('en-US')} hands`, `${money(total / HANDS)} a hand`, `Expected ${money(Math.round(ev * 100) / 100)} · folding makes $0`),
        );
        const bar = el('div', 'v-bar');
        bar.setAttribute('aria-hidden', 'true');
        const fill = el('span', 'v-fill');
        fill.style.width = `${had}%`;
        const mark = el('span', 'v-mark', `needed ${needed.toFixed(1)}%`);
        mark.style.left = `${needed}%`;
        bar.append(fill, mark);
        verdict.replaceChildren(
          el('strong', null, headline),
          ...(twist ? [el('p', 'v-twist', twist)] : []),
          stats,
          bar,
          el('p', 'v-next', "Change the opponent's bet size, or try the next scenario."),
        );
        lock(false);
      }, 1900));
    }, 900));
  };

  const show = (next, scrollRail = true) => {
    index = (next + scenarios.length) % scenarios.length;
    const data = scenarios[index];
    const rivers = Poker.rivers(data.hero, data.board, data.villain);
    const unseen = [...rivers.win, ...rivers.tie, ...rivers.lose];
    spot = { ...data, rivers, unseen, equity: (rivers.win.length + rivers.tie.length / 2) / unseen.length };
    runs = [];

    $('[data-lab-count]').textContent = `Scenario ${index + 1} of ${scenarios.length}`;
    $('[data-lab-name]').textContent = spot.name;
    $('[data-lab-spot]').textContent = spot.desc;
    $('[data-lab-hero]').replaceChildren(...spot.hero.map(cardNode));
    $('[data-lab-villain]').replaceChildren(...spot.villain.map(cardNode));
    $('[data-lab-board]').replaceChildren(...spot.board.map(cardNode), el('span', 'card back'));
    $('[data-lab-board]').lastChild.setAttribute('data-lab-river', '');
    slider.min = String(Math.max(5, Math.round(spot.pot / 50) * 5));
    slider.max = String(spot.pot * 1.5);
    slider.value = String(spot.bet);
    amount.min = slider.min;
    amount.max = slider.max;
    describeBet();
    idle();
    paint(1);

    $$('button', rail).forEach((chip, i) => {
      const current = i === index;
      chip.setAttribute('aria-current', String(current));
      if (current && scrollRail && rail.scrollTo) rail.scrollTo({ left: chip.offsetLeft - rail.clientWidth / 2 + chip.offsetWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
    });
  };

  scenarios.forEach((scenario, i) => {
    const chip = el('button', 'lab-chip');
    chip.type = 'button';
    chip.append(el('span', null, String(i + 1).padStart(2, '0')), el('b', null, scenario.name));
    chip.addEventListener('click', () => show(i, false));
    rail.append(chip);
  });
  $('[data-lab-prev]').addEventListener('click', () => show(index - 1));
  $('[data-lab-next]').addEventListener('click', () => show(index + 1));
  $('[data-lab-random]').addEventListener('click', () => show(Math.floor(Math.random() * scenarios.length)));
  root.addEventListener('keydown', event => {
    if ([slider, amount].includes(event.target) || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    show(index + (event.key === 'ArrowRight' ? 1 : -1));
  });
  const setBet = value => {
    const clamped = Math.min(Number(slider.max), Math.max(Number(slider.min), Math.round(value / 5) * 5));
    slider.value = String(clamped);
    describeBet();
    idle();
  };
  slider.addEventListener('input', () => setBet(Number(slider.value)));
  amount.addEventListener('change', () => setBet(Number(amount.value) || Number(slider.min)));
  presets.forEach(button => button.addEventListener('click', () => setBet(presetBet(button))));
  steppers.forEach(button => button.addEventListener('click', () => setBet(Number(slider.value) + 5 * Number(button.dataset.labStep))));
  buttons.forEach(button => button.addEventListener('click', () => act(button.dataset.labAct)));
  window.addEventListener('resize', () => paint(1));
  document.addEventListener('themechange', () => paint(1));
  root.classList.add('live');
  show(0, false);
})();
