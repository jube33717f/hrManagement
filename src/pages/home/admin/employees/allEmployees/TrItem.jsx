import React,{useState} from "react";
import {faEdit,faTrashAlt,faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import ModalInput from "./modalInput.jsx";

function TrItem (pros){
    var customStyles = {
        content : {
            height                :"470px",
            width                 :"420px",
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            padding               :"32px",
            paddingTop            :"0px",
            transform             : 'translate(-50%, -50%)',
            borderRadius          :"10px",
          }
    };
    var [item,setItem] = useState({
        img:pros.img,
        name:pros.name,
        id:pros.id,
        mobile:pros.phone,
        startDate:pros.join,
        role:pros.role,
        firstname:pros.firstname,
        lastname:pros.lastname,
        _id:pros.keyID
    });
    var [modalIsOpen,setModal] = useState(false);
    function openModal(){
        console.log(item);
        
        setModal(true);
        setItem({
            img:pros.img,
            name:pros.name,
            id:pros.id,
            mobile:pros.phone,
            startDate:pros.join,
            role:pros.role,
            firstname:pros.firstname,
            lastname:pros.lastname,
            _id:pros.keyID
        })
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
    function handleSubmit(event){
        pros.onChanged(item);
        closeModal();
    }
    var inputItems = [
        {
            header : "Employee Firstname",
            id : "firstname",
            type : "text",
            placeholder : "What's his/her firstname?",
        },
        {
            header : "Employee lastname",
            id : "lastname",
            type : "text",
            placeholder : "What's his/her lastname?",
        },
        {
            header : "Phone",
            id : "mobile",
            type : "tel",
            placeholder : "What's the phone number?",
        },
        {
            header : "Join Date",
            id : "startDate",
            type : "date",
            placeholder : "When did he/she join this family?",
        },
        {
            header : "Role",
            id : "role",
            type : "text",
            placeholder : "What's his/her duty?",
        }
    ]
    return(
        <tr>
            <td><img className="profileImg" src={pros.img}/></td>
            <td>{pros.name}</td>
            <td>{pros.id}</td>
            <td>{pros.phone}</td>
            <td>{pros.join}</td>
            <td>{pros.role}</td>
            <td className="buttonList">
                <button onClick={openModal}>
                    <FontAwesomeIcon icon={faEdit} />
                </button> 
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <div className="modal">
                    <p>
                        <FontAwesomeIcon onClick={closeModal} className="fontIcon" icon={faTimes} />
                    </p>
                    <h1>Edit Existed Employee</h1>
                    {/* <p>Tell me a little about the department</p> */}
                    <form onSubmit={handleSubmit}>
                        <div className="modal__inputList">
                            {inputItems.map((i,index)=>{
                                return(
                                    <ModalInput 
                                        header = {i.header}
                                        id = {i.id}
                                        type = {i.type}
                                        value = {item} 
                                        handleChange = {handleChange}
                                        placeholder = {i.placeholder}/>)
                            })}
                        </div>
                        <div className="modal__footer">
                            <button className="modal__footer__submit"  type="submit" >Submit </button>
                        </div> 
                    </form>
                </div>
                </Modal>
                <button onClick = {()=>{
                    pros.onChecked(pros.keyID);
                }}>
                    <FontAwesomeIcon  className="deleteIcon" icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    );
}

export default TrItem;