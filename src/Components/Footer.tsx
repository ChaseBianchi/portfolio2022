import SocialLinks from './SocialLinks'

function Footer() {
  return (
    <footer id='footer' className="comp-wrapper">
      <div className="footerLinks">
        <SocialLinks />
      </div>
      <p className="footerCredit">
        Built with React, TypeScript & Claude Code
      </p>
    </footer>
  )
}

export default Footer
