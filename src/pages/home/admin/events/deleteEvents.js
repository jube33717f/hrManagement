import React, { Component } from 'react';
import { connect } from "react-redux"
import { deleteEvent } from '../../../../state/events/events-action-creators'
import Events from './events'

class DeleteEvents extends Component {
    state = {
        visibleDel:false,
        showListTitle:['Event Title','Start Date', 'End Date', 'Description','Delete'],
        showEvents:[],
        eventList:[],
    }

    componentDidMount() {
        this.setState({ 
            visible: this.props.visibleDel,
        })
    }

    componentWillReceiveProps(props) {
        this.setState({ 
            visible: props.visibleDel,
        })
    }

    closeModal = () => {
    
        const { onClose } = this.props
        onClose && onClose()
        this.setState({ 
            visibleDel:false, 
            showEvents:[]
        })
    }
    
    confirmDel = () => {
  
        const { confirmDel } = this.props
        confirmDel && confirmDel()
        this.setState({ 
            visibleDel:false,
            showEvents:[]
         })
        //  window.confirm('Do you want to save the changes?')
        
    }

    showEventList = () => {
        let show = [];
        for (let i = 1; i<this.props.events.events.length; i++){
            if(this.props.events.events[i].end === null){
                let eventItem = `${this.props.events.events[i].title} from ${this.props.events.events[i].start.toLocaleString('en-AU')}`
                show.push(eventItem)
            }else{
                let eventItem = `${this.props.events.events[i].title} from ${this.props.events.events[i].start.toLocaleString('en-AU')} to ${this.props.events.events[i].end.toLocaleString('en-AU')}`
                show.push(eventItem)
                }
            }   
        this.setState({
            showEvents:show,
            eventList:this.props.events.events
        })
       
    }

    handleItemClick = (index) => {
        const showEvents = [...this.state.showEvents]
        // alert(eventsIndex)
       
     
            // let deleteEventData = this.state.eventList
            // deleteEventData.splice(index+1,1)
         
        // const { deleteEvent } = this.props

       if (window.confirm(`Would you like to delete ${showEvents[index]}?`)){
            const { deleteEvent } = this.props
            let deleteEventData = this.props.events.events
            // deleteEventData.splice(index+1,1)
            
            deleteEvent ({
                events: deleteEventData.filter((value)=>value!=this.props.events.events[index+1])
                })

            showEvents.splice(index,1)
            this.setState({
                showEvents,
                })
        }
        // deleteEvent ({
        //     events: this.props.events.events.concat(111)
        // })
     
        // if (window.confirm(`Would you like to delete ${showEvents[index]}?`)){
        //     showEvents.splice(index,1);
        //     this.setState({showEvents})
        //     let eventsIndex = index+1
        //     alert (eventsIndex)
        //     const { deleteEvent } = this.props
        //     
        // }deleteEvent ({ 
        //         events: this.props.events.events.splice(eventsIndex,1)
        //     })
    }


    render(){
        const { visibleDel} = this.props;
        return visibleDel && <div className = "eventForm-wrapper">
            <div className = "eventForm">
                <div className = "eventForm-title"> 
                    Delete Event 
                </div>
                <ul className = "eventForm-content">
                    {this.state.showEvents.map((value,index) => {
                        return <li 
                                key = {index}
                                onClick={this.handleItemClick.bind(this,index)}
                                style={{cursor:'pointer'}}
                                >{value}</li>
                    })}
                    <button 
                    className = "showEvents"
                    onClick = {this.showEventList}
                    style = {{ cursor:'pointer' }}
                    >Show Events</button>
                </ul>
                <div className= "eventForm-operator"> 
                    <button 
                    className = "eventForm-operator-confirm"
                    onClick = {this.confirmDel}
                    >OK</button>
                    <button 
                    className = "eventForm-operator-close"
                    onClick = { this.closeModal }
                    >Cancel</button>
                </div>
            </div>
            <div className = "mask"></div>
        </div>
    }
}
function mapStateToProps(state) {
    return{
      events:state.events.calendarEvents
    }
  }
  
  export default connect(mapStateToProps, {
    deleteEvent
  })(DeleteEvents);