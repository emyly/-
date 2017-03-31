// ------------------------------------
// Constants
// ------------------------------------
export const POST_ORDER_CHECK_BACK = 'POST_ORDER_CHECK_BACK'
export const POST_ORDER_CHECK_BACK_SUCCESS = 'POST_ORDER_CHECK_BACK_SUCCESS'
export const POST_ORDER_CHECK_BACK_ERROR = 'ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function postOrderCheckBack(orderId, SHYJ) {
  return {
    type: POST_ORDER_CHECK_BACK,
    payload: {
      orderId,
      SHZT: '2',
      SHYJ,
      TZNR: '',
      BTZR: []
    }
  }
}

export const actions = {
  postOrderCheckBack
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_ORDER_CHECK_BACK]: (state, action) => state,
  [POST_ORDER_CHECK_BACK_SUCCESS]: (state, action) => Object.assign({}, state, {
    Code: action.response.Code
  }),
  [POST_ORDER_CHECK_BACK_ERROR]: (state, action) => Object.assign({}, state, {
    Code: -1
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  Code: -1
}

export default function backRaisedButtonReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
