// ------------------------------------
// Action Types
// ------------------------------------
export const FETCH_EMPLOYEE_LIST = 'BusinessManagement/Employee/FETCH_EMPLOYEE_LIST';
export const FETCH_EMPLOYEE_LIST_SUCCESS = 'BusinessManagement/Employee/FETCH_EMPLOYEE_LIST_SUCCESS';
export const FETCH_EMPLOYEE_LIST_FAIL = 'BusinessManagement/Employee/FETCH_EMPLOYEE_LIST_FAIL';

// ------------------------------------
// Action
// ------------------------------------
export function fetchEmployeeList(orgId, page) {
  return {
    type: FETCH_EMPLOYEE_LIST,
    payload: {
      orgId,
      page
    }

  }
}

export function fetchEmployeeListSuccess(employeeList) {
  return {
    type: FETCH_EMPLOYEE_LIST_SUCCESS,
    employeeList
  }
}

export function fetchEmployeeListFail(error) {
  return {
    type: FETCH_EMPLOYEE_LIST_FAIL,
    error
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_EMPLOYEE_LIST]: (state, action) => ({
    ...state,
    isFetching: true,
    orgId: action.orgId
  }),

  [FETCH_EMPLOYEE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    employeeList: action.employeeList,
    currentPage: action.employeeList.currentPage
  }),

  [FETCH_EMPLOYEE_LIST_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  employeeList: {
    result: {
      Result: {
        YHB: []
      }
    }
  }
};

export default function employeeListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
