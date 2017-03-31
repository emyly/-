/**
 * Created by sjf on 2016/11/18.
 */
export const CREAT_SALE_LIST = 'CREAT_SALE_LIST';
export const CREAT_SALE_LIST_SUCCESS = 'CREAT_SALE_LIST_SUCCESS';
export const CREAT_SALE_LIST_FAIL = 'CREAT_SALE_LIST_FAIL';
export const CREAT_SALE_LIST_FETCHING = 'CREAT_SALE_LIST_FETCHING';
// ------------------------------------
// Action
// ------------------------------------
export function CreatList(orgId, orderId, type) {
  return {
    type: CREAT_SALE_LIST,
    payload: {
      orgId,
      orderId,
      type
    }
  }
}
export function CreatListSuccess(creatListData) {
  return {
    type: CREAT_SALE_LIST_SUCCESS,
    creatListData
  }
}

export function CreatListFail(error) {
  return {
    type: CREAT_SALE_LIST_FAIL,
    error
  }
}
export function CreatListChangeIsFetching() {
  return {
    type: CREAT_SALE_LIST_FETCHING
  }
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CREAT_SALE_LIST]: (state, action) => ({
    ...state,
    isFetching: false,

  }),

  [CREAT_SALE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: true,
    creatListData: action
  }),

  [CREAT_SALE_LIST_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error
  }),

  [CREAT_SALE_LIST_FETCHING]: (state, action) => ({
    ...state,
    isFetching: false,
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  creatListData: []
};

export default function creatListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
