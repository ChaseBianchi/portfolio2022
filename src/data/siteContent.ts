export interface NavLink {
  href: string
  label: string
}

export interface HeroStat {
  value: string
  label: string
  detail: string
}

export interface Capability {
  title: string
  description: string
  bullets: string[]
}

export interface CaseStudy {
  title: string
  eyebrow: string
  summary: string
  stack: string[]
  highlights: string[]
  liveUrl?: string
}

export interface PublicProject {
  title: string
  type: string
  summary: string
  image: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
}

export interface Principle {
  title: string
  body: string
}

export interface CareerStep {
  period: string
  title: string
  detail: string
  bullets: string[]
}

export interface ResumeGroup {
  title: string
  bullets: string[]
}

export interface ResumeEntry {
  title: string
  subtitle?: string
  bullets: string[]
}

export const siteMeta = {
  name: 'Chase Bianchi',
  title: 'Full-Stack Developer',
  roleLine: 'Adobe Experience Cloud | AI-Enabled Solutions',
  location: 'Haverhill, MA',
  availability: 'Remote',
  email: 'cbianchi@protonmail.com',
  website: 'https://www.chasebianchi.com',
  github: 'https://github.com/ChaseBianchi/',
  resumePdf: '/media/chase-bianchi-resume.pdf',
  headline: 'Enterprise digital experiences, built to scale and ready for what comes next.',
  summary:
    'I design and ship full-stack web experiences with deep Adobe Experience Manager expertise, strong accessibility instincts, and a practical approach to AI-enabled delivery.',
  description:
    'Chase Bianchi is a full-stack developer specializing in Adobe Experience Cloud, scalable component systems, accessibility-first interfaces, and AI-enabled workflow automation.',
  resumeDescription:
    'Resume for Chase Bianchi: full-stack developer with Adobe Experience Cloud, AEM, React, TypeScript, accessibility, and AI-enabled solution experience.',
}

