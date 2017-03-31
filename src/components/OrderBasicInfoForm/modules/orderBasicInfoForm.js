// ------------------------------------
// Constants
// ------------------------------------
export const GET_ORDERDETAIL_DATA = 'GET_ORDERDETAIL_DATA'
export const GET_ORDERDETAIL_DATA_SUCCESS = 'GET_ORDERDETAIL_DATA_SUCCESS'
export const GET_ORDERDETAIL_DATA_FAIL = 'GET_ORDERDETAIL_DATA_FAIL'
export const GET_TURN_ORDERDETAIL_DATA = 'GET_TURN_ORDERDETAIL_DATA'
export const GET_TURN_ORDERDETAIL_DATA_SUCCESS = 'GET_TURN_ORDERDETAIL_DATA_SUCCESS'
export const GET_TURN_ORDERDETAIL_DATA_FAIL = 'GET_TURN_ORDERDETAIL_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getOrderDetail(id) {
  console.debug('orderBasicInfoForm.js getOrderDetail');
  return {
    type: GET_ORDERDETAIL_DATA,
    payload: {
      id
    }
  }
}

export function getTurnOrderDetail(id) {
  return {
    type: GET_TURN_ORDERDETAIL_DATA,
    payload: {
      id
    }
  }
}

export const actions = {
  getOrderDetail,
  getTurnOrderDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ORDERDETAIL_DATA]: (state, action) => { console.log('orderBasicInfoForm.js GET_ORDERDETAIL_DATA:', state, action); return state },
  [GET_ORDERDETAIL_DATA_SUCCESS]: (state, action) => {
    console.debug('orderBasicInfoForm.js GET_ORDERDETAIL_DATA_SUCCESS:', state, action);
    return Object.assign({}, state, {
      status: true,
      orderData: action.response
    })
  },
  [GET_ORDERDETAIL_DATA_FAIL]: (state, action) => {
    console.debug('orderBasicInfoForm.js GET_ORDERDETAIL_DATA_FAIL:', state, action);
    return Object.assign({}, state, {
      status: false,
      error: action.response
    })
  },
  [GET_TURN_ORDERDETAIL_DATA_SUCCESS]: (state, action) => {
    console.debug('orderBasicInfoForm.js GET_ORDERDETAIL_DATA_SUCCESS:', state, action);
    return Object.assign({}, state, {
      turnOrderData: action.response
    })
  },
  [GET_TURN_ORDERDETAIL_DATA_FAIL]: (state, action) => {
    console.debug('orderBasicInfoForm.js GET_ORDERDETAIL_DATA_FAIL:', state, action);
    return Object.assign({}, state, {
      error: action.response
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orderData: {},
  turnOrderData: {}
}

export default function orderBasicInfoFormReducer(state = initialState, action) {
  console.debug('orderBasicInfoForm.js orderBasicInfoFormReducer;', action);
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
