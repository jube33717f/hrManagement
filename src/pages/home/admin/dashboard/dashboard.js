import React, { PureComponent } from "react";
import PageTop from  '../../../../components/pageTop/pageTop'
import StickyNotes from '../../../../components/stickyNotes/StickyNotes'
import SInfoBox from '../../../../components/sInfoBox/SInfoBox'
import Welcome from '../../../../components/welcome/Welcome'
import PieChart from '../../../../components/pieChart/PieCart'
import DepartmentHeadInfo from '../../../../components/table/DepartmentHeadInfo'
import CompanyMap from '../../../../components/companyMap/CompanyMap'
import { getEmployeeAmount,  attendance, newEmployee, departmentHeadInfo} from '../../../../api/api'

import './dashboard.scss'
import { isEqual } from 'lodash';
import { connect } from "react-redux";
import {loadDepartments} from '../../../../state/department/department-action-creators'
import { faLongArrowAltUp,faUsers,faUserFriends,faStopwatch} from '@fortawesome/free-solid-svg-icons'
class DashBoard extends PureComponent{
    state={
        stickyNotesShow:true,
        pieChartShow:true,
        tableShow:true,
        employeeAmount:0,
        attendanceAmount:0,
        timeoffAmount:0,
        newEmployeeAmount:0,
        departmentHead:[]

    }
    
    toggleStickyNotesShow(){
        this.setState({stickyNotesShow:!this.state.stickyNotesShow})
    }
    togglePieChartShow(){
        this.setState({pieChartShow:!this.state.pieChartShow})
    }
    toggleTableShow(){
        this.setState({tableShow:!this.state.tableShow})
    }
    async componentDidMount(){
        const {loadDepartments} = this.props
        
        if( isEqual(this.props.departments,{}) ){
            loadDepartments();
        }
        const res=(await getEmployeeAmount())     
        if(res.status === 200){
            this.setState({employeeAmount:res.data.total})   
        }
        const res2=(await attendance())
        if(res2.status === 200){
            this.setState({attendanceAmount:res2.data.amount,timeoffAmount:res.data.total-res2.data.amount})  
        }
        const res3=(await newEmployee())
        if(res3.status === 200){
            this.setState({newEmployeeAmount:res3.data.amount})   
        }
        const res4=(await departmentHeadInfo())
        if(res4.status === 200){        
            this.setState({departmentHead:res4.data.result.map((item)=>{
                return({
                    name:item.firstname+' '+item.lastname,
                    img:item.photo,
                    department:item.department,
                    employeeID:item.employeeID,
                    email:item.account,
                    joinDate:item.startDate
                })
            })})   
        }
        

    }
    
    render(){
        
        let tableStyle={
            marginTop:'-7rem'
        }
        let mapStyle={
            marginTop:'-21rem'
        }
        
        //000  x
        //001  x
        //010  x
        //011  x
        //100  x
        //101  x
        //111  x
        //pie|notes|table
        if(!this.state.pieChartShow){//0 1 1
            tableStyle={marginTop:'1rem'}
            mapStyle={marginTop:'-49rem'}
            if(!this.state.stickyNotesShow){//0 0 1
                mapStyle={marginTop:'-30rem'}
            }
            if(!this.state.tableShow){//0 1 0
                mapStyle={marginTop:'-23rem'}
                if(!this.state.stickyNotesShow){//0 0 0
                    mapStyle={marginTop:'-3.5rem'}
                }
            }
        }else if(!this.state.stickyNotesShow){//1 0 1
            tableStyle={marginTop:'-28rem'}
            mapStyle={marginTop:'0rem'}
            if(!this.state.tableShow){//1 0 0
                mapStyle={marginTop:'26rem'}
            }
        }else if(!this.state.tableShow){//1 1 0
            mapStyle={marginTop:'7.3rem'}
            
        }
        return(
        
        <div style={{overflowY:'hidden'}}>
        
        <PageTop currentPage='Dashboard' currentPath='/ Dashboard'/>
        
        
        <div className='dashboard'>
            <Welcome user={this.props.user}/>
            <ol className='dashboard-top'>
                <li><SInfoBox bgColor='linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 17%, #f99185 40%, #cf556c 68%, #b12a5b 100%)' title='Employee Number' number={this.state.employeeAmount} textColor='#FFEBFC'icon={faUsers}/></li>
                <li><SInfoBox bgColor='linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)' title='New Employee/M' number={this.state.newEmployeeAmount} textColor='#F4EFD2'icon={faLongArrowAltUp}/></li>
                <li><SInfoBox bgColor='linear-gradient(60deg, #abecd6 0%, #fbed96 100%)' title='Attandance' number={this.state.attendanceAmount} textColor='#9394AD'icon={faUserFriends}/></li>
                <li><SInfoBox bgColor='linear-gradient(-225deg, #65379B 0%, #886AEA 53%, #6457C6 100%)' title='Time-off' number={this.state.timeoffAmount} textColor='#BAD3B6' icon={faStopwatch}/></li>
            </ol>
            <div className='dashboard-mid'>
                <section className='dashboard-event'><StickyNotes toggleState={this.toggleStickyNotesShow.bind(this)}/></section>
                <section className='dashboard-piechart'><PieChart toggleState={this.togglePieChartShow.bind(this)} departments={this.props.departments}/></section>
                
            </div>
            <section className='dashboard-headTable' style={tableStyle}><DepartmentHeadInfo  info={this.state.departmentHead} toggleState={this.toggleTableShow.bind(this)}/></section>
            <section className='dashboard-googleMap' style={mapStyle}><CompanyMap/></section>
            
             
        </div>
         </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      departments: state.departments.departments_info,  
      error:   state.departments.error,
      user:   state.user.current_user,   
    }
}

  
export default connect(mapStateToProps, {
    loadDepartments
})(DashBoard);