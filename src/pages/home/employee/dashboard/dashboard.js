import React, { PureComponent } from "react";
import PageTop from  '../../../../components/pageTop/pageTop'
import StickyNotes from '../../../../components/stickyNotes/StickyNotes'
import SInfoBox from '../../../../components/sInfoBox/SInfoBox'
import Punch from '../../../../components/sInfoBox/Punch'
import Welcome from '../../../../components/welcome/Welcome'

import CompanyMap from '../../../../components/companyMap/CompanyMap'
import { updateLeaveRecord , punchIn , punchOut, getEmployee,getEmployeeAmount,  attendance} from '../../../../api/api'
import '../../../../config'
import '../../admin/dashboard/dashboard.scss'
import { isEqual } from 'lodash';
import { connect } from "react-redux";

import { faCoffee,faHome,faUserFriends,faStopwatch} from '@fortawesome/free-solid-svg-icons'
import '../../../../config'
const { companyLat } = global.constants;
const { companyLon } = global.constants;
const { radius } = global.constants;

class DashBoardE extends PureComponent{
    state={
        stickyNotesShow:true,
        pieChartShow:true,
        tableShow:true,
        startTime:'00:00',
        punchInRecord:0,
        punchOutRecord:0,
        endTime:'00:00',
        attendanceAmount:0,
        timeoffAmount:0,
        s:false,

    }
    
