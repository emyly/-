/**
 * Created by wangming on 2/14/2017.
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_DOOHTHER_STORAGE_DATA,
  GET_DOOHTHER_STORAGE_DATA_SUCCESS,
  GET_DOOHTHER_STORAGE_DATA_FAIL,
} from './selectOtherDialog';

import {
  getOperationOtherStorageAPI,
} from 'api/CRK';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* getDOOtherStorage(action) {
  try {
    const response = yield call(getOperationOtherStorageAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.JHTJDB;
      yield put({
        type: GET_DOOHTHER_STORAGE_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_DOOHTHER_STORAGE_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_DOOHTHER_STORAGE_DATA_FAIL,
      response: error
    })
  }
}

export function* watchDOGetOtherStorage() {
  yield takeEvery(GET_DOOHTHER_STORAGE_DATA, handleAPI(getDOOtherStorage));
}
