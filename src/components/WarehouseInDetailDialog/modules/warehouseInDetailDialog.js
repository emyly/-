
/**
 * Created by chenming on 2016/11/3.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_WAREHOUSEINDETAILDIALOG_DATA = 'GET_WAREHOUSEINDETAILDIALOG_DATA'
export const GET_WAREHOUSEINDETAILDIALOG_DATA_SUCCESS = 'GET_WAREHOUSEINDETAILDIALOG_DATA_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export function getWarehouseInDetailData(params) {
  return {
    type: GET_WAREHOUSEINDETAILDIALOG_DATA,
    payload: {
      params
    }
  }
}

export const actions = {
  getWarehouseInDetailData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_WAREHOUSEINDETAILDIALOG_DATA]: (state, action) => state,
  [GET_WAREHOUSEINDETAILDIALOG_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    warehouseInDetailData: action.response,

  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  warehouseInDetailData: []
}

export default function WarehouseInDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
