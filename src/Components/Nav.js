import React from 'react'
import {scaleDown as Menu} from 'react-burger-menu'

function Nav() {
  return (
    <div id='nav'>
        <Menu>
            <a className="menu-item" href="#landing">Home</a>
            <a className="menu-item" href="#projects">Projects</a>
            <a className="menu-item" href="#experience">Experience</a>
            <a className="menu-item--small" href="#about">About</a>
            <a className="menu-item--small" href="#connect">Connect</a>

        </Menu>
    </div>
  )
}

export default Nav