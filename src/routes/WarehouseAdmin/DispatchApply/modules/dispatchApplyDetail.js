// ------------------------------------
// Constants
// ------------------------------------
export const GET_DISPATCH_APPLY_Detail = 'GET_DISPATCH_APPLY_Detail'
export const GET_DISPATCH_APPLY_Detail_SUCCESS = 'GET_DISPATCH_APPLY_Detail_SUCCESS'
export const GET_DISPATCH_APPLY_Detail_ERROR = 'GET_DISPATCH_APPLY_Detail_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function getDispatchApplyDetail(id) {
  return {
    type: GET_DISPATCH_APPLY_Detail,
    payload: { id }
  }
}

export const actions = {
  getDispatchApplyDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_DISPATCH_APPLY_Detail]: (state, action) => state,
  [GET_DISPATCH_APPLY_Detail_SUCCESS]: (state, action) => Object.assign({}, state.data, {
    dataSource: action.response.productionList,
    orderDetail: action.response.orderDetail
  }),
  [GET_DISPATCH_APPLY_Detail_ERROR]: (state, action) => state,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  dataSource: [],
  orderDetail: {}
}

export default function dispatchApplyDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
