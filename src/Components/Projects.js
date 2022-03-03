import React, { useState } from 'react'
import ProjectTile from './ProjectTile'

const projectArr = [
    {
        id: 0,
        name: 'Reddit Bot',
        date: 'Feb 2022',
        dev: 'backend',
        tech: 'Python, SQLite3, API',
        desc: 'Bot designed to crawl a reddit sub and serve up requested data to users',
        video: '',
        image: 'diablobot2.png',
        git: 'https://github.com/ChaseBianchi/Reddit-Bot',
        deploy: 'https://www.reddit.com/user/Diablo-Bot/',
    },
    {
        id: 1,
        name: 'HUBZone Check',
        date: 'Nov 2021',
        dev: 'fullstack',
        tech: 'Javascript, React, API, chart.js, styled components',
        desc: 'Read CSV file, query HUBZone database, web scrape results, and compile data in a printable report',
        video: '',
        image: 'hubzone.png',
        git: '',
        deploy: 'https://hubzone-check.vercel.app/',
    },
    {
        id: 2,
        name: 'Diablo II Armory',
        date: 'Sep 2021',
        dev: 'frontend',
        tech: 'Javascript, React, Semantic UI, Styled Components',
        desc: 'Intuitive tool giving D2 players a resource to test builds with customizable stats, skills, and items',
        video: '',
        image: 'd2armorybig.png',
        git: 'https://github.com/ChaseBianchi/Diablo2-Armory',
        deploy: 'https://diablo2-armory.vercel.app/',
    },
    {
        id: 3,
        name: 'Boys & Girls Club',
        date: 'Mar 2021',
        dev: 'fullstack',
        tech: 'Javascript, React, Java, Spring, Okta',
        desc: 'Emotion tracking app allows children to provide real-time feedback on their experiences at club, giving staff actionable data',
        video: '',
        image: 'bgclublarge.png',
        git: 'https://github.com/Lambda-School-Labs/bg-emotion-tracker-fe-b',
        deploy: '',
    },
    
    {
        id: 4,
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
    const filteredProjects = projectArr.filter(proj => proj.id>=slideIndex)
  return (
    <div id='projects' className="comp-wrapper">
        <h2>Projects</h2>            
        <div onClick={handleLeftArrow} style={slideIndex===0 ? {opacity: '50%'} : {opacity: '100%'}}className="arrowWrapper leftArrowWrapper"><i className="arrow left"></i></div>
        <div className="projectContainer">
                {filteredProjects.map(proj=><ProjectTile key={proj.id} data={proj}/>)}
        </div>
        <div onClick={handleRightArrow} style={slideIndex===projectArr.length-1 ? {opacity: '50%'} : {opacity: '100%'}} className="arrowWrapper rightArrowWrapper"><i className="arrow right"></i></div>
    </div>
  )
}
export default Projects