// ------------------------------------
// Constants
// ------------------------------------
export const GET_TOKEN = 'GET_TOKEN'
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS'
export const TOKEN_INVALID = 'TOKEN_INVALID'

// ------------------------------------
// Actions
// ------------------------------------
export function getToken() {
  return {
    type: GET_TOKEN
  }
}

export const actions = {
  getToken
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TOKEN_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    ...action.response
  }),
  [TOKEN_INVALID]: (state, action) => Object.assign({}, state, {
    status: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  status: false
}

export default function globalStoreReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
