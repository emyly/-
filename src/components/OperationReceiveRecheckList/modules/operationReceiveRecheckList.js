/**
 * Created by chenming on 2016/11/3.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_OPERATIONRECEIVERECHECKLIST_DATA = 'GET_OPERATIONRECEIVERECHECKLIST_DATA'
export const GET_OPERATIONRECEIVERECHECKLIST_DATA_SUCCESS = 'GET_OPERATIONRECEIVERECHECKLIST_DATA_SUCCESS'
export const GET_OPERATIONRECEIVERECHECKLIST_DATA_FAIL = 'GET_OPERATIONRECEIVERECHECKLIST_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getOperationReceiveRecheckData(params) {
  return {
    type: GET_OPERATIONRECEIVERECHECKLIST_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getOperationReceiveRecheckData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_OPERATIONRECEIVERECHECKLIST_DATA]: (state, action) => state,
  [GET_OPERATIONRECEIVERECHECKLIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    operationReceiveRecheckData: action.response,
    currentPage: action.currentPage
  }),
  [GET_OPERATIONRECEIVERECHECKLIST_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  operationReceiveRecheckData: {},
  currentPage: 1
}

export default function operationReceiveRecheckReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

