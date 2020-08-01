import React,{useState} from "react";
import Modal from "react-modal";
import { postLeave } from "../../../../../api/api";

const AddLeave = pros=>{
    var customStyles = {
        content : {
          height                :"auto",
          width                 :"300px",
          top                   : '40%',
          left                  : '40%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-40%',
          padding               :  "0",
          transform             : 'translate(-40%, -40%)'
        } 
    };
    var [item,setItem] = useState({
        name:"",
        employeeID:"",
        leaveType:"Half-Day",
        dateStart:"",
        dateEnd:"",
        reason:"",
        status:""
    });
    var [modalIsOpen,setModal] = useState(false);
    var [load,setLoad] = useState(true);
    function openModal(){
        setModal(true);
    }
    function closeModal(){
        setModal(false);
    }
    function handleChange(event){
        const {name,value} = event.target;
        setItem((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        })
    }
    async function postMethod(newLeave){
        const res = (await postLeave(newLeave.name,newLeave.employeeID, newLeave.leaveType,newLeave.dateStart,newLeave.dateEnd,newLeave.reason)).data        
        return res.status;
    }
    function handleSubmit(event){
        postMethod(item);
        pros.onChecked(load);    
     
        closeModal();
    }
    return(
        <div className="addSpan">
            <button className='add-leave-button' onClick={openModal}>Add Leave</button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={
                {
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.75)'
                      },
                      content: {
                        position: 'relative',
                        margin: 'auto',
                        width: '50%',
                        background: 'white',
                        borderRadius: '8px',
                        padding: "0.5em 1em"
                      }
                }
            }
            contentLabel="Example Modal"
            >
            <h3>Add Leave</h3>
            <form>
                <div className="modalBody">
                    <label for="name">Employee Name:</label><br/>
                    <input onChange={handleChange} type="text" className="leaveInput"
                    name = "name" id="name" value = {item.name} required /><hr/>
                    <label for="id">Employee ID:</label><br/>
                    <input onChange={handleChange} type="text" className="leaveInput"
                    name = "employeeID" id="employeeID" value = {item.employeeID} required /><hr/>
                    <label for="leaveType">Leave Type:</label><br/>
                     <select id="leaveType" name="leaveType" className="leaveInput" onChange={handleChange}>
                        <option value='Half-Day' onChange={handleChange}>>Half Hay</option>
                        <option value='All-Day' onChange={handleChange}>>All Day</option>
                    </select>
                    <hr/>
                    <label for="dateStart">Date Start:</label><br/>
                    <input onChange={handleChange} type="date" className="leaveInput"
                    name = "dateStart" id="dateStart" min = "1" value={item.dateStart}  required /><hr/>
                    <label for="dateEnd">Date End:</label><br/>
                    <input onChange={handleChange} type="date" className="leaveInput"
                    name = "dateEnd" id="dateEnd" min = "1" value={item.dateEnd}  required /><hr/>
                    <label for="reason">Reason:</label><br/>
                    <input onChange={handleChange} type="text" className="leaveInput"
                    name = "reason" id="reason" min = "1" value={item.reason}  required /><hr/>
                </div>
                <div className="blank" style={{marginTop:'-5px'}}>
                    <button className="leaveButton" id="submitButton" onClick={handleSubmit}  >Submit </button>
                    <button className="leaveButton" onClick={closeModal} value="close">Close</button>
                </div> 
            </form>
            </Modal>
        </div>

    );
}

export default AddLeave;