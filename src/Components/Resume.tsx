function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-container">
        <header className="resume-header">
          <div className="resume-name-block">
            <h1>Chase Bianchi</h1>
            <p className="resume-contact-line">
              <a href="mailto:cbianchi@protonmail.com">cbianchi@protonmail.com</a>
              <span className="resume-separator">|</span>
              978-809-7122
              <span className="resume-separator">|</span>
              <a href="https://chasebianchi.com">chasebianchi.com</a>
            </p>
            <p className="resume-contact-line">
              <a href="https://github.com/ChaseBianchi">github.com/ChaseBianchi</a>
              <span className="resume-separator">|</span>
              <a href="https://linkedin.com/in/chasebianchi">linkedin.com/in/chasebianchi</a>
            </p>
          </div>
        </header>

        <section className="resume-section">
          <h2>Technical Skills</h2>
          <div className="resume-skills-grid">
            <div className="resume-skill-row">
              <span className="resume-skill-label">Frontend</span>
              <span>JavaScript, TypeScript, React, Redux, jQuery, SCSS, HTML, WCAG AAA Accessibility</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">Backend</span>
              <span>Java, Spring, AEM (Sites, Assets, Dispatcher), Python, SQL, Okta, JWT</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">Adobe Stack</span>
              <span>AEM Sites, AEM Assets, AEM Dispatcher, GenStudio, Workfront, Workfront Fusion</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">AI & Automation</span>
              <span>Claude Code, Prompt Engineering, AI-Augmented Dev Workflows, Workfront Fusion</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">DevOps & Tooling</span>
              <span>Git, GitHub, Jira, ADO, Agile/Scrum, CI/CD Pipelines, Maven, Vite</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">Testing</span>
              <span>Vitest, Playwright, Jest, Cypress, React Testing Library, JUnit</span>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Professional Experience</h2>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Consultant — Full Stack Developer</strong> | Slalom Consulting
              </div>
              <div className="resume-date">Jun 2022 — Present</div>
            </div>
            <p className="resume-tech">AEM | Java | JavaScript | TypeScript | React | jQuery | Claude Code</p>
            <ul>
              <li>Digital Experience Management consultant delivering enterprise CMS solutions, platform migrations, website redesigns, and marketing automation for Fortune 500 and large healthcare clients</li>
              <li>Promoted from Associate Consultant to Consultant within 6 months; nominated for Employee of the Quarter for exceptional client delivery and team leadership</li>
              <li>Pioneer AI-augmented development practices on the team — leveraging Claude Code and prompt engineering to accelerate delivery timelines, improve code quality, and automate repetitive development tasks</li>
              <li>Lead client-facing activities including technical demos, discovery workshops, requirements gathering, UAT sessions, and post-launch training for content authors and administrators</li>
              <li>Mentor junior developers on AEM architecture, component development patterns, and enterprise development best practices</li>
            </ul>
          </div>

          <div className="resume-entry resume-sub-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Dentaquest</strong> — Enterprise AEM Implementation
              </div>
              <div className="resume-date">2023</div>
            </div>
            <p className="resume-tech">AEM Sites | Java | JavaScript | React | SCSS | Maven</p>
            <ul>
              <li>Lead developer on a greenfield AEM Sites implementation for a leading dental benefits provider serving millions of members</li>
              <li>Architected and built custom AEM components integrating React SPA modules into the AEM page editor, enabling content authors to manage dynamic content without developer intervention</li>
              <li>Developed AEM Sling Models, servlets, and OSGi services in Java to support complex content structures and third-party API integrations</li>
              <li>Implemented responsive SCSS design system ensuring consistent brand experience across desktop, tablet, and mobile breakpoints</li>
            </ul>
          </div>

          <div className="resume-entry resume-sub-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Mass General Brigham</strong> — Enterprise Website Redesign
              </div>
              <div className="resume-date">2022 — 2023</div>
            </div>
            <p className="resume-tech">AEM Sites | Java | JavaScript | jQuery | SCSS | Dispatcher</p>
            <ul>
              <li>Core developer on a full website redesign for Massachusetts' largest healthcare employer, serving 80,000+ employees and millions of patients</li>
              <li>Built accessible AEM components achieving WCAG AAA compliance across the site, meeting strict healthcare accessibility requirements</li>
              <li>Developed custom AEM workflows and content fragment models to streamline editorial processes for a large distributed content team</li>
              <li>Configured AEM Dispatcher caching rules and CDN integration for high-traffic pages, improving page load performance</li>
              <li>Participated in triage, issue resolution, and cross-team coordination across multiple vendor teams during parallel development</li>
            </ul>
          </div>

          <div className="resume-entry resume-sub-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Internal & Cross-Client Initiatives</strong>
              </div>
            </div>
            <ul>
              <li>Developed reusable AEM project archetypes and component libraries to accelerate onboarding for new Slalom AEM engagements</li>
              <li>Led internal knowledge-sharing sessions on AEM development patterns, AI-augmented workflows, and accessibility best practices</li>
              <li>Contributed to pre-sales technical discovery and estimation for prospective Adobe/AEM client engagements</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Professional Poker Player</strong> | Self Employed
              </div>
              <div className="resume-date">2009 — 2020</div>
            </div>
            <ul>
              <li>World Series of Poker bracelet winner with career net profits exceeding $2 million across live and online tournaments</li>
              <li>Applied rigorous data analysis, probability modeling, and risk management frameworks to inform real-time strategic decisions under uncertainty</li>
              <li>Self-directed career requiring exceptional discipline, continuous skill development, and sustained performance under high-pressure conditions</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Projects</h2>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Portfolio Website</strong> — AI-Augmented Full Stack Modernization
              </div>
              <div className="resume-date">2024</div>
            </div>
            <p className="resume-tech">React 18 | TypeScript | Vite | Vitest | Playwright | Claude Code</p>
            <ul>
              <li>Modernized personal portfolio from Create React App / JavaScript to Vite / TypeScript using AI-augmented development with Claude Code, demonstrating modern full-stack engineering practices</li>
              <li>Implemented 86+ unit/integration tests (Vitest + React Testing Library) and 33+ E2E tests (Playwright) with visual regression baselines</li>
              <li>Achieved WCAG AAA accessibility compliance with semantic HTML, full keyboard navigation, ARIA attributes, and automated axe-core audits</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Boys & Girls Club Emotion Tracker</strong> — Full Stack Capstone
              </div>
              <div className="resume-date">2021</div>
            </div>
            <p className="resume-tech">React | Java | Spring | Okta | Ant Design</p>
            <ul>
              <li>Full stack application enabling children to provide real-time emotional feedback, giving staff actionable data for program improvement</li>
              <li>Architected Spring backend with Okta authentication designed to scale from 4,400 current users to 4,000,000+</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Education</h2>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Bloom Institute of Technology</strong> | Full Stack Web Development & Computer Science
              </div>
              <div className="resume-date">2021</div>
            </div>
            <ul>
              <li>6-month intensive covering JavaScript, React, Redux, Java, Spring, Python, SQL, and agile methodology</li>
            </ul>
          </div>
        </section>

        <div className="resume-print-action no-print">
          <button onClick={() => window.print()} className="resume-print-btn">
            Print / Save as PDF
          </button>
          <a href="/" className="resume-back-link">Back to Portfolio</a>
        </div>
      </div>
    </div>
  )
}

export default Resume
