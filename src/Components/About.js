import React from 'react'
import {Link} from 'react-router'

function About() {
  return (
    <div id='about' className="comp-wrapper">
        <h2>About</h2>
        <div className="aboutContainer">
          <div className="textContainer">
            <h3>Chase Bianchi</h3>
            <h4>Fullstack Web Developer in Boston</h4>
            <p>
              {/* Hard working developer with a history of learning, problem solving, and critical thinking. 
              I flourish in team settings as a good communicator, listener, follower, and leader when given the opportunity. 
              Fullstack Web Development graduate from Bloom Institute of Technology. */}
              Graduated from Bloom Institute of Technology in 2021. 
              Experienced with agile, scrum, and CI/CD team methodologies. 
              Familiar with unit and integration testing frameworks. 
            </p>
            <p>
              Frontend: JavaScript, React, Redux, CSS, HTML
            </p>
            <p>
              Backend: Java, Spring Framework, Python, SQL, Okta
            </p>
            <p>
              Product & Design: Github, Jest, Cypress, Photoshop
            </p>
            <a className='resumeLink' href="/media/resume.pdf" target='_blank' rel='noreferrer' download>
              <div className='downloadResume'>Resume</div>
            </a>
            
          </div>
          <div className="headshotContainer">
            <img className='headshot' src="/media/headshot.png" alt="headshot" />
          </div>
        </div>
    </div>
  )
}

export default About