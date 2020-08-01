import departmentActionTypes from "./department-action-types";

const inititalState = {
    departments_info: {},
    error:''
}

const departments = (state = inititalState, action) => {
    switch (action.type) {
        case departmentActionTypes.LOAD_DEPARTMENTS_SUCCEEDED:
            return {    
                departments_info: action.data.result,
                error:''
            }
        case departmentActionTypes.LOAD_DEPARTMENTS_FAILED:
            return {    
                departments_info: 'error',
                error:action.data.err
            }
        default:{
            return state;
        }
            
    }
}
  
export default departments;