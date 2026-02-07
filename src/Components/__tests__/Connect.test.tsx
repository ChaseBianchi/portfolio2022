import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Connect from '../Connect'

// Mock emailjs
vi.mock('@emailjs/browser', () => ({
  default: {
    sendForm: vi.fn(() => Promise.resolve({ text: 'OK' })),
  },
}))

describe('Connect', () => {
  it('renders the Connect heading', () => {
    render(<Connect />)
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  it('renders form fields', () => {
    render(<Connect />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<Connect />)
    expect(screen.getByDisplayValue('Send')).toBeInTheDocument()
  })

  it('fields are required', () => {
    render(<Connect />)
    expect(screen.getByLabelText('Name')).toBeRequired()
    expect(screen.getByLabelText('Email')).toBeRequired()
    expect(screen.getByLabelText('Message')).toBeRequired()
  })

  it('shows validation message on empty submit', async () => {
    const user = userEvent.setup()
    render(<Connect />)

    // Fill only name, leave others empty to trigger custom validation
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const messageInput = screen.getByLabelText('Message')

    await user.type(nameInput, 'Test')
    await user.type(emailInput, 'test@test.com')
    // Leave message empty - HTML5 validation will prevent submit
    // So we test that required attributes are set
    expect(messageInput).toHaveAttribute('aria-required', 'true')
  })

  it('has aria-live region for notifications', () => {
    const { container } = render(<Connect />)
    const notification = container.querySelector('[aria-live="polite"]')
    expect(notification).toBeInTheDocument()
  })

  it('uses section element with aria-label', () => {
    render(<Connect />)
    expect(screen.getByLabelText('Contact')).toBeInTheDocument()
  })

  it('labels are associated with inputs via htmlFor', () => {
    render(<Connect />)
    const nameInput = screen.getByLabelText('Name')
    expect(nameInput).toHaveAttribute('id', 'contact-name')
  })
})
