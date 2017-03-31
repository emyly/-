/**
 * Created by sjf on 2016/11/21.
 */
export const ROLE_LIST = 'ROLE_LIST';
export const ROLE_LIST_SUCCESS = 'ROLE_LIST_SUCCESS';
export const ROLE_LIST_FAIL = 'ROLE_LIST_FAIL';
// ------------------------------------
// Action
// ------------------------------------
export function RoleList(id) {
  return {
    type: ROLE_LIST,
    id
  }
}
export function RoleListSuccess(Permissions) {
  return {
    type: ROLE_LIST_SUCCESS,
    Permissions
  }
}

export function RoleListFail(error) {
  return {
    type: ROLE_LIST_FAIL,
    error
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ROLE_LIST]: (state, action) => ({
    ...state,
    isFetching: false,

  }),
  [ROLE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: true,
    AllPermissions: action.Permissions.AllPermissions,
    SelectPermissions: action.Permissions.SelectPermissions
  }),

  [ROLE_LIST_FAIL]: (state, action) => ({
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
  roleListData: []
};

export default function creatListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
