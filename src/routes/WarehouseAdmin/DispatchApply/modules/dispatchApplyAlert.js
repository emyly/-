// ------------------------------------
// Constants
// ------------------------------------
export const POST_DISPATCH_APPLY = 'POST_DISPATCH_APPLY'
export const POST_DISPATCH_APPLY_SUCCESS = 'POST_DISPATCH_APPLY_SUCCESS'
export const POST_DISPATCH_APPLY_ERROR = 'POST_DISPATCH_APPLY_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function postDispatchApply(RKCKID, DHRQ, TZNR, BTZR, productionList) {
  return {
    type: POST_DISPATCH_APPLY,
    payload: { RKCKID, DHRQ, TZNR, BTZR, productionList }
  }
}

export const initStore = () => (dispatch, getState) => {
  	dispatch({ type: POST_DISPATCH_APPLY_ERROR })
}

export const actions = {
  postDispatchApply,
  initStore
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_DISPATCH_APPLY]: (state, action) => state,
  [POST_DISPATCH_APPLY_SUCCESS]: (state, action) => Object.assign({}, state.data, {
    Code: action.response.Code
  }),
  [POST_DISPATCH_APPLY_ERROR]: (state, action) => Object.assign({}, state, {
    Code: -1
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  Code: -1
}

export default function dispatchApplyAlertReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
