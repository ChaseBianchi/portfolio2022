import React from 'react'

// {
//     name: 'Reddit Bot',
//     date: 'Feb 2022',
//     dev: 'backend',
//     tech: 'Python, SQLite3, API',
//     desc: 'Bot designed to crawl a reddit sub and serve up requested data to users',
//     video: '',
//     image: '',
//     git: 'https://github.com/ChaseBianchi/Reddit-Bot',
//     deploy: 'https://www.reddit.com/user/Diablo-Bot/',
// },
function ProjectTile(props) {
  const {name, date, dev, tech, desc, video, image, git, deploy} = props.data
  console.log(name)
  return (
    <div className="projectTileContainer">
        
    </div>
  )
}

export default ProjectTile