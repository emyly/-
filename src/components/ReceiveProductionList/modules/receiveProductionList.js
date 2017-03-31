/**
 * Created by chenming on 2016/11/3.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_RECEIVEPRODUCTIONLIST_DATA = 'GET_RECEIVEPRODUCTIONLIST_DATA'
export const GET_RECEIVEPRODUCTIONLIST_DATA_SUCCESS = 'GET_RECEIVEPRODUCTIONLIST_DATA_SUCCESS'
export const GET_RECEIVEPRODUCTIONLIST_DATA_FAIL = 'GET_RECEIVEPRODUCTIONLIST_DATA_FAIL'
// ------------------------------------
// Actions
// ------------------------------------
export function getReceiveProductionData(params) {
  return {
    type: GET_RECEIVEPRODUCTIONLIST_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getReceiveProductionData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_RECEIVEPRODUCTIONLIST_DATA]: (state, action) => state,
  [GET_RECEIVEPRODUCTIONLIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    receiveProductionData: action.response,
    currentPage: action.currentPage
  }),
  [GET_RECEIVEPRODUCTIONLIST_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  receiveProductionData: {},
  currentPage: 1
}

export default function receiveProductionReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

