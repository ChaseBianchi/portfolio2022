import NavMobile from './NavMobile'
import NavDesktop from './NavDesktop'
import SocialLinks from './SocialLinks'
import { profile } from '../data/profile'

function Landing() {
  return (
    <header id='landing' className="comp-wrapper">
      <NavDesktop />
      <NavMobile />
      <div className="landingBarMobile">
        <SocialLinks />
      </div>
      <h1>{profile.name}</h1>
      <h2>{profile.heroTitle}</h2>
      <p className="heroSubtitle">{profile.heroSubtitle}</p>
      <div className="scrollIndicator">
        <button
          className="scrollArrow"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to Projects"
        />
      </div>
    </header>
  )
}

export default Landing
