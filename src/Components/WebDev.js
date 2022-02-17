import React, {useState, useEffect} from 'react'
import {Random} from 'react-animated-text'


function WebDev() {
    const [state, setState] = useState({date: Date.now(), opacity: '1'});
    const titleStyle={
        fontSize: '2rem',
        opacity: `${state.opacity}`,
        marginBottom: '80px',
        transition: 'opacity 2s linear 2s'
    }

    useEffect(() => {
    
    const interval2 = setInterval(() => setState({opacity: '1', date: Date.now()}), 5000);
    return () => {
        clearInterval(interval2);
    };
    }, []);
  return (
    <div style={titleStyle} className="textwrapper">
            <Random 
            text='Fullstack Web Developer'
            //   paused={this.state.paused}
            iterations={1}
            effect="verticalFadeIn"
            effectChange={2}
            effectDirection="up"
            />
        </div>
  )
}

export default WebDev