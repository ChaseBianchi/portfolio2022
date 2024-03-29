import React from 'react'

function Footer() {
  return (
    <div id='footer' className="comp-wrapper">
      {/* <p className="signature">Created by Chase Bianchi</p> */}
      <div className="navHover">
        <a className='linkedinWrapper' href="mailto:yourmail@gmail.com" target='_blank' rel='noreferrer'>
          <img className='linkedinLogo' src="/media/email.png" alt="email" />
        </a>
      </div>
      <div className="navHover">
        <a className='linkedinWrapper' href="https://www.linkedin.com/in/chasebianchi/" target='_blank' rel='noreferrer'>
          <img className='linkedinLogo' src="/media/linkedin3.png" alt="linkedin" />
        </a>
      </div>
      <div className="navHover">
        <a className='linkedinWrapper' href="https://github.com/ChaseBianchi/" target='_blank' rel='noreferrer'>
          <img className='linkedinLogo' src="/media/github2.png" alt="github" />
        </a>
      </div>
      
    </div>
  )
}

export default Footer