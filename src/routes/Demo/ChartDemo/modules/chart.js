// ------------------------------------
// Constants
// ------------------------------------
export const CHART_GET_DATA = 'CHART_GET_DATA'
export const CHART_GET_DATA_SUCCESS = 'CHART_GET_DATA_SUCCESS'
export const CHART_GET_DATA_ERROR = 'CHART_GET_DATA_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function getChartData() {
  return {
    type: CHART_GET_DATA,
    payload: {
      value: 1
    }
  }
}

export const actions = {
  getChartData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [CHART_GET_DATA]: (state, action) => state,
  [CHART_GET_DATA_SUCCESS]: (state, action) =>
		// console.log(JSON.stringify(Object.assign({}, state, {
		// 	status: true,
		// 	chartData: action.response
		// })))
		 Object.assign({}, state.data, {
   status: true,
   chartData: action.response
 }),
  [CHART_GET_DATA_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  status: false
}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
