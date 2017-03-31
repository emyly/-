/**
 * Created by NXQ on 10/11/2016.
 */


// ------------------------------------
// Constants
// ------------------------------------
export const GET_FIXED_CREDIT_SEE_DATA = 'GET_FIXED_CREDIT_SEE_DATA';
export const GET_FIXED_CREDIT_SEE_DATA_SUCCESS = 'GET_FIXED_CREDIT_SEE_DATA_SUCCESS';
export const GET_TEMP_CREDIT_SEE_DATA = 'GET_TEMP_CREDIT_SEE_DATA';
export const GET_TEMP_CREDIT_SEE_DATA_SUCCESS = 'GET_TEMP_CREDIT_SEE_DATA_SUCCESS';
export const DELETE_SING_FIXED_CREDIT_DATA = 'DELETE_SING_FIXED_CREDIT_DATA';
export const DELETE_SING_FIXED_CREDIT_DATA_SUCCESS = 'DELETE_SING_FIXED_CREDIT_DATA_SUCCESS';
export const DELETE_SING_FIXED_CREDIT_DATA_FAIL = 'DELETE_SING_FIXED_CREDIT_DATA_FAIL';
export const GET_CREATE_CREDIT_EDIT_DATA = 'GET_CREATE_CREDIT_EDIT_DATA';
export const GET_CREATE_CREDIT_EDIT_DATA_SUCCESS = 'GET_CREATE_CREDIT_EDIT_DATA_SUCCESS';
export const GET_CREATE_CREDIT_EDIT_DATA_FAIL = 'GET_CREATE_CREDIT_EDIT_DATA_FAIL';
export const PUT_CREATE_CREDIT_STATUS = 'PUT_CREATE_CREDIT_STATUS';
export const CHANGE_DELETE_SINGLE_TEMP_CREDIT_STATUS = 'CHANGE_DELETE_SINGLE_TEMP_CREDIT_STATUS';

import {
  DELETE_SING_TEMP_CREDIT_QUERY_DATA_SUCCESS
} from '../../../../components/TempCreditQueryDataGrid/modules/tempCreditQueryDataGrid';

// ------------------------------------
// Actions
// ------------------------------------
export function getFixedCreditSeeData({ AuthorizeOrganizationId, AuthorizedOrganizationId }) {
  return {
    type: GET_FIXED_CREDIT_SEE_DATA,
    payload: {
      AuthorizeOrganizationId,         // 授权经销商id
      AuthorizedOrganizationId        // 被授权经销商id
    }
  }
}

export function getTempCreditTotalSeeData({ AuthorizeOrganizationId, AuthorizedOrganizationId }) {
  return {
    type: GET_TEMP_CREDIT_SEE_DATA,
    payload: {
      AuthorizeOrganizationId,         // 授权经销商id
      AuthorizedOrganizationId        // 被授权经销商id
    }
  }
}

export function deleteSingleFixedCreditData(id) {
  return {
    type: DELETE_SING_FIXED_CREDIT_DATA,
    payload: {
      GUID: id                              // 要删除的临时信用对象
    }
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export function createCredit(createObject) {
  return {
    type: GET_CREATE_CREDIT_EDIT_DATA,
    payload: createObject            // 信用对象
  }
}

// put 改变创建成功的状态
export function putChangeCreateStatus() {
  return {
    type: PUT_CREATE_CREDIT_STATUS,
  }
}

// put 改变创建成功的状态
export function changeDeleteSingleTempCreditStatus() {
  return {
    type: CHANGE_DELETE_SINGLE_TEMP_CREDIT_STATUS,
  }
}


export const actions = {
  getFixedCreditSeeData,            // 授信详情
  getTempCreditTotalSeeData,        // 授信总详情
  deleteSingleFixedCreditData,      // 删除长期信用
  createCredit,                     // 创建信用
  putChangeCreateStatus,
  changeDeleteSingleTempCreditStatus// 改变删除单条临时信用标识位
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_FIXED_CREDIT_SEE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    fixedCreditData: action.fixedCreditResponse,
    fixedValidDateData: action.fixedValidDateDataResponse
  }),
  [GET_TEMP_CREDIT_SEE_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    allCreditData: action.creditResponse
  }),
  [DELETE_SING_FIXED_CREDIT_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    fixedCreditData: {},    // 长期信用授信详情
    fixedValidDateData: {}, // 经销商信用有效期清空

  }),
  [DELETE_SING_TEMP_CREDIT_QUERY_DATA_SUCCESS]: (state, action) =>
    // state.tempCreditData.LSED -= action.deleteObject.YXED;
     Object.assign({}, state, {
       isDeleteSingleTempCredit: true
     }),
  [CHANGE_DELETE_SINGLE_TEMP_CREDIT_STATUS]: (state, action) =>
    // state.tempCreditData.LSED -= action.deleteObject.YXED;
     Object.assign({}, state, {
       isDeleteSingleTempCredit: false
     }),
  [GET_CREATE_CREDIT_EDIT_DATA_SUCCESS]: (state, action) => Object.assign({}, state, {
    isFixedCreateSuccess: action.isFixedCreateSuccess,
    createStatus: true,
    messageFail: ''
  }),
  [GET_CREATE_CREDIT_EDIT_DATA_FAIL]: (state, action) => Object.assign({}, state, {
    createStatus: false,
    isFixedCreateSuccess: false,
    messageFail: action.message
  }),
  [PUT_CREATE_CREDIT_STATUS]: (state, action) => Object.assign({}, state, {
    createStatus: false
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fixedCreditData: {},    // 长期信用授信详情
  fixedValidDateData: {}, // 经销商固定信用有效期
  allCreditData: {},     // 经销商总信用授信详情
  tempValidDateData: {},  // 经销商临时信用有效期
  isDeleteSingleTempCredit: false, // 是否成功删除单条数据
};
export default function creditSeeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state
}
