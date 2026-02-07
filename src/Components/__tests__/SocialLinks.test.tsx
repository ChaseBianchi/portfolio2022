import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SocialLinks from '../SocialLinks'

describe('SocialLinks', () => {
  it('renders 3 social links', () => {
    render(<SocialLinks />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
  })

  it('renders email link with correct href', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText('email')).toHaveAttribute('href', 'mailto:cbianchi@protonmail.com')
  })

  it('renders LinkedIn link', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText('linkedin')).toHaveAttribute('href', 'https://www.linkedin.com/in/chasebianchi/')
  })

  it('renders GitHub link', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText('github')).toHaveAttribute('href', 'https://github.com/ChaseBianchi/')
  })

  it('all links have aria-label for accessibility', () => {
    render(<SocialLinks />)
    expect(screen.getByLabelText('email')).toBeInTheDocument()
    expect(screen.getByLabelText('linkedin')).toBeInTheDocument()
    expect(screen.getByLabelText('github')).toBeInTheDocument()
  })

  it('all links open in new tab', () => {
    render(<SocialLinks />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noreferrer')
    })
  })
})
