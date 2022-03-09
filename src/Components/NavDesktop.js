import React from 'react'

function NavDesktop() {

  return (
    <div>
      <div id='desktopNavbar'>
        <div className='navDesktopContainer'>
          <a  href="#landing"><p className="menuItem desktop hover-underline-animation">Home</p></a>
          <a  href="#projects"><p className="menuItem desktop hover-underline-animation">Projects</p></a>
          <a  href="#experience"><p className="menuItem desktop hover-underline-animation">Experience</p></a>
          <a  href="#about"><p className="menuItem desktop hover-underline-animation">About</p></a>
          <a  href="#connect"><p className="menuItem desktop hover-underline-animation">Connect</p></a>
          <div className="gradient"/>
          <div className="landingBar">
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
        </div>
      </div>
    </div>
    
  )
}

export default NavDesktop