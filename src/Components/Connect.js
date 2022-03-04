import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import email from '../keys';

function Connect() {
  const [message, setMessage] = useState('')
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const {templateId, serviceId, userId} = email
    emailjs.sendForm(serviceId, templateId, form.current, userId)
      .then((result) => {
          console.log(result.text);
          setMessage('Message sent. Talk to you soon!')
      }, (error) => {
          console.log(error.text);
          setMessage('Error, message not sent. Email directly cbianchi@protonmail.com')
      });
    e.target.reset()
    
  };

  return (
    <div id='connect' className="comp-wrapper">
      <h2>Connect</h2>
      <form className='connectForm' ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Message</label>
      <textarea name="message" />
      <input className='submitBtn' type="submit" value="Send" />
      <p>{message}</p>
    </form>

    </div>
    
  )
}

export default Connect