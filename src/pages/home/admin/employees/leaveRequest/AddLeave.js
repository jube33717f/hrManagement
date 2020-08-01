import React,{useState} from "react";
import Modal from "react-modal";

//Modal.setAppElement('#root')

const AddLeave=props=>{
    var [modalIsOpen,setModalIsOpen] = useState (false)
    var [name, setName] = useState('')
    var [employeeId, setId] = useState('')
    var [leaveType, setType] = useState('')
    var [startDate, setStart]= useState('')
    var [endDate, setEnd]= useState('')
    var [reason, setReason]= useState('')
    function handleName(e){
        setName(e.target.value)
    }
    function handleId(e){
        setId(e.target.value)
    }
    function handleType(e){
        setType(e.target.value)
    }
    function handleStart(e){
        setStart(e.target.value)
    }
    function handleEnd(e){
        setEnd(e.target.value)
    }
    function handleReason(e){
        setReason(e.target.value)
    }
    function handleSubmit(){
        console.log(name)
    }
    return (
        <div>
            <button className='add-leave-button' onClick={()=>setModalIsOpen(true)}>Add Leave</button>
            <Modal 
                isOpen = {modalIsOpen} 
                onRequestClose={()=>setModalIsOpen(false)}
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
                            width: '60%',
                            background: 'white',
                            borderRadius: '8px',
                            padding: "1em 2em"
                          }
                    }
                }
            >
                <h3>Leave</h3><hr/>
                <div className='leaveContent'>
                    <label for="name">Name:</label>
                    <input type="text" className="leaveInput" onChange={setName}
                    name = "name" id="name" required /><hr/>

                    <label for="employee-id">Employee ID:</label>
                    <input type="text" className="leaveInput" onChange={setId}
                    name = "employee-id" id="employee-id" required /><hr/>

                    <label for="leave">Leave Type:</label>
                    <select id="leave" name="leave" className="leaveInput" onChange={setType}>
                        <option value="half_day">half day</option>
                        <option value="all_day">all day</option>
                    </select>
                    {/* <input type="text" className="leaveInput"
                    name = "leave" id="leave" required /> */}
                    <hr/>

                    <label for="Start">Date From:</label>
                    <input type="date" className="leaveInput" onChange={setStart}
                    name = "Start" id="Start" min = "2000-01-01" value = {startDate} required />

                    <label for="end">To:</label>
                    <input type="date" className="leaveInput" onChange={setEnd}
                    name = "end" id="end" min = "2000-01-01" value = {endDate} required /><hr/>

                    <label for="reason">Reason for leave:</label>
                    <input type="text" className="leaveInput" onChange={setReason}
                    name = "reason" id="reason" required /><br/><br/><hr/>
                </div>
                <div>
                    <hr className="blank"/>
                    <button type="submit" id="submitButton" className="leaveButton" onClick={()=>handleSubmit()}>Submit</button>
                    <button className="leaveButton" id='cancelButton' onClick={()=>setModalIsOpen(false)}>Cancel</button><hr/>
                </div>
            </Modal>
        </div>
    )
}

export default AddLeave;