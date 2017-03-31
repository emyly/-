// ------------------------------------
// Constants
// ------------------------------------
export const POST_OUTWARE_CHECK_DATA = 'POST_OUTWARE_CHECK_DATA'
export const POST_OUTWARE_CHECK_SUCCESS = 'POST_OUTWARE_CHECK_SUCCESS'
export const POST_OUTWARE_CHECK_ERROR = 'POST_OUTWARE_CHECK_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function postOutWarehouseCheck(params) {
  return {
    type: POST_OUTWARE_CHECK_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  postOutWarehouseCheck
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_OUTWARE_CHECK_DATA]: (state, action) => state,
  [POST_OUTWARE_CHECK_SUCCESS]: (state, action) => Object.assign({}, state, {
    Result: action.response
  }),
  [POST_OUTWARE_CHECK_ERROR]: (state, action) => state,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  Result: {}
}

export default function outWarehouseCheckReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
