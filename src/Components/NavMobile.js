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
        document.getElementById("desktopNavbar").style.top = "0";
        } else {
        document.getElementById("navbar").style.left = "-150px";
        document.getElementById("desktopNavbar").style.top = "-100px";
        setIsOpen(false)
        }
        prevScrollpos = currentScrollPos;
    }

  return (
    <div style={isOpen ? {background: 'hsl(220, 6%, 9%, .85)'} : {}} id='navbar' className='navMobileContainer'>
        <div onClick={handleClick} className={isOpen ? "container change" : "container"}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
        <div id='menuMobileId' className={isOpen ? 'menuMobile' : 'menuMobile hidden'}>
            <div className="navMobileLinksContainer">
                <a onClick={handleMenuClose} href="#landing"><p className="menuItem">Home</p></a>
                <a onClick={handleMenuClose} href="#projects"><p className="menuItem">Projects</p></a>
                <a onClick={handleMenuClose} href="#experience"><p className="menuItem">Experience</p></a>
                <a onClick={handleMenuClose} href="#about"><p className="menuItem">About</p></a>
                <a onClick={handleMenuClose} href="#connect"><p className="menuItem">Connect</p></a>
            </div>
            
        </div>
    </div>
  )
}

export default NavMobile