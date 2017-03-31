/**
 * Created by sjf on 2016/11/18.
 */
export const CREAT_ROLE_LIST = 'CREAT_ROLE_LIST';
export const CREAT_ROLE_LIST_SUCCESS = 'CREAT_ROLE_LIST_SUCCESS';
export const CREAT_ROLE_LIST_FAIL = 'CREAT_ROLE_LIST_FAIL';
export const CREAT_ROLE_LIST_FETCHING = 'CREAT_ROLE_LIST_FETCHING';

// ------------------------------------
// Action
// ------------------------------------
export function creatRoleList(name, Id) {
  return {
    type: CREAT_ROLE_LIST,
    payload: {
      name,
      Id
    }
  }
}
export function creatRoleListDataSuccess(creatRoleListData) {
  return {
    type: CREAT_ROLE_LIST_SUCCESS,
    creatRoleListData
  }
}

export function creatRoleListDataFail(error) {
  return {
    type: CREAT_ROLE_LIST_FAIL,
    error
  }
}

export function creatRoleListFetching() {
  return {
    type: CREAT_ROLE_LIST_FETCHING
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREAT_ROLE_LIST]: (state, action) => ({
    ...state,
    isFetching: false,

  }),

  [CREAT_ROLE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: true,
    creatRoleListData: action.creatRoleListData
  }),

  [CREAT_ROLE_LIST_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error
  }),
  [CREAT_ROLE_LIST_FETCHING]: (state, action) => ({
    ...state,
    isFetching: false,
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  creatRoleListData: []
};

export default function creatRoleListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
