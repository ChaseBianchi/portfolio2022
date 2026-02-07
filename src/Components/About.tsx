import { profile } from '../data/profile'

function About() {
  return (
    <section id='about' className="comp-wrapper" aria-label="About">
      <h2>About</h2>
      <div className="aboutContainer">
        <div className="textContainer">
          <h3>{profile.name}</h3>
          <h4>{profile.title}</h4>
          <p className="aboutBio">{profile.bio}</p>
          <div className="skillsGrid">
            {profile.skills.map((skill) => (
              <div key={skill.label} className="skillCategory">
                <span className="skillLabel">{skill.label}</span>
                <span className="skillItems">{skill.items}</span>
              </div>
            ))}
          </div>
          <a className='resumeLink' href="/media/resume.pdf" target='_blank' rel='noreferrer' download>
            <div className='downloadResume'>Resume</div>
          </a>
        </div>
        <div className="headshotContainer">
          <img className='headshot' src="/media/headshot.png" alt={`${profile.name} headshot`} />
        </div>
      </div>
    </section>
  )
}

export default About
