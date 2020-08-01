import React, { Component,useState,useEffect } from "react";
import PageTop from  '../../../../../components/pageTop/pageTop'
import './leaveRequest.scss'
import AddLeave from "./AddLeave.jsx";
import { getLeave,getLeaveName,deleteLeave } from "../../../../../api/api";

export default function LeaveRequest(pros){

    var [totalNum,setTotalNum] = useState(null);
    var [interNum,setInter] =useState(5);
    var [currentPage,setCurr] =useState(1);
    var [totalPage,setTotalPage] =useState(0);
    var [startIndex,setStart] =useState(null);
    var [endIndex,setEnd] =useState(null);
    var [searchString,setSearch] =useState('');
    var [contacts,setShowDatas]= useState([]);
    var [load,setLoad] = useState(true);

  useEffect( ()=>{
      getMethod();
  },[interNum,currentPage,
      totalNum,startIndex,contacts,load,
      endIndex,searchString]);

  async function getMethod(){
      if (load) {
          setLoad(false)
          var res = (await getLeave(currentPage, interNum))
      if(res.status === 200){
          setTotalNum(res.data.total);
          setShowDatas(res.data.result.map((item, index)=>{
            return({
                name: item.name,
                employeeID:item.employeeID,
                leaveType:item.leaveType,
                dateStart: item.dateStart,
                dateEnd: item.dateEnd,
                reason: item.reason
            });
        }))
        updateStat();
      }
      }     
  }
  
async function deleteMethod(id, dateStart,dateEnd,leaveType, flag){
  let index_s = Number(dateStart.split('-')[2])
  let index_e = Number(dateEnd.split('-')[2])
  let num = index_e - index_s + 1
  const res = (await deleteLeave(id, dateStart,dateEnd,leaveType, flag))
  setLoad(true)
  getMethod();
  return res.status;
}

  async function getPrev (){
    if (currentPage > 1){
      const tempCurr = currentPage-1;
      setCurr(tempCurr);
      setEnd(startIndex);
      setStart(startIndex-interNum);
      setLoad(true)
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
      setLoad(true)
      getMethod();
      updateStat();        
    }
}

  async function updateStat(){
    setTotalPage(totalNum===0?1:Math.ceil(totalNum/ interNum));
      setStart(totalNum===0?0:((currentPage-1)*interNum+1));
      setEnd(((currentPage*interNum)<=totalNum)?(currentPage*interNum):totalNum);
  }
  
  function handleShow(e){
    if (interNum !==e.target.value){
        setLoad(true)
        setInter(e.target.value)
        getMethod();
    }   
  }

  function handleSearch(e){
    setSearch(e.target.value)
  }

  async function searchChange (e){
    if (searchString !== ''){
      try{
      var resu = (await getLeaveName(searchString))
      if(resu.status === 200){
        setShowDatas(resu.data.result.map((item)=>{
          return({
            name : item.name,
            employeeID:item.employeeID,
            leaveType:item.leaveType,
            dateStart: item.dateStart,
            dateEnd: item.dateEnd,
            reason: item.reason
          });
        }))
        updateStat();
      }
    }catch(e){
    }
    }  
}

    return(
        
        <div>
            <PageTop currentPage='Leave Request' currentPath='/ Employees / Leave Request'/>
            <div class='leave-request-box'>
                <div>
                    <AddLeave onCheck={load}/>
                    <h3 id='leave-request-header'>Leave Request List</h3>
                </div>
        
                <div className='top'>
                    <p className='search' id='search'><input className='input' type="search" id='search' onChange={handleSearch}>
                        </input><button className='leave__button--search' onClick={searchChange}>search</button></p>
                    <p className='show-entries'>Show 
                    <input className='input'
                    type="number" placeholder='5' min="1" max="10" onChange={handleShow}
                    />
                    entries</p>
                </div>

                <div className='table-component'>
                    <table className='employee-table'>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Employee ID</th>
                            <th>Leave Type</th>
                            <th>Date</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                        {contacts.map(contact => (
                          <tr>
                          <td><img class='profile-photo' src="https://pbs.twimg.com/profile_images/1036730403514736650/PCRxFiEt_400x400.jpg"/></td>
                          <td><b>{contact.name}</b></td>
                          <td>{contact.employeeID}</td>
                          <td>{contact.leaveType}</td>
                        <td>{contact.dateStart}{' to '}{contact.dateEnd}</td>
                          <td>{contact.reason}</td>
                          <td>
                          <a href="#" class='icon-yes' onClick={()=>deleteMethod(contact.employeeID, contact.dateStart,contact.dateEnd,contact.leaveType, '1')}><i class="fas fa-check-square"></i></a>
                <a href="#" class='icon-no' onClick={()=>deleteMethod(contact.employeeID, contact.dateStart,contact.dateEnd,contact.leaveType, '2')}><i class="fas fa-ban"></i></a>
                          </td>
                      </tr>                           
                        ))}
                    </table>
                </div>
                   
                <div className='bottom'>
                    <div className='page-button' id='page-button'>
                        <button className='page-previous' onClick={()=>getPrev()}>Previous</button>
                        <button className='page-current'>{currentPage}</button>
                        <button className='page-next' onClick={()=>getNext()}>Next</button>
                    </div>
                    <p className="footer">Showing 1 to {interNum} of {totalNum} entries</p> 
                </div>
                
            </div>
        </div>
        ) 
}