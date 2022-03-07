import React, {useState, useEffect} from 'react'

function NavMobile() {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => setIsOpen(!isOpen)
    const isOpenClassName = (additionalClassNames)=>{
        if(isOpen){return additionalClassNames}
        else{return `hidden ${additionalClassNames}`}
    }
    const handleMenuClose = ()=> setIsOpen(false)

  return (
    <div style={isOpen ? {background: 'hsla(0, 0%, 0%, 0.7)'} : {}} className='navMobileContainer'>
        <div onClick={handleClick} className={isOpen ? "container change" : "container"} onclick="myFunction(this)">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
        <div className={isOpenClassName('menuMobile')}>
            <div className="navMobileLinksContainer">
            <a onClick={handleMenuClose} className="menu-item" href="#landing">Home</a>
            <a onClick={handleMenuClose} className="menu-item" href="#projects">Projects</a>
            <a onClick={handleMenuClose} className="menu-item" href="#experience">Experience</a>
            <a onClick={handleMenuClose} className="menu-item" href="#about">About</a>
            <a onClick={handleMenuClose} className="menu-item" href="#connect">Connect</a>
            </div>
            
        </div>
    </div>
  )
}

export default NavMobile