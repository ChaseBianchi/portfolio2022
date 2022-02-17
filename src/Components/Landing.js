import React from 'react'
import {Random} from 'react-animated-text'
import WebDev from './WebDev'

const nameStyle={
    fontSize: '4rem'
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
        <WebDev />
        <div class="arrows"></div>
    </div>
  )
}

export default Landing