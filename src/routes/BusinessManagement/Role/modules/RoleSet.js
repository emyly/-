/**
 * Created by SJF on 2016/11/25.
 */
/**
 * Created by sjf on 2016/11/18.
 */
export const ROLE_SET = 'ROLE_SET';
export const ROLE_SET_SUCCESS = 'ROLE_SET_SUCCESS';
export const ROLE_SET_FAIL = 'ROLE_SET_FAIL';

// ------------------------------------
// Action
// ------------------------------------
export function roleSet(Id, type, orId, page) {
  return {
    type: ROLE_SET,
    payload: {
      Id,
      type,
      orId,
      page
    }
  }
}
export function roleSetDataSuccess(roleSetData) {
  return {
    type: ROLE_SET_SUCCESS,
    roleSetData
  }
}

export function roleSetDataFail(error) {
  return {
    type: ROLE_SET_FAIL,
    error
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ROLE_SET]: (state, action) => ({
    ...state,
    isFetching: false,

  }),

  [ROLE_SET_SUCCESS]: (state, action) =>
    // getRoleData(action.roleSetData.orId, 'E',action.roleSetData.page);
     ({
       ...state,
       isFetching: true,
     }),

  [ROLE_SET_FAIL]: (state, action) => ({
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
  roleSetData: []
};

export default function roleSetReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
