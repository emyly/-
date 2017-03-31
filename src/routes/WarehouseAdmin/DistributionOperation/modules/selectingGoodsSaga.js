/**
 * Created by wangming on 11/15/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  CREATE_DO_DATA,
  CREATE_DO_DATA_SUCCESS,
  CREATE_DO_DATA_FAIL,
} from './selectingGoods';
import {
  createOutStockAPI
} from 'api/CRK';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* createDOOutStockData(action) {
  try {
    const response = yield call(createOutStockAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: CREATE_DO_DATA_SUCCESS,
        response
      })
    } else {
      yield put({
        type: CREATE_DO_DATA_FAIL,
        response
      })
    }
  } catch (error) {
    yield put({
      type: CREATE_DO_DATA_FAIL,
      response: error
    })
  }
}

export function* watchDOCreateOutStockData() {
  yield takeEvery(CREATE_DO_DATA, handleAPI(createDOOutStockData));
}
