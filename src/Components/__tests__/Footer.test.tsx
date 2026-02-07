import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders as a footer element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(3)
  })

  it('contains email link', () => {
    render(<Footer />)
    const emailLink = screen.getByLabelText('email')
    expect(emailLink).toHaveAttribute('href', 'mailto:cbianchi@protonmail.com')
  })

  it('contains LinkedIn link', () => {
    render(<Footer />)
    const linkedinLink = screen.getByLabelText('linkedin')
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/chasebianchi/')
  })

  it('contains GitHub link', () => {
    render(<Footer />)
    const githubLink = screen.getByLabelText('github')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/ChaseBianchi/')
  })

  it('renders credit line', () => {
    render(<Footer />)
    expect(screen.getByText(/Built with React, TypeScript & Claude Code/)).toBeInTheDocument()
  })
})
