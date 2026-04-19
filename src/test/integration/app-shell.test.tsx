import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from '../../App'

function renderAt(pathname: string) {
  window.history.pushState({}, '', pathname)
  return render(<App />)
}

afterEach(() => {
  cleanup()
  window.history.pushState({}, '', '/')
})

describe('App shell integration', () => {
  it('renders the redesigned portfolio homepage', () => {
    renderAt('/')

    expect(
      screen.getByRole('heading', {
        name: /adobe platform depth\. front-end rigor\. ai-enabled execution\./i,
      }),
    ).toBeInTheDocument()

    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /this is the kind of work i do best\./i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Resume' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /download resume/i })).toBeInTheDocument()
    expect(screen.queryAllByRole('link', { name: 'Live' })).toHaveLength(0)
    expect(screen.queryAllByRole('link', { name: /download pdf/i })).toHaveLength(0)
    expect(within(screen.getByRole('contentinfo', { name: /footer/i })).getByRole('link', { name: 'Email' })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /if you need someone who can move between adobe platform work, front-end quality, and emerging ai workflows, i’m interested\./i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the dedicated resume page at /resume', () => {
    renderAt('/resume')

    expect(screen.getByRole('heading', { name: 'Chase Bianchi' })).toBeInTheDocument()
      expect(
        screen.getByRole('heading', {
          name: /enterprise cms, application engineering, accessibility, and automation\./i,
        }),
      ).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /download pdf/i }).length).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', {
        name: /llm-assisted workflows, openai experimentation, and automation concepts\./i,
      }),
    ).toBeInTheDocument()
    expect(within(screen.getByRole('contentinfo', { name: /resume footer/i })).getByRole('link', { name: 'Portfolio' })).toBeInTheDocument()
    expect(within(screen.getByRole('contentinfo', { name: /resume footer/i })).getByRole('link', { name: 'Email' })).toBeInTheDocument()
  })
})
