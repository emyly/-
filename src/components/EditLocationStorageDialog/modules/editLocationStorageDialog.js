/**
 * Created by chenming on 2016/12/1.
 */
// ------------------------------------
// Constants
// ------------------------------------
// 获取库位信息
export const GET_EDITLOCATIONSTORAGE_DATA = 'GET_EDITLOCATIONSTORAGE_DATA'
export const GET_EDITLOCATIONSTORAGE_DATA_SUCCESS = 'GET_EDITLOCATIONSTORAGE_DATA_SUCCESS'
export const GET_EDITLOCATIONSTORAGE_DATA_FAIL = 'GET_EDITLOCATIONSTORAGE_DATA_FAIL'

// 编辑库位信息
export const PUT_EDITLOCATIONSTORAGEINFO_DATA = 'PUT_EDITLOCATIONSTORAGEINFO_DATA'
export const PUT_EDITLOCATIONSTORAGEINFO_DATA_SUCCESS = 'PUT_EDITLOCATIONSTORAGEINFO_DATA_SUCCESS'
export const PUT_EDITLOCATIONSTORAGEINFO_DATA_FAIL = 'PUT_EDITLOCATIONSTORAGEINFO_DATA_FAIL'

// 新建库位信息
export const POST_CREATENEWLOCATIONSTORAGE_DATA = 'POST_CREATENEWLOCATIONSTORAGE_DATA'
export const POST_CREATENEWLOCATIONSTORAGE_DATA_SUCCESS = 'POST_CREATENEWLOCATIONSTORAGE_DATA_SUCCESS'
export const POST_CREATENEWLOCATIONSTORAGE_DATA_FAIL = 'POST_CREATENEWLOCATIONSTORAGE_DATA_FAIL'

export const INIT_CREATENEWLOCATIONSTORAGE_DATA = 'INIT_CREATENEWLOCATIONSTORAGE_DATA'
export const INIT_EDITLOCATIONSTORAGE_DATA = 'INIT_EDITLOCATIONSTORAGE_DATA'
// ------------------------------------
// Actions
// ------------------------------------
// 初始化编辑库位
export function initEditLocationStoragelData() {
  return {
    type: INIT_EDITLOCATIONSTORAGE_DATA
  }
}
// 初始化新建库位
export function initCreateLocationStoragelData() {
  return {
    type: INIT_CREATENEWLOCATIONSTORAGE_DATA
  }
}
// 获取库位信息
export function getLocationStorageDetailData(params) {
  return {
    type: GET_EDITLOCATIONSTORAGE_DATA,
    payload: {
      params
    }
  }
}
// 编辑库位
export function putEidtLocationStorageData(params) {
  return {
    type: PUT_EDITLOCATIONSTORAGEINFO_DATA,
    payload: {
      params
    }
  }
}
// 新建库位
export function postCreateNewLocationStorage(params) {
  return {
    type: POST_CREATENEWLOCATIONSTORAGE_DATA,
    payload: {
      params
    }
  }
}
export const actions = {
  getLocationStorageDetailData,
  putEidtLocationStorageData,
  postCreateNewLocationStorage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_EDITLOCATIONSTORAGE_DATA]: (state, action) => state,
  [GET_EDITLOCATIONSTORAGE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    locationStorageDetailData: action.response,
  }),
  [GET_EDITLOCATIONSTORAGE_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),

  [PUT_EDITLOCATIONSTORAGEINFO_DATA]: (state, action) => state,
  [PUT_EDITLOCATIONSTORAGEINFO_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    editLocationStorageData: action.response,
  }),
  [PUT_EDITLOCATIONSTORAGEINFO_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.response
  }),

  [POST_CREATENEWLOCATIONSTORAGE_DATA]: (state, action) => state,
  [POST_CREATENEWLOCATIONSTORAGE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true,
    createNewLocationStorageData: action.response,
  }),
  [POST_CREATENEWLOCATIONSTORAGE_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    status: true,
    error: action.error
  }),
  [INIT_CREATENEWLOCATIONSTORAGE_DATA]: (state, action) => Object.assign({}, state, {
    createNewLocationStorageData: {},
  }),
  [INIT_EDITLOCATIONSTORAGE_DATA]: (state, action) => Object.assign({}, state, {
    editLocationStorageData: {},
  })

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  locationStorageDetailData: {},
  editLocationStorageData: {},
  createNewLocationStorageData: {},
  error: null
}

export default function watchGetLocationStorageDialogData(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
