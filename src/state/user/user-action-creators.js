import userActionTypes from './user-action-types';
import {getAdmin,getEmployee} from '../../api/api'
export const loadUser = () => dispatch => {
    dispatch(loadUserRequested());
    if(sessionStorage.getItem('auth')==='Admin'){
        getAdmin()
        .then(res => dispatch(loadUserSucceededAdmin(res)))
        .catch(err => dispatch(loadUserFailed(err)));
    }else{
        getEmployee()
        .then(res => {dispatch(loadUserSucceededEmployee(res))})
        .catch(err => dispatch(loadUserFailed(err)));
    }
};

const loadUserRequested = () => ({
    type: userActionTypes.LOAD_USER_REQUESTED
});
  
const loadUserSucceededAdmin = res => ({
    type: userActionTypes.LOAD_USER_SUCCEEDED_ADMIN,
    
    data: {
        auth:true,
        email:res.data.account,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        gender: res.data.gender,
        photo: res.data.photo,
        experience: res.data.experience,
        clients: res.data.clients,
        employeeN:res.data.employee,
        id:res.data._id,
    }
});
const loadUserSucceededEmployee = res => ({
    type: userActionTypes.LOAD_USER_SUCCEEDED_EMPLOYEE,
    data:{
        auth:true,
        email:res.data.account,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        gender: res.data.gender,
        photo: res.data.photo,
        role:res.data.role,
        department:res.data.department,
        emId:res.data.employeeID,
        id:res.data._id,
    }
});

const loadUserFailed = err => ({
    type: userActionTypes.LOAD_USER_FAILED,
    data: { err }
});
export const loginUser = (text) =>({
    type: userActionTypes.LOGIN_USER,
    data:text
})
export const refreshUser = (text)=>({
    type: userActionTypes.REFRESH_USER,
    data:text
})
