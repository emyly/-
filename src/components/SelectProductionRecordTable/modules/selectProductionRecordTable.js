// ------------------------------------
// Constants
// ------------------------------------
export const GET_SELECTRECORD_DATA = 'GET_SELECTRECORD_DATA'
export const GET_SELECTRECORD_DATA_SUCCESS = 'GET_SELECTRECORD_DATA_SUCCESS'
export const GET_SELECTRECORD_DATA_FAIL = 'GET_SELECTRECORD_DATA_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export function getSelectProductionRecord(id, body) {
  console.debug('getSelectProductionRecordTable.js getSelectProductionRecord');
  return {
    type: GET_SELECTRECORD_DATA,
    payload: {
      id,
      body
    }
  }
}

export const actions = {
  getSelectProductionRecord
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_SELECTRECORD_DATA]: (state, action) => state,
  [GET_SELECTRECORD_DATA_SUCCESS]: (state, action) => {
    console.debug('SelectProductionRecord.js GET_SELECTRECORD_DATA_SUCCESS:', state, action);
    return Object.assign({}, state, {
      status: true,
      selectData: action.response
    })
  },
  [GET_SELECTRECORD_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: false,
    error: action.response
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  selectData: []
}

export default function selectProductionRecordReducer(state = initialState, action) {
  console.debug('SelectProductionRecord.js selectProductionRecordReducer;', action);
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
