import eventsActionTypes from "./events-action-types";

export const showEvent = (events) => ({
    type:eventsActionTypes.SHOW_EVENT,
    events
})

export const addEvent = (events) => ({
    type:eventsActionTypes.ADD_EVENT,
    events
})

export const deleteEvent = (events) => ({
    type:eventsActionTypes.DELETE_EVENT,
    events
})