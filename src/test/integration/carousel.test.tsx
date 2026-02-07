import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Projects from '../../Components/Projects'
import { projects } from '../../data/projects'

describe('Carousel Navigation Integration', () => {
  it('navigates through all projects', async () => {
    const user = userEvent.setup()
    render(<Projects />)

    // Start at 1
    expect(screen.getByText(`1 of ${projects.length}`)).toBeInTheDocument()

    // Navigate forward through all
    for (let i = 1; i < projects.length; i++) {
      await user.click(screen.getByLabelText('Next project'))
      expect(screen.getByText(`${i + 1} of ${projects.length}`)).toBeInTheDocument()
    }

    // Right arrow should be disabled at end
    expect(screen.getByLabelText('Next project')).toBeDisabled()

    // Navigate all the way back
    for (let i = projects.length - 1; i > 0; i--) {
      await user.click(screen.getByLabelText('Previous project'))
      expect(screen.getByText(`${i} of ${projects.length}`)).toBeInTheDocument()
    }

    // Left arrow should be disabled at start
    expect(screen.getByLabelText('Previous project')).toBeDisabled()
  })

  it('all project names are rendered in the DOM', () => {
    render(<Projects />)
    projects.forEach(proj => {
      expect(screen.getByText(proj.name)).toBeInTheDocument()
    })
  })
})
