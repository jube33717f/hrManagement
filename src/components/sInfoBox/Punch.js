import React,{useState, useEffect} from "react";
import './sInfoBox.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStopwatch} from '@fortawesome/free-solid-svg-icons'
const Punch = props => {

    return(<div className='sInfobox' style={{backgroundImage:props.bgColor,color:props.textColor}}>
        <h1><FontAwesomeIcon icon={props.icon} onClick={props.clicked}/> 
        <span className='punch'>{props.time}</span></h1>
        <p>{props.title}  <FontAwesomeIcon icon={faStopwatch}/></p>
    </div>)
}
export default Punch;