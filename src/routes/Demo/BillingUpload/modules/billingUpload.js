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
// ------------------------------------
// Action Handlers
// ------------------------------------
export function uploadBillingImgData(body, formdata) {
  return {
    type: UPLOAD_BILLING_IMG_DATA,
    body, formdata
  }
}

export function getBillingData(ddid) {
  return {
    type: GET_BILLING_DATA,
    ddid
  }
}

const ACTION_HANDLERS = {
  [UPLOAD_BILLING_SUCCESS]: (state) => ({
    ...state, status: true, hasUploadFlag: true
  }),
  [UPLOAD_BILLING_ERROR]: (state, action) => ({
    ...state, status: false, error: action.error, hasUploadFlag: true
  }),
  [GET_BILLING_DATA_SUCCESS]: (state, action) => {
    if (action.response.length > 0) {
      return {
        ...state, getStatus: true, data: action.response
      }
    }
  },
  [GET_BILLING_DATA_ERROR]: (state) => ({
    ...state, getStatus: false
  }),
  [UPLOAD_BILLING_IMG_DATA_SUCCESS]: (state, action) => {
    if (action.response.length > 0) {
      return {
        ...state, uploading: true
      }
    }
  },
  [UPLOAD_BILLING_IMG_DATA_ERROR]: (state) => ({
    ...state, uploading: false
  })
}
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
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
