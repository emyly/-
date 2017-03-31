// ------------------------------------
// Action Types
// ------------------------------------
export const ROLE_EDIT_INFO = 'ROLE_EDIT_INFO';
export const ROLE_EDIT_INFO_SUCCESS = 'ROLE_EDIT_INFO_SUCCESS';
export const ROLE_EDIT_INFO_FAIL = 'ROLE_EDIT_INFO_FAIL';
export const ROLE_EDIT_INFO_FETCHING = 'ROLE_EDIT_INFO_FETCHING';

// ------------------------------------
// Action
// ------------------------------------
export function roleEditInfo(yhId, jsId) {
  return {
    type: ROLE_EDIT_INFO,
    payload: {
      yhId,
      jsId
    }

  }
}

export function roleEditInfoSuccess() {
  return {
    type: ROLE_EDIT_INFO_SUCCESS
  }
}

export function roleEditInfoFail(error) {
  return {
    type: ROLE_EDIT_INFO_FAIL,
    error

  }
}
export function employeeRoleEditFetching() {
  return {
    type: ROLE_EDIT_INFO_FETCHING
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ROLE_EDIT_INFO]: (state, action) => ({
    ...state,
    isEditing: false
  }),
  [ROLE_EDIT_INFO_SUCCESS]: (state, action) => ({
    ...state,
    isEditing: true
  }),
  [ROLE_EDIT_INFO_FAIL]: (state, action) => ({
    ...state,
    error: action.error,
    isEditing: false
  }),
  [ROLE_EDIT_INFO_FETCHING]: (state, action) => ({
    ...state,
    isEditing: false
  }),

};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isEditing: false
};

export default function roleEditInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
