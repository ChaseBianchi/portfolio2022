export interface ExperienceEntry {
  date: string
  title: string
  subtitle: string
  bullets: string[]
  icon: string
  iconCss: string
}

export const experience: ExperienceEntry[] = [
  {
    date: 'Jun 2022 - present',
    title: 'Slalom Consulting',
    subtitle: 'Consultant — Full Stack Developer',
    bullets: [
      'Lead developer on enterprise AEM implementations for clients including Dentaquest and Mass General Brigham, delivering CMS solutions, platform migrations, and website redesigns',
      'Specialize in Adobe Experience Manager (AEM Sites & Assets), building custom components, workflows, and integrations using Java, JavaScript, and React',
      'Pioneer AI-augmented development practices — leveraging Claude Code and prompt engineering to accelerate delivery, improve code quality, and automate repetitive tasks',
      'Lead client demos, discovery sessions, UAT, and developer training; mentor junior developers on AEM architecture and best practices',
      'Promoted from Associate Consultant to Consultant within 6 months; nominated for Employee of the Quarter',
    ],
    icon: '/media/workimg.png',
    iconCss: 'workImg',
  },
  {
    date: 'Sep 2021 - Jun 2022',
    title: 'Fullstack Web Developer',
    subtitle: 'Freelance',
    bullets: [
      'End-to-end development as a solo practitioner — taking client needs from concept through deployment',
      'Built responsive web applications with React, Redux, and modern JavaScript',
      'Managed full project lifecycle including client communication, requirements, development, testing, and delivery',
    ],
    icon: '/media/workimg.png',
    iconCss: 'workImg',
  },
  {
    date: 'May 2021 - Aug 2021',
    title: 'Frontend Web Developer',
    subtitle: 'Range Trainer Pro',
    bullets: [
      'Developed JavaScript algorithms to transform user input into backend-compatible data structures, enabling flexible yet customizable data entry',
      'Built and maintained reusable React components with Redux for state management',
    ],
    icon: '/media/workimg.png',
    iconCss: 'workImg',
  },
  {
    date: 'Dec 2020 - May 2021',
    title: 'Bloom Institute of Technology',
    subtitle: 'Full Stack Web Development & Computer Science',
    bullets: [
      '6-month intensive full-time program covering JavaScript, React, Redux, Python, SQL, and Java',
      'Weekly sprints and monthly team build weeks following agile methodology',
      'Capstone: 1-month engagement building an emotion tracking application for the Boys & Girls Club',
    ],
    icon: '/media/education.png',
    iconCss: 'workImg',
  },
  {
    date: '2009 - 2020',
    title: 'Professional Poker Player',
    subtitle: 'Self Employed',
    bullets: [
      'World Series of Poker bracelet winner with career net profits exceeding $2 million',
      'Applied data analysis, probability theory, and risk management to inform strategic decision-making',
      'Self-directed career requiring exceptional discipline, bankroll management, and performance under pressure',
    ],
    icon: '/media/workimg.png',
    iconCss: 'workImg',
  },
]
