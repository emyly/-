// ------------------------------------
// Constants
// ------------------------------------
export const POST_LOGISTICS_DELIVERY_DATA = 'POST_LOGISTICS_DELIVERY_DATA'
export const POST_LOGISTICS_DELIVERY_SUCCESS = 'POST_LOGISTICS_DELIVERY_SUCCESS'
export const POST_LOGISTICS_DELIVERY_ERROR = 'POST_LOGISTICS_DELIVERY_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function postLogisticsDeliverySend(params) {
  return {
    type: POST_LOGISTICS_DELIVERY_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  postLogisticsDeliverySend
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_LOGISTICS_DELIVERY_DATA]: (state, action) => state,
  [POST_LOGISTICS_DELIVERY_SUCCESS]: (state, action) => Object.assign({}, state, {
    Result: action.response
  }),
  [POST_LOGISTICS_DELIVERY_ERROR]: (state, action) => Object.assign({}, state, {
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  Result: {},
  error: {}
}

export default function logisticsDeliverySendReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
