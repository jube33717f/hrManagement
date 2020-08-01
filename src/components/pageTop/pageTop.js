import React, { PureComponent } from "react";
import './pageTop.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faArrowLeft, faBell, faEnvelope, faPalette,faChevronCircleDown} from '@fortawesome/free-solid-svg-icons'

import Theme from './dropdownMenu/theme/Theme'
import UserBox from './dropdownMenu/userBox/UserBox'
import NoticeNumber from './dropdownMenu/noticeNumber/NoticeNumber'
import MenuResponsive from '../menuResponsive/menuResponsive'
import { connect } from "react-redux";
import {unReadMessageAmount } from '../../api/api'
import {Link} from 'react-router-dom'
class PageTop extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            themeBox:false,
            userBox:false,
            messageBox:false,
            noticeBox:false,
            messageNoticeNumber:3,
            eventNoticeNumber:4,
            menuBox:false,
        }
    }
    async componentDidMount(){
        let res = await unReadMessageAmount()
        if(res.status  === 200 ){
            
            this.setState({eventNoticeNumber:res.data.unreadMessageAmount})
        }
        
    }
    render(){
        const icon_style_light = {
            color:'#9FC3D2'
        }
        const themeClickHandler=()=>{
            
            this.setState({themeBox:!this.state.themeBox})
        }
        const menuClickHandler=()=>{
            
            this.setState({menuBox:!this.state.menuBox})
        }
        return(
        
        <div className='pagetop'>
            <div className='pagetop__left'>
                <div><FontAwesomeIcon icon={faArrowLeft} style={{...icon_style_light,fontSize:'15px'}}/>  {this.props.currentPage}</div>
                <div><FontAwesomeIcon icon={faHome} style={{...icon_style_light}}/> {this.props.currentPath}</div>
            </div>
            <div className='pagetop__right'>
                
                <div>
                    <a href='https://www.gmail.com'>
                        <FontAwesomeIcon 
                        icon={faEnvelope} 
                        style={{...icon_style_light,fontSize:'20px',marginTop:'11px'}}/>
                    </a>
                    
                    {/* {this.state.messageNoticeNumber!==0?<NoticeNumber number={this.state.messageNoticeNumber}/>:null} */}
                </div>
                <div>
                    <Link to='/home/Message-Board'><FontAwesomeIcon icon={faBell} style={{...icon_style_light,fontSize:'20px',marginTop:'11px'}}/></Link>
                    {this.state.eventNoticeNumber !==0?<NoticeNumber number={this.state.eventNoticeNumber}/>:null}
                </div>
                
                <div className='pagetop__right-photo'>                 
                    <img src={this.props.user.photo}
                     onClick={()=>this.setState({userBox:!this.state.userBox})}
                    ></img>
                    {this.state.userBox&&<div><UserBox user={this.props.user}/></div>}
                </div>
                {document.body.clientWidth>500?<div>
                    <FontAwesomeIcon icon={faPalette} style={{...icon_style_light,fontSize:'20px',marginTop:'11px',cursor:'pointer'}}
                    onClick={themeClickHandler}
                    />
                    {this.state.themeBox&&<div>
                        <Theme clicked={themeClickHandler}/>
                    </div>}
                </div>:<div>
                    <FontAwesomeIcon icon={faChevronCircleDown} style={{...icon_style_light,fontSize:'20px',marginTop:'11px',cursor:'pointer'}}
                    onClick={menuClickHandler}
                    />
                    {this.state.menuBox&&<div>
                        <MenuResponsive clicked={menuClickHandler}/>
                    </div>}
                </div>}
                
                
            </div>
        </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      user: state.user.current_user,     
    }
}

  
export default connect(mapStateToProps, {})(PageTop);