    toggleStickyNotesShow(){
        this.setState({stickyNotesShow:!this.state.stickyNotesShow})
    }
    getDistance=()=>{

        navigator.geolocation.getCurrentPosition((position)=>{
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
           
            let s;
            let radLat1 = companyLat * Math.PI / 180;
            let radLat2 = lat * Math.PI / 180;
            let a = companyLat * Math.PI / 180- lat * Math.PI / 180;
            let b = companyLon * Math.PI/180 - lon * Math.PI/180;
            let c = Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b/2),2)
            s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+c))

            s = s * 6378137.0;

            s = Math.round(s * 10000.0) / 10000.0;

            if(s<radius) {
                this.setState({s:true})
            }else{
                this.setState({s:false})
            }
            
            
        },()=>{console.error('error')})   
    }
    async punchIn(){
        
        this.getDistance()
        if(this.state.punchInRecord===(new Date()+'').substring(0,15)){
            alert('Do not punch in again!')
            return
        }
        if(!this.state.s){
            alert('You are not in company range')
            return
        }
        const res=await punchIn()
        
        if(res.status === 200){
            let timeStr  = new Date().toTimeString().substring(0,5);
            this.setState({startTime:timeStr })
            alert('punch in success')
        }


    }
    async punchOut(){
        this.getDistance()
        if(this.state.punchOutRecord===(new Date()+'').substring(0,15)){
            alert('Do not punch out again!')
            return
        }
        if(!this.state.s){
            alert('You are not in company range')
            return
        }
        const first = (await getEmployee())
        
        if(first.status !== 200) return
        
        if(first.status === 200 && first.data.punchIn === 0){
            if(first.data.punchIn === 0){
                alert('Did not punch in!')
                return
            }
        }
        let newLeaveRecord=first.data.leaveRecord;
        const res=(await punchOut()).data;
        if(res.message === "update"){
            let timeStr  = new Date().toTimeString().substring(0,5);
            
            this.setState({endTime:timeStr })
            let duration = (new Date().getTime() - first.data.punchIn)/3600000
            const {fullWorkingHour} = global.constants;
            const index = new Date().getDate()
            /**如果请假了，此时leaveRecords会被“提前更新”,这里去判断他是否提前请假
            （请假时间不一致的话，1.请假少于实际缺勤=》按全天未请假
                              2.请假多于实际缺勤=》按请假真实缺勤算
            ！！！！如果缺勤没有打卡=>默认的数值是-2，未请假打卡的都会是-2，和未到日期/节假日判断是一样的
            *********
            未到/节假日 -2（数组初始化-2）
            缺勤1天（请假） 1
            缺勤1天（未请假）-1 ===》现在都改为-2
            缺勤半天（请假）0.5
            缺勤半天未请假 -0.5
            未缺勤 0

            节假日=》放在config文件判断设置假期
            *********

            涉及以下板块
            1.attandance   -1改成了-2  可以选择不再特别标出节假日或者从config里挑出节假日做唯一标识
            2.工资结算   这里需要在app加一个手动模块触发
                    完成以下动作
                    （1）工资根据缺勤情况-【节假日（config文件）+ 实际当月比31天少的天数】计算需要扣的工资进行结算【初始工资需要在后台补充】
                    （2）结算完成leaveRecord恢复成31个（-2）数组
            3.请假   请假申请被批准的同时还需要update leaveRecord相应天数字段为【这一块需要人负责/包括employee相应板块缺失】
                    缺勤1天（请假） 1
                    缺勤半天（请假）0.5

            **/
            if(duration > fullWorkingHour){             
                newLeaveRecord[index] = 0 
            }else if(duration > fullWorkingHour/2){
                if(newLeaveRecord[index] > 0){
                    newLeaveRecord[index] = 0.5
                }
            }else{
                if(newLeaveRecord[index] < 1) {
                    newLeaveRecord[index] = -1
                }
            }
         
            const res=(await updateLeaveRecord(newLeaveRecord))
            if(res.status === 200){
                alert('punch out success')
            }
            
        }
    }
    async componentDidMount(){
        
        this.getDistance()

        const first = (await getEmployee())
        
        if(first.status !== 200) return
        
        if(first.status === 200 ){
            if(first.data.punchIn === 0){
                this.setState({startTime:'00:00'})
            }else{
                
                this.setState({startTime:(new Date(first.data.punchIn)+'').substring(16,21),punchInRecord:(new Date()+'').substring(0,15)})
            }
            
            if(first.data.punchOut === 0){
                this.setState({endTime:'00:00'})
            }else{
                
                this.setState({endTime:(new Date(first.data.punchOut)+'').substring(16,21),punchOutRecord:(new Date()+'').substring(0,15)})
            }
            
        }
        const res=(await getEmployeeAmount())     
        if(res.status === 200){
            this.setState({employeeAmount:res.data.total})   
        }
        const res2=(await attendance())
        if(res2.status === 200){
            this.setState({attendanceAmount:res2.data.amount,timeoffAmount:res.data.total-res2.data.amount})  
        }

    }
    
    render(){
        let tableStyle={
            marginTop:'-7rem'
        }
        let mapStyle={
            marginTop:'-21rem'
        }

        if(!this.state.stickyNotesShow){//1 0 1
            
            mapStyle={marginTop:'-1rem'}
            
        }
        return(
        
        <div style={{overflowY:'hidden'}}>
        
        <PageTop currentPage='Dashboard' currentPath='/ Dashboard' />
        
        
        <div className='dashboard'>
            <Welcome user={this.props.user}/>
            <ol className='dashboard-top'>
                <li><Punch bgColor='linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 17%, #f99185 40%, #cf556c 68%, #b12a5b 100%)' title='Punch In' time={this.state.startTime} textColor='#FFEBFC'icon={faCoffee} clicked={this.punchIn.bind(this)}/></li>
                <li><Punch bgColor='linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)' title='Punch Out' time={this.state.endTime}   textColor='#F4EFD2'icon={faHome} clicked={this.punchOut.bind(this)}/></li>
                <li><SInfoBox bgColor='linear-gradient(60deg, #abecd6 0%, #fbed96 100%)' title='Attandance' number={this.state.attendanceAmount} textColor='#9394AD'icon={faUserFriends}/></li>
                <li><SInfoBox bgColor='linear-gradient(-225deg, #65379B 0%, #886AEA 53%, #6457C6 100%)' title='Time-off' number={this.state.timeoffAmount} textColor='#BAD3B6' icon={faStopwatch}/></li>
            </ol>
            <div className='dashboard-mid'>
                <section className='dashboard-event'><StickyNotes toggleState={this.toggleStickyNotesShow.bind(this)}/></section>
                {/* <section className='dashboard-piechart'><PieChart toggleState={this.togglePieChartShow.bind(this)} departments={this.props.departments}/></section> */}
                
            </div>
            {/* <section className='dashboard-headTable' style={tableStyle}><DepartmentHeadInfo  toggleState={this.toggleTableShow.bind(this)}/></section> */}
            <section className='dashboard-googleMap' style={mapStyle}><CompanyMap/></section>
            
             
        </div>
         </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      user:   state.user.current_user,   
    }
}

  
export default connect(mapStateToProps, {})(DashBoardE);