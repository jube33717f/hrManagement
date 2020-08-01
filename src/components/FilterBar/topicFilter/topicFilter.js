import React from 'react'
import './topicFilter.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader,faHandPaper, faCertificate,faHandsHelping,faPalette,faQuestionCircle,faBullhorn} from '@fortawesome/free-solid-svg-icons'
const TopicFilter=props=>{
    const topics=['All','News','Discussion','Activities','Projects','Question(Q&A)','Announcement']
    const icons=[(<FontAwesomeIcon icon={faCertificate}/>),(<FontAwesomeIcon icon={faBookReader}/>),
                (<FontAwesomeIcon icon={faHandPaper}/>),(<FontAwesomeIcon icon={faHandsHelping}/>),
                (<FontAwesomeIcon icon={faPalette}/>),(<FontAwesomeIcon icon={faQuestionCircle}/>),
                (<FontAwesomeIcon icon={faBullhorn}/>)]
    function show(topic){
        switch(topic){
            case 'All': return (<li onClick={props.clicked}> 
                                    <span>{icons[0]} </span> {topics[0]}
                                </li>);
            case 'News': return (<li onClick={props.clicked}> 
                                    <span>{icons[1]} </span> {topics[1]}
                                </li>);
            case 'Discussion': return (<li onClick={props.clicked}> 
                                    <span>{icons[2]} </span> {topics[2]}
                                </li>);
            case 'Activities': return (<li onClick={props.clicked}> 
                                    <span>{icons[3]} </span> {topics[3]}
                                </li>);
            case 'Projects':return (<li onClick={props.clicked}> 
                                        <span>{icons[4]} </span> {topics[4]}
                                    </li>);
            case 'Question(Q&A)': return (<li onClick={props.clicked}> 
                                            <span>{icons[5]} </span> {topics[5]}
                                        </li>);
            case 'Announcement':return (<li onClick={props.clicked}> 
                                            <span>{icons[6]} </span> {topics[6]}
                                        </li>);
            default:return (<li onClick={props.clicked}> 
                                <span>{icons[0]} </span> {topics[0]}
                            </li>);
        }
    }
    return(
    <div className='topicFilter'>
        <ul>
            
            {show(props.topic)}
            
            {props.show&&<>{topics.map((item,index)=>{
                if(item === props.topic) return;
                return <li onClick={()=>props.selectTopic(item)} > 
                                    <span>{icons[index]} </span> {topics[index]}
                </li>})}
            </>}
        </ul>
    </div>
)}


export default TopicFilter;