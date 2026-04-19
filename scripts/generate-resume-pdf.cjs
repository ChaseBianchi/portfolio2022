const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const outputPath = path.join(__dirname, '..', 'public', 'media', 'chase-bianchi-resume.pdf')

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Chase Bianchi Resume</title>
    <style>
      :root {
        color-scheme: light;
        --ink: #08111f;
        --muted: #4c5873;
        --line: #d8dfea;
        --accent: #0e7fa4;
        --accent-2: #c95d1d;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        color: var(--ink);
        background: #ffffff;
      }

      .page {
        width: 8.5in;
        min-height: 11in;
        padding: 0.45in;
      }

      .header {
        display: grid;
        grid-template-columns: 1.8fr 0.6fr;
        gap: 18px;
        padding-bottom: 14px;
        border-bottom: 3px solid var(--ink);
      }

      h1,
      h2,
      h3,
      p,
      ul {
        margin: 0;
      }

      h1 {
        font-size: 28px;
        line-height: 1;
        margin-bottom: 6px;
      }

      .role {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--accent);
        font-weight: 700;
        margin-bottom: 10px;
      }

      .summary {
        color: var(--muted);
        font-size: 11px;
        line-height: 1.55;
      }

      .meta {
        display: grid;
        gap: 6px;
        align-content: start;
        justify-items: end;
        text-align: right;
        font-size: 11px;
        color: var(--muted);
      }

      .meta strong {
        color: var(--ink);
      }

      .section {
        padding-top: 12px;
      }

      .section-title {
        margin-bottom: 10px;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--accent-2);
      }

      .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .card {
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 10px;
      }

      .card h3 {
        font-size: 13px;
        margin-bottom: 6px;
      }

      .sub {
        margin-bottom: 6px;
        color: var(--muted);
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      ul {
        padding-left: 16px;
        color: var(--muted);
      }

      li {
        margin: 0 0 2px;
        font-size: 10.5px;
        line-height: 1.35;
      }

      .stack {
        display: grid;
        gap: 8px;
      }

      .single-line {
        font-size: 10.5px;
        color: var(--muted);
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header class="header">
        <div>
          <h1>Chase Bianchi</h1>
          <p class="role">Full-Stack Developer | Adobe Experience Cloud | AI-Enabled Solutions</p>
          <p class="summary">
            Full-stack developer with 3+ years of professional experience delivering scalable digital experiences,
            primarily within the Adobe ecosystem (AEM Sites & Assets). Proven ability to work across front-end and
            backend layers, building reusable component systems, integrating APIs, and supporting enterprise CMS
            implementations, with an active focus on accessibility and AI-enabled workflow automation.
          </p>
        </div>
        <div class="meta">
          <div><strong>Location</strong><br />Haverhill, MA / Remote</div>
          <div><strong>Website</strong><br />https://www.chasebianchi.com</div>
          <div><strong>Email</strong><br />cbianchi@protonmail.com</div>
          <div><strong>GitHub</strong><br />https://github.com/ChaseBianchi</div>
        </div>
      </header>

      <section class="section">
        <p class="section-title">Core Competencies</p>
        <div class="grid-2">
          <article class="card">
            <h3>Adobe Experience Cloud</h3>
            <ul>
              <li>Adobe Experience Manager (AEM Sites & Assets)</li>
              <li>Component architecture, dialogs, and authoring experience</li>
              <li>Sling Models and Java backend development</li>
              <li>Multi-site implementations and shared component libraries</li>
              <li>Workfront and Workfront Fusion workflow automation</li>
            </ul>
          </article>
          <article class="card">
            <h3>Full-Stack + AI</h3>
            <ul>
              <li>JavaScript, TypeScript, React, Java, Python</li>
              <li>REST APIs, integration patterns, HTML, CSS, Sass</li>
              <li>OpenAI API proof-of-concepts and AI-assisted workflows</li>
              <li>Prompt design, developer tooling, and automation concepts</li>
              <li>WCAG AA/AAA accessibility and Lighthouse optimization</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section">
        <p class="section-title">Professional Experience</p>
        <div class="stack">
          <article class="card">
            <h3>AEM Component Engineering & Platform Development</h3>
            <p class="sub">Client-facing consulting work across Adobe ecosystem implementations</p>
            <ul>
              <li>Designed and developed reusable AEM components supporting scalable, multi-site enterprise platforms.</li>
              <li>Worked across front-end and backend layers to deliver fully integrated CMS functionality.</li>
              <li>Built components with strong emphasis on authoring experience for non-technical content teams.</li>
              <li>Contributed to shared component libraries that improved consistency and reduced duplication.</li>
            </ul>
          </article>
          <article class="card">
            <h3>Digital Experience Accelerator</h3>
            <p class="sub">Reusable foundation for enterprise builds</p>
            <ul>
              <li>Contributed to an AEM accelerator designed to reduce time-to-market for enterprise website builds.</li>
              <li>Implemented search, filtering, and location-based features.</li>
              <li>Built flexible data-layer architecture for components consuming multiple data sources.</li>
              <li>Developed analytics and event-tracking patterns to support data-driven decision making.</li>
            </ul>
          </article>
          <article class="card">
            <h3>Accessibility-Focused Healthcare Redesign</h3>
            <p class="sub">High-standard usability and compliance work</p>
            <ul>
              <li>Delivered accessibility-compliant features aligned with WCAG AA/AAA standards.</li>
              <li>Collaborated with accessibility specialists to support audit-driven development processes.</li>
              <li>Improved semantic HTML structure, screen reader compatibility, and color contrast compliance.</li>
              <li>Supported a healthcare platform where accessibility quality was non-negotiable.</li>
            </ul>
          </article>
          <article class="card">
            <h3>Workflow Automation & AI Exploration</h3>
            <p class="sub">Automation, OpenAI proof-of-concepts, and enterprise integration concepts</p>
            <ul>
              <li>Built and supported automation workflows using Workfront Fusion and structured data models.</li>
              <li>Created OpenAI API proof-of-concepts for content parsing and automation use cases.</li>
              <li>Explored patterns connecting structured enterprise systems with LLM capabilities.</li>
              <li>Used AI to accelerate coding, debugging, documentation, and repetitive engineering tasks.</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section">
        <p class="section-title">Education & Certifications</p>
        <div class="grid-2">
          <article class="card">
            <h3>BloomTech (Lambda School)</h3>
            <p class="single-line">Full Stack Web Development — 2021</p>
          </article>
          <article class="card">
            <h3>Adobe Experience Manager Sites Developer</h3>
            <p class="single-line">Earned November 2025</p>
          </article>
        </div>
      </section>
    </main>
  </body>
</html>`

async function generateResumePdf() {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
    },
  })

  await browser.close()
  fs.accessSync(outputPath, fs.constants.F_OK)
  console.log(`Generated ${outputPath}`)
}

generateResumePdf().catch((error) => {
  console.error(error)
  process.exit(1)
})
