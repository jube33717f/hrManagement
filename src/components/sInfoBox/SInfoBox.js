import React,{useState, useEffect} from "react";
import './sInfoBox.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SInfoBox = props => {
    // console.log(props)
    
    const [n,setN] = useState(0);
    //const [bgColor,title,number] =  props;
    let t = 100;
    if(props.number>100){  
        t=10;
    }else if(props.number>50){
        t=25;
    } 
    else if(props.number>20){
       t=60; 
    } 
    useEffect(()=>{
        let i=n;
            
        const timer = setInterval(()=>{
            if (i === props.number) {
                setN(i)
                clearInterval(timer)
                return;
            }
            setN(i)
            i++;
        }, t)
        return()=>{
            clearInterval(timer);           
        }
    },[n,props.number])
    return(<div className='sInfobox' style={{backgroundImage:props.bgColor,color:props.textColor}}>
        <h1><FontAwesomeIcon icon={props.icon}/> {n}</h1>
        <p>{props.title}</p>
    </div>)
}
export default SInfoBox;