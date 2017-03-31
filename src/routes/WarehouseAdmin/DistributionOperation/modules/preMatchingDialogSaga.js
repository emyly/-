import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_PRE_MATCHING_DATA,
  GET_PRE_MATCHING_DATA_SUCCESS,
  GET_PRE_MATCHING_DATA_FAIL,
} from './preMatchingDialog.js'
import {
  getPrematchingStorageAPI
} from 'api/JH'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */

 // 从api获取数据
export function* getPrematchingStorage(action) {
  try {
    const response = yield call(getPrematchingStorageAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_PRE_MATCHING_DATA_SUCCESS,
        response: response.Result.YPT.JHTJDB
      })
    } else {
      yield put({
        type: GET_PRE_MATCHING_DATA_FAIL,
        response
      })
    }
  } catch (error) {
    yield put({
      type: GET_PRE_MATCHING_DATA_FAIL,
      response: error
    })
  }
}

export function* watchGetPrematchingStorage() {
  yield takeEvery(GET_PRE_MATCHING_DATA, handleAPI(getPrematchingStorage))
}

