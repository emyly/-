/**
 * Created by chenming on 2016/11/3.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_OPERATIONRECEIVELIST_DATA = 'GET_OPERATIONRECEIVELIST_DATA'
export const GET_OPERATIONRECEIVELIST_DATA_SUCCESS = 'GET_OPERATIONRECEIVELIST_DATA_SUCCESS'
export const GET_OPERATIONRECEIVELIST_DATA_FAIL = 'GET_OPERATIONRECEIVELIST_DATA_FAIL'
// ------------------------------------
// Actions
// ------------------------------------
export function getOperationReceiveData(params) {
  return {
    type: GET_OPERATIONRECEIVELIST_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getOperationReceiveData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_OPERATIONRECEIVELIST_DATA]: (state, action) => state,
  [GET_OPERATIONRECEIVELIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    operationReceiveData: action.response,
    currentPage: action.currentPage
  }),
  [GET_OPERATIONRECEIVELIST_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  operationReceiveData: [],
  currentPage: 1
}

export default function operationReceiveReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

