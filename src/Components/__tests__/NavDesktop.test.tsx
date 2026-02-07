import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NavDesktop from '../NavDesktop'

describe('NavDesktop', () => {
  it('renders navigation links', () => {
    render(<NavDesktop />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  it('has main navigation aria-label', () => {
    render(<NavDesktop />)
    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<NavDesktop />)
    expect(screen.getByLabelText('email')).toBeInTheDocument()
    expect(screen.getByLabelText('linkedin')).toBeInTheDocument()
    expect(screen.getByLabelText('github')).toBeInTheDocument()
  })

  it('nav links have correct hrefs', () => {
    render(<NavDesktop />)
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#landing')
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '#projects')
  })
})
