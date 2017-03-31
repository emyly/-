/**
 * Created by chenming on 2016/11/3.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_STORAGEOUTRECHECKLIST_DATA = 'GET_STORAGEOUTRECHECKLIST_DATA'
export const GET_STORAGEOUTRECHECKLIST_DATA_SUCCESS = 'GET_STORAGEOUTRECHECKLIST_DATA_SUCCESS'
export const GET_STORAGEOUTRECHECKLIST_DATA_FAIL = 'GET_STORAGEOUTRECHECKLIST_DATA_FAIL'
// ------------------------------------
// Actions
// ------------------------------------
export function getStorageOutRecheckData(params) {
  return {
    type: GET_STORAGEOUTRECHECKLIST_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getStorageOutRecheckData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_STORAGEOUTRECHECKLIST_DATA]: (state, action) => state,
  [GET_STORAGEOUTRECHECKLIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    storageOutRecheckData: action.response,
    currentPage: action.currentPage
  }),
  [GET_STORAGEOUTRECHECKLIST_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  storageOutRecheckData: {},
  currentPage: 1
}

export default function watchGetStorageOutRecheckData(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

