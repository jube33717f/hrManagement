import React, { Component } from "react";
import './menuResponsive.scss'

import { Route, withRouter, Link } from "react-router-dom";
class MenuResponsive extends Component{
    constructor(props){
        super();
        this.state={
            tabs:[
                {name:'HR Dashboard'},
                {name:'Holidays'},
                {name:'Events'},
                {name:'Message Board'},
                {name:'Projects'},
                {name:'allEmployees'},
                {name:'leaveRequest'},
                {name:'attendance'},
                {name:'departments'},
                {name:'payslip'},
                {name:'employeeSalary'},

            ],
            currentIndex:0,
        }
    }
    render(){
        const close={
            right:'0rem',
            transform: 'translateX(20.3rem)',
            transition: 'all .5s'
        }
        const open={
            right:'-20.3rem',
            transform: 'translateX(-20rem)',
            transition: 'all .5s'
        }
        return(<>
        <div className='mr'>
        <div className='mr__arrow'></div>
            {this.state.tabs.map((item,index)=>
            <li key={index} className='mr-div' onClick={()=>{
                // let a = parseInt(event.currentTarget.getAttribute('key'), 10)
                this.props.clicked()
                this.setState({currentIndex:index})
                let pathname=item.name.replace(' ','-')
                this.props.history.replace(`${this.props.match.path}/${pathname}`)
            }}>
                <p>{item.name}</p>
            </li>)}                  
        </div>

        </>)
    }
}
export default withRouter(MenuResponsive)