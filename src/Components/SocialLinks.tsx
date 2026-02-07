import { socialLinks } from '../data/socialLinks'

function SocialLinks() {
  return (
    <>
      {socialLinks.map((link) => (
        <div key={link.alt} className="navHover">
          <a
            className='linkedinWrapper'
            href={link.href}
            target='_blank'
            rel='noreferrer'
            aria-label={link.alt}
          >
            <img className='linkedinLogo' src={link.img} alt={link.alt} />
          </a>
        </div>
      ))}
    </>
  )
}

export default SocialLinks