export const navLinks: NavLink[] = [
  { href: '#work', label: 'Work' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export const heroStats: HeroStat[] = [
  {
    value: '3+ years',
    label: 'professional delivery',
    detail: 'Shipping production work across enterprise CMS platforms and modern JavaScript stacks.',
  },
  {
    value: 'AEM',
    label: 'specialization',
    detail: 'Hands-on across Sites, Assets, component architecture, authoring, and integrations.',
  },
  {
    value: 'WCAG AA/AAA',
    label: 'quality bar',
    detail: 'Accessibility-first implementation shaped by audits, semantics, contrast, and usability.',
  },
  {
    value: 'AI + automation',
    label: 'active focus',
    detail: 'Exploring OpenAI APIs, prompt design, workflow automation, and developer tooling.',
  },
]

export const heroHighlights = [
  'Adobe Experience Manager',
  'React + TypeScript',
  'Java + Sling Models',
  'OpenAI prototyping',
]

export const capabilities: Capability[] = [
  {
    title: 'Adobe Experience Cloud',
    description:
      'Reusable systems for teams managing content at scale, with the authoring experience treated as part of the product.',
    bullets: [
      'AEM Sites & Assets implementation',
      'HTL, dialogs, Sling Models, and Java backend development',
      'Multi-site patterns and shared component libraries',
    ],
  },
  {
    title: 'Full-Stack Engineering',
    description:
      'Production-minded front-end and backend delivery with an emphasis on maintainability, integration patterns, and clean interfaces.',
    bullets: [
      'JavaScript, TypeScript, React, Sass, and semantic HTML',
      'Java backend development and REST integrations',
      'Legacy modernization in jQuery-heavy environments',
    ],
  },
  {
    title: 'AI & Automation',
    description:
      'Practical experimentation around LLM-assisted workflows, system orchestration, and automation that removes repetitive operational work.',
    bullets: [
      'OpenAI API proof-of-concepts',
      'Prompt design and AI-assisted engineering workflows',
      'Workflow automation with Workfront Fusion',
    ],
  },
  {
    title: 'Accessibility & Delivery',
    description:
      'A strong QA posture shaped by accessibility, performance, and cross-functional delivery inside fast-moving consulting environments.',
    bullets: [
      'WCAG AA/AAA implementation',
      'Lighthouse performance optimization',
      'Agile collaboration with design, product, and platform teams',
    ],
  },
]

export const principles: Principle[] = [
  {
    title: 'Systems over one-offs',
    body: 'I focus on reusable components, shared patterns, and author-friendly implementation instead of custom work that scales poorly.',
  },
  {
    title: 'Accessibility from the start',
    body: 'Semantic HTML, contrast, keyboard support, and readable structure are built into the process rather than bolted on at the end.',
  },
  {
    title: 'AI as a force multiplier',
    body: 'The goal is faster, higher-quality delivery through better tooling and automation, not novelty for its own sake.',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    title: 'AEM component engineering for enterprise platforms',
    eyebrow: 'Client-facing Adobe consulting',
    summary:
      'Designed reusable AEM components spanning front-end and backend layers, with a strong emphasis on scalable implementation and clean authoring experiences.',
    stack: ['AEM Sites & Assets', 'HTL', 'JavaScript', 'Java', 'Sling Models'],
    highlights: [
      'Built author-friendly components so non-technical teams could manage content efficiently',
      'Contributed to shared component libraries that improved consistency across teams',
      'Worked across integrated CMS functionality instead of isolated front-end tickets',
    ],
  },
  {
    title: 'Digital experience accelerator',
    eyebrow: 'Reusable platform architecture',
    summary:
      'Helped develop an AEM accelerator that compressed enterprise site delivery by combining reusable modules, flexible data patterns, and durable integration logic.',
    stack: ['AEM', 'Search & Filtering', 'Location Services', 'Data Layer Design'],
    highlights: [
      'Implemented search, filtering, and location-based experiences',
      'Built components that could consume multiple data sources',
      'Refactored logic and mock-data handling to improve maintainability',
    ],
  },
  {
    title: 'Accessibility-focused healthcare redesign',
    eyebrow: 'Audit-driven delivery',
    summary:
      'Delivered accessibility-compliant features for a major healthcare organization, working alongside accessibility specialists to meet a high standard of usability.',
    stack: ['WCAG AA/AAA', 'Semantic HTML', 'Screen Reader Support', 'Design QA'],
    highlights: [
      'Improved semantic structure and screen reader compatibility',
      'Addressed contrast and usability issues through audit-driven fixes',
      'Supported a platform where accessibility quality was non-negotiable',
    ],
    liveUrl: 'https://www.massgeneralbrigham.org',
  },
  {
    title: 'Workflow automation and AI-enabled operations',
    eyebrow: 'Automation + experimentation',
    summary:
      'Built structured workflows and explored AI integration patterns that connect content operations, enterprise platforms, and developer productivity tooling.',
    stack: ['Workfront Fusion', 'Structured Forms', 'OpenAI APIs', 'System Orchestration'],
    highlights: [
      'Designed forms and data models to support scalable automation pipelines',
      'Explored content parsing and automation proof-of-concepts with LLMs',
      'Focused on bridging structured enterprise systems with AI processing',
    ],
  },
]

export const publicProjects: PublicProject[] = [
  {
    title: 'Portfolio Platform',
    type: 'Personal build',
    summary:
      'A custom React and TypeScript portfolio used to present work, experiments, and an opinionated view on modern front-end delivery.',
    image: '/media/portfolio.png',
    tags: ['React', 'TypeScript', 'Vite'],
    repoUrl: 'https://github.com/ChaseBianchi/portfolio2022',
    liveUrl: 'https://www.chasebianchi.com',
  },
  {
    title: 'HUBZone Check',
    type: 'Data-driven web app',
    summary:
      'CSV upload workflow that queries the US HUBZone database and produces a printable report with useful visual summaries.',
    image: '/media/hubzone.png',
    tags: ['React', 'REST API', 'Charts'],
    liveUrl: 'https://hubzone-check.vercel.app/',
  },
  {
    title: 'Diablo II Armory',
    type: 'Interactive product',
    summary:
      'A build-planning interface for Diablo II players with custom stats, skills, items, and import support.',
    image: '/media/d2armorybig.png',
    tags: ['React', 'UI Systems', 'State Management'],
    repoUrl: 'https://github.com/ChaseBianchi/Diablo2-Armory',
    liveUrl: 'https://diablo2-armory.vercel.app/',
  },
  {
    title: 'Reddit Bot',
    type: 'Automation project',
    summary:
      'A Python bot that crawls comments, parses keywords, and returns data-driven responses based on user requests.',
    image: '/media/diablobot2.png',
    tags: ['Python', 'SQLite', 'API Integration'],
    repoUrl: 'https://github.com/ChaseBianchi/Reddit-Bot',
    liveUrl: 'https://www.reddit.com/user/Diablo-Bot/',
  },
]

export const careerSteps: CareerStep[] = [
  {
    period: 'Now',
    title: 'Full-Stack Developer / Adobe Consultant',
    detail:
      'Client-facing consulting work focused on enterprise Adobe implementations, scalable component systems, and cross-functional delivery.',
    bullets: [
      'Reusable AEM components and shared libraries',
      'Front-end and backend collaboration across CMS functionality',
      'AI-enabled workflow exploration alongside delivery work',
    ],
  },
  {
    period: '2021 to 2022',
    title: 'Freelance and production delivery',
    detail:
      'Took on full project lifecycles end to end, including requirements, development, testing, and delivery.',
    bullets: [
      'Responsive applications in React and modern JavaScript',
      'Direct client communication and scope translation',
      'Early experience balancing speed with production quality',
    ],
  },
  {
    period: '2021',
    title: 'BloomTech full-stack training',
    detail:
      'Formal full-stack training across front-end, backend, data, and agile delivery workflows.',
    bullets: [
      'JavaScript, React, Python, SQL, and Java',
      'Sprint-based team delivery',
      'Capstone work for Boys & Girls Club',
    ],
  },
  {
    period: 'Earlier',
    title: 'Professional poker player',
    detail:
      'A previous career built around disciplined decision-making, pattern recognition, and high-pressure execution.',
    bullets: [
      'Probability and risk management mindset',
      'Self-directed improvement and accountability',
      'Calm decision-making under uncertainty',
    ],
  },
]

export const resumeSummary =
  'Full-stack developer with 3+ years of professional experience delivering scalable digital experiences, primarily within the Adobe ecosystem (AEM Sites & Assets). Proven ability to work across front-end and backend layers, building reusable component systems, integrating APIs, and supporting enterprise CMS implementations. Strong background in accessibility-first development, modern JavaScript frameworks, and data-driven web experiences, with an active focus on AI-enabled development and workflow automation.'

export const resumeCompetencies: ResumeGroup[] = [
  {
    title: 'Adobe Experience Cloud',
    bullets: [
      'Adobe Experience Manager (AEM Sites & Assets)',
      'Component architecture, dialogs, and authoring experience',
      'Sling Models and Java backend development',
      'Multi-site implementations and shared component libraries',
      'Workfront and Workfront Fusion workflow automation',
    ],
  },
  {
    title: 'Full-Stack Development',
    bullets: [
      'JavaScript, TypeScript, React',
      'HTML, CSS, Sass',
      'jQuery for legacy AEM environments',
      'Java backend development',
      'REST APIs and integration patterns',
    ],
  },
  {
    title: 'AI & Automation',
    bullets: [
      'OpenAI API integrations and proof-of-concepts',
      'AI-assisted development workflows',
      'Prompt design and developer tooling concepts',
      'Workflow automation and system orchestration',
    ],
  },
  {
    title: 'Quality, Accessibility & Delivery',
    bullets: [
      'WCAG AA/AAA accessibility implementation',
      'Lighthouse performance optimization',
      'Agile delivery methodologies',
      'Cross-functional collaboration across design, product, and platform teams',
    ],
  },
]

export const resumeExperience: ResumeEntry[] = [
  {
    title: 'AEM Component Engineering & Platform Development',
    subtitle: 'Client-facing consulting work across Adobe ecosystem implementations',
    bullets: [
      'Designed and developed reusable AEM components supporting scalable, multi-site enterprise platforms.',
      'Worked across front-end and backend layers to deliver fully integrated CMS functionality.',
      'Built components with strong emphasis on authoring experience, enabling non-technical users to manage content efficiently.',
      'Contributed to shared component libraries, improving consistency and reducing development duplication across teams.',
    ],
  },
  {
    title: 'Digital Experience Accelerator',
    subtitle: 'Reusable foundation for enterprise builds',
    bullets: [
      'Contributed to development of an AEM accelerator designed to reduce time-to-market for enterprise website builds.',
      'Implemented dynamic modules such as search, filtering, and location-based features.',
      'Built flexible data-layer architecture that allowed components to consume multiple data sources.',
      'Developed analytics and event-tracking patterns to support data-driven decision making.',
    ],
  },
  {
    title: 'Accessibility-Focused Healthcare Redesign',
    subtitle: 'High-standard usability and compliance work',
    bullets: [
      'Delivered accessibility-compliant features aligned with WCAG AA/AAA standards for a large healthcare organization.',
      'Collaborated with accessibility specialists to support audit-driven development processes.',
      'Improved semantic HTML structure, screen reader compatibility, and color contrast compliance.',
      'Helped ensure the platform met strict healthcare accessibility and usability standards.',
    ],
  },
  {
    title: 'Production Delivery, Stabilization & Legacy Support',
    subtitle: 'Shipping inside real production constraints',
    bullets: [
      'Ramped quickly on complex, legacy AEM implementations and contributed to stabilizing production environments.',
      'Delivered bug fixes, enhancements, and new features under tight timelines.',
      'Reduced backlog and improved overall system reliability.',
      'Worked within legacy technologies while incrementally modernizing patterns.',
    ],
  },
  {
    title: 'Workflow Automation & Marketing Operations',
    subtitle: 'Structured systems and process efficiency',
    bullets: [
      'Built and supported automation workflows using Workfront Fusion.',
      'Designed structured forms and data models to enable scalable automation pipelines.',
      'Contributed to operational efficiency across marketing and content workflows.',
      'Explored integration patterns between Workfront, AEM, and related systems.',
    ],
  },
]

export const resumeInnovation: ResumeEntry[] = [
  {
    title: 'AI-Assisted Development & Tooling Exploration',
    bullets: [
      'Leveraged AI tools to accelerate coding, debugging, and documentation workflows.',
      'Applied LLMs to improve development efficiency and reduce repetitive tasks.',
      'Experimented with prompt design and structured AI usage for engineering workflows.',
    ],
  },
  {
    title: 'OpenAI API & GenAI Exploration',
    bullets: [
      'Built proof-of-concepts using the OpenAI API for content parsing and automation use cases.',
      'Explored opportunities for integrating AI into enterprise systems and workflows.',
      'Investigated use cases for AI within the Adobe ecosystem, including AEM, Workfront, and GenAI tools such as GenStudio.',
    ],
  },
  {
    title: 'AI + Enterprise Integration Concepts',
    bullets: [
      'Designed concepts for internal AI tooling layers that connect enterprise platforms with LLM capabilities.',
      'Focused on bridging structured systems such as CMS and workflow platforms with unstructured AI processing.',
      'Explored scalable patterns for AI-driven automation and augmentation.',
    ],
  },
]

export const resumeProjects: ResumeEntry[] = [
  {
    title: 'Personal Website',
    subtitle: 'https://www.chasebianchi.com',
    bullets: [
      'Custom-built portfolio and development platform for showcasing technical work, experiments, and AI concepts.',
      'Positioned as a base for future live demos, integrations, and AI-enabled features.',
    ],
  },
]

export const resumeEducation: ResumeEntry[] = [
  {
    title: 'BloomTech (Lambda School)',
    subtitle: 'Full Stack Web Development — 2021',
    bullets: ['Intensive full-stack engineering program focused on shipping production-quality web applications.'],
  },
]

export const resumeCertifications: ResumeEntry[] = [
  {
    title: 'Adobe Experience Manager Sites Developer',
    subtitle: 'Earned November 2025',
    bullets: [],
  },
]

export const resumeTechnologies: ResumeGroup[] = [
  {
    title: 'Adobe Ecosystem',
    bullets: ['AEM Sites & Assets', 'Workfront', 'Workfront Fusion'],
  },
  {
    title: 'Languages & Frameworks',
    bullets: ['JavaScript', 'TypeScript', 'React', 'Java', 'Python'],
  },
  {
    title: 'Web & Integration',
    bullets: ['REST APIs', 'JSON', 'HTML', 'CSS', 'Sass'],
  },
  {
    title: 'Tools & Platforms',
    bullets: ['Git', 'Figma', 'Lighthouse', 'Accessibility testing tools'],
  },
]
