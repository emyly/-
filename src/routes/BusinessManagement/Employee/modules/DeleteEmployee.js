/**
 * Created by sjf on 2016/11/15.
 */
// ------------------------------------
// Action Types
// ------------------------------------
export const DELETE_EMPLOYEE = 'BusinessManagement/Employee/DELETE_EMPLOYEE';
export const DELETE_EMPLOYEE_SUCCESS = 'BusinessManagement/Employee/DELETE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_FAIL = 'BusinessManagement/Employee/DELETE_EMPLOYEE_FAIL';
export const DELETE_EMPLOYEE_FETCING = 'BusinessManagement/Employee/DELETE_EMPLOYEE_FETCING';

// ------------------------------------
// Action
// ------------------------------------
export function deleteEmployeeRemote(id) {
  return {
    type: DELETE_EMPLOYEE,
    id
  }
}

export function deleteEmployeeRemoteSuccess() {
  return {
    type: DELETE_EMPLOYEE_SUCCESS
  }
}

export function deleteEmployeeRemoteFail(error) {
  return {
    type: DELETE_EMPLOYEE_FAIL,
    error
  }
}

export function deleteEmployeeRemoteFetching() {
  return {
    type: DELETE_EMPLOYEE_FETCING,
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DELETE_EMPLOYEE]: (state, action) => ({
    ...state,
    isDeleting: false
  }),
  [DELETE_EMPLOYEE_SUCCESS]: (state, action) => ({
    ...state,
    isDeleting: true
  }),
  [DELETE_EMPLOYEE_FAIL]: (state, action) => ({
    ...state,
    isDeleting: false,
    error: action.error
  }),
  [DELETE_EMPLOYEE_FETCING]: (state, action) => ({
    ...state,
    isDeleting: false,
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isDeleting: false
};

export default function deleteEmployeeRemoteReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
