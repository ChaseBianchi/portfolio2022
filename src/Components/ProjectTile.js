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
  const { isActive, arrInd, slideIndex, data, leftPx} = props
  const {name, date, dev, tech, desc, video, image, git, deploy} = data
  console.log(leftPx)
  const isActiveStyle = isActive ? {left: `${350*(slideIndex-arrInd)}px`} : {left: '-400px'}
  return (
    <div style={{left: leftPx}} className="tileWrapper">
      <div className="projectTileContainer">
          <h3 className='projName'>{name}</h3>
          <p className="date">{date}</p>
          <div className="imgWrapper">
            <img className='projectImg' src={`/media/${image}`} alt={name} />
          </div>
          <div className="projectBody"> 
            {tech ? <p className="tech">{tech}</p> : {}}
            {desc ? <p className="desc">{desc}</p> : {}}
            <span className='tileLinks'>{git ? <a target='_blank' href={git} className="git">GITHUB</a> : ''} {deploy ? <a target='_blank' href={deploy} className="git">DEPLOYED</a> : ''}</span>
          </div>
      </div>
    </div>
  )
}

export default ProjectTile