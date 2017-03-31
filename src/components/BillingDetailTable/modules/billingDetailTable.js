// ------------------------------------
// Constants
// ------------------------------------
export const GET_BILLINGEDDETAIL_DATA = 'GET_BILLINGEDDETAIL_DATA'
export const GET_BILLINGEDDETAIL_DATA_SUCCESS = 'GET_BILLINGEDDETAIL_DATA_SUCCESS'
export const GET_BILLINGEDDETAIL_DATA_FAIL = 'GET_BILLINGEDDETAIL_DATA_SUCCESS'
export const GET_UNBILLINGDETAIL_DATA = 'GET_UNBILLINGDETAIL_DATA'
export const GET_UNBILLINGDETAIL_DATA_SUCCESS = 'GET_UNBILLINGDETAIL_DATA_SUCCESS'
export const GET_UNBILLINGDETAIL_DATA_FAIL = 'GET_UNBILLINGDETAIL_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getBillingedDetail(id) {
  return {
    type: GET_BILLINGEDDETAIL_DATA,
    payload: {
      id
    }
  }
}

export function getUnbillingDetail(id) {
  return {
    type: GET_UNBILLINGDETAIL_DATA,
    payload: {
      id
    }
  }
}

export const actions = {
  getBillingedDetail,
  getUnbillingDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_BILLINGEDDETAIL_DATA]: (state, action) => state,
  [GET_BILLINGEDDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    billingData: action.response
  }),
  [GET_BILLINGEDDETAIL_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [GET_UNBILLINGDETAIL_DATA]: (state, action) => state,
  [GET_UNBILLINGDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    unBillingData: action.response
  }),
  [GET_UNBILLINGDETAIL_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  billingData: [],
  unBillingData: []
}

export default function billingDetailTableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
