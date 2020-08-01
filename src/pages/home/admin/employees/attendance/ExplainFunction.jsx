import React, { useState } from "react";
import './ExplainFunction.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useHistory } from 'react-router-dom'
import {faCheckCircle, faTimesCircle, faMinusCircle, faExclamationCircle, faExclamationTriangle, faSearch} from '@fortawesome/free-solid-svg-icons'

const ExplainFunction = props => {
    
    let history = useHistory();
   
    return(
    <div className='Expl'>       
        <ul>
            <li className='Expl__lis'><FontAwesomeIcon className='Expl__e--true' style={{color:'#3cb371'}}icon={faCheckCircle}/>Full Attendance</li>  
            <li className='Expl__lis'><FontAwesomeIcon className='Expl__e--x' style={{color:'#000000'}}icon={faExclamationCircle}/>Absence half a day(Leave Requested)</li> 
            <li className='Expl__lis'><FontAwesomeIcon className='Expl__e--xs' style={{color:'#000000'}}icon={faExclamationCircle}/>Absence half a day(without LR)</li>  
            <li className='Expl__lis'><FontAwesomeIcon className='Expl__e--falses' style={{color:'#000000'}}icon={faTimesCircle}/>One day absent(Leave Requested)</li>
            {/* <li className='Expl__lis'><FontAwesomeIcon className='Expl__e--false' style={{color:'#000000'}}icon={faTimesCircle}/>One day absent(without LR)</li> */}
            <li className='Expl__lis'><FontAwesomeIcon className='Expl__e--no' style={{color:'#000000'}}icon={faMinusCircle}/>One day absent(without LR)</li>
            <li className='Expl__lis'><FontAwesomeIcon className='Expl__e--no' style={{color:'#000000'}}icon={faMinusCircle}/>Off day</li>
        </ul>
        </div>)
}
export default ExplainFunction;