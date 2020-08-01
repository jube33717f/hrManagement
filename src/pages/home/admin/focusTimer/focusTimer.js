import React, { Component } from "react";
import PageTop from  '../../../../components/pageTop/pageTop'
import { faLaptopCode, faCoffee, faWalking, faPlay, faRedo, faStop} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './focusTimer.scss'
let timeinterval;
export default class FocusTimer extends Component{
    state={
        workTimer:25,
        workTimerShow:true,
        shortBreakTimer:5,
        shortBreakTimerShow:false,
        longBreakTimer:30,
        longBreakTimerShow:false,
        showingMin:25,
        showingSec:0,
        timerState:faPlay,
        amount:0,
    }
    timerStart=()=>{
        timeinterval=setInterval(()=>{
            if(this.state.showingSec>0){
                this.setState({showingSec:this.state.showingSec-1})
            }else{
                if(this.state.showingMin === 0){
                    if(this.state.workTimerShow){
                        this.setState({
                            amount:this.state.amount+1,  
                            showingMin:this.state.workTimer-1,
                            showingSec: 59
                        })
                        document.getElementById('audioPlay').play()
                        clearInterval(timeinterval); 
                        return
                    }
                    if(this.state.shortBreakTimerShow){
                        this.setState({ 
                            showingMin:this.state.shortBreakTimer-1,
                            showingSec: 59
                        })
                        document.getElementById('audioPlay').play()
                        clearInterval(timeinterval); 
                        return
                    }
                    if(this.state.longBreakTimerShow){
                        this.setState({ 
                            showingMin:this.state.longBreakTimer-1,
                            showingSec: 59 
                        })
                        document.getElementById('audioPlay').play()
                        clearInterval(timeinterval); 
                        return
                    }
                    
                }else{
                    this.setState({showingMin:this.state.showingMin-1,
                                    showingSec:59 })
                }
            }
        },1000)
    }
    timerStop=()=>{
        clearInterval(timeinterval); 
    }
    timerRefresh=()=>{
        if(this.state.workTimerShow){
            this.setState({
                showingMin:this.state.workTimer,
                showingSec: 0 
            })
            clearInterval(timeinterval); 
            return
        }
        if(this.state.shortBreakTimerShow){
            this.setState({ 
                showingMin:this.state.shortBreakTimer,
                showingSec: 0 
            })
            clearInterval(timeinterval); 
            return
        }
        if(this.state.longBreakTimerShow){
            this.setState({ 
                showingMin:this.state.longBreakTimer,
                showingSec: 0 
            })
            clearInterval(timeinterval); 
            return
        }
    }
    render(){
        const tomato=[...Array(this.state.amount)].map(_=>' 🍅 ');
        return(
        
        <><PageTop currentPage='Focus Timer' currentPath='/ FocusTimer'/>
        <div className='timer'>
        <section>
            <h2>🍅 Pomodoro 🍅</h2>


        </section>
        <section>
            <h1>{this.state.showingMin}:{this.state.showingSec} </h1>
            <div>
                <FontAwesomeIcon 
                className='icon' 
                icon={this.state.timerState}
                onClick={()=>{
                    if(this.state.timerState===faPlay){
                        this.setState({timerState:faStop})
                        this.timerStart()
                        return
                    }
                    if(this.state.timerState===faStop){
                        this.setState({timerState:faRedo})
                        this.timerStop()
                        return
                    }
                    if(this.state.timerState===faRedo){
                        this.setState({timerState:faPlay})
                        this.timerRefresh()
                        return
                    }
                }

                }
                />
            </div>
            
        </section>
        <section>
            <span 
            className={this.state.workTimerShow?'icon-active':null}
            onClick={()=>{
                this.setState({workTimerShow:true,
                                shortBreakTimerShow:false,
                                longBreakTimerShow:false,
                                showingMin:this.state.workTimer,
                                showingSec:0,
                            })
            }}
            >
                <FontAwesomeIcon  icon={faLaptopCode}/> Working
            </span>
            <span 
            className={this.state.shortBreakTimerShow?'icon-active':null}
            onClick={()=>{
                this.setState({workTimerShow:false,
                                shortBreakTimerShow:true,
                                longBreakTimerShow:false,
                                showingMin:this.state.shortBreakTimer,
                                showingSec:0,
                                })
            }}
            >
                <FontAwesomeIcon icon={faCoffee}/> Short Break
            </span>
            <span 
            className={this.state.longBreakTimerShow?'icon-active':null}
            onClick={()=>{
                this.setState({workTimerShow:false,
                                shortBreakTimerShow:false,
                                longBreakTimerShow:true,
                                showingMin:this.state.longBreakTimer,
                                showingSec:0,
                            })
            }}
            >
                <FontAwesomeIcon icon={faWalking}/> Long Break
            </span>
            
        </section>
        <section>
            Today's tomatoes: {this.state.amount} {tomato}
        </section>
        
        <audio id='audioPlay' src='http://data.huiyi8.com/2017/gha/03/17/1702.mp3' hidden='true'></audio>
        </div>
        
        </>
        )
    }
}