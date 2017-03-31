export const FETCH_ORDER_LOGISTICS_INFO = 'FETCH_ORDER_LOGISTICS_INFO'
export const FETCH_ORDER_LOGISTICS_INFO_SUCCESS = 'FETCH_ORDER_LOGISTICS_INFO_SUCCESS'
export const FETCH_ORDER_LOGISTICS_INFO_FAIL = 'FETCH_ORDER_LOGISTICS_INFO_FAIL'

export function fetchOrderLogisticsInfo(guid) {
  return {
    type: FETCH_ORDER_LOGISTICS_INFO,
    guid
  }
}

export function fetchOrderLogisticsInfoSuccess(result) {
  return {
    type: FETCH_ORDER_LOGISTICS_INFO_SUCCESS,
    response: result
  }
}

export function fetchOrderLogisticsInfoFail(error) {
  return {
    type: FETCH_ORDER_LOGISTICS_INFO_FAIL,
    error
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ORDER_LOGISTICS_INFO_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    data: action.response
  }),
  [FETCH_ORDER_LOGISTICS_INFO_FAIL]: (state, action) => ({
    status: false,
    error: action.error,
    data: []
  })
}

const initialState = {
  data: []
}

export default function orderLogisticsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
