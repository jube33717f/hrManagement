import React, { Component } from "react";
import './menu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faHollyBerry, faCalendarAlt, faAward, faShareAlt,faToggleOff} from '@fortawesome/free-solid-svg-icons'
import {withRouter} from "react-router-dom";
import { connect } from "react-redux";
import {loadUser} from '../../state/user/user-action-creators'

class MenuE extends Component{
    constructor(props){
        super(props);
        this.state={
            tabs:[
                {name:'Employee Dashboard',icon:faTachometerAlt},
                {name:'Holidays',icon:faHollyBerry},
                {name:'Events',icon:faCalendarAlt},
                {name:'Focus Timer',icon:faAward},
                {name:'Message Board',icon:faShareAlt},
                {name:'Leave',icon:faToggleOff}
            ],
            currentIndex:0,
            
        }
        
    }
    async componentDidMount(){
        if(!this.props.user.auth){
                
            const {loadUser} = this.props;
            
            loadUser()

        }
    }
    render(){
        const user=this.props.user
        return(<>
        <div className='info'>
            <div className='info__top'>
                <div className='info__top-photo'>
                    <img src='https://pbs.twimg.com/profile_images/1036730403514736650/PCRxFiEt_400x400.jpg'></img>
                </div>
                <p>Welcome,</p>
                <h4>{user?user.firstname:"Jessica Doe"} {user.lastname}</h4>
            </div>
            <div className='info__bt'>
                {/* <div><h3>5+</h3><p>Experience</p></div> */}
                <div><h3>Role</h3><p>{user?user.role:"Web Desinger"}</p></div>
                <div><h3>Dep</h3><p>{user?user.department:"Web Development"}</p></div>
                <div><h3>E ID</h3><p><br/>{user?user.emId:'LA-1001'}</p></div>
            </div>
        </div>
        <div className='tab'>
            

        {this.state.tabs.map((item,index)=>
            <div key={index} className={this.state.currentIndex===index?'tab-active-dark tab-div':'tab-div'} onClick={()=>{
                // let a = parseInt(event.currentTarget.getAttribute('key'), 10)
                this.setState({currentIndex:index})
                let pathname=item.name.replace(' ','-')
                this.props.history.push(`${this.props.match.path}/${pathname}`)
            }}>
                <FontAwesomeIcon style={{float:'left',color:'#F6A85E',paddingLeft:'5%',marginTop:'1%'}}icon={item.icon}/>
                <p>{item.name}</p>
            </div>)}
            
        </div>

        </>)
    }
}

function mapStateToProps(state) {
    return {
      user: state.user.current_user,     
    }
}


export default connect(mapStateToProps,{
    loadUser
})(withRouter(MenuE) );