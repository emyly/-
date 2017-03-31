/**
 * Created by wangming on 11/16/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_DOSELECT_ADVICE_DATA,
  GET_DOSELECT_ADVICE_DATA_SUCCESS,
  GET_DOSELECT_ADVICE_DATA_FAIL,
  GET_DOTEMPORARY_DATA,
  GET_DOTEMPORARY_DATA_SUCCESS,
  GET_DOTEMPORARY_DATA_FAIL,
} from './selectMethodFlow';

import {
  getTemporaryStorageAPI,
  operationSelectDataAPI,
} from 'api/CRK';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* getTemporaryStorage(action) {
  try {
    const response = yield call(getTemporaryStorageAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.JHTJDB;
      yield put({
        type: GET_DOTEMPORARY_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_DOTEMPORARY_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_DOTEMPORARY_DATA_FAIL,
      response: error
    })
  }
}

export function* watchDOGetTemporaryData() {
  yield takeEvery(GET_DOTEMPORARY_DATA, handleAPI(getTemporaryStorage));
}

function* getDOSelectAdvice(action) {
  try {
    const response = yield call(operationSelectDataAPI, action.payload);

    const resultArray = response.Result.JHTJDB;
    yield put({
      type: GET_DOSELECT_ADVICE_DATA_SUCCESS,
      response: resultArray
    });
  } catch (error) {
    yield put({
      type: GET_DOSELECT_ADVICE_DATA_FAIL,
      response: error
    })
  }
}

export function* watchDOGetSelectAdvice() {
  yield takeEvery(GET_DOSELECT_ADVICE_DATA, handleAPI(getDOSelectAdvice));
}
