import React, {useState, useEffect} from 'react'
import {Random, Wave} from 'react-animated-text'


function WebDev() {
    const [bool, setBool] = useState(true)
    
    useEffect(()=>{
        setTimeout(() => {
            setBool(false)
        }, 4000);
    },[])

    const titleStyle={
        fontSize: '2rem',
        marginBottom: '80px',
        transition: 'opacity 2s linear 2s'
    }

    const mouseOver = () => setBool(true)
    // const mouseExit = () => setBool(true)

  return (
    <div onMouseOver={mouseOver} style={titleStyle} className="textwrapper">
            {bool 
            ?
            <Random 
            text='Fullstack Web Developer'
            iterations={1}
            effect='verticalFadeIn'
            effectChange={7}
            effectDirection="up"
            effectDuration='2'
            />
            :
            <Wave
            text='Fullstack Web Developer'
            effect="verticalFadeOut"
            effectChange={2.5}
            effectDirection='down'
            iterations={1}
            />
            }
            
        </div>
  )
}

export default WebDev