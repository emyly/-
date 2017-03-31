/**
 * surgeryOrderReturnList
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
export const FETCH_SINGLE_RECEIVING_ORDER_DETAIL = 'FETCH_SINGLE_RECEIVING_ORDER_DETAIL'
export const FETCH_SINGLE_RECEIVING_ORDER_DETAIL_SUCCESS = 'FETCH_SINGLE_RECEIVING_ORDER_DETAIL_SUCCESS'
export const FETCH_SINGLE_RECEIVING_ORDER_DETAIL_FAIL = 'FETCH_SINGLE_RECEIVING_ORDER_DETAIL_FAIL'

export function fetchSingleReceivingOrderDetail(orderId, logisticsOrderId) {
  return {
    type: FETCH_SINGLE_RECEIVING_ORDER_DETAIL,
    params: {
      DDID: orderId,
      CRKDID: logisticsOrderId
    }
  }
}

export function fetchSingleReceivingOrderDetailSuccess(result) {
  return {
    type: FETCH_SINGLE_RECEIVING_ORDER_DETAIL_SUCCESS,
    result
  }
}

export function fetchSingleReceivingOrderDetailFail(error) {
  return {
    type: FETCH_SINGLE_RECEIVING_ORDER_DETAIL_FAIL,
    error
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SINGLE_RECEIVING_ORDER_DETAIL]: (state, action) => ({
    ...state,
    isFetching: true
  }),

  [FETCH_SINGLE_RECEIVING_ORDER_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    detailList: action.result.CRKMXB,
    error: null
  }),

  [FETCH_SINGLE_RECEIVING_ORDER_DETAIL_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    detailList: [],
    error: action.error
  })
}

const initialState = {
  isFetching: false,
  detailList: []
}

export default function singleReceivingOrderDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
