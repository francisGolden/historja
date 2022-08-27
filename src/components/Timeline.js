import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { SiUpwork } from "react-icons/si";
import {MdPlace} from "react-icons/md"
import {BsPersonFill} from "react-icons/bs"
import {GiSandsOfTime} from "react-icons/gi"
import {MdTimeline} from "react-icons/md"


const Timeline = ({filtrd}) => {

    return (
        <VerticalTimeline>
            {filtrd.map((note, index) => {
                return (
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgba(33, 150, 243, 0.7)', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        // date={note.when}
                        
                        iconStyle={{ background: 'rgba(33, 150, 243, 0.7)', color: '#fff' }}
                        icon={<MdTimeline />}
                        key={index}>
                        
                        <div className='flex gap-1 bg-zinc-300/70 w-fit p-2 text-slate-800 rounded-xl mb-2'>
                            {/* <RiQuestionFill size={33}/> */}
                            <h1 className="vertical-timeline-element-title font-bold text-3xl">{note.event}</h1>
                        </div>
                        


                        <div className='flex gap-1'>
                            <MdPlace size={28}/>
                            <h3 className="vertical-timeline-element-subtitle text-slate-50 text-2xl ">{note.where}</h3>
                        </div>
                        
                        <div className='flex gap-1'>
                            <BsPersonFill />
                            <h3 className="text-xl">
                                {note.who}
                            </h3>
                        </div>

                        <div className='flex gap-1'>
                            <GiSandsOfTime />
                            <h3 className="text-xl">
                                {note.when}
                            </h3>
                        </div>


                    </VerticalTimelineElement>
                )
            })}
        </VerticalTimeline>
    )
}

export default Timeline;