import React, { Component,useState,useEffect } from "react";
import './attendance.scss'
import PageTop from  '../../../../../components/pageTop/pageTop'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ExplainFunction from './ExplainFunction.jsx'
import {faCheckCircle, faTimesCircle, faMinusCircle, faExclamationCircle, faExclamationTriangle, faSearch, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import {getEmployees,getEmployeeName} from '../../../../../api/api'

export default function Attendance(pros){

  var [totalNum,setTotalNum] = useState(null);
  var [interNum,setInter] =useState(6);
  var [currentPage,setCurr] =useState(1);
  var [totalPage,setTotalPage] =useState(4);
  var [startIndex,setStart] =useState(null);
  var [endIndex,setEnd] =useState(null);
  var [searchString,setSearch] =useState('');
  var [showDatas,setShowDatas]= useState([]);
  var [explainFunction, setExplainFunction] = useState(false);
  var [username,setUsername]= useState('');

  useEffect( ()=>{
      getMethod();
  },[interNum,currentPage,
      totalNum,startIndex,
      endIndex,searchString,username]);

  async function getMethod(){
      const res = (await getEmployees(currentPage, interNum))
      if(res.status === 200){
          setTotalNum(res.data.total);
          setShowDatas(res.data.results.map((item, index)=>{
            return({
              name : item.firstname + ' ' + item.lastname,
              attend: item.leaveRecord.join('/')
            });
        }))
        updateStat();
      }
  }

  async function updateStat(){
      setStart(totalNum===0?0:((currentPage-1)*interNum+1));
      setEnd(((currentPage*interNum)<=totalNum)?(currentPage*interNum):totalNum);
  }

  async function handleUserName (e) {
    var usernames = e.target.value;
    setUsername(usernames)
  }

  async function getPrev (){
      if (currentPage > 1){
        const tempCurr = currentPage-1;
        setCurr(tempCurr);
        setEnd(startIndex);
        setStart(startIndex-interNum);
        getMethod();
        updateStat();
      }
  }

  async function getNext (){
      if (currentPage < totalPage){
        setStart(endIndex);
        if((currentPage+1) === totalPage){
            setEnd(totalNum);
        }else{
          setEnd(endIndex+interNum);
        }
        const tempCurr = currentPage+1;
        setCurr(tempCurr);
        getMethod();
        updateStat();
          
      }
  }

  async function searchChange (e){
      if (searchString !== ''){
        try{
        var resu = (await getEmployeeName(searchString))
        if(resu.status === 200){
          // setTotalNum(resu.data.total);
          setShowDatas(resu.data.result.map((item)=>{
            return({
              name : item.firstname + ' ' + item.lastname,
              attend: item.leaveRecord.join('/')
            });
          }))
          updateStat();
        }
      }catch(e){

      }
      }   
  }

  function handleShow(e){
    setSearch(e.target.value)
  }

  function generateDays(){
    var days = []
    for (let i = 1; i < 32; i++){
      if (i < 10){
        i = '0' + i
      } else {
        i = '' + i
      }
      days.push(i)
    }
    return (
      days.map((d, index)=>{
        return <th className='attendance__icon--true'>{d}</th>

      })
    )
  }

  return (
    <><PageTop currentPage='Attendance' currentPath='/ Employees / Attendance'/>
    <div className='attendance'>
  <p className='attendance__searchWord'>{'Search :  '}
      <input className='attendance__input' type="text" placeholder='name' name='name'
            value={searchString} onChange={handleShow}/>
      <button className="attendance__searchButton" onClick={()=>searchChange()}><FontAwesomeIcon style={{color:'#3cb371'}}icon={faSearch}/></button>
      <button className='attendance__explain' onClick={()=>{setExplainFunction( !explainFunction)
            }}><FontAwesomeIcon style={{color:'#3cb371'}}icon={faQuestionCircle}/></button>
      {explainFunction&&<div><ExplainFunction/></div>}</p>
     
    <div className='attendance__div'>
       
      <table className='attendance__table'>
        <tr className='attendance__table--th'>
          <th className='attendance__firstColumn'>Emlpoyee</th> {generateDays()}
        </tr>
      {showDatas.map((names, index) => {      
          function List(i) {
            let j = Number(i);
            let attends = names.attend.split('/')
            if (attends[j - 1] === '0') {
              return <td className='attendance__icon--true'><FontAwesomeIcon style={{color:'#3cb371'}}icon={faCheckCircle}/></td>
            }
            if (attends[j - 1] === '-0.5'){
              return <td className='attendance__icon--xs'><FontAwesomeIcon style={{color:'#000000'}}icon={faExclamationCircle}/></td>
            }
            if (attends[j - 1] === '-1') {
              // return <td className='attendance__icon--false'><FontAwesomeIcon style={{color:'#000000'}}icon={faTimesCircle}/></td>
              return <td className='attendance__icon--no'><FontAwesomeIcon style={{color:'#000000'}}icon={faMinusCircle}/></td>
            }
            if (attends[j - 1] === '0.5') {
              return <td className='attendance__icon--x'><FontAwesomeIcon style={{color:'#000000'}}icon={faExclamationCircle}/></td>
            }
            if (attends[j - 1] === '1') {
              return <td className='attendance__icon--falses'><FontAwesomeIcon style={{color:'#000000'}}icon={faTimesCircle}/></td>
            }
            if (attends[j - 1] === '-2') {
              return <td className='attendance__icon--no'><FontAwesomeIcon style={{color:'#000000'}}icon={faMinusCircle}/></td>
            }
            
          }
          function nameHeaders() {
            return <td className='attendance__firstColumn'>{names.name}</td>
          }
          function getEles(){
            var ele = []
            for (let i = 1; i < 32; i++){
              if (i < 10){
                i = '0' + i
              } else {
                i = '' + i
              }
              ele.push(i)
            }
            return (
              ele.map((d, index)=>{
                return List(d)
        
              })
            )
          }
          return (
          <tr className='attendance__table--th'>
            {nameHeaders()}{getEles()}
          </tr>
                 )
        })}
        </table>
    
    </div>
    <div className='attendance__pageButton'><button className="attendance__buttonPrev" onClick={()=>getPrev()}>Previous page</button>
    <button className='attendance__buttonPagenumber'>{currentPage}</button>
    <button className="attendance__bottonNext" onClick={()=>getNext()}>Next page</button>
    </div>
    
    </div>
     </>   
    )
}