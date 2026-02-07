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

  it('displays frontend skills', () => {
    render(<About />)
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument()
  })

  it('displays Adobe stack', () => {
    render(<About />)
    expect(screen.getByText(/AEM Sites/)).toBeInTheDocument()
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
