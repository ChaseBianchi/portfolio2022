import { useState, useEffect, useRef, useCallback } from 'react'

function NavMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const navbarRef = useRef<HTMLDivElement>(null)
  const prevScrollRef = useRef(window.pageYOffset)

  const handleClick = () => setIsOpen(!isOpen)
  const handleMenuClose = () => setIsOpen(false)

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset
    const navbar = navbarRef.current
    const desktopNavbar = document.getElementById('desktopNavbar')

    if (prevScrollRef.current > currentScrollPos) {
      if (navbar) navbar.style.left = '0'
      if (desktopNavbar) desktopNavbar.style.top = '0'
    } else {
      if (navbar) navbar.style.left = '-150px'
      if (desktopNavbar) desktopNavbar.style.top = '-100px'
      setIsOpen(false)
    }
    prevScrollRef.current = currentScrollPos
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <nav
      ref={navbarRef}
      id='navbar'
      className={`navMobileContainer${isOpen ? ' menuOpen' : ''}`}
      aria-label="Mobile navigation"
    >
      <button
        onClick={handleClick}
        className={isOpen ? 'container change' : 'container'}
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </button>
      <div className={isOpen ? 'menuMobile' : 'menuMobile hidden'}>
        <div className="navMobileLinksContainer">
          <a onClick={handleMenuClose} href="#landing"><p className="menuItem">Home</p></a>
          <a onClick={handleMenuClose} href="#projects"><p className="menuItem">Projects</p></a>
          <a onClick={handleMenuClose} href="#experience"><p className="menuItem">Experience</p></a>
          <a onClick={handleMenuClose} href="#about"><p className="menuItem">About</p></a>
          <a onClick={handleMenuClose} href="#connect"><p className="menuItem">Connect</p></a>
        </div>
      </div>
    </nav>
  )
}

export default NavMobile
