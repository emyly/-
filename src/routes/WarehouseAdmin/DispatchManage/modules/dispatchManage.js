// ------------------------------------
// Constants
// ------------------------------------
export const GET_DISPATCH_MANAGE_LIST = 'GET_DISPATCH_MANAGE_LIST'
export const GET_DISPATCH_MANAGE_LIST_SUCCESS = 'GET_DISPATCH_MANAGE_LIST_SUCCESS'
export const GET_DISPATCH_MANAGE_LIST_ERROR = 'GET_DISPATCH_MANAGE_LIST_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function getDispatchManageList(CJJXSID, DDZT, Page) {
  return {
    type: GET_DISPATCH_MANAGE_LIST,
    payload: { CJJXSID, DDZT, Page }
  }
}

export const actions = {
  getDispatchManageList
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DISPATCH_MANAGE_LIST]: (state, action) => state,
  [GET_DISPATCH_MANAGE_LIST_SUCCESS]: (state, action) => Object.assign({}, state, {
    Result: action.response
  }),
  [GET_DISPATCH_MANAGE_LIST_ERROR]: (state, action) => state,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  Result: {}
}

export default function dispatchManageReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
