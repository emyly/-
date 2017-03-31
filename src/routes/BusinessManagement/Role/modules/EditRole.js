/**
 * Created by sjf on 2016/11/28.
 */
export const EDIT_ROLE_LIST = 'EDIT_ROLE_LIST';
export const EDIT_ROLE_LIST_SUCCESS = 'EDIT_ROLE_LIST_SUCCESS';
export const EDIT_ROLE_LIST_FAIL = 'EDIT_ROLE_LIST_FAIL';
export const EDIT_ROLE_LIST_FETCHING = 'EDIT_ROLE_LIST_FETCHING';
export const EDIT_ROLE_NAME = 'EDIT_ROLE_NAME';
export const EDIT_ROLE_NAME_SUCCESS = 'EDIT_ROLE_NAME_SUCCESS';
export const EDIT_ROLE_NAME_FAIL = 'EDIT_ROLE_NAME_FAIL';

// ------------------------------------
// Action
// ------------------------------------
export function editRoleList(jsId, Id) {
  return {
    type: EDIT_ROLE_LIST,
    payload: {
      jsId,
      Id
    }
  }
}
export function editRoleListDataSuccess(editRoleListData) {
  return {
    type: EDIT_ROLE_LIST_SUCCESS,
    editRoleListData
  }
}

export function editRoleListDataFail(error) {
  return {
    type: EDIT_ROLE_LIST_FAIL,
    error
  }
}
export function editRoleName(id, jsmc) {
  return {
    type: EDIT_ROLE_NAME,
    payload: {
      id, jsmc
    }
  }
}
export function editRoleNameSuccess(editRoleName) {
  return {
    type: EDIT_ROLE_NAME_SUCCESS,
    editRoleName
  }
}

export function editRoleNameFail(error) {
  return {
    type: EDIT_ROLE_NAME_FAIL,
    error
  }
}
export function editRoleListFetching() {
  return {
    type: EDIT_ROLE_LIST_FETCHING
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [EDIT_ROLE_LIST]: (state, action) => ({
    ...state,
    isFetching: false,

  }),
  [EDIT_ROLE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: true,
    editRoleListData: action.editRoleListData
  }),

  [EDIT_ROLE_LIST_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error
  }),
  [EDIT_ROLE_LIST_FETCHING]: (state, action) => ({
    ...state,
    isFetching: false,
  }),
  [EDIT_ROLE_NAME]: (state, action) => ({
    ...state,
  }),
  [EDIT_ROLE_NAME_SUCCESS]: (state, action) => ({
    ...state,
  }),
  [EDIT_ROLE_NAME_FAIL]: (state, action) => ({
    ...state,
    error: action.error
  }),
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  editRoleListData: []
};

export default function editRoleListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}

