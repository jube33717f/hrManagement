import userActionTypes from "./user-action-types";

// const res =async ()=>{return await(getEmployee()).data};


const inititalState = {
    current_user: {auth:false}
}

const user = (state = inititalState, action) => {
    switch (action.type) {
        case userActionTypes.LOGIN_USER:
            return {    
                current_user: action.data
            }
        case userActionTypes.REFRESH_USER:
            return {current_user: action.data};
        case userActionTypes.LOAD_USER_SUCCEEDED_ADMIN:
            return {    
                current_user: action.data,
            }
        case userActionTypes.LOAD_USER_SUCCEEDED_EMPLOYEE:
            return {    
                current_user: action.data,
            }
        case userActionTypes.LOAD_USER_FAILED:
            return {    
                current_user: 'error',
                error:action.data.err
            }
        default:{
            return state;
        }
            
    }
}
  
export default user;