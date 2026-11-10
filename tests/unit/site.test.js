import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const cases = ['agentic-delivery', 'ai-hub', 'developer-enablement', 'enterprise-engineering']
const pages = ['index.html', 'resume/index.html', ...cases.map(id => `work/${id}/index.html`)]
const read = file => readFileSync(resolve(process.cwd(), file), 'utf8')
const parse = file => new DOMParser().parseFromString(read(file), 'text/html')
const text = node => node.textContent.replace(/\s+/g, ' ').trim()
const boot = file => {
  document.body.innerHTML = parse(file).body.innerHTML
  new Function(read('src/site.js'))()
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('portfolio pages', () => {
  it.each(pages)('%s has the shared branding, navigation, and labeled GitHub profiles', file => {
    const page = parse(file)
    expect(text(page.querySelector('.brand'))).toMatch(/^Chase Bianchi/)
    expect(Array.from(page.querySelectorAll('#nav-links a'), a => a.getAttribute('href')))
      .toEqual(['/#work', '/#path', '/#lab', '/resume/', '/#contact'])
    expect(page.querySelector('[data-topbar] > .site-header')).not.toBeNull()
    const links = Array.from(page.querySelectorAll('.footer a'))
    expect(links.find(link => link.textContent.includes('GitHub · Personal')).href).toBe('https://github.com/ChaseBianchi')
    expect(links.find(link => link.textContent.includes('GitHub · Slalom work')).href).toBe('https://github.com/ChaseBianchiSlalom')
    expect(page.querySelector('meta[name="robots"]')).toBeNull()
    expect(page.querySelector('link[rel="canonical"]').href).toMatch(/^https:\/\/www\.chasebianchi\.com\//)
  })

  it.each(pages)('%s has resolvable local links and fragments', file => {
    const page = parse(file)
    const route = file === 'index.html' ? '/' : `/${file.replace('index.html', '')}`
    for (const link of page.querySelectorAll('a[href], link[href], script[src]')) {
      const raw = link.getAttribute('href') || link.getAttribute('src')
      if (!raw.startsWith('/') && !raw.startsWith('#')) continue
      const url = new URL(raw, `https://portfolio.test${route}`)
      const relative = url.pathname.replace(/^\//, '')
      const path = relative === '' || relative.endsWith('/') ? `${relative}index.html` : relative
      const actual = existsSync(resolve(path)) ? path : `public/${path}`
      expect(existsSync(resolve(actual)), `${file}: ${raw}`).toBe(true)
      if (url.hash) expect(parse(actual).getElementById(url.hash.slice(1)), `${file}: ${raw}`).not.toBeNull()
    }
  })

  it('shows the current role and the career path on the homepage', () => {
    const page = parse('index.html')
    expect(text(page.querySelector('.now-card'))).toContain('Associate Director, Senior Forward Deployed Engineer')
    expect(text(page.querySelector('.now-card'))).toContain('Vista Equity Partners')
    const stops = Array.from(page.querySelectorAll('.route li'))
    expect(stops.map(li => text(li.querySelector('h3')))).toEqual([
      'Professional poker player', 'Software engineering', 'Slalom', 'Vista Equity Partners',
    ])
    expect(stops.filter(li => li.classList.contains('current'))).toEqual([stops[3]])
    expect(page.body.textContent).not.toMatch(/in progress/i)
  })

  it('links every case study from the homepage', () => {
    const hrefs = Array.from(parse('index.html').querySelectorAll('.case-list a'), a => a.getAttribute('href'))
    expect(hrefs).toEqual(cases.map(id => `/work/${id}/`))
  })

  it('lists Vista as the current employer and closes out Slalom on the resume', () => {
    const [vista, slalom] = Array.from(parse('resume/index.html').querySelectorAll('.r-employer'), text)
    expect(vista).toContain('Vista Equity Partners')
    expect(vista).toContain('Nov 2026 - Present')
    expect(vista).toContain('Associate Director, Senior Forward Deployed Engineer')
    expect(slalom).toContain('Slalom Consulting')
    expect(slalom).toContain('Jun 2022 - Oct 2026')
    expect(slalom).not.toMatch(/Present|in progress/)
  })

  it.each(pages)('%s sets the theme before first paint and has a toggle', file => {
    const page = parse(file)
    expect(page.querySelector('head script:not([src])').textContent).toContain('prefers-color-scheme: dark')
    expect(page.querySelectorAll('.theme-toggle')).toHaveLength(1)
  })

  it.each([[true, 'dark'], [false, 'light']])('follows the system setting (dark: %s) until the visitor toggles, then remembers', (systemDark, initial) => {
    const store = new Map()
    vi.stubGlobal('localStorage', { getItem: key => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) })
    window.matchMedia = () => ({ matches: systemDark, addEventListener() {} })
    boot('index.html')
    const other = initial === 'dark' ? 'light' : 'dark'
    const toggle = document.querySelector('.theme-toggle')
    expect(document.documentElement.dataset.theme).toBe(initial)
    expect(toggle.getAttribute('aria-label')).toBe(`Switch to ${other} mode`)
    expect(localStorage.getItem('theme')).toBeNull()
    toggle.click()
    expect(document.documentElement.dataset.theme).toBe(other)
    expect(localStorage.getItem('theme')).toBe(other)
    boot('index.html')
    expect(document.documentElement.dataset.theme).toBe(other)
    delete window.matchMedia
    vi.unstubAllGlobals()
  })

  it('hides the top bar while scrolling down, shows it on the way up, and keeps it while the menu is open', () => {
    boot('index.html')
    const bar = document.querySelector('[data-topbar]')
    const scrollTo = y => { Object.defineProperty(window, 'scrollY', { value: y, configurable: true }); window.dispatchEvent(new Event('scroll')) }
    const hidden = () => bar.classList.contains('hidden')
    scrollTo(200)
    expect([hidden(), bar.classList.contains('scrolled')]).toEqual([false, true])
    scrollTo(900)
    expect(hidden()).toBe(true)
    scrollTo(1500)
    expect(hidden()).toBe(true)
    scrollTo(1400)
    expect(hidden()).toBe(false)
    document.querySelector('.menu-toggle').click()
    scrollTo(2000)
    expect(hidden()).toBe(false)
    scrollTo(0)
    expect(bar.classList.contains('scrolled')).toBe(false)
  })

  it('closes mobile navigation on Escape and returns focus to the toggle', () => {
    boot('index.html')
    const toggle = document.querySelector('.menu-toggle')
    toggle.click()
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(document.getElementById('nav-links').classList.contains('open')).toBe(true)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(toggle)
  })

  it('walks through both illustrative approval gates and resets', () => {
    boot('work/agentic-delivery/index.html')
    const next = document.querySelector('.pipeline-next')
    next.click()
    expect(next.textContent).toContain('Approve the plan')
    next.click()
    next.click()
    expect(next.textContent).toContain('Approve the change')
    next.click()
    expect(next.disabled).toBe(true)
    document.querySelector('.pipeline-reset').click()
    expect(next.disabled).toBe(false)
    expect(next.textContent).toContain('Run walkthrough')
  })
})

describe('homepage interactions', () => {
  const load = file => new Function(read(file))()
  const loadLab = () => ['src/poker.js', 'src/lab-data.js', 'src/lab.js'].forEach(load)
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks() })

  it('tickets are real links, so the hero works without JavaScript', () => {
    const hrefs = Array.from(parse('index.html').querySelectorAll('[data-ticket]'), a => a.getAttribute('href'))
    expect(hrefs).toEqual(['#path', '/work/agentic-delivery/', '#lab', '/resume/'])
  })

  it('a delivery run stops at both gates and ships only after two approvals', async () => {
    document.body.innerHTML = parse('index.html').body.innerHTML
    load('src/run.js')
    const button = name => Array.from(document.querySelectorAll('[data-run-panel] button')).find(b => b.textContent === name)
    const status = () => document.querySelector('[data-run-status]').textContent

    document.querySelector('[data-ticket="poker"]').click()
    await vi.advanceTimersByTimeAsync(10000)
    expect(status()).toBe('Gate 1: waiting for your approval')
    expect(document.querySelectorAll('.gate-plan li')).toHaveLength(3)

    button('Request changes').click()
    await vi.advanceTimersByTimeAsync(10000)
    expect(document.querySelectorAll('.gate-plan li')).toHaveLength(4)
    expect(button('Request changes')).toBeUndefined()

    button('Approve plan').click()
    await vi.advanceTimersByTimeAsync(10000)
    expect(status()).toBe('Gate 2: waiting for your approval')
    expect(document.querySelector('.deliverable')).toBeNull()
    expect(document.querySelector('[data-run-log]').textContent).toContain('link target #lab resolves')

    button('Ship it').click()
    await vi.advanceTimersByTimeAsync(1000)
    expect(status()).toBe('Shipped')
    expect(document.querySelector('.deliverable a').getAttribute('href')).toBe('#lab')
    expect(document.querySelector('.run-stats').textContent).toContain('2 human approvals · 1 change request')

    button('Run another ticket').click()
    expect(status()).toBe('Waiting for a ticket')
    expect(document.querySelectorAll('[data-ticket]')).toHaveLength(4)
  })

  it.each([
    [25, 'call', 'Good call.'],
    [100, 'call', 'Losing call.'],
    [100, 'fold', 'Good fold.'],
    [25, 'fold', 'That fold cost you.'],
  ])('decision lab grades a $%i bet + %s as "%s" whatever the river is', async (bet, choice, headline) => {
    document.body.innerHTML = parse('index.html').body.innerHTML
    loadLab()
    const slider = document.querySelector('[data-lab-bet]')
    slider.value = String(bet)
    slider.dispatchEvent(new Event('input'))
    document.querySelector(`[data-lab-act="${choice}"]`).click()
    expect(document.querySelector('[data-lab-river]').classList.contains('back')).toBe(false)
    await vi.advanceTimersByTimeAsync(5000)
    const verdict = document.querySelector('[data-lab-verdict]')
    expect(verdict.querySelector('strong').textContent).toBe(headline)
    expect(Array.from(verdict.querySelectorAll('.v-stat dt'), dt => dt.textContent)).toEqual(['This hand', 'Your equity', 'Calling, 1,000 hands'])
    expect(verdict.querySelectorAll('.v-value')[1].textContent).toBe('20.5%')
    expect(verdict.querySelectorAll('.v-detail')[1].textContent).toBe(`9 of 44 cards win · needed ${(bet / (100 + 2 * bet) * 100).toFixed(1)}%`)
    expect(verdict.querySelector('.v-fill').style.width).toMatch(/^20\.45/)
    expect(document.querySelector('[data-lab-act="call"]').disabled).toBe(false)
  })
})

