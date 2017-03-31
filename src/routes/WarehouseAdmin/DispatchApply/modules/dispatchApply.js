// ------------------------------------
// Constants
// ------------------------------------
export const GET_DISPATCH_APPLY_LIST = 'GET_DISPATCH_APPLY_LIST'
export const GET_DISPATCH_APPLY_LIST_SUCCESS = 'GET_DISPATCH_APPLY_LIST_SUCCESS'
export const GET_DISPATCH_APPLY_LIST_ERROR = 'GET_DISPATCH_APPLY_LIST_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function getDispatchApplyList(CJR, DDZT, Page) {
  return {
    type: GET_DISPATCH_APPLY_LIST,
    payload: { CJR, DDZT, Page }
  }
}

export const actions = {
  getDispatchApplyList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DISPATCH_APPLY_LIST]: (state, action) => state,
  [GET_DISPATCH_APPLY_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    Result: action.response
  }),
  [GET_DISPATCH_APPLY_LIST_ERROR]: (state, action) => state,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  Result: {}
}

export default function dispatchApplyReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
