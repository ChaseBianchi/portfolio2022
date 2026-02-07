import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Experience from '../Experience'

describe('Experience', () => {
  it('renders the section heading', () => {
    render(<Experience />)
    expect(screen.getByText('Experience & Education')).toBeInTheDocument()
  })

  it('renders Slalom entry', () => {
    render(<Experience />)
    expect(screen.getByText('Slalom Consulting')).toBeInTheDocument()
  })

  it('renders freelance entry with corrected dates', () => {
    render(<Experience />)
    expect(screen.getByText('Fullstack Web Developer')).toBeInTheDocument()
  })

  it('renders Bloom entry', () => {
    render(<Experience />)
    expect(screen.getByText('Bloom Institute of Technology')).toBeInTheDocument()
  })

  it('renders poker entry', () => {
    render(<Experience />)
    expect(screen.getByText('Professional Poker Player')).toBeInTheDocument()
  })

  it('uses section element with aria-label', () => {
    render(<Experience />)
    expect(screen.getByLabelText('Experience and Education')).toBeInTheDocument()
  })
})
