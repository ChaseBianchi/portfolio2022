import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Connect from '../../Components/Connect'

const mockSendForm = vi.fn()

vi.mock('@emailjs/browser', () => ({
  default: {
    sendForm: (...args: unknown[]) => mockSendForm(...args),
  },
}))

describe('Contact Form Integration', () => {
  beforeEach(() => {
    mockSendForm.mockReset()
  })

  it('complete success flow: fill form, submit, see success message', async () => {
    mockSendForm.mockResolvedValue({ text: 'OK' })
    const user = userEvent.setup()
    render(<Connect />)

    await user.type(screen.getByLabelText('Name'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Message'), 'Hello there!')
    await user.click(screen.getByDisplayValue('Send'))

    expect(await screen.findByText('Message sent. Talk to you soon!')).toBeInTheDocument()
  })

  it('error flow: submit fails, see error message', async () => {
    mockSendForm.mockRejectedValue({ text: 'Failed' })
    const user = userEvent.setup()
    render(<Connect />)

    await user.type(screen.getByLabelText('Name'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Message'), 'Hello there!')
    await user.click(screen.getByDisplayValue('Send'))

    expect(await screen.findByText(/Error, message not sent/)).toBeInTheDocument()
  })

  it('button shows "Sending..." during submission', async () => {
    let resolvePromise: (value: unknown) => void
    mockSendForm.mockReturnValue(new Promise((resolve) => { resolvePromise = resolve }))
    const user = userEvent.setup()
    render(<Connect />)

    await user.type(screen.getByLabelText('Name'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Message'), 'Hello there!')
    await user.click(screen.getByDisplayValue('Send'))

    expect(screen.getByDisplayValue('Sending...')).toBeDisabled()

    // Resolve to clean up
    resolvePromise!({ text: 'OK' })
    expect(await screen.findByDisplayValue('Send')).not.toBeDisabled()
  })
})
