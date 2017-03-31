/**
 * Created by chenming on 2016/11/2.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_LOGISTIC_DATA = 'GET_LOGISTIC_DATA'
export const GET_LOGISTIC_DATA_SUCCESS = 'GET_LOGISTIC_DATA_SUCCESS'
export const GET_LOGISTIC_DATA_ERROR = 'GET_LOGISTIC_DATA_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function getLogisticsCompanyData() {
  return {
    type: GET_LOGISTIC_DATA,
    payload: {
      // id,
      // type
    }
  }
}

export const actions = {
  getLogisticsCompanyData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_LOGISTIC_DATA]: (state, action) => state,
  [GET_LOGISTIC_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    logisticsData: action.response
  }),
  [GET_LOGISTIC_DATA_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  logisticsData: []

}

export default function logisticsSelectReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
