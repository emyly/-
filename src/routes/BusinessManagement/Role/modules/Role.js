/**
 * Created by sjf on 2016/11/5.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_ROLE_DATA = 'GET_ROLE_DATA';
export const GET_ROLE_DATA_SUCCESS = 'GET_ROLE_DATA_SUCCESS';
export const GET_ROLE_DATA_FAIL = 'GET_ROLE_DATA_FAIL';

// ------------------------------------
// Actions
// ------------------------------------
export function getRoleData(id, type, page) {
  return {
    type: GET_ROLE_DATA,
    payload: {
      id,
      type,
      page
    }
  }
}
export function getRoleDataSuccess(roleData) {
  return {
    type: GET_ROLE_DATA_SUCCESS,
    roleData
  }
}

export function getRoleDataFail() {
  return {
    type: GET_ROLE_DATA_FAIL
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ROLE_DATA]: (state, action) => Object.assign({}, state, {
    page: action.payload.page,
  }),
  [GET_ROLE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    roleData: action.roleData.result,
    currentPage: action.roleData.currentPage,
  }),
  [GET_ROLE_DATA_FAIL]: (state, action) => ({
    ...state,
    isEditing: false
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  roleData: {
    JSB: []
  },
  page: 1
};

export default function roleReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
