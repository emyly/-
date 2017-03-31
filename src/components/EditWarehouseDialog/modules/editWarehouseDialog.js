/**
 * Created by chenming on 2016/12/1.
 */
// ------------------------------------
// Constants
// ------------------------------------
// 获取仓库数据
export const GET_EDITWAREHOUSEDETAILDIALOG_DATA = 'GET_EDITWAREHOUSEDETAILDIALOG_DATA'
export const GET_EDITWAREHOUSEDETAILDIALOG_SUCCESS = 'GET_EDITWAREHOUSEDETAILDIALOG_SUCCESS'
export const GET_EDITWAREHOUSEDETAILDIALOG_FAIL = 'GET_EDITWAREHOUSEDETAILDIALOG_FAIL'
// 提交编辑仓库
export const PUT_EDITWAREHOUSEDETAILDIALOG_DATA = 'PUT_EDITWAREHOUSEDETAILDIALOG_DATA'
export const PUT_EDITWAREHOUSEDETAILDIALOG_SUCCESS = 'PUT_EDITWAREHOUSEDETAILDIALOG_SUCCESS'
export const PUT_EDITWAREHOUSEDETAILDIALOG_FAIL = 'PUT_EDITWAREHOUSEDETAILDIALOG_FAIL'
// 新建仓库
export const POST_CREATENEWWAREHOUSE_DATA = 'POST_CREATENEWWAREHOUSE_DATA'
export const POST_CREATENEWWAREHOUSE_DATA_SUCCESS = 'POST_CREATENEWWAREHOUSE_DATA_SUCCESS'
export const POST_CREATENEWWAREHOUSE_DATA_FAIL = 'POST_CREATENEWWAREHOUSE_DATA_FAIL'
// stora数据初始化
export const INIT_EDITWAREHOUSEDETAILDIALOGDATAINIT = 'INIT_EDITWAREHOUSEDETAILDIALOGDATAINIT'
// 获取行政区划ID
export const GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA = 'GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA'
export const GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_SUCCESS = 'GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_SUCCESS'
export const GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_FAIL = 'GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_FAIL'
// ------------------------------------
// Actions
// ------------------------------------
export function getLocationId(params) {
  return {
    type: GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA,
    payload: {
      params
    }
  }
}
export function getWarehouseDetailData(params) {
  return {
    type: GET_EDITWAREHOUSEDETAILDIALOG_DATA,
    payload: {
      params
    }
  }
}
export function initEditWarehouseDetailDialogData(params) {
  return {
    type: INIT_EDITWAREHOUSEDETAILDIALOGDATAINIT,

  }
}
export function putWarehouseDetailData(params) {
  return {
    type: PUT_EDITWAREHOUSEDETAILDIALOG_DATA,
    payload: {
      params
    }
  }
}
export function postCreateNewWarehouse(params) {
  return {
    type: POST_CREATENEWWAREHOUSE_DATA,
    payload: {
      params
    }
  }
}
export const actions = {
  getWarehouseDetailData,
  putWarehouseDetailData,
  postCreateNewWarehouse
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EDITWAREHOUSEDETAILDIALOG_DATA]: (state, action) => state,
  [GET_EDITWAREHOUSEDETAILDIALOG_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    warehouseDetailData: action.response,
  }),
  [GET_EDITWAREHOUSEDETAILDIALOG_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),


  [PUT_EDITWAREHOUSEDETAILDIALOG_DATA]: (state, action) => state,
  [PUT_EDITWAREHOUSEDETAILDIALOG_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    putWarehouseDetailData: action.response,
  }),
  [PUT_EDITWAREHOUSEDETAILDIALOG_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),

  [POST_CREATENEWWAREHOUSE_DATA]: (state, action) => state,
  [POST_CREATENEWWAREHOUSE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    postCreateWarehouseData: action.response,
  }),
  [POST_CREATENEWWAREHOUSE_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [INIT_EDITWAREHOUSEDETAILDIALOGDATAINIT]: (state, action) => Object.assign({}, state, {
    warehouseDetailData: {},
  }),

  [GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA]: (state, action) => state,
  [GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    XZQHID: action.locationID,
  }),
  [GET_EDITWAREHOUSEDETAILDIALOGLOCATIONID_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    error: action.response
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  warehouseDetailData: {},
  putWarehouseDetailData: {},
  postCreateWarehouseData: {},
  XZQHID: null
}

export default function watchGetWarehouseDetailData(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
