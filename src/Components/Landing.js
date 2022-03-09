import React from 'react'
import NavMobile from './NavMobile'
import NavDesktop from './NavDesktop'

function Landing() {

  return (
    <div id='landing' className="comp-wrapper">
      <NavDesktop />
      <NavMobile/>
      <div className="landingBarMobile">
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
      <h1>Chase Bianchi</h1>
      <h2>Fullstack Web Developer</h2>
    </div>
  )
}

export default Landing