/**
 * Created by chenming on 2016/11/3.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_PRODUCTIONDELIVERLIST_DATA = 'GET_PRODUCTIONDELIVERLIST_DATA'
export const GET_PRODUCTIONDELIVERLIST_DATA_SUCCESS = 'GET_PRODUCTIONDELIVERLIST_DATA_SUCCESS'
export const GET_PRODUCTIONDELIVERLIST_DATA_FAIL = 'GET_PRODUCTIONDELIVERLIST_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getProductionDeliverData(params) {
  return {
    type: GET_PRODUCTIONDELIVERLIST_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getProductionDeliverData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_PRODUCTIONDELIVERLIST_DATA]: (state, action) => state,
  [GET_PRODUCTIONDELIVERLIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    productionDeliverData: action.response,
    currentPage: action.currentPage
  }),
  [GET_PRODUCTIONDELIVERLIST_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  productionDeliverData: [],
  currentPage: 1
}

export default function operationReceiveRecheckReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

