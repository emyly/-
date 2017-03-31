// ------------------------------------
// Constants
// ------------------------------------
export const GET_OPORDERDETAIL_DATA = 'GET_OPORDERDETAIL_DATA'
export const GET_OPORDERDETAIL_DATA_SUCCESS = 'GET_OPORDERDETAIL_DATA_SUCCESS'
export const GET_OPORDERDETAIL_DATA_FAIL = 'GET_OPORDERDETAIL_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getOrderDetail(id) {
  console.log('GET_OPORDERDETAIL_DATA');
  return {
    type: GET_OPORDERDETAIL_DATA,
    payload: {
      id
    }
  }
}

export const actions = {
  getOrderDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_OPORDERDETAIL_DATA]: (state, action) => state,
  [GET_OPORDERDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    orderData: action.response
  }),
  [GET_OPORDERDETAIL_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orderData: {}
}

export default function operationPersonnelInfoFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
