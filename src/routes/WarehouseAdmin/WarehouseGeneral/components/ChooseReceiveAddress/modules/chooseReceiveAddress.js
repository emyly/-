/**
 * Created by magellan on 2016/12/9.
 */
// ------------------------------------
// Constants
// ------------------------------------
// 新建地址
export const POST_ADDORGANIZATIONADDRESS_DATA = 'POST_ADDORGANIZATIONADDRESS_DATA'
export const POST_ADDORGANIZATIONADDRESS_DATA_SUCCESS = 'POST_ADDORGANIZATIONADDRESS_DATA_SUCCESS'
export const POST_ADDORGANIZATIONADDRESS_DATA_FAIL = 'POST_ADDORGANIZATIONADDRESS_DATA_FAIL'
// 获取组织机构收发货地址
export const GET_LOGISTICADRESSLIST_DATA = 'GET_LOGISTICADRESSLIST_DATA'
export const GET_LOGISTICADRESSLIST_DATA_SUCCESS = 'GET_LOGISTICADRESSLIST_DATA_SUCCESS'
export const GET_LOGISTICADRESSLIST_DATA_FAIL = 'GET_LOGISTICADRESSLIST_DATA_FAIL'
// 编辑收发货地址
export const POST_CHOOSERECEIVEADDRESS_DATA = 'POST_CHOOSERECEIVEADDRESS_DATA'
export const POST_CHOOSERECEIVEADDRESS_DATA_SUCCESS = 'POST_CHOOSERECEIVEADDRESS_DATA_SUCCESS'
export const POST_CHOOSERECEIVEADDRESS_DATA_FAIL = 'POST_CHOOSERECEIVEADDRESS_DATA_FAIL'
// 删除收发货地址
export const POST_DELETEADDRESS_DATA = 'POST_DELETEADDRESS_DATA'
export const POST_DELETEADDRESS_DATA_SUCCESS = 'POST_DELETEADDRESS_DATA_SUCCESS'
export const POST_DELETEADDRESS_DATA_FAIL = 'POST_DELETEADDRESS_DATA_FAIL'

export const INIT_CHOOSERECEIVEADDRESS_DATA = 'INIT_CHOOSERECEIVEADDRESS_DATA'
// 修改单个地址
export const PUT_EDITRECEIVEADDRESS_DATA = 'PUT_EDITRECEIVEADDRESS_DATA'
export const PUT_EDITRECEIVEADDRESS_DATA_SUCCESS = 'PUT_EDITRECEIVEADDRESS_DATA_SUCCESS'
export const PUT_EDITRECEIVEADDRESS_DATA_FAIL = 'PUT_EDITRECEIVEADDRESS_DATA_FAIL'
// ------------------------------------
// Actions
// ------------------------------------
/**
 * 初始化数据
 * */
export function initChooseReceiveAddress(params) {
  return {
    type: INIT_CHOOSERECEIVEADDRESS_DATA,

  }
}
/**
 * 创建地址
 * */
export function addOrganizationAddress(params) {
  return {
    type: POST_ADDORGANIZATIONADDRESS_DATA,
    payload: {
      params
    }
  }
}
/**
 * 修改单个物流地址
 * */
export function putEditOneAddress(params) {
  return {
    type: PUT_EDITRECEIVEADDRESS_DATA,
    payload: {
      params
    }
  }
}
/**
 * 获取组织机构收发货地址
 * */
export function getLogisticsAddressList(params) {
  return {
    type: GET_LOGISTICADRESSLIST_DATA,
    payload: {
      params
    }
  }
}
/**
 * 删除收发货地址
 * */
export function postDeleteAddress(params) {
  return {
    type: POST_DELETEADDRESS_DATA,
    payload: {
      params
    }
  }
}
export function postChooseReceiveAddress(params) {
  return {
    type: POST_CHOOSERECEIVEADDRESS_DATA,
    payload: {
      params
    }
  }
}
export const actions = {
  getLogisticsAddressList,
  postChooseReceiveAddress,
  postDeleteAddress
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_LOGISTICADRESSLIST_DATA]: (state, action) => state,
  [GET_LOGISTICADRESSLIST_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    receiveAddressResult: action.response,
  }),
  [GET_LOGISTICADRESSLIST_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [POST_CHOOSERECEIVEADDRESS_DATA]: (state, action) => state,
  [POST_CHOOSERECEIVEADDRESS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    postChooseAddress: action.response,
  }),
  [POST_CHOOSERECEIVEADDRESS_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [POST_DELETEADDRESS_DATA]: (state, action) => state,
  [POST_DELETEADDRESS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    deleteAddressResult: action.response,
  }),
  [POST_DELETEADDRESS_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [INIT_CHOOSERECEIVEADDRESS_DATA]: (state, action) => Object.assign({}, state, {
    deleteAddressResult: null,
    postAddOrganizationAddress: null,
    putEditAddressResult: null
  }),
  [PUT_EDITRECEIVEADDRESS_DATA]: (state, action) => state,
  [PUT_EDITRECEIVEADDRESS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    putEditAddressResult: action.response,
  }),
  [PUT_EDITRECEIVEADDRESS_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),
  [POST_ADDORGANIZATIONADDRESS_DATA]: (state, action) => state,
  [POST_ADDORGANIZATIONADDRESS_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    postAddOrganizationAddress: action.response,
  }),
  [POST_ADDORGANIZATIONADDRESS_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  })

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  receiveAddressResult: null,
  postChooseAddress: null,
  deleteAddressResult: null,
  putEditAddressResult: null,
  postAddOrganizationAddress: null
}

export default function watchGetLogisticsAdressData(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
