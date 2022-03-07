import React, {useState, useEffect} from 'react'

function NavMobile() {
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = () => setIsOpen(!isOpen)
    
    const handleMenuClose = ()=> setIsOpen(false)

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.left = "0";
        } else {
        document.getElementById("navbar").style.left = "-150px";
        setIsOpen(false)
        }
        prevScrollpos = currentScrollPos;
    }

  return (
    <div style={isOpen ? {background: 'hsl(220, 6%, 9%, .8)'} : {}} id='navbar' className='navMobileContainer'>
        <div onClick={handleClick} className={isOpen ? "container change" : "container"} onclick="myFunction(this)">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
        <div id='menuMobileId' className={isOpen ? 'menuMobile' : 'menuMobile hidden'}>
            <div className="navMobileLinksContainer">
            <a onClick={handleMenuClose} className="menuItem" href="#landing">Home</a>
            <a onClick={handleMenuClose} className="menuItem" href="#projects">Projects</a>
            <a onClick={handleMenuClose} className="menuItem" href="#experience">Experience</a>
            <a onClick={handleMenuClose} className="menuItem" href="#about">About</a>
            <a onClick={handleMenuClose} className="menuItem" href="#connect">Connect</a>
            </div>
            
        </div>
    </div>
  )
}

export default NavMobile