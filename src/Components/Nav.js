import React, {useState} from 'react'
import {slide as Menu} from 'react-burger-menu'

function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const handleMenuOpen = ()=> setIsOpen(true)
  const handleMenuClose = ()=>setIsOpen(false)
  return (
    <div id='nav'>
        <Menu isOpen={isOpen} onOpen={handleMenuOpen} onClose={handleMenuClose}>
            <a onClick={handleMenuClose} className="menu-item" href="#landing">Home</a>
            <a onClick={handleMenuClose} className="menu-item" href="#projects">Projects</a>
            <a onClick={handleMenuClose} className="menu-item" href="#experience">Experience</a>
            <a onClick={handleMenuClose} className="menu-item--small" href="#about">About</a>
            <a onClick={handleMenuClose} className="menu-item--small" href="#connect">Connect</a>

        </Menu>
    </div>
  )
}

export default Nav