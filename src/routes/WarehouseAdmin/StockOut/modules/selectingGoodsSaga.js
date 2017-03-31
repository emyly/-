/**
 * Created by wangming on 11/15/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';
import _ from 'lodash';

import {
	CREATE_OUTSTOCK_DATA,
	CREATE_OUTSTOCK_DATA_SUCCESS,
	CREATE_OUTSTOCK_DATA_FAIL,
} from './selectingGoods';
import {
	createOutStockAPI
} from 'api/CRK';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchCreateOutStockData() {
  yield takeEvery(CREATE_OUTSTOCK_DATA, handleAPI(createOutStockData));
}

function* createOutStockData(action) {
  try {
    const response = yield call(createOutStockAPI, action.payload);
    if (response.Code === 0) {
      console.debug('createOutStockData: 3', response);
      yield put({
        type: CREATE_OUTSTOCK_DATA_SUCCESS,
        response
      })
    } else {
      yield put({
        type: CREATE_OUTSTOCK_DATA_FAIL,
        response
      })
    }
  } catch (error) {
    yield put({
      type: CREATE_OUTSTOCK_DATA_FAIL,
      response: error
    })
  }
}

