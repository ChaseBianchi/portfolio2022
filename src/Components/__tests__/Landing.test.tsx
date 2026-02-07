import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Landing from '../Landing'

describe('Landing', () => {
  it('renders the name', () => {
    render(<Landing />)
    expect(screen.getByText('Chase Bianchi')).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<Landing />)
    expect(screen.getByText('Fullstack Web Developer')).toBeInTheDocument()
  })

  it('renders as a header element', () => {
    const { container } = render(<Landing />)
    expect(container.querySelector('header')).toBeInTheDocument()
  })

  it('includes navigation components', () => {
    render(<Landing />)
    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument()
    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument()
  })
})
