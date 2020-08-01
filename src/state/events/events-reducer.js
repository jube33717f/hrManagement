import eventsActionTypes from "./events-action-types";

const initialState = {
    calendarEvents:[],
}

const events = (state = initialState, action) => {
    console.log('======', action)
    switch (action.type) {
        case eventsActionTypes.SHOW_EVENT:
            return {  
                ...state,
                // calendarEvents:state.calendarEvents.concat([action.events])
                calendarEvents:action.events
            }
        case eventsActionTypes.ADD_EVENT:
            return {
                ...state,
                calendarEvents:action.events
            }
        case eventsActionTypes.DELETE_EVENT:
            return {
                ...state,
                calendarEvents:action.events
            }
        default:{
            return state;
        }
    }
}
  
export default events;