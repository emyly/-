// ------------------------------------
// Constants
// ------------------------------------
export const GET_BADDEBTSDETAIL_DATA = 'GET_BADDEBTSDETAIL_DATA'
export const GET_BADDEBTSDETAIL_DATA_SUCCESS = 'GET_BADDEBTSDETAIL_DATA_SUCCESS'
export const GET_BADDEBTSDETAIL_DATA_FAIL = 'GET_BADDEBTSDETAIL_DATA_FAIL'


// ------------------------------------
// Actions
// ------------------------------------
export function getBaddebtsDetail(id) {
  return {
    type: GET_BADDEBTSDETAIL_DATA,
    payload: {
      id
    }
  }
}

export const actions = {
  getBaddebtsDetail
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_BADDEBTSDETAIL_DATA]: (state, action) => state,
  [GET_BADDEBTSDETAIL_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    baddebtsData: action.response
  }),
  [GET_BADDEBTSDETAIL_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  baddebtsData: []
}

export default function baddebtsDetailTableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
