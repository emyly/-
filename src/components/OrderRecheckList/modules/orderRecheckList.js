
/**
 * Created by chenming on 2016/11/3.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_ORDERRECHECKLIST_DATA = 'GET_ORDERRECHECKLIST_DATA'
export const GET_ORDERRECHECKLIST_DATA_SUCCESS = 'GET_ORDERRECHECKLIST_DATA_SUCCESS'
export const GET_ORDERRECHECKLIST_DATA_FAIL = 'GET_ORDERRECHECKLIST_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getOrderRecheckData(params) {
  return {
    type: GET_ORDERRECHECKLIST_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getOrderRecheckData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_ORDERRECHECKLIST_DATA]: (state, action) => state,
  [GET_ORDERRECHECKLIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    orderRecheckData: action.response,
    currentPage: action.currentPage
  }),
  [GET_ORDERRECHECKLIST_DATA_FAIL]: (state, action) =>
    Object.assign({}, state, {
      status: true,
      error: action.response
    })

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  orderRecheckData: []
}

export default function orderRechckListReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
