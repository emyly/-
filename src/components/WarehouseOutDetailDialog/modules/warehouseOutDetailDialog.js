
/**
 * Created by chenming on 2016/11/3.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_WAREHOUSEOUTDETAILDIALOG_DATA = 'GET_WAREHOUSEOUTDETAILDIALOG_DATA'
export const GET_WAREHOUSEOUTDETAILDIALOG_DATA_SUCCESS = 'GET_WAREHOUSEOUTDETAILDIALOG_DATA_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function getWarehouseOutDetailData(params) {
  return {
    type: GET_WAREHOUSEOUTDETAILDIALOG_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getWarehouseOutDetailData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_WAREHOUSEOUTDETAILDIALOG_DATA]: (state, action) => state,
  [GET_WAREHOUSEOUTDETAILDIALOG_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    warehouseOutDetailData: action.response,

  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  warehouseOutDetailData: []
}

export default function WarehouseOutDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
