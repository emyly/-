// ------------------------------------
// Constants
// ------------------------------------
export const POST_ORDER_CHECK_AGREE = 'POST_ORDER_CHECK_AGREE'
export const POST_ORDER_CHECK_AGREE_SUCCESS = 'POST_ORDER_CHECK_AGREE_SUCCESS'
export const POST_ORDER_CHECK_AGREE_ERROR = 'ERROR'
export const INIT_STORE = 'order_check_success_INIT_STORE'

// ------------------------------------
// Actions
// ------------------------------------
export function postOrderCheckAgree(orderId, CKCK, TZNR, BTZR) {
  return {
    type: POST_ORDER_CHECK_AGREE,
    payload: {
      orderId,
      SHZT: '1',
      CKCK,
      TZNR,
      BTZR
    }
  }
}

export function initStore() {
  return {
    type: INIT_STORE
  }
}

export const actions = {
  postOrderCheckAgree,
  initStore
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_ORDER_CHECK_AGREE]: (state, action) => state,
  [POST_ORDER_CHECK_AGREE_SUCCESS]: (state, action) => Object.assign({}, state, {
    Code: action.response.Code
  }),
  [INIT_STORE]: (state, action) => Object.assign({}, state, {
    Code: -1
  }),
  [POST_ORDER_CHECK_AGREE_ERROR]: (state, action) => Object.assign({}, state, {
    Code: -1
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  Code: -1
}

export default function successRaisedButtonReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
