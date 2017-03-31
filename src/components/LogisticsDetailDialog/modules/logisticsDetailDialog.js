
/**
 * Created by chenming on 2016/11/3.
 */
// ------------------------------------
// Constants
// ------------------------------------
export const GET_LOGISTICSDETAILDIALOG_DATA = 'GET_LOGISTICSDETAILDIALOG_DATA'
export const GET_LOGISTICSDETAILDIALOG_DATA_SUCCESS = 'GET_LOGISTICSDETAILDIALOG_DATA_SUCCESS'
export const GET_LOGISTICSDETAILDIALOG_DATA_FAIL = 'GET_LOGISTICSDETAILDIALOG_DATA_FAIL'

export const INIT_LOGISTICSDETAILDIALOG_DATA = 'INIT_LOGISTICSDETAILDIALOG_DATA'

// ------------------------------------
// Actions
// ------------------------------------

export function getLogisticsDetailData(params) {
  return {
    type: GET_LOGISTICSDETAILDIALOG_DATA,
    payload: {
      params
    }
  }
}
export function initLogisticsDetailData() {
  return {
    type: INIT_LOGISTICSDETAILDIALOG_DATA
  }
}
export const actions = {
  getLogisticsDetailData,
  initLogisticsDetailData
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_LOGISTICSDETAILDIALOG_DATA]: (state, action) => state,
  [GET_LOGISTICSDETAILDIALOG_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    logisticsDetailData: action.response.WLDB,
    thirdLogisticsInfo: action.response.WLXX
  }),
  [GET_LOGISTICSDETAILDIALOG_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [INIT_LOGISTICSDETAILDIALOG_DATA]: (state, action) => Object.assign({}, state, {
    logisticsDetailData: {}
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  logisticsDetailData: {},
  thirdLogisticsInfo: null
}

export default function orderLogisticsDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
