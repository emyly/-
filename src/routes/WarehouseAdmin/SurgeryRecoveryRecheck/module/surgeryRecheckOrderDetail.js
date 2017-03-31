/**
 * surgeryRecheckOrderDetail
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */

import _ from 'lodash'

export const FETCH_SURGERY_RECHECK_ORDER_DETAIL = 'FETCH_SURGERY_RECHECK_ORDER_DETAIL'
export const FETCH_SURGERY_RECHECK_ORDER_DETAIL_SUCCESS = 'FETCH_SURGERY_RECHECK_ORDER_DETAIL_SUCCESS'
export const FETCH_SURGERY_RECHECK_ORDER_DETAIL_FAIL = 'FETCH_SURGERY_RECHECK_ORDER_DETAIL_FAIL'

export function fetchSurgeryRecheckOrderDetail(currentOrderId, returnOrderIds) {
  if (_.isNull(returnOrderIds)) {
    return {
      type: FETCH_SURGERY_RECHECK_ORDER_DETAIL_FAIL,
      error: 'Clear previous value'
    }
  }
  return {
    type: FETCH_SURGERY_RECHECK_ORDER_DETAIL,
    params: {
      DDID: currentOrderId,
      CRKID: returnOrderIds
    }
  }
}

export function fetchSurgeryRecheckOrderDetailSuccess(result) {
  return {
    type: FETCH_SURGERY_RECHECK_ORDER_DETAIL_SUCCESS,
    result
  }
}

export function fetchSurgeryRecheckOrderDetailFail(error) {
  return {
    type: FETCH_SURGERY_RECHECK_ORDER_DETAIL_FAIL,
    error
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SURGERY_RECHECK_ORDER_DETAIL]: (state, action) => ({
    ...state,
    isFetching: true
  }),

  [FETCH_SURGERY_RECHECK_ORDER_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    result: action.result.Result.CRKMXB || [],
    error: null
  }),

  [FETCH_SURGERY_RECHECK_ORDER_DETAIL_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    result: [],
    error: action.error
  })
}

const initialState = {
  result: [],
  isFetching: false,
}

export default function surgeryRecheckOrderDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
