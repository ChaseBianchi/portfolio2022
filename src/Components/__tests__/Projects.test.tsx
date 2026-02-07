import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Projects from '../Projects'

describe('Projects', () => {
  it('renders the Projects heading', () => {
    render(<Projects />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders carousel navigation buttons', () => {
    render(<Projects />)
    expect(screen.getByLabelText('Previous project')).toBeInTheDocument()
    expect(screen.getByLabelText('Next project')).toBeInTheDocument()
  })

  it('disables left arrow at start', () => {
    render(<Projects />)
    expect(screen.getByLabelText('Previous project')).toBeDisabled()
  })

  it('enables right arrow at start', () => {
    render(<Projects />)
    expect(screen.getByLabelText('Next project')).not.toBeDisabled()
  })

  it('shows slide indicator starting at 1', () => {
    render(<Projects />)
    expect(screen.getByText(/1 of/)).toBeInTheDocument()
  })

  it('advances to next slide on right arrow click', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    await user.click(screen.getByLabelText('Next project'))
    expect(screen.getByText(/2 of/)).toBeInTheDocument()
  })

  it('goes back on left arrow click after advancing', async () => {
    const user = userEvent.setup()
    render(<Projects />)
    await user.click(screen.getByLabelText('Next project'))
    await user.click(screen.getByLabelText('Previous project'))
    expect(screen.getByText(/1 of/)).toBeInTheDocument()
  })

  it('renders project tiles', () => {
    render(<Projects />)
    expect(screen.getByText('Dentaquest Website')).toBeInTheDocument()
  })

  it('has carousel ARIA attributes', () => {
    render(<Projects />)
    const carousel = screen.getByRole('region', { name: 'Project carousel' })
    expect(carousel).toBeInTheDocument()
  })
})
