import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import Icon from './Icon'
import { experience } from '../data/experience'

function Experience() {
  return (
    <section id='experience' className="comp-wrapper" aria-label="Experience and Education">
      <h2>Experience & Education</h2>
      <VerticalTimeline className='verticalTimeline'>
        {experience.map((entry, index) => (
          <VerticalTimelineElement
            key={index}
            date={entry.date}
            dateClassName='tlDate'
            contentStyle={{ backgroundColor: '#D8DBDB', color: 'black' }}
            contentArrowStyle={{ borderRight: '7px solid #D8DBDB' }}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={<Icon img={entry.icon} css={entry.iconCss} />}
          >
            <h3 className="timelineTitle">{entry.title}</h3>
            <h4 className="timelineSubtitle">{entry.subtitle}</h4>
            {entry.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  )
}

export default Experience
