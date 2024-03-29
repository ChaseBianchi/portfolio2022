import React, { useState } from 'react'
import ProjectTile from './ProjectTile'

const projectArr = [
    {
        id: 0,
        name: 'Dentaquest Website',
        date: '2023',
        dev: 'full stack',
        tech: 'AEM, Java, JS, React, SCSS',
        desc: `AEM implementation that used React components to integrate responsive SPA into AEM architecture.`,
        video: '',
        image: 'dq.png',
        git: '',
        deploy: 'https://dentaquest.com',
    },
    
    {
        id: 1,
        name: 'MGB Website',
        date: '2022-2023',
        dev: 'full stack',
        tech: 'AEM, Java, JS, jQuery, SCSS',
        desc: `Website redesign with heavy focus on accessibility for MA's largest employer, Mass General Brigham.`,
        video: '',
        image: 'mgb.png',
        git: '',
        deploy: 'https://massgeneralbrigham.org',
    },
    {
        id: 2,
        name: 'Personal Website',
        date: 'Mar 2022',
        dev: 'frontend',
        tech: 'JavaScript, React, SCSS',
        desc: `You're looking at it.`,
        video: '',
        image: 'portfolio.png',
        git: 'https://github.com/ChaseBianchi/portfolio2022',
        deploy: '',
    },
    {
        id: 3,
        name: 'Reddit Bot',
        date: 'Feb 2022',
        dev: 'backend',
        tech: 'Python, SQLite3, API',
        desc: 'Bot crawls a subreddit to serve requested data to users by parsing comments for keywords',
        video: '',
        image: 'diablobot2.png',
        git: 'https://github.com/ChaseBianchi/Reddit-Bot',
        deploy: 'https://www.reddit.com/user/Diablo-Bot/',
    },
    {
        id: 4,
        name: 'HUBZone Check',
        date: 'Nov 2021',
        dev: 'full stack',
        tech: 'Javascript, React, API, chart.js, styled components',
        desc: 'Upload CSV data to query US HUBZone database, and compile results in a printable report',
        video: '',
        image: 'hubzone.png',
        git: '',
        deploy: 'https://hubzone-check.vercel.app/',
    },
    {
        id: 5,
        name: 'Diablo II Armory',
        date: 'Sep 2021',
        dev: 'frontend',
        tech: 'Javascript, React, Semantic UI, Styled Components',
        desc: 'Intuitive tool giving Diablo II players a resource to test builds with customizable stats, skills, and items',
        video: '',
        image: 'd2armorybig.png',
        git: 'https://github.com/ChaseBianchi/Diablo2-Armory',
        deploy: 'https://diablo2-armory.vercel.app/',
    },
    {
        id: 6,
        name: 'Boys & Girls Club',
        date: 'Mar 2021',
        dev: 'full stack',
        tech: 'Javascript, React, Java, Spring, Okta',
        desc: 'Emotion tracking app allowing children to provide real-time feedback on their experiences, giving staff actionable data',
        video: '',
        image: 'bgclublarge.png',
        git: 'https://github.com/Lambda-School-Labs/bg-emotion-tracker-fe-b',
        deploy: '',
    },
    
    {
        id: 7,
        name: 'Potluck Planner',
        date: 'Mar 2021',
        dev: 'frontend',
        tech: 'Javascript, React',
        desc: 'Application for scheduling, organizing, maintaining, and sharing potluck events',
        video: '',
        image: 'potluckplanner.png',
        git: 'https://github.com/PotLuck-BuildWeek-web38/frontend/tree/main/frontend',
        deploy: 'https://frontend-e6ktbv2d0-track-team-11.vercel.app/',
    },
]



function Projects() {
    const [slideIndex, setSlideIndex] = useState(0)

    const handleLeftArrow = ()=>{
        if(slideIndex>0){setSlideIndex(slideIndex-1)} 
    }
    const handleRightArrow = ()=>{
        if(slideIndex!==projectArr.length-1){setSlideIndex(slideIndex+1)} 
    }
  return (
    <div id='projects' className="comp-wrapper">
        <h2>Projects</h2>            
        <div onClick={handleLeftArrow} style={slideIndex===0 ? {opacity: '50%'} : {opacity: '100%'}}className="arrowWrapper leftArrowWrapper"><i className="arrow left"></i></div>
        <div style={{width: `${350*projectArr.length}px`}} className="projectContainer">
                {projectArr.map(proj=><ProjectTile  key={proj.id} data={proj} leftPx={`${38+350*(proj.id-slideIndex)}px`}/>)}
        </div>
        <div onClick={handleRightArrow} style={slideIndex===projectArr.length-1 ? {opacity: '50%'} : {opacity: '100%'}} className="arrowWrapper rightArrowWrapper"><i className="arrow right"></i></div>
    </div>
  )
}
export default Projects