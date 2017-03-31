/**
 * Created by chenming on 2016/11/2.
 */

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SENDRECEIVEADDSELECT_DATA = 'GET_SENDRECEIVEADDSELECT_DATA'
export const GET_SENDRECEIVEADDSELECT_DATA_SUCCESS = 'GET_SENDRECEIVEADDSELECT_DATA_SUCCESS'
export const GET_SENDRECEIVEADDSELECT_DATA_ERROR = 'GET_SENDRECEIVEADDSELECT_DATA_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export function getSendReceiveAddData(JXSID, SFLX) {
  return {
    type: GET_SENDRECEIVEADDSELECT_DATA,
    payload: {
      JXSID,
      SFLX
    }
  }
}

export const actions = {
  getSendReceiveAddData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SENDRECEIVEADDSELECT_DATA]: (state, action) => state,
  [GET_SENDRECEIVEADDSELECT_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    sendReceiveAddData: action.response
  }),
  [GET_SENDRECEIVEADDSELECT_DATA_ERROR]: (state, action) => Object.assign({}, state.data, {
    status: 'error',
    error: action.error
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  sendReceiveAddData: []

}

export default function sendReceiveSelectAddReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
