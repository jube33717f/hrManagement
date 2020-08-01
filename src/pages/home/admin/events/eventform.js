import React, { Component } from 'react';
import { connect } from "react-redux"
import { addEvent } from '../../../../state/events/events-action-creators'
class EventForm extends Component {
    state = {
        allDay: true,
        title: '',
        visible: false,
        start: '',
        end: '',
        description: '',
        eventData: '',
        events: ''
    };

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleStartChange = (event) => {
        this.setState({ start: event.target.value });
    }

    handleEndChange = (event) => {
        this.setState({ end: event.target.value })
    }

    handleDescriptionChange =(event) => {
        this.setState({ description: event.target.value })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox'? target.checked: target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    componentDidMount() {
        this.setState({ 
            visible: this.props.visible,
            events: this.props.eventList
        })
    }

    componentWillReceiveProps(props) {
        this.setState({ 
            visible: props.visible,
            events: props.eventList
        })
    }

    closeModal = () => {
        console.log('close clicked')
        const { onClose } = this.props
        onClose && onClose()
        this.setState({ 
            visible:false,
            title:'',
            start:'',
            end:'',
            description:'',
            allDay: true
         })
    }

    confirm = () => {
        console.log('confirm clicked')
        const { confirm } = this.props
        confirm && confirm()
        this.setState({ 
            visible:false,
            title:'',
            start:'',
            end:'',
            description:'',
            allDay: true
         })
    }

    resetForm = () => {
        alert( ' This was submitted:'+
        '\n Event Title: '+this.state.title +
        '\n Start Date: '+this.state.start + 
        '\n End Date: '+this.state.end + 
        '\n All Day: '+this.state.allDay + 
        '\n Description: '+this.state.description);
        let newEvent = {
            title: this.state.title,
            start: this.state.start,
            end: this.state.end,
            allDay: this.state.allDay,
            description: this.state.description,
            id:Date.now().toString()
        };
        const { eventList } = this.props;
        this.setState({
            eventData: eventList.concat(newEvent),
            title:'',
            start:'',
            end:'',
            description:'',
            allDay: true
        }) 
        const { addEvent } = this.props;
        addEvent ({
          events: this.props.events.events.concat(newEvent)
        })
        console.log("eventlist",this.state.eventData)
    }

    render(){
        const { visible } = this.props;
        return visible && <div className = "eventForm-wrapper">
                    <div className = "eventForm">
                    <div className = "eventForm-title">
                        Add Event
                    </div>
                    <div className = "eventForm-content">
                        <form 
                            onSubmit={ this.handleSubmit }>
                            <label>
                                Event Title:
                                <br/>
                                <input 
                                name="title" 
                                type="text" 
                                value={this.state.title} 
                                onChange={this.handleTitleChange} />
                            </label>
                            <br/>
                            <label>
                                Start Date:
                                <br/>
                                <input 
                                name="start" 
                                type="date" 
                                value={this.state.start} 
                                onChange={this.handleStartChange} />
                            </label>
                            <br/>
                            <label>
                                End Date:
                                <br/>
                                <input 
                                    name="end" type="date" 
                                    value={this.state.end} 
                                    onChange={this.handleEndChange} />
                            </label>
                            <br/>
                            <label>
                                All Day 
                                <input
                                    name="allDay"
                                    type="checkbox"
                                    checked={this.state.allDay}
                                    onChange={this.handleInputChange} />
                            </label>
                            <br/>
                            <label>
                                Description:
                                <br/>
                                <textarea 
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.handleDescriptionChange} />
                            </label>
                            <br/>
                            <input 
                                className = "submit"
                                style ={{ cursor:'pointer' }}
                                type="submit" 
                                value="Submit"
                                onClick = { this.resetForm }
                            />
                        </form>
                    </div>
                    <div className = "eventForm-operator">
                        <button 
                        onClick = { this.confirm}
                        className = "eventForm-operator-confirm"
                        >OK</button>
                        <button 
                            onClick = { this.closeModal }
                            className = "eventForm-operator-close"
                        >Cancel</button>
                    </div>
                </div>
                <div 
                    onClick = { this.closeModal }
                    className = "mask"
                >    
                </div>
            </div>
    }
}

function mapStateToProps(state) {
    return{
      events:state.events.calendarEvents
    }
  }
  
  export default connect(mapStateToProps, {
    addEvent
  })(EventForm);