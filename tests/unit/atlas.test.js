import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

const pages = [
  'index.html',
  ...['agentic-delivery', 'ai-hub', 'developer-enablement', 'enterprise-engineering']
    .map(id => `work/${id}/index.html`),
]
const read = file => readFileSync(resolve(process.cwd(), file), 'utf8')
const parse = file => new DOMParser().parseFromString(read(file), 'text/html')

afterEach(() => {
  document.body.replaceChildren()
})

describe('Atlas portfolio', () => {
  it.each(pages)('%s has the selected branding and both GitHub profiles', file => {
    const page = parse(file)
    expect(page.querySelector('.brand').textContent.replace(/^cb_\s*/, '').trim()).toBe('Chase Bianchi')
    const links = Array.from(page.querySelectorAll('.footer a'))
    expect(links.find(link => link.textContent.includes('GitHub · Personal')).href).toBe('https://github.com/ChaseBianchi')
    expect(links.find(link => link.textContent.includes('GitHub · Work')).href).toBe('https://github.com/ChaseBianchiSlalom')
    expect(page.querySelector('.lab-bar')).toBeNull()
    expect(page.querySelector('meta[name="robots"]')).toBeNull()
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

  it('preserves the requested career wording and in-progress status', () => {
    const page = parse('index.html')
    expect(page.querySelector('.atlas-timeline h3').textContent.trim()).toBe('Professional poker player')
    expect(page.querySelector('#about').textContent).toContain('Transfer to AI Engineering and promotion to Senior in progress.')
  })

  it('updates the map inspector and destination for every selected project', () => {
    document.body.innerHTML = parse('index.html').body.innerHTML
    new Function(read('src/atlas.js'))()
    const projects = JSON.parse(document.getElementById('project-data').textContent)
    for (const project of projects) {
      document.querySelector(`[data-node="${project.id}"]`).click()
      expect(document.querySelectorAll('.map-node[aria-pressed="true"]')).toHaveLength(1)
      expect(document.getElementById('map-title').textContent).toBe(project.title)
      expect(document.getElementById('map-summary').textContent).toBe(project.summary)
      expect(document.getElementById('map-link').getAttribute('href')).toBe(`/work/${project.id}/`)
    }
  })

  it('closes mobile navigation on Escape and returns focus to the toggle', () => {
    document.body.innerHTML = parse('index.html').body.innerHTML
    new Function(read('src/atlas.js'))()
    const toggle = document.querySelector('.menu-toggle')
    toggle.click()
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(toggle)
  })

  it('walks through both illustrative approval gates and resets', () => {
    document.body.innerHTML = parse('work/agentic-delivery/index.html').body.innerHTML
    new Function(read('src/atlas.js'))()
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
