import React,{useState} from "react";
import './stickyNotes.scss'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const StickyNotes = props => {
    const [isFolded,setIsFolded]=useState(false);
    // const [isClose,setIsClose]=useState(false);
    const rotate={
        transform:'rotate(180deg)'
    }
    const event=[{title:'Standup Meeting',content:'Developers update what they have done',time:'13:40 7 Jun'},
    {title:'Sprint Refinement Meeting',content:'Go through every new ticket',time:'14:40 8 Jun'},
    {title:'Retrospective Meeting',content:'Reflect on what happened in this sprint.',time:'13:40 9 Jun'},
    {title:'Developers Onboarding Meeting',content:'Retrospective Meeting',time:'15:40 9 Jun'},
    ]
    
    
    return(
     <div className='stickyNotes'>
        <div className='stickyNotes-head'>
            Today's Events
            <Link to="/home/Events"><li><FontAwesomeIcon icon={faAngleDoubleRight } style={{cursor:'pointer',color:'#fff'}} /></li></Link>
                        
            {document.body.clientWidth>1400?<li><FontAwesomeIcon icon={faChevronDown} style={isFolded?{...rotate,cursor:'pointer'}:{cursor:'pointer'}} onClick={()=>{props.toggleState();setIsFolded(!isFolded)}}/>
            </li>:null}
        </div>
        {!isFolded&&<ol className="stickyNotes-ol">
            {event.map((item,index)=><li className="stickyNotes__note" key={index}>
                <Link className="stickyNotes__link" to='#'>
                    <div className="stickyNotes__content stickyNotes__content--lhs">
                        <h2>{item.title}</h2>
                        <div className="stickyNotes__footer">
                            <p>{item.content}</p>
                            <span>{item.time}</span>
                        </div>
                    </div>
                    <div className="stickyNotes__content stickyNotes__content--rhs" aria-hidden="true">
                        <h2>{item.title}</h2>
                        <div className="stickyNotes__footer">
                            <p>{item.content}</p>
                            <span>{item.time}</span>
                        </div>
                    </div>
                </Link>
            </li>)}
            
            
        </ol>}
    </div>)
}
export default StickyNotes;