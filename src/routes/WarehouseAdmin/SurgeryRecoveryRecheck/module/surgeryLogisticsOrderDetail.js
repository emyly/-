/**
 * surgeryLogisticsOrderDetail
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
// import Constant from 'lib/constant'

export const FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST = 'FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST'
export const FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST_SUCCESS = 'FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST_SUCCESS'
export const FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST_FAIL = 'FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST_FAIL'

export function fetchSurgeryLogisticsOrderDetailList(orderId, logisticsIds) {
  return {
    type: FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST,
    params: {
      DDID: orderId,
      CRKDID: logisticsIds,
    }
  }
}

export function fetchSurgeryLogisticsOrderDetailListSuccess(detailArray) {
  return {
    type: FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST_SUCCESS,
    detailArray
  }
}

export function fetchSurgeryLogisticsOrderDetailListFail(error) {
  return {
    type: FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST_FAIL,
    error
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST]: (state, action) => ({
    ...state,
    isFetching: true
  }),

  [FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    detailArray: action.detailArray,
    error: null
  }),

  [FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error
  })
}

const initialState = {
  isFetching: false,
  detailArray: []
}

export default function SurgeryLogisticsOrderDetailListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
