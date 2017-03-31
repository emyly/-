// ------------------------------------
// Constants
// ------------------------------------
export const GET_URGENTDETAIL_DATA = 'GET_URGENTDETAIL_DATA'
export const GET_URGENTDETAIL_DATA_SUCCESS = 'GET_URGENTDETAIL_DATA_SUCCESS'
export const GET_URGENTDETAIL_DATA_FAIL = 'GET_URGENTDETAIL_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getUrgentDetail(id) {
  return {
    type: GET_URGENTDETAIL_DATA,
    payload: {
      id
    }
  }
}

export const actions = {
  getUrgentDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_URGENTDETAIL_DATA]: (state, action) => state,
  [GET_URGENTDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    urgentData: action.response
  }),
  [GET_URGENTDETAIL_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  urgentData: {}
}

export default function urgentDetailTableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
