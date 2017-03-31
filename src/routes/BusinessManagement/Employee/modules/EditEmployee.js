// ------------------------------------
// Action Types
// ------------------------------------
export const EDIT_EMPLOYEE_INFO = 'BusinessManagement/Employee/EDIT_EMPLOYEE_INFO';
export const EDIT_EMPLOYEE_INFO_SUCCESS = 'BusinessManagement/Employee/EDIT_EMPLOYEE_INFO_SUCCESS';
export const EDIT_EMPLOYEE_INFO_FAIL = 'BusinessManagement/Employee/EDIT_EMPLOYEE_INFO_FAIL';
export const EDIT_EMPLOYEE_INFO_FETCHING = 'BusinessManagement/Employee/EDIT_EMPLOYEE_INFO_FETCHING';

// ------------------------------------
// Action
// ------------------------------------
export function editEmployeeInfo(id, YHB) {
  return {
    type: EDIT_EMPLOYEE_INFO,
    payload: {
      id,
      YHB
    }

  }
}

export function editEmployeeInfoSuccess() {
  return {
    type: EDIT_EMPLOYEE_INFO_SUCCESS
  }
}

export function editEmployeeInfoFail() {
  return {
    type: EDIT_EMPLOYEE_INFO_FAIL
  }
}
export function editEmployeeInfoFetching() {
  return {
    type: EDIT_EMPLOYEE_INFO_FETCHING
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_EMPLOYEE_INFO]: (state, action) => ({
    ...state,
    isEditing: false
  }),
  [EDIT_EMPLOYEE_INFO_SUCCESS]: (state, action) => ({
    ...state,
    isEditing: true
  }),
  [EDIT_EMPLOYEE_INFO_FAIL]: (state, action) => ({
    ...state,
    isEditing: false
  }),
  [EDIT_EMPLOYEE_INFO_FETCHING]: (state, action) => ({
    ...state,
    isEditing: false
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isEditing: false
};

export default function editEmployeeInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
