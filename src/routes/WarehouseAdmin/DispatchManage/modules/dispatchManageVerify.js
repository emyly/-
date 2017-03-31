// ------------------------------------
// Constants
// ------------------------------------
export const POST_DISPATCH_MANAGE_VERIFY = 'POST_DISPATCH_MANAGE_VERIFY'
export const POST_DISPATCH_MANAGE_VERIFY_SUCCESS = 'POST_DISPATCH_MANAGE_VERIFY_SUCCESS'
export const POST_DISPATCH_MANAGE_VERIFY_ERROR = 'POST_DISPATCH_MANAGE_VERIFY_ERROR'
export const GET_ORDER_DETAIL = 'DISPATCH_MANAGE_Verify/GET_ORDER_DETAIL'
export const GET_ORDER_DETAIL_SUCCESS = 'DISPATCH_MANAGE_Verify/GET_ORDER_DETAIL_SUCCESS'
export const GET_ORDER_DETAIL_ERROR = 'DISPATCH_MANAGE_Verify/GET_ORDER_DETAIL_ERROR'
export const INIT_STORE = 'DISPATCH_MANAGE_Verify/INIT_STORE'
// ------------------------------------
// Actions
// ------------------------------------
export function postDispatchManageVerify(orderId, SHZT, TZNR, BTZR, CKCK) {
  return {
    type: POST_DISPATCH_MANAGE_VERIFY,
    payload: {
      orderId,
      SHZT,
      TZNR,
      BTZR,
      CKCK
    }
  }
}

export function getOrderDetail(id) {
  return {
    type: GET_ORDER_DETAIL,
    payload: { id }
  }
}

export function initStore() {
  return {
    type: INIT_STORE
  }
}

export const actions = {
  postDispatchManageVerify,
  getOrderDetail,
  initStore
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POST_DISPATCH_MANAGE_VERIFY]: (state, action) => state,
  [POST_DISPATCH_MANAGE_VERIFY_SUCCESS]: (state, action) => Object.assign({}, state, {
    Code: action.response.Code
  }),
  [POST_DISPATCH_MANAGE_VERIFY_ERROR]: (state, action) => state,
  [INIT_STORE]: (state, action) => Object.assign({}, state, {
    Code: -1
  }),
  [GET_ORDER_DETAIL_SUCCESS]: (state, action) => Object.assign({}, state, {
    dataSource: action.response.productionList,
    orderDetail: action.response.orderDetail
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  Code: -1,
  orderDetail: {},
  dataSource: []
}

export default function dispatchManageVerifyReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
