import React from 'react'

function About() {
  return (
    <div id='about' className="comp-wrapper">
        <h2>About me</h2>
        <div className="aboutContainer">
          <div className="textContainer">
            <h3>Chase Bianchi</h3>
            <h4>Fullstack Web Developer in Boston</h4>
            <p>
              Hard working developer with a history of learning, problem solving, and critical thinking. 
              I flourish in team settings as a good communicator, listener, follower, and leader when given the opportunity. 
              Fullstack Web Development graduate from Bloom Institute of Technology.
            </p>
            <p>
              Frontend: JavasSript, React, Redux, CSS, HTML
            </p>
            <p>
              Backend: Java, Spring Framework, Python, SQL, Okta
            </p>
            <p>
              Product & Design: Github, Jest, Cypress, Photoshop
            </p>
            <a className='resumeLink' href="https://docs.google.com/document/d/1sPv5t-3fQUyT_rUwn4W-efEjQEq0vPhYJL1j4UbRq9s/edit?usp=sharing" target='_blank' rel='noreferrer'>
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