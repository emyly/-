/**
 * Created by liuyali on 2016/12/21.
 */
/*
* 上传图片
* */
export const UPLOAD_BILLING_IMG_DATA = 'UPLOAD_BILLING_IMG_DATA';
export const UPLOAD_BILLING_IMG_DATA_SUCCESS = 'UPLOAD_BILLING_IMG_DATA_SUCCESS';
export const UPLOAD_BILLING_IMG_DATA_ERROR = 'UPLOAD_BILLING_IMG_DATA_ERROR';

/*
* 关联发票
* */
export const UPLOAD_BILLING = 'UPLOAD_BILLING';
export const UPLOAD_BILLING_SUCCESS = 'UPLOAD_BILLING_SUCCESS';
export const UPLOAD_BILLING_ERROR = 'UPLOAD_BILLING_ERROR';

/*
* 获取所有订单发票
* */
export const GET_BILLING_DATA = 'GET_BILLING_DATA';
export const GET_BILLING_DATA_SUCCESS = 'GET_BILLING_DATA_SUCCESS';
export const GET_BILLING_DATA_ERROR = 'GET_BILLING_DATA_ERROR';

/* 删除发票*/
export const DELETE_ONE_BILLIG = 'DELETE_ONE_BILLIG';
export const DELETE_ONE_BILLIG_SUCCESS = 'DELETE_ONE_BILLIG_SUCCESS';
export const DELETE_ONE_BILLIG_ERROR = 'DELETE_ONE_BILLIG_ERROR';

/*
* 初始化
* */
export const SET_BILLING_UPLOAD_INIT = 'SET_BILLING_UPLOAD_INIT';
// ------------------------------------
// Action Handlers
// ------------------------------------
export function uploadBillingImgData(body, formdata) {
  return {
    type: UPLOAD_BILLING_IMG_DATA,
    body, formdata
  }
}

export function getBillingData(ddid, mbjxsid) {
  return {
    type: GET_BILLING_DATA,
    ddid, mbjxsid
  }
}

export function deleteOneBilling(idArr) {
  return {
    type: DELETE_ONE_BILLIG,
    idArr
  }
}

export function setBillingUploadInit() {
  return {
    type: SET_BILLING_UPLOAD_INIT
  }
}
const ACTION_HANDLERS = {
  [SET_BILLING_UPLOAD_INIT]: (state, action) => ({
    ...state, hasBillings: false,
    deleteStatus: false,
    status: false,
    hasUploadFlag: false,
    getStatus: false,
    data: [],
    uploading: false,
  }),
  [DELETE_ONE_BILLIG_SUCCESS]: (state, action) => ({
    ...state, status: true, deleteStatus: true, getStatus: true, hasUploadFlag: false
  }),
  [DELETE_ONE_BILLIG_ERROR]: (state, action) => ({
    ...state, status: false, getStatus: false, deleteStatus: false, hasUploadFlag: false, deleteError: action.error
  }),
  [UPLOAD_BILLING_SUCCESS]: (state, action) => ({
    ...state, status: true, hasUploadFlag: true, getStatus: true
  }),
  [UPLOAD_BILLING_ERROR]: (state, action) => ({
    ...state, status: false, getStatus: false, hasUploadFlag: false, uploadError: action.error
  }),
  [GET_BILLING_DATA_SUCCESS]: (state, action) => {
    if (action.response.length > 0) {
      return {
        ...state, status: true, hasBillings: true, getStatus: false, data: action.response
      }
    } else {
      return {
        ...state, status: true, hasBillings: false, getStatus: false, data: action.response
      }
    }
  },
  [GET_BILLING_DATA_ERROR]: (state, action) => ({
    ...state, status: false, hasBillings: false, hasUploadFlag: false, getError: action.error
  }),
  // [UPLOAD_BILLING_IMG_DATA_SUCCESS]: (state, action) => {
  //   if (action.response.length > 0) {
  //     return {
  //       ...state, uploading: true
  //     }
  //   }
  // },
  // [UPLOAD_BILLING_IMG_DATA_ERROR]: (state, action) => ({
  //   ...state, uploading: false
  // })
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  hasBillings: false,
  deleteStatus: false,
  status: false,
  hasUploadFlag: false,
  getStatus: false,
  data: [],
  uploading: false,
}

export default function BillingUploadReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
