// Generates src/lab-data.js: one turn spot per distinct situation for the decision lab, each checked with the evaluator in src/poker.js.
// Seeded, so the output is stable. Run with `node scripts/generate-lab-scenarios.mjs`.
import { readFileSync, writeFileSync } from 'node:fs'

new Function(readFileSync('src/poker.js', 'utf8'))()
const { RANKS, SUITS, DECK, score, category, rivers } = globalThis.Poker

let seed = 20261116
const random = () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
const pick = list => list[Math.floor(random() * list.length)]
const shuffle = list => {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
const rest = used => shuffle(DECK.filter(card => !used.includes(card)))
const rank = card => RANKS.indexOf(card[0]) + 2

// Samplers bias the deal toward a family of spots; classify() decides what the spot actually is.
const samplers = {
  any() {
    const d = shuffle(DECK)
    return { hero: d.slice(0, 2), board: d.slice(2, 6), villain: d.slice(6, 8) }
  },
  flush(connected) {
    const suit = pick([...SUITS])
    let mine = shuffle(DECK.filter(card => card[1] === suit))
    if (connected) {
      const low = 2 + Math.floor(random() * 9)
      const gap = pick([1, 1, 2])
      mine = [RANKS[low - 2] + suit, RANKS[low + gap - 2] + suit, ...mine.filter(card => ![low, low + gap].includes(rank(card)))]
    }
    const others = shuffle(DECK.filter(card => card[1] !== suit))
    return { hero: mine.slice(0, 2), board: shuffle([...mine.slice(2, 4), ...others.slice(0, 2)]), villain: others.slice(2, 4) }
  },
  flushConnected() { return samplers.flush(true) },
  connected() {
    const low = 3 + Math.floor(random() * 9)
    const hero = [RANKS[low - 2] + pick([...SUITS]), RANKS[low + pick([1, 1, 2]) - 2] + pick([...SUITS])]
    const d = rest(hero)
    return { hero, board: d.slice(0, 4), villain: d.slice(4, 6) }
  },
  overcards() {
    const [a, b] = shuffle([...'TJQKA'])
    const hero = [a + pick([...SUITS]), b + pick([...SUITS])]
    const low = shuffle(DECK.filter(card => rank(card) <= 9))
    const board = low.slice(0, 4)
    return { hero, board, villain: rest([...hero, ...board]).slice(0, 2) }
  },
  set() {
    const r = pick([...RANKS])
    const [suit, ...off] = shuffle([...SUITS])
    const hero = [r + off[0], r + off[1]]
    const suited = shuffle(DECK.filter(card => card[1] === suit && card[0] !== r))
    return { hero, board: shuffle([r + off[2], ...suited.slice(0, 3)]), villain: suited.slice(3, 5) }
  },
  pocketPairs() {
    const [low, high] = shuffle([...RANKS]).slice(0, 2).sort((x, y) => RANKS.indexOf(x) - RANKS.indexOf(y))
    const hero = shuffle([...SUITS]).slice(0, 2).map(suit => low + suit)
    const villain = shuffle([...SUITS]).slice(0, 2).map(suit => high + suit)
    return { hero, villain, board: rest([...hero, ...villain]).slice(0, 4) }
  },
  twoPair() {
    const d = shuffle(DECK)
    const board = d.slice(0, 4)
    const hero = [0, 1].map(i => d.slice(4).find(card => card[0] === board[i][0]))
    return { hero, board: shuffle(board), villain: rest([...hero, ...board]).slice(0, 2) }
  },
  twoPairFlush() {
    const suit = pick([...SUITS])
    const suited = shuffle(DECK.filter(card => card[1] === suit))
    const board = suited.slice(0, 3)
    const others = shuffle(DECK.filter(card => card[1] !== suit))
    const hero = [0, 1].map(i => others.find(card => card[0] === board[i][0]))
    const fourth = others.find(card => !board.some(b => b[0] === card[0]))
    return { hero, board: shuffle([...board, fourth]), villain: suited.slice(3, 5) }
  },
  setStraight() {
    const r = pick([...RANKS])
    const hero = shuffle([...SUITS]).slice(0, 2).map(suit => r + suit)
    const d = rest(hero)
    const third = d.find(card => card[0] === r)
    const others = d.filter(card => card[0] !== r)
    return { hero, board: shuffle([third, ...others.slice(0, 3)]), villain: others.slice(3, 5) }
  },
}

// One entry per distinct situation: [name, sampler, description]. The hero is always behind on the turn.
const SITUATIONS = [
  ['Flush draw', 'flush', 'You are behind with four to a flush and one card to come.'],
  ['Open-ended straight draw', 'connected', 'You are behind with four in a row. Either end completes the straight.'],
  ['Gutshot straight draw', 'connected', 'You are behind and need one exact rank to fill the straight.'],
  ['Flush draw plus open-ended straight draw', 'flushConnected', 'You are behind, drawing to a flush and to both ends of a straight.'],
  ['Flush draw plus gutshot', 'flushConnected', 'You are behind, drawing to a flush and to an inside straight.'],
  ['Flush draw with two overcards', 'flush', 'You are behind with a flush draw, and pairing either of your cards wins too.'],
  ['Flush draw with one overcard', 'flush', 'You are behind with a flush draw, and pairing your high card wins too.'],
  ['Open-ended straight draw with two overcards', 'overcards', 'You are behind with an open-ended straight draw and two cards above the board.'],
  ['Gutshot with two overcards', 'overcards', 'You are behind with an inside straight draw and two cards above the board.'],
  ['Two overcards', 'overcards', 'You are behind with two cards higher than the board. Pairing either one wins.'],
  ['Pair against a better hand', 'any', 'You are behind with a pair. You need two pair or trips.'],
  ['Underpair against an overpair', 'pocketPairs', 'Your pocket pair is behind a bigger one. You need to hit a set.'],
  ['Pair plus flush draw', 'flush', 'You are behind with a pair and a flush draw.'],
  ['Pair plus open-ended straight draw', 'connected', 'You are behind with a pair and an open-ended straight draw.'],
  ['Pair plus gutshot', 'connected', 'You are behind with a pair and an inside straight draw.'],
  ['Two pair against a made straight', 'twoPair', 'Your two pair is behind a made straight. You need a full house.'],
  ['Two pair against a made flush', 'twoPairFlush', 'Your two pair is behind a made flush. You need a full house.'],
  ['Set against a made straight', 'setStraight', 'Your set is behind a made straight. You need the board to pair.'],
  ['Set against a made flush', 'set', 'Your set is behind a made flush. You need the board to pair.'],
]

function classify({ hero, board, villain }) {
  const mine = score([...hero, ...board])
  const theirs = score([...villain, ...board])
  if (mine >= theirs) return null
  const mineCat = category(mine)
  const theirCat = category(theirs)
  if (theirCat < 1) return null
  const pocketPair = hero[0][0] === hero[1][0]
  const paired = new Set(board.map(card => card[0])).size < 4
  const { win, tie } = rivers(hero, board, villain)
  const n = win.length
  if (tie.length || !n) return null
  // What the hero ends up with on each winning river: f(lush), s(traight), p(air), t(wo pair or trips), b(oat or quads).
  const made = { f: 0, s: 0, p: 0, t: 0, b: 0 }
  win.forEach(card => { made['hpttsfbbf'[category(score([...hero, ...board, card]))]] += 1 })
  const { f, s, p, t, b } = made
  if (made.h) return null
  const is = want => Object.entries({ f: 0, s: 0, p: 0, t: 0, b: 0, ...want }).every(([key, value]) => (Array.isArray(value) ? value.includes(made[key]) : made[key] === value))

  if (mineCat === 3 && pocketPair && is({ b: 10 })) {
    if (theirCat === 5) return 'Set against a made flush'
    if (theirCat === 4) return 'Set against a made straight'
  }
  if (paired) return null
  if (mineCat === 2 && is({ b: 4 })) {
    if (theirCat === 5) return 'Two pair against a made flush'
    if (theirCat === 4) return 'Two pair against a made straight'
  }
  if (theirCat > 3) return null

  if (mineCat === 0) {
    if (is({ f: [7, 8, 9] })) return 'Flush draw'
    if (is({ s: 8 })) {
      const ranks = [...new Set([...hero, ...board].map(rank))].sort((x, y) => x - y)
      return ranks.some((r, i) => ranks[i + 3] === r + 3) ? 'Open-ended straight draw' : 'Double gutshot'
    }
    if (is({ s: [3, 4] })) return 'Gutshot straight draw'
    if (is({ f: 9, s: 6 })) return 'Flush draw plus open-ended straight draw'
    if (is({ f: 9, s: 3 })) return 'Flush draw plus gutshot'
    if (is({ f: [8, 9], p: 6 })) return 'Flush draw with two overcards'
    if (is({ f: [8, 9], p: 3 })) return 'Flush draw with one overcard'
    if (is({ s: 8, p: 6 })) return 'Open-ended straight draw with two overcards'
    if (is({ s: 4, p: 6 })) return 'Gutshot with two overcards'
    if (is({ p: 6 })) return 'Two overcards'
    if (is({ p: 3 })) return 'One live overcard'
  }
  if (mineCat === 1) {
    if (pocketPair && theirCat === 1 && is({ t: 2 })) return 'Underpair against an overpair'
    if (!pocketPair && theirCat <= 2 && is({ t: 5 })) return 'Pair against a better hand'
    if (!pocketPair && is({ f: [8, 9], t: 5 })) return 'Pair plus flush draw'
    if (!pocketPair && is({ s: 8, t: 5 })) return 'Pair plus open-ended straight draw'
    if (!pocketPair && is({ s: 4, t: 5 })) return 'Pair plus gutshot'
  }
  return null
}

const POTS = [40, 60, 80, 100, 120, 150, 200, 250, 300, 400]
const SIZES = [0.25, 0.33, 0.5, 0.5, 0.66, 0.75, 1, 1, 1.25, 1.5]
const stakes = () => {
  const pot = pick(POTS)
  return [pot, Math.max(5, Math.round((pot * pick(SIZES)) / 5) * 5)]
}

const first = { hero: ['Ah', '7h'], board: ['Kh', '9h', '4c', '2s'], villain: ['As', 'Kd'] }
if (classify(first) !== 'Flush draw') throw new Error('Opening scenario is no longer a plain flush draw')

const rows = SITUATIONS.map(([name, sampler, desc], index) => {
  // Seed per situation, so adding or removing one leaves the others unchanged.
  seed = [...name].reduce((hash, char) => (Math.imul(hash, 31) + char.charCodeAt(0)) | 0, 20261116)
  let spot = index ? null : first
  for (let tries = 0; !spot; tries += 1) {
    if (tries > 2e6) throw new Error(`Could not find: ${name}`)
    const deal = samplers[sampler]()
    if (new Set(Object.values(deal).flat()).size === 8 && classify(deal) === name) spot = deal
  }
  const [pot, bet] = index ? stakes() : [100, 50]
  const { win } = rivers(spot.hero, spot.board, spot.villain)
  return [spot.hero.join(''), spot.board.join(''), spot.villain.join(''), name, desc, pot, bet, win.length].join('|')
})

writeFileSync('src/lab-data.js', `// Generated by scripts/generate-lab-scenarios.mjs. Do not edit by hand.
// One spot per distinct situation; the opponent always has the best hand on the turn.
// hero | board (flop and turn) | opponent | name | description | pot | bet | winning river cards out of 44
globalThis.LAB_SCENARIOS = [
${rows.map(row => `  ${JSON.stringify(row)},`).join('\n')}
];
`)
console.log(rows.length, 'scenarios')
rows.forEach(row => console.log(row.split('|').filter((_, i) => i !== 4).join(' | ')))
