
import React, { Component } from "react";
import PageTop from  '../../../../components/pageTop/pageTop'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import EventForm from './eventform'
import DeleteEvents from './deleteEvents'
import { connect } from "react-redux"
import { showEvent } from '../../../../state/events/events-action-creators'
import './events.scss'

class Events extends Component{
    calendarComponentRef = React.createRef();
    state = {
      calendarWeekends: true,
      calendarEvents: [{id:"placeholder"}],
      visible: false,
      visibleDel: false,
      delEvent:[],
    }

    componentDidMount() {
      const { showEvent } = this.props;
      showEvent ({
        events: this.state.calendarEvents
      })
    }

    render() {
      const { visible, visibleDel } = this.state;
      // console.log(this.props.events.events)
      return (
        <div className='events-app'>
          <PageTop currentPage='Events' currentPath='/ Events'/>
          {/* <button onClick={this.gotoPast}>goto past</button> */}
          <div className='events-calendar'>
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: 'prevYear,prev,next,nextYear today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,list, addEvent,delEvent'
              }}
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin ]}
              ref={ this.calendarComponentRef }
              weekends={ this.state.calendarWeekends }
              events={ this.props.events.events }
              editable = "true"
              droppable = "true"
              eventDrop = { this.handleEventDrop }
              eventResize = { this.handleEventResize }
              selectable = "true"
              select = { this.handleDateSelect }
              customButtons = {{
                addEvent:{
                  text: '+',
                  click: this.showModal
                },
                delEvent:{
                  text: '-',
                  click: this.showDelModal
                }
              }}
              />
              <EventForm 
                visible = { visible }
                onClose = { this.closeModal }
                eventList = { this.state.calendarEvents }
                addEventCallBack = { this.addEventCallBack }
                confirm = { this.confirm }
              />
              <DeleteEvents
                visibleDel = { visibleDel }
                onClose = { this.closeDelModal }
                eventList = { this.state.calendarEvents }
                confirmDel = { this.confirmDel }
              />
          </div>
        </div>
      )
    }

    handleEventResize = (arg) => {
      
      const { showEvent } = this.props;

      for (let i=0; i<this.props.events.events.length; i++){
        if (arg.event.id === this.props.events.events[i].id){
          this.props.events.events.splice([i],1)
        }
      }
      let destCalendar = {
        title: arg.event.title,
        start: arg.event.start,
        end: arg.event.end,
        allDay: arg.event.allDay,
        description: arg.event.extendedProps.description,
        id:Date.now().toString()
      };
      // const { showEvent } = this.props;
      showEvent ({
        events: this.props.events.events.concat(destCalendar)
      })
      this.setState ({
        calendarEvents: this.props.events.events.concat(destCalendar)
      })
      // this.setState({
      //   calendarEvents: this.props.events,
      // })
      // const { showEvent } = this.props;
      // showEvent ({
      //   events: this.state.calendarEvents
      // })
      // this.setState({
      //   calendarEvents:this.props.events
      // })
    }
  
    
    handleEventDrop = (arg) => {
      let endDate = arg.event.end || arg.event.start
      // const { showEvent } = this.props
      if (!window.confirm(`${arg.event.title} was dropped from \n${arg.event.start.toLocaleString('en-AU')} to ${endDate.toLocaleString('en-AU')} \nAre you sure about the change?`)) 
      {
        arg.revert();
      }else{
        for (let i=0; i<this.props.events.events.length; i++){
          if (arg.event.id === this.props.events.events[i].id){
            this.props.events.events.splice([i],1)
          }
      }
        let destCalendar = {
          title: arg.event.title,
          start: arg.event.start,
          end: arg.event.end,
          allDay: arg.event.allDay,
          description: arg.event.extendedProps.description,
          id:Date.now().toString()
        };
        const { showEvent } = this.props;
        showEvent({
          events: this.props.events.events.concat(destCalendar)
        })
        this.setState({
          calendarEvents: this.props.events.events.concat(destCalendar)
        })
        // console.log(this.props.events)
        // let updateEvents = this.props.events.concat(destCalendar);
        // showEvent ({
        //   events: updateEvents,
        // })
        // this.setState({
        //   calendarEvents: this.props.events,
        // })
      }
      // console.log(this.state.calendarEvents)
    }

    handleDateSelect = (arg) => {
      const { showEvent } = this.props;
      if (window.confirm(`Would you like to add an event from ${arg.startStr} to ${arg.endStr}?`)) {
        let eventTitle = prompt('Please Enter a Title:','New Event');
        if (eventTitle === null){
          return;
        }else{
        let update ={
          title: eventTitle,
          start: arg.start,
          end: arg.end,
          allDay:arg.allDay,
          description:'this is cool',
          id: Date.now().toString()
      }
        // console.log(this.props.events.events)
        let updateEvents = this.props.events.events.concat(update)
        showEvent ({
          events: updateEvents
        })

        this.setState({
          calendarEvents:updateEvents
        })
      // let updateEvent = this.props.events.concat(update)
        // if (this.props.events.length == 0){showEvent({
        //   events:update
        // })}else{
        //   let updateEvents = this.props.events.push(update);
        //   showEvent ({
        //     events: updateEvents
        //   })
        // }
        // let updateEvents = [...this.props.events,update]
        // let update2 = updateEvents.concat({
        //     title: eventTitle,
        //     start: arg.start,
        //     end: arg.end,
        //     allDay:arg.allDay,
        //     description:'this is cool',
        //     id: Date.now().toString()
        // })
        // showEvent ({
        //   events: updateEvents
        // })
        // this.setState({  // add new event data
        //   calendarEvents: this.props.events
        // })
        // const { showEvent } = this.props;
        // showEvent ({
        //   events: this.state.calendarEvents
        // })
        // this.setState({
        //   calendarEvents:this.props.events
        // })
        // console.log(this.state.calendarEvents)
        }
      }
    }

    showModal = () => {
      this.setState({ visible: true})
    }

    closeModal = () => {
      console.log('onClose call back')
      this.setState({ visible: false })
    }
    
    confirm = () => {
      console.log('confirm call back')
      this.setState({ visible: false })
    }

    showDelModal = () => {
      this.setState({ visibleDel:true })
    }

    closeDelModal = () => {
      this.setState({ visibleDel:false })
    }

    confirmDel = () => {
      this.setState({ visibleDel:false })
    }

}

function mapStateToProps(state) {
  return{
    events:state.events.calendarEvents
  }
}

export default connect(mapStateToProps, {
  showEvent
})(Events);