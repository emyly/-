import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  TOKEN_INVALID
} from './globalStore.js'
import {
  getTokenAPI
} from 'api/global'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetToken() {
  yield takeEvery(GET_TOKEN, handleAPI(getToken))
}

export function* watchTokenInvalid() {
  yield takeEvery(TOKEN_INVALID, tokenInvalid)
}

// 从api获取数据
function* getToken() {
  const response = yield call(getTokenAPI);
  if (!!response.TOKEN) {
    yield put({
      type: GET_TOKEN_SUCCESS,
      response
    })
  }
}

function tokenInvalid() {
  sessionStorage.setItem('USER_INFO', '')
}
