import React, { useState } from "react";
import './userBox.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import Profile from './profile'
import {
    Link
  } from "react-router-dom";
import Modal from "react-modal";
const UserBox = props => {
    let history = useHistory();
    let [modalIsOpen,setModal] = useState(false);
    const openModal=()=>setModal(true);
    const closeModal=()=>setModal(false);
    
    return(<>
    {!modalIsOpen&&<div className='userBox'>
        <div className='userBox__arrow'></div>
        <div>
            <div>
                <div className='userBox-photo'>
                    <img src='https://pbs.twimg.com/profile_images/1036730403514736650/PCRxFiEt_400x400.jpg'/>
                </div>
                <div className='userBox-info'>
                    <h4>{props.user.firstname}</h4>
                    <p>{props.user.email}</p>
                    <button onClick={()=>openModal()}>View Profile</button>
                </div>
            </div>
            
        </div>
        
        <ul>
            <Link to='/home/My-Posts'><li>My posts</li></Link>
            <a href='https://www.gmail.com'><li>Mail Box</li></a>
            <li onClick={()=>{
                
                setTimeout(() => {
                    sessionStorage.clear();  
                    history.push("/login");
                }, 400);
                
            }}><FontAwesomeIcon icon={faSignOutAlt} style={{color:'grey',marginLeft:'-0.5rem',marginRight:'0.5rem'}}/> Logout</li>
        </ul>
        </div>}
        <Profile modalIsOpen={modalIsOpen} closeModal={closeModal} />
        
        </>)
}
export default UserBox;