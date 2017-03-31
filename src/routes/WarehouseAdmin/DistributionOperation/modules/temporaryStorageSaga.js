/**
 * Created by wangming on 2/16/2017.
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  SET_TEMPORARY_STORAGE,
  SET_TEMPORARY_STORAGE_SUCCESS,
  SET_TEMPORARY_STORAGE_FAIL
} from './temporaryStorage';

import {
  setTemporaryStorageAPI
} from 'api/CRK';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* setTemporaryStorage(action) {
  try {
    const response = yield call(setTemporaryStorageAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: SET_TEMPORARY_STORAGE_SUCCESS,
      });
    } else {
      yield put({
        type: SET_TEMPORARY_STORAGE_FAIL,
        response
      })
    }
  } catch (error) {
    yield put({
      type: SET_TEMPORARY_STORAGE_FAIL,
      response: error
    })
  }
}

export function* watchDOSetTemporaryStorage() {
  yield takeEvery(SET_TEMPORARY_STORAGE, handleAPI(setTemporaryStorage));
}

