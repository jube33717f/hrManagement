import React,{useState} from "react";
import {faEdit,faTrashAlt,faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import ModalInput from "./modalInput.jsx";


function Card (pros){
    var customStyles = {
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
        img:pros.img,
        name:pros.name,
        id:pros.id,
        phone:pros.phone,
        join:pros.join,
        role:pros.role
    });
    var [modalIsOpen,setModal] = useState(false);
    function openModal(){
        console.log(item);
        
        setModal(true);
        setItem({
            img:pros.img,
            name:pros.name,
            id:pros.id,
            phone:pros.phone,
            join:pros.join,
            role:pros.role
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
            header : "Employee Name",
            id : "name",
            type : "text",
            placeholder : "What's his/her name?",
        },
        {
            header : "Phone",
            id : "phone",
            type : "tel",
            placeholder : "What's the phone number?",
        },
        {
            header : "Join Date",
            id : "join",
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
        <article>
            <header>
                <img className="profileImg" src={item.img}/>
                <h2>{item.name}</h2>
                <h4>{item.id}</h4>
            </header>
            <p>
                <b>Phone: </b> {item.phone}<br/>
                <b>Join Date: </b> {item.join}<br/>
                <b>Role: </b> {item.role}<br/>
            </p>
            <footer className="cardFooter">
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
                    <h3>Edit Existed Deparment</h3>
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
                    pros.onChecked(pros._id);
                }}>
                    <FontAwesomeIcon  className="deleteIcon" icon={faTrashAlt} />
                </button>
            </footer>
        </article>
    );
}

export default Card;