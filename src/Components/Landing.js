import React from 'react'
import {Random} from 'react-animated-text'

const nameStyle={
    fontSize: '3rem',
    fontFamily: `'Bad Script', cursive`
}
const titleStyle={
  fontSize: '2rem',
  marginBottom: '80px',
  transition: 'opacity 2s linear 2s'
}


function Landing() {

  return (
    <div id='landing' className="comp-wrapper">
        <div style={nameStyle} className="textwrapper">
            <Random 
            text='Chase Bianchi'
            //   paused={this.state.paused}
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
            effectDuration='2'
            />
           
        </div>
        <div className="arrows"></div>
    </div>
  )
}

export default Landing