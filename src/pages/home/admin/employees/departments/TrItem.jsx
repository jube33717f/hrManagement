import React,{useState} from "react";
import {faEdit,faTrashAlt,faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import ModalInput from "./modalInput";
import { useMediaQuery } from 'react-responsive'


function TrItem (pros){
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
        _id:pros._id,
        number:pros.id,
        name:pros.name,
        head:pros.head,
        total:pros.total
    });
    var [modalIsOpen,setModal] = useState(false);
    function openModal(){
        setModal(true);
        setItem({
            _id:pros._id,
            number:pros.id,
            name:pros.name,
            head:pros.head,
            total:pros.total
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
            header : "Deparment Name",
            id : "name",
            type : "text",
            // value : {item.name}, 
            placeholder : "Which department?",
        },
        {
            header : "Head Name",
            id : "head",
            type : "text",
            // value : {item.head} ,
            placeholder : "Who lead this department?",
        },
        {
            header : "Number of Employees",
            id : "total",
            type : "number",
            // value : {item.total} ,
            placeholder : "How many employees there?",
        }
    ]
    return(
        <tr>
            <td>{pros.id}</td>
            <td>{pros.name}</td>
            <td>{pros.head}</td>
            <td>{pros.total}</td>
            <td className="buttonList">
                <button onClick={openModal}>
                    <FontAwesomeIcon icon={faEdit} />
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
                    <h1>Edit Existed Deparment</h1>
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
            </td>
        </tr>
    );
}

export default TrItem;