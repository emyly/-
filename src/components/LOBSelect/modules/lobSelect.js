/**
 * Created by liuyali on 2016/11/2.
 */
export const GET_LOB_DATA = 'GET_LOB_DATA'
export const GET_LOB_DATA_SUCCESS = 'GET_LOB_DATA_SUCCESS'
export const GET_LOB_DATA_ERROR = 'GET_LOB_DATA_ERROR'
export const INIT_STORE = 'LOB_SELECT_INIT_STORE'

// Actions
export function getLOBData(contractType, authorizeOrgId, authorizedOrgId) {
  return {
    type: GET_LOB_DATA,
    payload: {
      contractType,
      authorizeOrgId,
      authorizedOrgId
    }
  }
}

export function initStore() {
  return { type: INIT_STORE }
}

// REDUCER
const initialState = {
  isFetching: false,
  lobData: []
}

const ACTION_HANDLERS = {
  [GET_LOB_DATA]: (state) => ({
    ...state,
    isFetching: true
  }),

  [GET_LOB_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    isFetching: false,
    lobData: action.response
  }),
  [GET_LOB_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    status: 'error',
    isFetching: false,
    error: action.error
  }),
  [INIT_STORE]: (state) => Object.assign({}, state, initialState)
}

export default function LOBSelectReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
