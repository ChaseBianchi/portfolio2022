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
            contentStyle={{ backgroundColor: '#1f2937', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)' }}
            contentArrowStyle={{ borderRight: '7px solid #1f2937' }}
            iconStyle={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff' }}
            icon={<Icon img={entry.icon} css={entry.iconCss} />}
          >
            <h3 className="timelineTitle">{entry.title}</h3>
            <h4 className="timelineSubtitle">{entry.subtitle}</h4>
            <ul className="timelineBullets">
              {entry.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  )
}

export default Experience
