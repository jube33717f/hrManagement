import React,{useState, useEffect} from "react";
import './welcome.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Welcome = props => {
    
    return(<div className='welcome'>
        <div className='welcome__text'>
            <h1>Hello, {props.user.firstname} {props.user.lastname}!</h1>
            {/* //Jessica Doe */}
            <p>Do the things you love. Welcome back to work!</p>
        </div>
        <div className='welcome__animations'>
            <svg viewBox="0 0 64 64" className='svg'>
                <g className="balloon" stroke="#455672" fill="#FCBC40" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
                    <path className="balloon-body" d="M16,20 q0,-16 16,-16 q16,0 16,16
                        q0,8 -8,16 q-8,8-8,16
                        q0,-8 -8,-16 q-8,-8 -8,-16"  />
                    
                    <path d="M24,24 q0,8 8,8 q8,0 8,-8" />
                    
                    <circle cx="26" cy="16" r="3" fill="#fff" />
                    <circle cx="26.5" cy="16.5" r=".5" fill="#000" />
                    <circle cx="38" cy="16" r="3" fill="#fff" />
                    <circle cx="37.5" cy="16.5" r=".5" fill="#000" />
                </g>
            </svg>
        </div>
    </div>)
}
export default Welcome;