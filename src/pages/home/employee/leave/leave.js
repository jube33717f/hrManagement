import React, { useState,useEffect } from "react";
import PageTop from  '../../../../components/pageTop/pageTop'
import './leave.scss'
import { connect } from "react-redux";
import AddLeave from "./AddLeave.js";
import {getEmployee} from "../../../../api/api";


function Leave(props){
    var [interNum,setInter] =useState(5);
    var [contacts,setShowDatas]= useState([]);
    var [load,setLoad] = useState(true);
  useEffect( ()=>{
      getMethod();
      
  },[interNum,contacts,load]);
  async function getMethod(){
      
      if (load) {
          setLoad(false)
          var res = (await getEmployee())
      if(res.status === 200){       
          setShowDatas([res.data.leaveRequest])
      }
      }     
  }
  function showStatus(){
    if (contacts[0].status === '0') {
      return 'Not processed'
    } else if(contacts[0].status === '1') {
      return <a href="#" className='icon-yes' ><i class="fas fa-check-square"></i></a>
    }else if(contacts[0].status === '2') {
      return <a href="#" className='icon-no' ><i class="fas fa-ban"></i></a>
    }
  }
  function handleShow(e){
    if (interNum !==e.target.value){
        setLoad(true)
        setInter(e.target.value)
        getMethod();
    }
    
  }
        return(
        
        <div>
            <PageTop currentPage='Leave Request' currentPath='/ Employees / Leave Request'/>
            <div class='leave-request-box'>
                <div className='leave__addleave'>
                    <AddLeave onCheck={load}/>
                    {/* <h3 id='leave-request-header'>Employee List</h3> */}
                </div>
        
                <div className='top'>
                    {/* <p className='search' id='search'>Search: <input className='input' type="search" id='search' onChange={handleSearch}>
                        </input><button className='leave__button--search' onClick={searchChange}>search</button></p> */}
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
                          {showStatus()}
                
                          </td>
                      </tr>
 
                            
                        ))}
                    </table>
                </div>
                   
                <div className='bottom'>
                    <div className='page-button' id='page-button'>
                        <button className='page-previous' >Previous</button>
                        <button className='page-current'>1</button>
                        <button className='page-next' >Next</button>
                    </div>
                    <p className="footer">Showing 1 to {interNum} of 1 entries</p> 
                </div>
                
            </div>
        </div>
        )
    
}
function mapStateToProps(state) {
    return {
      user:   state.user.current_user,   
    }
}

  
export default connect(mapStateToProps, {})(Leave);
// export default Leave;