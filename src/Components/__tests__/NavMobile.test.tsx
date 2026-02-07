import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import NavMobile from '../NavMobile'

describe('NavMobile', () => {
  it('renders the hamburger button', () => {
    render(<NavMobile />)
    expect(screen.getByLabelText('Toggle navigation menu')).toBeInTheDocument()
  })

  it('hamburger button has aria-expanded=false initially', () => {
    render(<NavMobile />)
    expect(screen.getByLabelText('Toggle navigation menu')).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles menu on hamburger click', async () => {
    const user = userEvent.setup()
    render(<NavMobile />)
    const button = screen.getByLabelText('Toggle navigation menu')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders navigation links', () => {
    render(<NavMobile />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  it('closes menu on link click', async () => {
    const user = userEvent.setup()
    render(<NavMobile />)
    const button = screen.getByLabelText('Toggle navigation menu')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    await user.click(screen.getByText('Projects'))
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('has mobile navigation aria-label', () => {
    render(<NavMobile />)
    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument()
  })
})
