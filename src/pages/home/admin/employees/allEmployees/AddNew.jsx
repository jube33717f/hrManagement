import React,{useState} from "react";
import { useMediaQuery } from 'react-responsive'
import Modal from "react-modal";
import ModalInput from "./modalInput";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AddNew = pros=>{
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 800px)' });
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
    var responsiveStyles = {
        content : {
          height                :"420px",
          width                 :"260px",
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
        "firstname":"",
        "lastname":"",
        "account":"",
        "gender":"",
        "address":"",
        "taxFileNumber":"",
        "department":"",
        "mobile":"",
        "startDate":"",
        "role":"",
        "photo":""
    });
    var [modalIsOpen,setModal] = useState(false);
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
    function handleSubmit(event){
        pros.onChecked(item);
        setItem((preValue)=>{return {
            "firstname":"",
            "lastname":"",
            "account":"",
            "gender":"",
            "address":"",
            "taxFileNumber":"",
            "department":"",
            "mobile":"",
            "startDate":"",
            "role":"",
            "photo":""
        }})
        closeModal();
    }
    var inputItems = [
        {
            header : "Employee firstname",
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
            header : "Email",
            id : "account",
            type : "email",
            placeholder : "What's the email?",
        },
        {
            header : "Gender",
            id : "gender",
            type : "text",
            placeholder : "What's your gender?",
        },
        {
            header : "Address",
            id : "address",
            type : "text",
            placeholder : "What's the address?",
        },
        {
            header : "TaxFileNumber",
            id : "taxFileNumber",
            type : "text",
            placeholder : "What's the taxFileNumber?",
        },
        {
            header : "Department",
            id : "department",
            type : "text",
            placeholder : "What's the department?",
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
        },
        {
            header : "Photo",
            id : "photo",
            type : "text",
            placeholder : "What's the photo?",
        }
    ]
    return(
        <div className="addSpan">
            <button className="addNew" onClick={openModal}>
                Add New
            </button>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={isTabletOrMobile?responsiveStyles:customStyles}
            contentLabel="Example Modal"
            >
            <div className="modal">
                    <p>
                        <FontAwesomeIcon onClick={closeModal} className="fontIcon" icon={faTimes} />
                    </p>
                    <h1>Add New Employee</h1>
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
        </div>

    );
}

export default AddNew;