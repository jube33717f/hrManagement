import departmentActionTypes from "./department-action-types";
import {getDepartments} from '../../api/api'
export const loadDepartments = () => dispatch => {
    dispatch(loadDepartmentsRequested());
    getDepartments()
      .then(res => dispatch(loadDepartmentsSucceeded(res)))
      .catch(err => dispatch(loadDepartmentsFailed(err)));
  };
  
const loadDepartmentsRequested = () => ({
    type: departmentActionTypes.LOAD_DEPARTMENTS_REQUESTED
});
  
const loadDepartmentsSucceeded = res => ({
    type: departmentActionTypes.LOAD_DEPARTMENTS_SUCCEEDED,
    data: res.data
});

const loadDepartmentsFailed = err => ({
    type: departmentActionTypes.LOAD_DEPARTMENTS_FAILED,
    data: { err }
});