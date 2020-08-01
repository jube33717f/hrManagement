import React,{useState} from "react";
import {faEdit,faTrashAlt,faEnvelope,faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import ModalInput from "./modalInput";
import {Link} from "react-router-dom";

function TrItem (pros){
    var customStyles = {
        content : {
            height                :"420px",
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
        _id:pros._id,
        img:pros.img,
        name:pros.name,
        email:pros.email,
        id:pros.id,
        phone:pros.phone,
        join:pros.join,
        role:pros.role,
        salary:pros.salary
    });
    var [modalIsOpen,setModal] = useState(false);
    function openModal(){
        setModal(true);
        setItem({
            _id:pros._id,
            img:pros.img,
            name:pros.name,
            email:pros.email,
            id:pros.id,
            phone:pros.phone,
            join:pros.join,
            role:pros.role,
            salary:pros.salary
        })
    }
    function closeModal(){
        setModal(false);
    }
    function handleChange(event){    
        console.log(event);
          
        const {name,value} = event.target;
        setItem((preValue)=>{
            return{
                ...preValue,
                [name]:value
            }
        })
    }
    function handleSubmit(event){
        console.log(item);
        
        pros.onChanged(item);
        closeModal();
    }

    return(
        <tr className = "trBody">
            <td><img className="profileImg" src={pros.img} alt="head protrait"/></td>
            <td>
                <b>{pros.name}</b><br/>
                {pros.email}
            </td>
            <td>{pros.id}</td>
            <td>{pros.phone}</td>
            <td>{pros.join}</td>
            <td>{pros.role}</td>
            <td>{`$${pros.salary}`}</td>
            <td className="buttonList">
                <button onClick = {()=>{
                    pros.onClicked({
                        _id:pros._id,
                        id:pros.id,
                        name:pros.name,
                        role:pros.role,
                        photo:pros.img,
                        salary:pros.salary,
                        bonus:pros.bonus,
                        earnings:pros.earnings,
                        tax:pros.tax,
                        unpaidLeave:pros.unpaidLeave,
                        deduction:pros.deduction
                    });
                }} className="openItemButton">
                    <FontAwesomeIcon  className="fontIcon openItemIcon" icon={faEnvelope} />
                    Slip
                </button>
                <button onClick={openModal} className="button">
                    <FontAwesomeIcon className="fontIcon" icon={faEdit} />
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
                    <h1 className="modalHeader">Edit Existed Employee</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="modal__inputList">
                            <label for="name">Employee Name: {item.name}</label><br/>
                            <label for="id">Employee ID: {item.id}</label><br/>
                            <br/>
                                <ModalInput 
                                    header = "Basic Salary:"
                                    id = "salary"
                                    type = "number"
                                    value = {item.salary} 
                                    handleChange = {handleChange}
                                    placeholder = "Basic Salary"/>
                        </div>
                        <div className="modal__footer">
                            <button className="modal__footer__submit"  type="submit" >Submit </button>
                        </div> 
                    </form>
                </div>
                
                </Modal>
                <button onClick = {()=>{
                    pros.onChecked(pros._id);
                }} className="button deleteButton">
                    <FontAwesomeIcon  className="fontIcon deleteIcon" icon={faTrashAlt} />
                </button>
            </td>
        </tr>
    );
}

export default TrItem;