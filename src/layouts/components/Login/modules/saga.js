import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  SEND_MESS,
  SEND_MESS_SUCCESS,
  SEND_MESS_ERROR,
  RESET_PW,
  RESET_PW_SUCCESS,
  RESET_PW_ERROR
} from './login'

import { userLoginAPI, userRestPWAPI } from 'api/YHB'
import { postDXAPI } from 'api/DXB'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchUserLogin() {
  yield takeEvery(USER_LOGIN, handleAPI(userLogin))
}

export function* watchSendMess() {
  yield takeEvery(SEND_MESS, handleAPI(sendMess))
}

export function* watchResetPW() {
  yield takeEvery(RESET_PW, handleAPI(resetPW))
}

/**
 * 登录
 */
function* userLogin(action) {
  try {
    const response = yield call(userLoginAPI, action.payload);

    const USER_INFO = {
      TOKEN: response.Result.YHYYCXZTB.TOKEN,
      GUID: response.Result.YHB.GUID,
      SJHM: response.Result.YHB.SJHM,
      SSJG: response.Result.ZZJGB.GUID,
      organizationName: response.Result.ZZJGB.JGMC,
      organizationId: response.Result.ZZJGB.GUID,
      WDID: response.Result.YHB.WDID,
      YHXM: response.Result.YHB.YHXM || response.Result.YHB.SJHM
    }
    sessionStorage.setItem('USER_INFO', JSON.stringify(USER_INFO))
    yield put({
      type: USER_LOGIN_SUCCESS,
      response: USER_INFO,
    })
  } catch (error) {
    yield put({
      type: USER_LOGIN_ERROR,
      response: error.response.Message
    })
  }
}

/**
 * 发送短信
 */
function* sendMess(action) {
  try {
    yield call(postDXAPI, action.payload);
    yield put({
      type: SEND_MESS_SUCCESS,
      response: true,
    })
  } catch (error) {
    yield put({
      type: SEND_MESS_ERROR,
      response: error.response.Message
    })
  }
}

/**
 * 重置密码
 */
function* resetPW(action) {
  try {
    yield call(userRestPWAPI, action.payload);
    yield put({
      type: RESET_PW_SUCCESS,
      response: true,
    })
  } catch (error) {
    yield put({
      type: RESET_PW_ERROR,
      response: error.response.Message
    })
  }
}