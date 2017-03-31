/**
 * Created by liuyali on 2016/11/5.
 */
/*
* 上传证件照
* */
export const POST_BASICINFO_DATA = 'POST_BASICINFO_DATA';
export const POST_BASICINFO_DATA_SUCCESS = 'POST_BASICINFO_DATA_SUCCESS';
export const POST_BASICINFO_DATA_ERROR = 'POST_BASICINFO_DATA_ERROR';

/* 获取企业基本信息*/
export const GET_CORPORATION_BASIC_INFO = 'GET_CORPORATION_BASIC_INFO';
export const GET_CORPORATION_BASIC_INFO_FAIL = 'GET_CORPORATION_BASIC_INFO_FAIL';
export const GET_CORPORATION_BASIC_INFO_SUCCESS = 'GET_CORPORATION_BASIC_INFO_SUCCESS';

/* 修改企业基本信息*/
export const PUT_CORPORATION_BASIC_INFO = 'PUT_CORPORATION_BASIC_INFO';
export const PUT_CORPORATION_BASIC_INFO_FAIL = 'PUT_CORPORATION_BASIC_INFO_FAIL';
export const PUT_CORPORATION_BASIC_INFO_SUCCESS = 'PUT_CORPORATION_BASIC_INFO_SUCCESS';
/*
* 初始化上传
* */
export const SET_BASICINFO_DATA_INIT = 'SET_BASICINFO_DATA_INIT';

// "WDMC":"xxxx",//文档名称
//   "SSJXSID":"1000004",//所属经销商ID
//   "CJR":"102"//创建人
export function getBasicInfoData(imgArr) {
  return {
    type: POST_BASICINFO_DATA,
    payload: {
      imgArr
    }
  }
}

export function setBasicInfoDataInit() {
  return {
    type: SET_BASICINFO_DATA_INIT,
  }
}

export function getCorporationBasicInfo(id) {
  return {
    type: GET_CORPORATION_BASIC_INFO,
    id
  }
}
/* 更新企业基本信息*/
export function putCorporationBasicInfo(params) {
  return {
    type: PUT_CORPORATION_BASIC_INFO,
    ...params
  }
}

const ACTION_HANDLERS = {
  [PUT_CORPORATION_BASIC_INFO_SUCCESS]: (state, action) => Object.assign({}, state, {
    status: true, putFlag: true
  }),
  [PUT_CORPORATION_BASIC_INFO_FAIL]: (state, action) => Object.assign({}, state, {
    status: false, error: action.error
  }),
  [GET_CORPORATION_BASIC_INFO_SUCCESS]: (state, action) => {
    return { ...state, putFlag: false, status: true, ZZJGB: action.response }
  },
  [GET_CORPORATION_BASIC_INFO_FAIL]: (state, action) => Object.assign({}, state, {
    status: false, error: action.error
  }),
  [SET_BASICINFO_DATA_INIT]: state => Object.assign({}, state, {
    status: false,
    putFlag: false,
    uploadFin: false,
    idArr: [],
    info: {}
  }),
  [POST_BASICINFO_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    uploadFin: true, idArr: action.idArr, status: true
  }),
  [POST_BASICINFO_DATA_ERROR]: (state, action) => Object.assign({}, state, {
    uploadFin: false,
    status: false,
    error: action.error,
    idArr: action.idArr
  }),
};

const initialState = {
  status: false,
  putFlag: false, // 标识信息有更新
  uploadFin: false,
  idArr: [],
  ZZJGB: {}
}


export default function getBasicInfoDataReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
