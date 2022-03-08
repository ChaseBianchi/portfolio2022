import React from 'react'

function NavDesktop() {
  return (
    <div>
      <div className="navDesktopWrapper">
        <div className='navDesktopContainer'>
          {/* <a  href="#landing"><p className="menuItem desktop hover-underline-animation">Home</p></a> */}
          <a  href="#projects"><p className="menuItem desktop hover-underline-animation">Projects</p></a>
          <a  href="#experience"><p className="menuItem desktop hover-underline-animation">Experience</p></a>
          <a  href="#about"><p className="menuItem desktop hover-underline-animation">About</p></a>
          <a  href="#connect"><p className="menuItem desktop hover-underline-animation">Connect</p></a>
        </div>
      </div>
      <div className="gradient"/>
    </div>
    
  )
}

export default NavDesktop