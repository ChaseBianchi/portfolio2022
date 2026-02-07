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
    subtitle: 'Consultant - Full Stack Developer',
    bullets: [
      'Digital Experience Management team focused on user experience including CMS, marketing automation, platform migrations, website redesigns and optimizations',
      'Took initiative to lead dev on features, seek guidance and mentorship, as well as mentor and train others',
      'Gave clients confidence in our team\'s ability to deliver by leading demos, participating in discovery, triage issues, UAT, and lead training',
    ],
    icon: '/media/workimg.png',
    iconCss: 'workImg',
  },
  {
    date: 'Sep 2021 - Jun 2022',
    title: 'Fullstack Web Developer',
    subtitle: 'Freelance',
    bullets: [
      'End-to-end production, one-man operation',
      'Taking client needs from concept to deliverable products',
    ],
    icon: '/media/workimg.png',
    iconCss: 'workImg',
  },
  {
    date: 'May 2021 - Aug 2021',
    title: 'Frontend Web Developer',
    subtitle: 'Range Trainer Pro',
    bullets: [
      'Wrote JS algorithms to automate user input to match back end data structure, allowing the input data to be fungible while still being customizable, enhancing user experience',
      'Created and maintained reusable React components with Redux',
    ],
    icon: '/media/workimg.png',
    iconCss: 'workImg',
  },
  {
    date: 'Dec 2020 - May 2021',
    title: 'Bloom Institute of Technology',
    subtitle: 'Fullstack Development & Computer Science',
    bullets: [
      '6 month full-time program',
      'JavaScript, React, Redux, Python, SQL, Java',
      'Weekly sprints, monthly team build-week, concluding with 1 month working for Boys & Girls Club',
    ],
    icon: '/media/education.png',
    iconCss: 'workImg',
  },
  {
    date: '2009 - 2020',
    title: 'Professional Poker Player',
    subtitle: 'Self Employed',
    bullets: [
      'World Series of Poker bracelet winner with net profits over 2 million dollars',
      'Studied with data visualization tools to create and refine strategies',
    ],
    icon: '/media/workimg.png',
    iconCss: 'workImg',
  },
]
