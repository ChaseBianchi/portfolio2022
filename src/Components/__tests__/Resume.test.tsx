import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Resume from '../Resume'

describe('Resume', () => {
  it('renders the name', () => {
    render(<Resume />)
    expect(screen.getByText('Chase Bianchi')).toBeInTheDocument()
  })

  it('renders contact info', () => {
    render(<Resume />)
    expect(screen.getByText('cbianchi@protonmail.com')).toBeInTheDocument()
    expect(screen.getByText('chasebianchi.com')).toBeInTheDocument()
  })

  it('renders Technical Skills section', () => {
    render(<Resume />)
    expect(screen.getByText('Technical Skills')).toBeInTheDocument()
  })

  it('renders AI & Automation skills', () => {
    render(<Resume />)
    expect(screen.getByText('AI & Automation')).toBeInTheDocument()
    expect(screen.getAllByText(/Claude Code/).length).toBeGreaterThan(0)
  })

  it('renders Professional Experience section with Slalom', () => {
    render(<Resume />)
    expect(screen.getByText('Professional Experience')).toBeInTheDocument()
    expect(screen.getByText(/Slalom Consulting/)).toBeInTheDocument()
  })

  it('renders Slalom client sub-entries', () => {
    render(<Resume />)
    expect(screen.getByText(/Dentaquest/)).toBeInTheDocument()
    expect(screen.getByText(/Mass General Brigham/)).toBeInTheDocument()
  })

  it('renders Projects section', () => {
    render(<Resume />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders Education section', () => {
    render(<Resume />)
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText(/Bloom Institute of Technology/)).toBeInTheDocument()
  })

  it('renders print button', () => {
    render(<Resume />)
    expect(screen.getByText('Print / Save as PDF')).toBeInTheDocument()
  })

  it('does not include work GitHub reference', () => {
    const { container } = render(<Resume />)
    expect(container.textContent).not.toContain('ChaseBianchiSlalom')
  })
})
