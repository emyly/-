/**
 * Created by NXQ on 10/11/2016.
 */
import { put } from 'redux-saga/effects';


// ------------------------------------
// Constants
// ------------------------------------
export const GET_CREATE_CREDIT_EDIT_DATA = 'GET_CREATE_CREDIT_EDIT_DATA';
export const GET_CREATE_CREDIT_EDIT_DATA_SUCCESS = 'GET_CREATE_CREDIT_EDIT_DATA_SUCCESS';
export const GET_CREATE_CREDIT_EDIT_DATA_FAIL = 'GET_CREATE_CREDIT_EDIT_DATA_FAIL';
export const PUT_CREATE_CREDIT_STATUS = 'PUT_CREATE_CREDIT_STATUS';
export const PUT_CREATE_CREDIT_STATUS_SUCCESS = 'PUT_CREATE_CREDIT_STATUS_SUCCESS';


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


export const actions = {
  createCredit            // 创建信用
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
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
  [PUT_CREATE_CREDIT_STATUS_SUCCESS]: (state, action) => Object.assign({}, state, {
    createStatus: action.response
  })
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  createStatus: false,    // 创建是否成功
  messageFail: '',         // 创建失败信息
  isFixedCreateSuccess: false   // 是固定信用创建成功
};
export default function creditEditReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
