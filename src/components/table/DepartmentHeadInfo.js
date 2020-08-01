import "./departmentHeadInfo.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,  faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const DepartmentHeadInfo = props=>{
    const headerNames = [" ","Name","Department","Employee ID","Email","Join Date"];
   
            
          
        
    const [isFolded,setIsFolded]=useState(false);
    // const [isClose,setIsClose]=useState(false);
    const rotate={ transform:'rotate(180deg)'}
    return(
    <div className='headInfo'>
        <div className='headInfo-head'>
            Department Head Informatin
            <Link to='/home/allEmployees'><li><FontAwesomeIcon icon={faAngleDoubleRight } style={{cursor:'pointer'}} /></li></Link>
            {document.body.clientWidth>1400?<li><FontAwesomeIcon icon={faChevronDown} style={isFolded?{...rotate,cursor:'pointer'}:{cursor:'pointer'}} onClick={()=>{props.toggleState();setIsFolded(!isFolded)}}/></li>:null}   
        </div>
        {!isFolded&&<div className='headInfo-table'>
            <table>
                <thead>
                    <tr>
                        {headerNames.map((item,index)=><th ket={index}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                        {props.info.map((item,index)=><tr>
                            <td><div className='photo'><img src={item.img}/></div></td>
                            <td>{item.name}</td>
                            <td>{item.department}</td>
                            <td>{item.employeeID}</td>
                            <td>{item.email}</td>
                            <td>{item.joinDate}</td>
                        </tr>)}
                </tbody>
            </table>

        </div>}
    </div>
    )
}
export default DepartmentHeadInfo;