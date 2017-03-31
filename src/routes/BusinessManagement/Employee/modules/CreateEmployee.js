// ------------------------------------
// Action Types
// ------------------------------------
export const CREATE_EMPLOYEE = 'BusinessManagement/Employee/CREATE_EMPLOYEE';
export const CREATE_EMPLOYEE_SUCCESS = 'BusinessManagement/Employee/CREATE_EMPLOYEE_SUCCESS';
export const CREATE_EMPLOYEE_FAIL = 'BusinessManagement/Employee/CREATE_EMPLOYEE_FAIL';
export const CREATE_EMPLOYEE_FETCHING = 'BusinessManagement/Employee/CREATE_EMPLOYEE_FETCHING';

// ------------------------------------
// Action
// ------------------------------------
export function createEmployeeRemote(YHB) {
  return {
    type: CREATE_EMPLOYEE,
    YHB
  }
}

export function createEmployeeRemoteSuccess() {
  return {
    type: CREATE_EMPLOYEE_SUCCESS
  }
}

export function createEmployeeRemoteFail(error) {
  return {
    type: CREATE_EMPLOYEE_FAIL,
    error
  }
}
export function createEmployeeFetching() {
  return {
    type: CREATE_EMPLOYEE_FETCHING,
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREATE_EMPLOYEE]: (state, action) => ({
    ...state,
    isCreating: false
  }),
  [CREATE_EMPLOYEE_SUCCESS]: (state, action) => ({
    ...state,
    isCreating: true,
  }),
  [CREATE_EMPLOYEE_FAIL]: (state, action) => ({
    ...state,
    isCreating: false,
    error: action.error,
  }),
  [CREATE_EMPLOYEE_FETCHING]: (state, action) => ({
    isCreating: false,
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isCreating: false,
  error: '',
};

export default function createEmployeeRemoteReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
