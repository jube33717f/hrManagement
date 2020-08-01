
import React, { useEffect } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import './profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
// import {adminInfo,employeeInfo} from '../../../../api/api'
const Profile = props => {
    let  profileStyle = {
        content : {
            height:'28rem',
            width:'30rem',
            margin:'auto',
            marginTop:'5%',
            boxShadow: '0 0 17px 0 rgba(130,122,122,0.1)',
            borderRadius: '1rem',
            color: '#747a80',
            paddingBottom:'10%'
        }
    }
    console.log(props.user)
    
    return(
        <Modal
            isOpen = {props.modalIsOpen}
           
            style={profileStyle}
        >
            {/* {props.user} */}
            <div  className='profile-header'>
                <h1>Profile</h1>
                <span><FontAwesomeIcon icon={faTimes} onClick={props.closeModal}/></span>
            </div>
            <ol className='profile-content'>
                <li><div>{props.user.photo&&<img src={props.user.photo}/>}</div></li>
                {Object.keys(props.user).map((key,index)=>{
                    if(key !==  'auth' && key !=='photo'){
                        return  <li key={index}>{key}:<span>{props.user[key]}</span></li>
                    }
                })}
            </ol>
           

        </Modal>
    )
}
function mapStateToProps(state) {
    return {
      user:   state.user.current_user,   
    }
}

  
export default connect(mapStateToProps, {})(Profile);