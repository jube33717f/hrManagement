import React, { Component } from "react";
import './menu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faHollyBerry, faCalendarAlt, faAward, faShareAlt, faUserFriends, faCreditCard, faChevronDown, faWindowMinimize} from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {loadUser} from '../../state/user/user-action-creators'

class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            tabs:[
                {name:'HR Dashboard',icon:faTachometerAlt},
                {name:'Holidays',icon:faHollyBerry},
                {name:'Events',icon:faCalendarAlt},
                {name:'Focus Timer',icon:faAward},
                {name:'Message Board',icon:faShareAlt},
            ],
            currentIndex:0,
            employeeIndex:-1,
            payrollIndex:-1
        }
    }
    
    async componentDidMount(){

        
        if(!this.props.user.auth){

            const {loadUser} = this.props;
            
            loadUser()

        }
    }
    render(){
        
        const styleLight = {
            color:'#F6A85E'
        }
        const styleDark = {
            color:'#94B4BF'
        }
        
        const {user}=this.props
        return(<>
        <div className='info'>
            <div className='info__top'>
                <div className='info__top-photo'>
                    {user.photo!==''&&<img src={user.photo}></img>}
                </div>
                <p>Welcome,</p>
                <h4>{user.auth?user.firstname:'user'} {user.auth?user.lastname:null}</h4>
            </div>
            <div className='info__bt'>
                <div><h3>{user.auth?user.experience:'0'}+</h3><p>Experience</p></div>
                <div><h3>{user.auth?user.employeeN:'0'}</h3><p>Employees</p></div>
                <div><h3>{user.auth?user.clients:'0'}</h3><p>Clients</p></div>
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

            <div className={this.state.currentIndex===5?'tab-active-dark tab-div':'tab-div'} onClick={()=>{
                this.setState({currentIndex:5})
                this.setState({employeeIndex:0})
                this.props.history.push(`${this.props.match.path}/allEmployees`)
            }}>
                <FontAwesomeIcon style={{float:'left',color:'#F6A85E',paddingLeft:'5%',marginTop:'1%'}}icon={faUserFriends}/>
                <p className='plustabs-p'>Employees</p>
                <FontAwesomeIcon style={this.state.currentIndex===5?{float:'right',color:'#CCCDCD',marginTop:'1.5%'}:{float:'right',color:'#CCCDCD',marginTop:'1.5%',transform:'rotate(90deg)'}} icon={faChevronDown}/>
            </div>
            <div>
            {this.state.currentIndex===5&&<div className='tab-children'>
                <div className={this.state.employeeIndex===0?'tab-child-active':''} onClick={()=>{
                    this.setState({employeeIndex:0})
                    this.props.history.push(`${this.props.match.path}/allEmployees`)
                }}>
                    <FontAwesomeIcon style={{float:'left', marginTop:'-2px', fontSize:'12px',marginTop:'0.3px'}} icon={faWindowMinimize}/>
                    <p>All Employees</p>
                </div>
                <div className={this.state.employeeIndex===1?'tab-child-active':''} onClick={()=>{
                    this.setState({employeeIndex:1})
                    this.props.history.push(`${this.props.match.path}/leaveRequest`)
                }}>
                    <FontAwesomeIcon style={{float:'left', marginTop:'-2px', fontSize:'12px',marginTop:'0.3px'}} icon={faWindowMinimize}/>
                    <p>Leave Requests</p>
                </div>
                <div className={this.state.employeeIndex===2?'tab-child-active':''} onClick={()=>{
                    this.setState({employeeIndex:2})
                    this.props.history.push(`${this.props.match.path}/attendance`)
                }}>
                    <FontAwesomeIcon style={{float:'left', marginTop:'-2px', fontSize:'12px',marginTop:'0.3px'}} icon={faWindowMinimize}/>
                    <p>Attendance</p>
                </div>
                <div className={this.state.employeeIndex===3?'tab-child-active':''} onClick={()=>{
                    this.setState({employeeIndex:3})
                    this.props.history.push(`${this.props.match.path}/departments`)
                }}>
                    <FontAwesomeIcon style={{float:'left', marginTop:'-2px', fontSize:'12px',marginTop:'0.3px'}} icon={faWindowMinimize}/>
                    <p>Departments</p>
                </div>
                
                
                
            </div>}
            </div>
            <div className={this.state.currentIndex===6?'tab-active-dark tab-div':'tab-div'} onClick={()=>{
                this.setState({currentIndex:6})
                this.setState({payrollIndex:0})
                this.props.history.push(`${this.props.match.path}/payslip`)
            }}>
                <FontAwesomeIcon style={{float:'left',color:'#F6A85E',paddingLeft:'5%',marginTop:'1%'}}icon={faCreditCard}/>
                <p className='plustabs-p'>Payroll</p>
                <FontAwesomeIcon style={this.state.currentIndex===6?{float:'right',color:'#CCCDCD',marginTop:'1.5%'}:{float:'right',color:'#CCCDCD',marginTop:'1.5%',transform:'rotate(90deg)'}}icon={faChevronDown}/>
            </div>
            {this.state.currentIndex===6&&<div className='tab-children'>
                <div className={this.state.payrollIndex===0?'tab-child-active':''} onClick={()=>{
                    this.setState({payrollIndex:0})
                    this.props.history.push(`${this.props.match.path}/payslip`)
                }}>
                    <FontAwesomeIcon style={{float:'left', marginTop:'-2px', fontSize:'12px',marginTop:'0.3px'}} icon={faWindowMinimize}/>
                    <p>Payslip</p>
                </div>
                <div  className={this.state.payrollIndex===1?'tab-child-active':''} onClick={()=>{
                    this.setState({payrollIndex:1})
                    this.props.history.push(`${this.props.match.path}/employeeSalary`)
                }}>
                    <FontAwesomeIcon style={{float:'left', marginTop:'-2px', fontSize:'12px',marginTop:'0.3px'}} icon={faWindowMinimize}/>
                    <p>Employee Salary</p>
                </div>
               
            </div>}
            
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
})(withRouter(Menu) );
