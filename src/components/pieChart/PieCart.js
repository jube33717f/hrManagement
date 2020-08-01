import React,{useState,useEffect} from 'react'
import './pieCart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { isEqual } from 'lodash';
const PieCart =props=>{
    const [isFolded,setIsFolded]=useState(false);

    let dept=[]//!'App Development','Support','Web Development','Marketing','Accounts'
    let departments=[]//![30,13,35,30,15]
    let total = 0//!
    const rotate={ transform:'rotate(180deg)'}
    let arr=[]//!
    let count=0
    
    const data = props.departments
    

    if(!isEqual(data,{})){
        data.forEach(ele=>{
            dept=[...dept,ele.departmentName]
            departments=([...departments,ele.employeeAmount])
            // obj.sort
            total=total+ele.employeeAmount;
            
            
        })
        departments.forEach(ele=>{
            count=count+ele
            arr=[...arr,parseInt(count*100/total)+' 100']
            
        })
       
        // console.log(arr)
        departments=departments.reverse()
        arr=arr.reverse()

        dept=dept.reverse()
        // console.log(departments,arr)
    }  
       
    const color=['#B2D3E1','#F5E7E3','#E7CEBF','#D65353','#F9C460',
                 '#28364A','#BDCCCF','#6E7D76','#826A5E','#3F7CA5']

    return(<div className='piechart'>
        <div className='piechart-head'>
            Employees by department  
            <Link to='/home/departments'><li><FontAwesomeIcon icon={faAngleDoubleRight } style={{cursor:'pointer',color:'#fff'}} /></li></Link>
            {document.body.clientWidth>1400?<li><FontAwesomeIcon icon={faChevronDown} style={isFolded?{...rotate,cursor:'pointer'}:{cursor:'pointer'}} onClick={()=>{props.toggleState();setIsFolded(!isFolded)}}/></li>:null}  
             
        </div>
        {!isFolded&&<div className='piechart-content'>
            
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0  0  32 32">
                    {!isEqual(arr,[])&&arr.map((item,index)=>
                        <circle key={index} className='circle' r="16" cx="16" cy="16" stroke={color[index]} strokeWidth="32" strokeDasharray={item} fill="none"/>
                    )}     
                </svg>
        </div>}
        {!isFolded&&<div className='piechart-description'>
            <p>Total: {total} employees</p>
            {!isEqual(dept,[])&&dept.map((item,index)=>
                <div key={index} className='rect' style={{background:color[index],color:'#fff'}}>{item} {parseInt(departments[index]*100/total)}%</div>
                
            )}
        </div>}
    </div>)
}
export default PieCart;