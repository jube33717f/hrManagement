import React, { PureComponent} from "react";
import { connect } from "react-redux";
import './home.scss'
import Menu from '../../components/menu/menu'
import Dashboard from './admin/dashboard/dashboard'
import Events from './admin/events/events'
import Holidays from './admin/holidays/holidays'
import MyPosts from './admin/myPosts/myPosts'
import FocusTimer from './admin/focusTimer/focusTimer'
import AllEmployees from './admin/employees/allEmployees/allEmployees'
import Attendance from './admin/employees/attendance/attendance'
import Department from './admin/employees/departments/department'
import LeaveRequest from './admin/employees/leaveRequest/leaveRequest'
import PaySlip from './admin/payroll/payslip/paySlip'
import EmployeeSalary from './admin/payroll/employeeSalary/employeeSalary'
import MessageBoard from './admin/messageBoard/messageBoard'
import Post from './admin/messageBoard/post/post'

import MenuE from '../../components/menu/menuE'

import DashboardE from './employee/dashboard/dashboard'
import Leave from './employee/leave/leave'
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import Popup from "../../components/popup/Popup";

class Home extends PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        const {theme} = this.props;
        
        const role = sessionStorage.getItem('auth') 
        
        if(role!=='Admin'&&role!=='Employee'){return <>Pleass Log In First</>}
        return(
        <div className='home' >
            <div className = {
                    (theme === 'classic'&&'menu classic')||
                    (theme === 'dark'&&'menu dark' )||
                    (theme === 'light'&&'menu light' )||
                    (theme === 'purple'&&'menu purple' )
                }
            >
            {role === 'Admin'&&<Menu/>}
            {role === 'Employee'&&<MenuE/>}

            </div>
            <div className='content' >
                {role === 'Admin'&&
                <Switch>
                    <Redirect exact from={`${this.props.match.path}`} to={`${this.props.match.path}/HR-Dashboard`} />
                    <Route path={`${this.props.match.path}/HR-Dashboard`} component={Dashboard}></Route>
                    <Route path={`${this.props.match.path}/allEmployees`} component={AllEmployees}></Route>
                    <Route path={`${this.props.match.path}/attendance`} component={Attendance}></Route>
                    <Route path={`${this.props.match.path}/departments`}component={Department}></Route>
                    <Route path={`${this.props.match.path}/leaveRequest`} component={LeaveRequest}></Route>
                    
                    <Route path={`${this.props.match.path}/Events`} component={Events}></Route>
                    <Route path={`${this.props.match.path}/Holidays`} component={Holidays}></Route>
                    <Route path={`${this.props.match.path}/My-Posts`} component={MyPosts}></Route>
                    <Route path={`${this.props.match.path}/Focus-Timer`}component={FocusTimer}></Route>
                    <Route path={`${this.props.match.path}/employeeSalary`} component={EmployeeSalary}></Route>
                    <Route path={`${this.props.match.path}/payslip`} component={PaySlip}></Route>
                    {/* <Route path={`${this.props.match.path}/payslip/:parameter`} component={PaySlip}></Route> */}
                    <Route path={`${this.props.match.path}/Message-Board`} component={MessageBoard}></Route>
                    <Route path={`${this.props.match.path}/Post/:parameter`} component={Post}></Route>
                    <Route path={`${this.props.match.path}/My-Posts`} component={MyPosts}></Route>
                   
                </Switch>}
                {role === 'Employee'&&
                <Switch>
                    <Redirect exact from={`${this.props.match.path}`} to={`${this.props.match.path}/Employee-Dashboard`} />
                    <Route path={`${this.props.match.path}/Employee-Dashboard`}component={DashboardE}></Route>
                    <Route path={`${this.props.match.path}/Holidays`} component={Holidays}></Route>
                    <Route path={`${this.props.match.path}/Events`} component={Events}></Route>
                    <Route path={`${this.props.match.path}/Leave`} component={Leave}></Route>
                    <Route path={`${this.props.match.path}/Focus-Timer`}component={FocusTimer}></Route>
                    <Route path={`${this.props.match.path}/Message-Board`} component={MessageBoard}></Route>
                    <Route path={`${this.props.match.path}/Post/:parameter`} component={Post}></Route>
                    <Route path={`${this.props.match.path}/My-Posts`} component={MyPosts}></Route>
                    
                </Switch>}
                <Popup/>
            </div>
        </div>)
    }
}
function mapStateToProps(state) {
    return {
      theme: state.theme.current_theme,     
    }
  }
  
  
export default connect(mapStateToProps)(Home);