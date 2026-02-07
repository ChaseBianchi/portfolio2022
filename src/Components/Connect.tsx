import { useState, useRef, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'

const temp = import.meta.env.VITE_templateId
const service = import.meta.env.VITE_serviceId
const user = import.meta.env.VITE_userId

if (!service || !temp || !user) {
  console.warn('EmailJS environment variables are not set. Contact form will not work.')
}

function Connect() {
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const form = useRef<HTMLFormElement>(null)

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name')?.toString().trim()
    const email = formData.get('email')?.toString().trim()
    const msg = formData.get('message')?.toString().trim()

    if (!name || !email || !msg) {
      setMessage('Please fill out all fields.')
      return
    }

    setSending(true)
    emailjs.sendForm(service, temp, form.current!, user)
      .then((result) => {
        console.log(result.text)
        setMessage('Message sent. Talk to you soon!')
        form.current?.reset()
      })
      .catch((error) => {
        console.log(error.text)
        setMessage('Error, message not sent. Email directly cbianchi@protonmail.com')
      })
      .finally(() => {
        setSending(false)
      })
  }

  return (
    <section id='connect' className="comp-wrapper" aria-label="Contact">
      <h2>Connect</h2>
      <form className='connectForm' ref={form} onSubmit={sendEmail}>
        <div className="nameEmail">
          <div className="name">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" type="text" name="name" required aria-required="true" />
          </div>
          <div className="email">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" type="email" name="email" required aria-required="true" />
          </div>
        </div>
        <div className="message">
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" name="message" required aria-required="true" />
        </div>
        <div className="submit">
          <input className='submitBtn' type="submit" value={sending ? 'Sending...' : 'Send'} disabled={sending} />
        </div>
        <p className='messageNotification' aria-live="polite">{message}</p>
      </form>
    </section>
  )
}

export default Connect
