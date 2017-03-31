// ------------------------------------
// Constants
// ------------------------------------
export const POST_DISPATCH_MANAGE = 'POST_DISPATCH_MANAGE'
export const POST_DISPATCH_MANAGE_SUCCESS = 'POST_DISPATCH_MANAGE_SUCCESS'
export const POST_DISPATCH_MANAGE_ERROR = 'POST_DISPATCH_MANAGE_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function postDispatchManage(RKCKID, CKCKID, BTZR, SP, productionList, DHRQ) {
  return {
    type: POST_DISPATCH_MANAGE,
    payload: { RKCKID, CKCKID, BTZR, SP, productionList, DHRQ }
  }
}

export const actions = {
  postDispatchManage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_DISPATCH_MANAGE]: (state, action) => state,
  [POST_DISPATCH_MANAGE_SUCCESS]: (state, action) => Object.assign({}, state, {
    Code: action.response.Code
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  Code: -1
}

export default function dispatchManageAlertReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
