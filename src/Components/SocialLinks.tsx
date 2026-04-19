import { socialLinks } from '../data/socialLinks'

function SocialLinks() {
  return (
    <>
      {socialLinks.map((link) => (
        <div key={link.alt} className="navHover">
          <a
            className='socialLink'
            href={link.href}
            target='_blank'
            rel='noreferrer'
            aria-label={link.alt}
          >
            <img className='socialIcon' src={link.img} alt={link.alt} />
          </a>
        </div>
      ))}
    </>
  )
}

export default SocialLinks
