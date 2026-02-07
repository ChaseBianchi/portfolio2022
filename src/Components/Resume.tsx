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
              <span>JavaScript, TypeScript, React, Redux, jQuery, SCSS, HTML, AAA Accessibility</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">Backend</span>
              <span>Java, Spring, AEM (Sites, Assets), Python, SQL, Okta, JWT</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">Adobe Stack</span>
              <span>AEM Sites, AEM Assets, GenStudio, Workfront, Workfront Fusion</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">AI & Automation</span>
              <span>Claude Code, Prompt Engineering, AI-Augmented Development Workflows</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">Product & Design</span>
              <span>GitHub, Jira, ADO, Agile/Scrum, CI/CD Pipelines</span>
            </div>
            <div className="resume-skill-row">
              <span className="resume-skill-label">Testing</span>
              <span>Vitest, Playwright, Jest, Cypress, React Testing Library</span>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2>Employment</h2>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Consultant — Full Stack Developer</strong> | Slalom Consulting
              </div>
              <div className="resume-date">Jun 2022 — Present</div>
            </div>
            <p className="resume-tech">AEM | JavaScript | React | Java | TypeScript | Claude Code</p>
            <ul>
              <li>Lead developer on enterprise AEM implementations for clients including Dentaquest and Mass General Brigham, delivering CMS solutions, platform migrations, and website redesigns</li>
              <li>Specialize in Adobe Experience Manager (AEM Sites & Assets), building custom components, workflows, and integrations using Java, JavaScript, and React</li>
              <li>Pioneer AI-augmented development practices — leveraging Claude Code and prompt engineering to accelerate delivery, improve code quality, and automate repetitive tasks</li>
              <li>Lead client demos, discovery sessions, UAT, and developer training; mentor junior developers on AEM architecture and best practices</li>
              <li>Promoted from Associate Consultant to Consultant within 6 months; nominated for Employee of the Quarter</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Fullstack Web Developer</strong> | Freelance
              </div>
              <div className="resume-date">Sep 2021 — Jun 2022</div>
            </div>
            <p className="resume-tech">JavaScript | React | Redux</p>
            <ul>
              <li>End-to-end development as a solo practitioner — taking client needs from concept through deployment</li>
              <li>Built responsive web applications with React, Redux, and modern JavaScript</li>
              <li>Managed full project lifecycle including client communication, requirements, development, testing, and delivery</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Frontend Web Developer</strong> | Range Trainer Pro
              </div>
              <div className="resume-date">May 2021 — Aug 2021</div>
            </div>
            <p className="resume-tech">JavaScript | React | Redux</p>
            <ul>
              <li>Developed JavaScript algorithms to transform user input into backend-compatible data structures, enabling flexible yet customizable data entry</li>
              <li>Built and maintained reusable React components with Redux for state management</li>
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
              <li>World Series of Poker bracelet winner with career net profits exceeding $2 million</li>
              <li>Applied data analysis, probability theory, and risk management to inform strategic decision-making</li>
              <li>Self-directed career requiring exceptional discipline, bankroll management, and performance under pressure</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2>Projects</h2>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Portfolio Website</strong> — AI-Augmented Modernization
              </div>
              <div className="resume-date">2024</div>
            </div>
            <p className="resume-tech">React 18 | TypeScript | Vite | Vitest | Playwright | Claude Code</p>
            <ul>
              <li>Modernized personal portfolio from CRA/JavaScript to Vite/TypeScript using AI-augmented development with Claude Code</li>
              <li>Implemented comprehensive testing: 73+ unit/integration tests (Vitest) and 33+ E2E tests (Playwright)</li>
              <li>Achieved WCAG AAA accessibility compliance with semantic HTML, keyboard navigation, and ARIA attributes</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Dentaquest Website</strong> — Enterprise AEM Implementation
              </div>
              <div className="resume-date">2023</div>
            </div>
            <p className="resume-tech">AEM | Java | JavaScript | React | SCSS</p>
            <ul>
              <li>Built responsive React SPA components integrated into Adobe Experience Manager architecture</li>
              <li>Delivered enterprise-grade CMS solution for a leading dental benefits provider</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Mass General Brigham Website</strong> — Enterprise Redesign
              </div>
              <div className="resume-date">2022—2023</div>
            </div>
            <p className="resume-tech">AEM | Java | JavaScript | jQuery | SCSS</p>
            <ul>
              <li>Led website redesign with AAA accessibility compliance for Massachusetts' largest healthcare employer</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <strong>Boys & Girls Club Emotion Tracker</strong> — Capstone Project
              </div>
              <div className="resume-date">Mar 2021</div>
            </div>
            <p className="resume-tech">React | Java | Spring | Okta | Ant Design</p>
            <ul>
              <li>Full stack application allowing children to provide real-time feedback, giving staff actionable data</li>
              <li>Architected Spring backend designed to scale from 4,400 to 4,000,000+ users</li>
              <li>Agile workflow with regular stakeholder meetings ensuring strict adherence to requirements</li>
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
              <div className="resume-date">May 2021</div>
            </div>
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
