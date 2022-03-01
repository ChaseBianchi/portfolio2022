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
  return (
    <div className="projectTileContainer">
        <h3 className='projName'>{name}</h3>
        <p className="date">{date}</p>
        <div className="imgWrapper">
          <img className='projectImg' src={`/media/${image}`} alt={name} />
        </div>
        
        <div className="projectBody"> 
          {tech ? <p className="tech">{tech}</p> : {}}
          {desc ? <p className="desc">{desc}</p> : {}}
          <span className='tileLinks'>View {git ? <a target='_blank' href={git} className="git">GITHUB</a> : <span className='deadLink'>GITHUB</span>} or {deploy ? <a target='_blank' href={deploy} className="git">DEPLOYED</a> : <span className='deadLink'>DEPLOYED</span>}</span>

        </div>
    </div>
  )
}

export default ProjectTile