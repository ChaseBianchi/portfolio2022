import React from 'react'
import { VerticalTimeline, VerticalTimelineElement, WorkIcon }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import Icon from './Icon';


function Experience() {
  return (
    <div id='experience' className="comp-wrapper">
        <h2>Experience & Education</h2>
        <VerticalTimeline className='verticalTimeline'>
        <VerticalTimelineElement
          date='Jun 2022 - present'
          dateClassName='tlDate'
          contentStyle={{backgroundColor: '#D8DBDB', color: 'black'}}
          contentArrowStyle={{borderRight: '7px solid #D8DBDB'}}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Icon img='/media/workimg.png' css='workImg'/>}
          >
            <h3 className="timelineTitle">Slalom Consulting</h3>
            <h4 className="timelineSubtitle">Consultant - Full Stack Developer</h4>
            <li>Digital Experience Management team focused on user experience including CMS(AEM), marketing automation, platform migrations, website redesigns and optimizations</li>
            <li>Took initiative to lead dev on features, seek guidance and mentorship, as well as mentor and train others</li>
            <li>Gave clients confidence in our team's ability to deliver by leading demos, participating in discovery, triage issues, UAT, and lead training</li>
          </VerticalTimelineElement>
          <VerticalTimelineElement
          date='Sep 2021 - present'
          dateClassName='tlDate'
          contentStyle={{backgroundColor: '#D8DBDB', color: 'black'}}
          contentArrowStyle={{borderRight: '7px solid #D8DBDB'}}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Icon img='/media/workimg.png' css='workImg'/>}
          >
            <h3 className="timelineTitle">Fullstack Web Developer</h3>
            <h4 className="timelineSubtitle">Freelance</h4>
            <li>End-to-end production, one-man operation</li>
            <li>Taking client needs from concept to deliverable products.</li>
          </VerticalTimelineElement>
          <VerticalTimelineElement
          date='May 2021 - Aug 2021'
          dateClassName='tlDate'
          contentStyle={{backgroundColor: '#D8DBDB', color: 'black',}}
          contentArrowStyle={{borderRight: '7px solid #D8DBDB'}}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Icon img='/media/workimg.png' css='workImg'/>}
          >
            <h3 className="timelineTitle">Frontend Web Developer</h3>
            <h4 className="timelineSubtitle">Range Trainer Pro</h4>
            <li>Wrote JS algorithms to automate user input to match back end data structure, allowing the input data to be fungible while still being customizable, enhancing user experience</li>
            <li>Created and maintained reusable React components with Redux</li>
          </VerticalTimelineElement>
          <VerticalTimelineElement
          date='Dec 2020 - May 2021'
          dateClassName='tlDate'
          contentStyle={{backgroundColor: '#D8DBDB', color: 'black'}}
          contentArrowStyle={{borderRight: '7px solid #D8DBDB'}}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Icon img='/media/education.png' css='workImg'/>}
          >
            <h3 className="timelineTitle">Bloom Institute of Technology</h3>
            <h4 className="timelineSubtitle">Fullstack Development & Computer Science</h4>
            <li>6 month full-time program</li>
            <li>JavaScript, React, Redux, Python, SQL, Java</li>
            <li>Weekly sprints, monthly team build-week, concluding with 1 month working for Boys & Girls Club</li>
          </VerticalTimelineElement>
          <VerticalTimelineElement
          date='2009 - 2020'
          dateClassName='tlDate'
          contentStyle={{backgroundColor: '#D8DBDB', color: 'black'}}
          contentArrowStyle={{borderRight: '7px solid #D8DBDB'}}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Icon img='/media/workimg.png' css='workImg'/>}
          >
            <h3 className="timelineTitle">Professional Poker Player</h3>
            <h4 className="timelineSubtitle">Self Employed</h4>
            <li>World Series of Poker bracelet winner with net profits over 2 million dollars</li>
            <li>Studied with data visualization tools to create and refine strategies</li>
          </VerticalTimelineElement>
          {/* <VerticalTimelineElement
          date='2006'
          dateClassName='tlDate'
          contentStyle={{backgroundColor: '#D8DBDB', color: 'black'}}
          contentArrowStyle={{borderRight: '7px solid #D8DBDB'}}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Icon img='/media/education.png' css='workImg'/>}
          >
            <h3 className="timelineTitle">Golden High School</h3>
            <h4 className="timelineSubtitle">Diploma</h4>
          </VerticalTimelineElement> */}
        </VerticalTimeline>
    </div>
  )
}

export default Experience