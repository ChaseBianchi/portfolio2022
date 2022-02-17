import React from 'react'
import {Random} from 'react-animated-text'
import WebDev from './WebDev'

const nameStyle={
    fontSize: '4rem'
}
const titleStyle={
    fontSize: '2rem',
}

function Landing() {
  return (
    <div id='landing' className="comp-wrapper">
        {/* <div style={nameStyle} className="textwrapper">
            <Random 
            text='Chase Bianchi'
            //   paused={this.state.paused}
            iterations={1}
            effect="verticalFadeIn"
            effectChange={2}
            effectDirection="down"
            />
        </div> */}
        <h1>Chase Bianchi</h1>
        <WebDev />
        <div class="arrows"></div>
        {/* <div style={titleStyle} className="textwrapper">
            <Random 
            text='Fullstack Web Developer'
            //   paused={this.state.paused}
            iterations={1}
            effect="verticalFadeIn"
            effectChange={2}
            effectDirection="up"
            />
        </div> */}
        
    </div>
  )
}

export default Landing