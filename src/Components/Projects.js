import React from 'react'
import ProjectTile from './ProjectTile'

const projectArr = [
    {
        name: 'Reddit Bot',
        date: 'Feb 2022',
        dev: 'backend',
        tech: 'Python, SQLite3, API',
        desc: 'Bot designed to crawl a reddit sub and serve up requested data to users',
        video: '',
        image: '',
        git: 'https://github.com/ChaseBianchi/Reddit-Bot',
        deploy: 'https://www.reddit.com/user/Diablo-Bot/',
    },
    {
        name: 'Boys & Girls Club Emotion Tracker',
        date: 'Mar 2021',
        dev: 'fullstack',
        tech: 'Javascript, React, Java, Spring, Okta',
        desc: 'Application allows children to provide real-time feedback on their experiences at club, giving staff actionable data',
        video: '',
        image: '',
        git: 'https://github.com/Lambda-School-Labs/bg-emotion-tracker-fe-b',
        deploy: '',
    },
    {
        name: 'Diablo II Armory',
        date: 'Sep 2021',
        dev: 'frontend',
        tech: 'Javascript, React',
        desc: 'An intuitive tool giving D2 players a resource to test builds with customizable stats, skills, and items',
        video: '',
        image: '',
        git: 'https://github.com/ChaseBianchi/Diablo2-Armory',
        deploy: 'https://diablo2-armory.vercel.app/',
    },
    {
        name: 'Potluck Planner',
        date: 'Mar 2021',
        dev: 'frontend',
        tech: 'Javascript, React',
        desc: 'Application for scheduling and maintaining potlucks',
        video: '',
        image: '',
        git: 'https://github.com/PotLuck-BuildWeek-web38/frontend/tree/main/frontend',
        deploy: 'https://frontend-e6ktbv2d0-track-team-11.vercel.app/',
    },
]


function Projects() {
  return (
    <div id='projects' className="comp-wrapper">
        <h2>PROJECTS</h2>
        {projectArr.map(proj=> <ProjectTile data={proj}/>)}
    </div>
  )
}

export default Projects