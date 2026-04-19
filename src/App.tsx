import { useEffect } from 'react'
import {
  capabilities,
  careerSteps,
  caseStudies,
  heroHighlights,
  heroStats,
  navLinks,
  principles,
  publicProjects,
  resumeCertifications,
  resumeCompetencies,
  resumeEducation,
  resumeExperience,
  resumeInnovation,
  resumeProjects,
  resumeSummary,
  resumeTechnologies,
  siteMeta,
  type Capability,
  type CaseStudy,
  type CareerStep,
  type Principle,
  type PublicProject,
  type ResumeEntry,
  type ResumeGroup,
} from './data/siteContent'
import './App.scss'

const tickerItems = [
  ...heroHighlights,
  'Enterprise CMS',
  'Accessibility',
  'Workflow Automation',
]

function SectionIntro({
  eyebrow,
  title,
  description,
  id,
  invert = false,
}: {
  eyebrow: string
  title: string
  description: string
  id?: string
  invert?: boolean
}) {
  return (
    <div className={`section-intro${invert ? ' section-intro--invert' : ''}`}>
      <p className="section-intro__eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function ProofCard({ stat }: { stat: (typeof heroStats)[number] }) {
  return (
    <article className="proof-card">
      <p className="proof-card__value">{stat.value}</p>
      <h3>{stat.label}</h3>
      <p>{stat.detail}</p>
    </article>
  )
}

function CapabilityCard({
  capability,
  index,
}: {
  capability: Capability
  index: number
}) {
  return (
    <article className={`capability-card capability-card--${index % 4}`}>
      <p className="capability-card__label">Capability</p>
      <h3>{capability.title}</h3>
      <p>{capability.description}</p>
      <ul>
        {capability.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

function PrincipleCard({ principle }: { principle: Principle }) {
  return (
    <article className="principle-card">
      <h3>{principle.title}</h3>
      <p>{principle.body}</p>
    </article>
  )
}

function CaseStudyCard({
  caseStudy,
  index,
}: {
  caseStudy: CaseStudy
  index: number
}) {
  return (
    <article className={`engagement-card engagement-card--${index % 4}`}>
      <div className="engagement-card__rail">
        <span className="engagement-card__index">{String(index + 1).padStart(2, '0')}</span>
        <p>{caseStudy.eyebrow}</p>
      </div>

      <div className="engagement-card__body">
        <h3>{caseStudy.title}</h3>
        <p className="engagement-card__summary">{caseStudy.summary}</p>

        <div className="engagement-card__content">
          <div>
            <h4>What I shipped</h4>
            <ul className="bullet-list">
              {caseStudy.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Stack and focus</h4>
            <ul className="tag-list" aria-label={`${caseStudy.title} technology stack`}>
              {caseStudy.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {caseStudy.liveUrl ? (
              <a href={caseStudy.liveUrl} target="_blank" rel="noreferrer" className="text-link text-link--dark">
                View live site
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

function ExperienceCard({ step }: { step: CareerStep }) {
  return (
    <article className="experience-card">
      <p className="experience-card__period">{step.period}</p>
      <h3>{step.title}</h3>
      <p>{step.detail}</p>
      <ul className="bullet-list">
        {step.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </article>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: PublicProject
  index: number
}) {
  return (
    <article className={`project-card project-card--${index % 4}`}>
      <div className="project-card__image-shell">
        <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
      </div>
      <div className="project-card__body">
        <p className="project-card__type">{project.type}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <ul className="tag-list" aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {project.repoUrl ? (
          <div className="project-card__actions">
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-link">
              Source
            </a>
          </div>
        ) : null}
      </div>
    </article>
  )
}

function ResumeLinkCard({
  title,
  body,
  href,
  cta,
  download = false,
}: {
  title: string
  body: string
  href: string
  cta: string
  download?: boolean
}) {
  return (
    <article className="resume-link-card">
      <h3>{title}</h3>
      <p>{body}</p>
      <a href={href} className="button button--dark" download={download}>
        {cta}
      </a>
    </article>
  )
}

function ResumeGroupList({ groups }: { groups: ResumeGroup[] }) {
  return (
    <div className="resume-grid">
      {groups.map((group) => (
        <article key={group.title} className="resume-card">
          <h3>{group.title}</h3>
          <ul className="bullet-list bullet-list--resume">
            {group.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

function ResumeEntryList({ entries }: { entries: ResumeEntry[] }) {
  return (
    <div className="resume-stack">
      {entries.map((entry) => (
        <article key={entry.title} className="resume-card">
          <h3>{entry.title}</h3>
          {entry.subtitle ? <p className="resume-card__subtitle">{entry.subtitle}</p> : null}
          {entry.bullets.length > 0 ? (
            <ul className="bullet-list bullet-list--resume">
              {entry.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </div>
  )
}

function PortfolioPage() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#top" className="site-brand" aria-label="Go to top of page">
          <span className="site-brand__name">{siteMeta.name}</span>
          <span className="site-brand__role">{siteMeta.roleLine}</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="/resume" className="site-nav__utility">
            Resume
          </a>
        </nav>
      </header>

      <main>
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              {siteMeta.title} / {siteMeta.roleLine}
            </p>
            <h1 id="hero-title">Adobe platform depth. Front-end rigor. AI-enabled execution.</h1>
            <p className="hero__summary">
              I build enterprise experience systems that are accessible, maintainable, and ready
              for real delivery pressure, with deep AEM experience and an active focus on AI-enabled
              workflows.
            </p>

            <div className="hero__actions">
              <a className="button button--primary" href="#work">
                Featured work
              </a>
              <a className="button button--ghost" href="/resume">
                Read the resume
              </a>
            </div>

            <ul className="hero__chips" aria-label="Primary focus areas">
              {heroHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="hero__board" aria-label="Profile overview">
            <article className="hero-panel hero-panel--portrait">
              <img src="/media/headshot.png" alt="Portrait of Chase Bianchi" />
              <div className="hero-panel__caption">
                <p className="hero-panel__eyebrow">Current lane</p>
                <h2>Enterprise delivery with a systems mindset.</h2>
              </div>
            </article>

            <article className="hero-panel hero-panel--signal">
              <p className="hero-panel__eyebrow">Built around</p>
              <ul className="hero-panel__list">
                <li>AEM component systems</li>
                <li>Accessibility-first implementation</li>
                <li>AI-assisted developer workflows</li>
              </ul>
            </article>

            <article className="hero-panel hero-panel--focus">
              <p className="hero-panel__eyebrow">Based in</p>
              <h2>
                {siteMeta.location}
                <br />
                {siteMeta.availability}
              </h2>
              <p>Open to remote opportunities, consulting, and product-focused platform work.</p>
            </article>
          </div>
        </section>

        <section className="ticker" aria-label="Core themes">
          <div className="ticker__track">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="proof-band" aria-label="Key portfolio metrics">
          {heroStats.map((stat) => (
            <ProofCard key={stat.label} stat={stat} />
          ))}
        </section>

        <section id="work" className="section section--paper" aria-labelledby="work-title">
          <SectionIntro
            id="work-title"
            eyebrow="Featured engagements"
            title="This is the kind of work I do best."
            description="The strongest signal in my background is enterprise implementation: component systems, accessibility-sensitive redesigns, data-aware modules, workflow automation, and shipping inside real platform constraints."
          />
          <div className="engagement-list">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard key={caseStudy.title} caseStudy={caseStudy} index={index} />
            ))}
          </div>
        </section>

        <section id="capabilities" className="section section--ink" aria-labelledby="capabilities-title">
          <SectionIntro
            id="capabilities-title"
            eyebrow="Capabilities"
            title="Broad across the stack, but still opinionated about how the work should feel."
            description="I’m strongest when enterprise platform complexity meets front-end quality, delivery discipline, and automation opportunities."
            invert
          />
          <div className="capability-grid">
            {capabilities.map((capability, index) => (
              <CapabilityCard key={capability.title} capability={capability} index={index} />
            ))}
          </div>
          <div className="principle-grid">
            {principles.map((principle) => (
              <PrincipleCard key={principle.title} principle={principle} />
            ))}
          </div>
        </section>

        <section id="experience" className="section section--dark-panel" aria-labelledby="experience-title">
          <SectionIntro
            id="experience-title"
            eyebrow="Trajectory"
            title="The throughline is decision quality: understand the system, reduce ambiguity, and keep shipping."
            description="Consulting, freelancing, technical training, and even my earlier poker career all point to the same operating style: analytical, self-directed, and comfortable with complexity."
            invert
          />
          <div className="experience-grid">
            {careerSteps.map((step) => (
              <ExperienceCard key={step.title} step={step} />
            ))}
          </div>
        </section>

        <section id="projects" className="section section--paper" aria-labelledby="projects-title">
          <SectionIntro
            id="projects-title"
            eyebrow="Public builds"
            title="Independent work that shows range outside of client environments."
            description="These projects cover product thinking, front-end craft, automation, and hands-on experimentation outside enterprise consulting constraints."
          />
          <div className="project-grid">
            {publicProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="resume-links" aria-labelledby="resume-links-title">
          <SectionIntro
            id="resume-links-title"
            eyebrow="Resume"
            title="The full resume lives on its own page."
            description="Use the dedicated resume page for the longer professional narrative, representative experience, and supporting detail."
          />
          <div className="resume-links__grid">
            <ResumeLinkCard
              title="Read the full resume"
              body="A dedicated page with the longer professional narrative, competencies, representative experience, and AI-focused work."
              href="/resume"
              cta="Open resume"
            />
            <ResumeLinkCard
              title="Download the PDF version"
              body="A concise file for applications, recruiter outreach, and offline review when you want the resume in a portable format."
              href={siteMeta.resumePdf}
              cta="Download resume"
              download
            />
          </div>
        </section>

        <section id="contact" className="contact-band" aria-labelledby="contact-title">
          <div className="contact-band__content">
            <p className="contact-band__eyebrow">Contact</p>
            <h2 id="contact-title">
              If you need someone who can move between Adobe platform work, front-end quality, and
              emerging AI workflows, I’m interested.
            </h2>
            <p>
              Reach out for consulting, full-time roles, or product/platform work where technical
              quality and delivery clarity both matter.
            </p>
          </div>

          <div className="contact-band__actions">
            <a href={`mailto:${siteMeta.email}`} className="button button--dark">
              {siteMeta.email}
            </a>
            <a href={siteMeta.github} target="_blank" rel="noreferrer" className="button button--dark-ghost">
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer" aria-label="Footer">
        <div>
          <p>{siteMeta.name}</p>
          <span>{siteMeta.roleLine}</span>
        </div>
        <div className="site-footer__links">
          <a href={`mailto:${siteMeta.email}`}>
            Email
          </a>
          <a href={siteMeta.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

function ResumePage() {
  return (
    <div className="resume-page">
      <header className="resume-topbar">
        <a href="/" className="button button--ghost-dark">
          Back to portfolio
        </a>
        <div className="resume-topbar__actions">
          <a href={siteMeta.resumePdf} className="button button--accent-dark" download>
            Download PDF
          </a>
          <a href={`mailto:${siteMeta.email}`} className="button button--ghost-dark">
            Email
          </a>
        </div>
      </header>

      <section className="resume-hero">
        <div className="resume-hero__copy">
          <p className="resume-hero__eyebrow">
            {siteMeta.title} / {siteMeta.roleLine}
          </p>
          <h1>{siteMeta.name}</h1>
          <p className="resume-hero__summary">{resumeSummary}</p>
          <p className="resume-hero__meta">
            {siteMeta.location} / {siteMeta.availability} / {siteMeta.website}
          </p>
        </div>

        <div className="resume-hero__panel">
          <p className="resume-hero__panel-label">Quick profile</p>
          <div className="resume-hero__meta-list">
            <div>
              <span>Base</span>
              <strong>{siteMeta.location}</strong>
            </div>
            <div>
              <span>Mode</span>
              <strong>{siteMeta.availability}</strong>
            </div>
            <div>
              <span>Website</span>
              <strong>{siteMeta.website.replace('https://', '')}</strong>
            </div>
          </div>
          <a href={`mailto:${siteMeta.email}`}>{siteMeta.email}</a>
          <a href={siteMeta.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={siteMeta.resumePdf} download>
            Download PDF
          </a>
        </div>
      </section>

      <main className="resume-main">
        <section className="resume-section" aria-labelledby="resume-competencies-title">
          <SectionIntro
            id="resume-competencies-title"
            eyebrow="Core competencies"
            title="Enterprise CMS, application engineering, accessibility, and automation."
            description="A concise view of the areas where I add the most value."
          />
          <ResumeGroupList groups={resumeCompetencies} />
        </section>

        <section className="resume-section" aria-labelledby="resume-experience-title">
          <SectionIntro
            id="resume-experience-title"
            eyebrow="Representative experience"
            title="Client-facing work centered on Adobe implementations and platform delivery."
            description="This resume page is intentionally more detailed than the homepage and meant to function as the narrative version of the resume."
          />
          <ResumeEntryList entries={resumeExperience} />
        </section>

        <section className="resume-section resume-section--split" aria-labelledby="resume-innovation-title">
          <div>
            <SectionIntro
              id="resume-innovation-title"
              eyebrow="AI and innovation"
              title="LLM-assisted workflows, OpenAI experimentation, and automation concepts."
              description="An active thread of exploration alongside consulting delivery."
            />
            <ResumeEntryList entries={resumeInnovation} />
          </div>
          <div>
            <SectionIntro
              eyebrow="Projects"
              title="Personal platform"
              description="The website itself is part of the portfolio story."
            />
            <ResumeEntryList entries={resumeProjects} />
          </div>
        </section>

        <section className="resume-section resume-section--split" aria-labelledby="resume-education-title">
          <div>
            <SectionIntro
              id="resume-education-title"
              eyebrow="Education"
              title="Training and background"
              description="Formal training and foundational credentials."
            />
            <ResumeEntryList entries={resumeEducation} />
          </div>
          <div>
            <SectionIntro
              eyebrow="Certifications"
              title="Current certification track"
              description="Professional development focused on Adobe platform depth."
            />
            <ResumeEntryList entries={resumeCertifications} />
          </div>
        </section>

        <section className="resume-section" aria-labelledby="resume-technologies-title">
          <SectionIntro
            id="resume-technologies-title"
            eyebrow="Technologies and tools"
            title="The platforms, languages, and tools I work in most often."
            description="A compact reference section for the practical toolset behind the work."
          />
          <ResumeGroupList groups={resumeTechnologies} />
        </section>
      </main>

      <footer className="site-footer resume-page__footer" aria-label="Resume footer">
        <div>
          <p>{siteMeta.name}</p>
          <span>{siteMeta.roleLine}</span>
        </div>
        <div className="site-footer__links">
          <a href="/">Portfolio</a>
          <a href={`mailto:${siteMeta.email}`}>Email</a>
          <a href={siteMeta.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  )
}

function App() {
  const isResumePage = window.location.pathname === '/resume'

  useEffect(() => {
    document.title = isResumePage
      ? `${siteMeta.name} | Resume`
      : `${siteMeta.name} | ${siteMeta.title}`

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', isResumePage ? siteMeta.resumeDescription : siteMeta.description)
    }
  }, [isResumePage])

  return isResumePage ? <ResumePage /> : <PortfolioPage />
}

export default App
