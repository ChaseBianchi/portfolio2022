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
          date='Sep 2021 - present'
          dateClassName='tlDate'
          contentStyle={{backgroundColor: '#D8DBDB', color: 'black'}}
          contentArrowStyle={{borderRight: '7px solid #D8DBDB'}}
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Icon img='/media/workimg.png' css='workImg'/>}
          >
            <h3 className="timelineTitle">Fullstack Web Developer</h3>
            <h4 className="timelineSubtitle">Freelance</h4>
            <li>End to end production, one man operation, problem solving, and getting it done</li>
            <li>taking client needs from concept to deployment with clean code and attention to detail</li>
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
            <p>World Series of Poker bracelet winner with net profits over 2 million dollars, highly self motivated, and performed under a high level of pressure</p>
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