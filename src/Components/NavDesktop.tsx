import SocialLinks from './SocialLinks'

function NavDesktop() {
  return (
    <div>
      <nav id='desktopNavbar' aria-label="Main navigation">
        <div className='navDesktopContainer'>
          <a href="#landing"><p className="menuItem desktop hover-underline-animation">Home</p></a>
          <a href="#projects"><p className="menuItem desktop hover-underline-animation">Projects</p></a>
          <a href="#experience"><p className="menuItem desktop hover-underline-animation">Experience</p></a>
          <a href="#about"><p className="menuItem desktop hover-underline-animation">About</p></a>
          <a href="#connect"><p className="menuItem desktop hover-underline-animation">Connect</p></a>
          <div className="gradient" />
          <div className="landingBar">
            <SocialLinks />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavDesktop
