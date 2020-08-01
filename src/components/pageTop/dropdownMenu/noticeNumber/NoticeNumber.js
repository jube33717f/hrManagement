import React from "react";
import './noticeNumber.scss'

const NoticeNumber = props =>{
    const {number} = props;
    return(<div className='noticeNumberBox'><p>{number}</p></div>)
}
export default NoticeNumber;