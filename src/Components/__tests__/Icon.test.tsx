import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Icon from '../Icon'

describe('Icon', () => {
  it('renders an image with the correct src and class', () => {
    render(<Icon img="/media/workimg.png" css="workImg" />)
    const img = screen.getByAltText('work image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/media/workimg.png')
    expect(img).toHaveClass('workImg')
  })

  it('renders with default empty css class', () => {
    render(<Icon img="/media/education.png" />)
    const img = screen.getByAltText('work image')
    expect(img).toHaveAttribute('src', '/media/education.png')
    expect(img.className).toBe('')
  })
})
