// Texas hold'em hand evaluation for the decision lab. Cards are two characters: rank then suit ("Ah", "Td").
// Exposed as globalThis.Poker so the browser, the unit tests, and the scenario generator share one implementation.
(() => {
  'use strict';
  const RANKS = '23456789TJQKA';
  const SUITS = 'hdcs';
  const DECK = [...SUITS].flatMap(suit => [...RANKS].map(rank => rank + suit));
  const CATEGORIES = ['high card', 'a pair', 'two pair', 'three of a kind', 'a straight', 'a flush', 'a full house', 'four of a kind', 'a straight flush'];

  const straightHigh = ranks => {
    const unique = [...new Set(ranks)].sort((a, b) => b - a);
    if (unique[0] === 14) unique.push(1);
    for (let i = 0; i + 4 < unique.length; i += 1) if (unique[i] - unique[i + 4] === 4) return unique[i];
    return 0;
  };
  const pack = (category, kickers) => [...kickers, 0, 0, 0, 0, 0].slice(0, 5).reduce((value, k) => value * 15 + k, category);

  // Best five-card hand from five to seven cards, as a number: higher is better, equal is a tie.
  const score = cards => {
    const ranks = cards.map(card => RANKS.indexOf(card[0]) + 2);
    const suited = {};
    cards.forEach((card, i) => (suited[card[1]] ||= []).push(ranks[i]));
    const flush = Object.values(suited).find(group => group.length >= 5);
    if (flush && straightHigh(flush)) return pack(8, [straightHigh(flush)]);

    const counts = {};
    ranks.forEach(rank => { counts[rank] = (counts[rank] || 0) + 1; });
    const groups = Object.entries(counts).map(([rank, n]) => [n, Number(rank)]).sort((a, b) => b[0] - a[0] || b[1] - a[1]);
    const kickers = (used, n) => [...new Set(ranks)].filter(rank => !used.includes(rank)).sort((a, b) => b - a).slice(0, n);
    const [first, second] = groups;

    if (first[0] === 4) return pack(7, [first[1], ...kickers([first[1]], 1)]);
    if (first[0] === 3 && second?.[0] >= 2) return pack(6, [first[1], second[1]]);
    if (flush) return pack(5, flush.sort((a, b) => b - a));
    if (straightHigh(ranks)) return pack(4, [straightHigh(ranks)]);
    if (first[0] === 3) return pack(3, [first[1], ...kickers([first[1]], 2)]);
    if (first[0] === 2 && second?.[0] === 2) return pack(2, [first[1], second[1], ...kickers([first[1], second[1]], 1)]);
    if (first[0] === 2) return pack(1, [first[1], ...kickers([first[1]], 3)]);
    return pack(0, kickers([], 5));
  };
  const category = value => Math.floor(value / 15 ** 5);
  const split = text => text.match(/../g);

  // Every possible river for a turn spot with both hands known: which unseen cards win, tie, or lose for the hero.
  const rivers = (hero, board, villain) => {
    const seen = [...hero, ...board, ...villain];
    const out = { win: [], tie: [], lose: [] };
    DECK.filter(card => !seen.includes(card)).forEach(card => {
      const mine = score([...hero, ...board, card]);
      const theirs = score([...villain, ...board, card]);
      out[mine > theirs ? 'win' : mine < theirs ? 'lose' : 'tie'].push(card);
    });
    return out;
  };

  globalThis.Poker = { RANKS, SUITS, DECK, CATEGORIES, score, category, split, rivers };
})();