describe('decision lab scenarios', () => {
  new Function(read('src/poker.js'))()
  new Function(read('src/lab-data.js'))()
  const { Poker, LAB_SCENARIOS } = globalThis
  const hand = text => Poker.score(Poker.split(text))

  it('ranks hands in the standard order, including the wheel and kickers', () => {
    const ladder = ['AhKd9c7s3h', 'AhAd9c7s3h', 'AhAd9c9s3h', 'AhAdAc7s3h', '5h4d3c2sAh', 'Ah9h7h4h2h', 'AhAdAc7s7h', 'AhAdAcAs3h', '9h8h7h6h5h']
    const scores = ladder.map(hand)
    expect([...scores].sort((a, b) => a - b)).toEqual(scores)
    expect(scores.map(Poker.category)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
    expect(hand('6h5d4c3s2h')).toBeGreaterThan(hand('5h4d3c2sAh'))
    expect(hand('AhAdKc7s3h')).toBeGreaterThan(hand('AhAdQc7s3h'))
    expect(hand('AhKdQcJsTh9h8d')).toBe(hand('AhKdQcJsTh2h2d'))
    expect(hand('KhKdKc7s7h7d2c')).toBe(hand('KhKdKc7s7h'))
  })

  it('has one legal scenario per situation, always behind, with stored odds that match the evaluator', () => {
    expect(LAB_SCENARIOS.length).toBeGreaterThanOrEqual(15)
    expect(new Set(LAB_SCENARIOS.map(row => row.split('|')[3])).size).toBe(LAB_SCENARIOS.length)
    for (const row of LAB_SCENARIOS) {
      const [hero, board, villain, name, desc, pot, bet, wins] = row.split('|')
      const cards = [hero, board, villain].flatMap(Poker.split)
      expect(cards, row).toHaveLength(8)
      expect(new Set(cards).size, row).toBe(8)
      cards.forEach(card => expect(Poker.DECK, row).toContain(card))
      const rivers = Poker.rivers(Poker.split(hero), Poker.split(board), Poker.split(villain))
      expect(rivers.win.length + rivers.lose.length, row).toBe(44)
      expect(rivers.win.length, row).toBe(Number(wins))
      expect(hand(hero + board), row).toBeLessThan(hand(villain + board))
      expect(rivers.win.length, row).toBeLessThan(22)
      expect(name.length > 3 && /^You/.test(desc), row).toBe(true)
      expect(Number(pot) >= 40 && Number(bet) >= 5 && Number(bet) <= Number(pot) * 1.5, row).toBe(true)
    }
  })

  it('steps through scenarios, wraps at both ends, and jumps from the rail', () => {
    document.body.innerHTML = parse('index.html').body.innerHTML
    new Function(read('src/lab.js'))()
    const count = () => document.querySelector('[data-lab-count]').textContent
    const chips = document.querySelectorAll('[data-lab-rail] button')
    const total = LAB_SCENARIOS.length
    expect(chips).toHaveLength(total)
    expect(count()).toBe(`Scenario 1 of ${total}`)
    expect(parse('index.html').querySelector('[data-lab-count]').textContent).toBe(count())
    document.querySelector('[data-lab-prev]').click()
    expect(count()).toBe(`Scenario ${total} of ${total}`)
    document.querySelector('[data-lab-next]').click()
    document.querySelector('[data-lab-next]').click()
    expect(count()).toBe(`Scenario 2 of ${total}`)
    chips[12].click()
    const [hero, board, villain, name, , pot, bet] = LAB_SCENARIOS[12].split('|')
    expect(count()).toBe(`Scenario 13 of ${total}`)
    expect(document.querySelector('[data-lab-name]').textContent).toBe(name)
    expect(chips[12].getAttribute('aria-current')).toBe('true')
    expect(document.querySelectorAll('[data-lab-rail] [aria-current="true"]')).toHaveLength(1)
    const shown = sel => Array.from(document.querySelectorAll(`${sel} .card:not(.back)`), c => c.getAttribute('aria-label')).join('')
    const label = text => Poker.split(text).map(c => (c[0] === 'T' ? '10' : c[0]) + { h: '♥', d: '♦', c: '♣', s: '♠' }[c[1]]).join('')
    expect(shown('[data-lab-hero]')).toBe(label(hero))
    expect(shown('[data-lab-villain]')).toBe(label(villain))
    expect(shown('[data-lab-board]')).toBe(label(board))
    expect(document.querySelector('[data-lab-bettext]').textContent).toBe(`Your opponent bets $${bet} into a $${pot} pot. Call $${bet} to win $${Number(pot) + Number(bet)}.`)
  })
})

describe('decision lab bet controls', () => {
  beforeEach(() => {
    document.body.innerHTML = parse('index.html').body.innerHTML
    ;['src/poker.js', 'src/lab-data.js', 'src/lab.js'].forEach(file => new Function(read(file))())
  })
  const q = sel => document.querySelector(sel)
  const state = () => [q('[data-lab-bet]').value, q('[data-lab-amount]').value, q('[data-lab-act="call"]').textContent]

  it('shows the bet on the Call button and keeps slider, amount box, and presets in step', () => {
    expect(parse('index.html').querySelector('[data-lab-act="call"]').textContent).toBe('Call $50')
    expect(state()).toEqual(['50', '50', 'Call $50'])
    expect(q('[data-lab-preset="0.5"]').getAttribute('aria-pressed')).toBe('true')
    q('[data-lab-preset="1"]').click()
    expect(state()).toEqual(['100', '100', 'Call $100'])
    expect(q('[data-lab-bettext]').textContent).toBe('Your opponent bets $100 into a $100 pot. Call $100 to win $200.')
    expect(Array.from(document.querySelectorAll('[data-lab-preset][aria-pressed="true"]'), b => b.textContent)).toEqual(['Pot'])
    q('[data-lab-step="1"]').click()
    q('[data-lab-step="1"]').click()
    expect(state()).toEqual(['110', '110', 'Call $110'])
    expect(document.querySelectorAll('[data-lab-preset][aria-pressed="true"]')).toHaveLength(0)
    q('[data-lab-step="-1"]').click()
    expect(state()).toEqual(['105', '105', 'Call $105'])
  })

  it('rounds and clamps a typed amount to the allowed range', () => {
    const type = value => { q('[data-lab-amount]').value = value; q('[data-lab-amount]').dispatchEvent(new Event('change')) }
    type('62')
    expect(state()).toEqual(['60', '60', 'Call $60'])
    type('9999')
    expect(state()).toEqual(['150', '150', 'Call $150'])
    type('0')
    expect(state()).toEqual(['10', '10', 'Call $10'])
    q('[data-lab-step="-1"]').click()
    expect(state()).toEqual(['10', '10', 'Call $10'])
  })

  it('updates the Call button when the scenario changes', () => {
    q('[data-lab-next]').click()
    const [, , , , , pot, bet] = globalThis.LAB_SCENARIOS[1].split('|')
    expect(state()).toEqual([bet, bet, `Call $${bet}`])
    expect(q('[data-lab-bet]').max).toBe(String(Number(pot) * 1.5))
  })
})