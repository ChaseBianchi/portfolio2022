import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import About from '../About'

describe('About', () => {
  it('renders the About heading', () => {
    render(<About />)
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders the name', () => {
    render(<About />)
    expect(screen.getByText('Chase Bianchi')).toBeInTheDocument()
  })

  it('displays updated title', () => {
    render(<About />)
    expect(screen.getByText('Consultant at Slalom')).toBeInTheDocument()
  })

  it('displays bio text', () => {
    render(<About />)
    expect(screen.getByText(/enterprise Adobe Experience Manager/)).toBeInTheDocument()
  })

  it('renders skill categories', () => {
    render(<About />)
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('Backend')).toBeInTheDocument()
    expect(screen.getByText('Adobe Stack')).toBeInTheDocument()
    expect(screen.getByText('AI & Automation')).toBeInTheDocument()
    expect(screen.getByText('Product & Design')).toBeInTheDocument()
    expect(screen.getByText('Testing & Quality')).toBeInTheDocument()
  })

  it('displays TypeScript in frontend skills', () => {
    render(<About />)
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument()
  })

  it('renders headshot image', () => {
    render(<About />)
    expect(screen.getByAltText('Chase Bianchi headshot')).toBeInTheDocument()
  })

  it('renders resume download link', () => {
    render(<About />)
    const resumeLink = screen.getByText('Resume').closest('a')
    expect(resumeLink).toHaveAttribute('href', '/media/resume.pdf')
  })

  it('uses section element', () => {
    render(<About />)
    expect(screen.getByLabelText('About')).toBeInTheDocument()
  })
})
