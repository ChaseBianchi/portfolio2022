export interface ProjectData {
  id: number
  name: string
  date: string
  dev: string
  tech: string
  desc: string
  video: string
  image: string
  git: string
  deploy: string
}

interface ProjectTileProps {
  data: ProjectData
  leftPx: string
}

function ProjectTile({ data, leftPx }: ProjectTileProps) {
  const { name, date, tech, desc, image, git, deploy } = data
  return (
    <div style={{ left: leftPx }} className="tileWrapper">
      <div className="projectTileContainer">
        <h3 className='projName'>{name}</h3>
        <p className="date">{date}</p>
        <div className="imgWrapper">
          <img className='projectImg' src={`/media/${image}`} alt={name} />
        </div>
        <div className="projectBody">
          {tech ? <p className="tech">{tech}</p> : null}
          {desc ? <p className="desc">{desc}</p> : null}
          <span className='tileLinks'>
            {git && <a target='_blank' rel="noreferrer" href={git} className="git">GITHUB</a>}
            {deploy && <a target='_blank' rel='noreferrer' href={deploy} className="git">DEPLOYED</a>}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProjectTile
