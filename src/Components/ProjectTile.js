import React from 'react'

function ProjectTile(props) {
  const { data, leftPx} = props
  const {name, date, dev, tech, desc, video, image, git, deploy} = data
  console.log(leftPx)
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