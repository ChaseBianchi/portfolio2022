import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectTile from '../ProjectTile'
import type { ProjectData } from '../ProjectTile'

const mockProject: ProjectData = {
  id: 0,
  name: 'Test Project',
  date: '2023',
  dev: 'full stack',
  tech: 'React, TypeScript',
  desc: 'A test project description',
  video: '',
  image: 'test.png',
  git: 'https://github.com/test',
  deploy: 'https://test.com',
}

describe('ProjectTile', () => {
  it('renders project name', () => {
    render(<ProjectTile data={mockProject} leftPx="38px" />)
    expect(screen.getByText('Test Project')).toBeInTheDocument()
  })

  it('renders project date', () => {
    render(<ProjectTile data={mockProject} leftPx="38px" />)
    expect(screen.getByText('2023')).toBeInTheDocument()
  })

  it('renders tech stack', () => {
    render(<ProjectTile data={mockProject} leftPx="38px" />)
    expect(screen.getByText('React, TypeScript')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<ProjectTile data={mockProject} leftPx="38px" />)
    expect(screen.getByText('A test project description')).toBeInTheDocument()
  })

  it('renders GitHub link when git is provided', () => {
    render(<ProjectTile data={mockProject} leftPx="38px" />)
    const gitLink = screen.getByText('GITHUB')
    expect(gitLink).toHaveAttribute('href', 'https://github.com/test')
  })

  it('renders deployed link when deploy is provided', () => {
    render(<ProjectTile data={mockProject} leftPx="38px" />)
    const deployLink = screen.getByText('DEPLOYED')
    expect(deployLink).toHaveAttribute('href', 'https://test.com')
  })

  it('does not render GitHub link when git is empty', () => {
    const noGitProject = { ...mockProject, git: '' }
    render(<ProjectTile data={noGitProject} leftPx="38px" />)
    expect(screen.queryByText('GITHUB')).not.toBeInTheDocument()
  })

  it('does not render deployed link when deploy is empty', () => {
    const noDeployProject = { ...mockProject, deploy: '' }
    render(<ProjectTile data={noDeployProject} leftPx="38px" />)
    expect(screen.queryByText('DEPLOYED')).not.toBeInTheDocument()
  })

  it('renders null when tech is empty', () => {
    const noTechProject = { ...mockProject, tech: '' }
    render(<ProjectTile data={noTechProject} leftPx="38px" />)
    expect(screen.queryByText('React, TypeScript')).not.toBeInTheDocument()
  })

  it('applies leftPx positioning', () => {
    const { container } = render(<ProjectTile data={mockProject} leftPx="388px" />)
    const wrapper = container.querySelector('.tileWrapper')
    expect(wrapper).toHaveStyle({ left: '388px' })
  })
})
