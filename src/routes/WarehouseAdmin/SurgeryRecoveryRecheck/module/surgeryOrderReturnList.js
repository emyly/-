/**
 * surgeryOrderReturnList
 *
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */

import Constant from 'lib/constant'

export const FETCH_SURGERY_ORDER_RETURN_LIST = 'FETCH_SURGERY_ORDER_RETURN_LIST'
export const FETCH_SURGERY_ORDER_RETURN_LIST_SUCCESS = 'FETCH_SURGERY_ORDER_RETURN_LIST_SUCCESS'
export const FETCH_SURGERY_ORDER_RETURN_LIST_FAIL = 'FETCH_SURGERY_ORDER_RETURN_LIST_FAIL'

export function fetchSurgeryOrderReturnList(orderId) {
  return {
    type: FETCH_SURGERY_ORDER_RETURN_LIST,
    orderId,
    payload: Constant.SAAS.CRK.ENTER_STOCK,
  }
}

export function fetchSurgeryOrderReturnListSuccess(receivingList) {
  return {
    type: FETCH_SURGERY_ORDER_RETURN_LIST_SUCCESS,
    receivingList
  }
}

export function fetchSurgeryOrderReturnListFail(error) {
  return {
    type: FETCH_SURGERY_ORDER_RETURN_LIST_FAIL,
    error
  }
}

// ------------------------------------
// Reducer functions
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SURGERY_ORDER_RETURN_LIST]: (state, action) => ({
    ...state,
    isFetching: true
  }),

  [FETCH_SURGERY_ORDER_RETURN_LIST_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    receivingList: action.receivingList,
    error: null
  }),

  [FETCH_SURGERY_ORDER_RETURN_LIST_FAIL]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error
  })
}

const initialState = {
  isFetching: false,
  receivingList: []
}

export default function surgeryOrderReturnListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
