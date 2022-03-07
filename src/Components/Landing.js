import React from 'react'
import NavMobile from './NavMobile'
import NavDesktop from './NavDesktop'

function Landing() {

  return (
    <div id='landing' className="comp-wrapper">
      {/* <NavDesktop className='NavDesktop' /> */}
      <NavMobile />
      <div className="landingBar">
        <div className='emailWrapper navHover'>
          <a className='landingEmail' href="mailto:yourmail@gmail.com" rel='noreferrer' target='_blank'>
            cbianchi@protonmail.com
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
      {/* <div style={nameStyle} className="textwrapper">
          <Random 
          text='Chase Bianchi'
          iterations={1}
          effect="verticalFadeIn"
          effectChange={5}
          effectDirection="up"
          effectDuration='0.9'
          />
      </div>
      <div style={titleStyle} className="textwrapper">
          
          <Random 
          text='Fullstack Web Developer'
          iterations={1}
          effect='verticalFadeIn'
          effectChange={7}
          effectDirection="up"
          effectDuration='1'
          />
          
      </div> */}
      <div className="arrows"></div>
    </div>
  )
}

export default Landing