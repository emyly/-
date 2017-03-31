/**
 * Created by NXQ on 1/4/2017.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_DEPOSIT_IMPREST_DATA,
  GET_DEPOSIT_IMPREST_DATA_SUCCESS,
} from './depositImprestDataGrid';
import {
  getDepositListAPI
} from 'api/financial';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetDepositImprestData() {
  yield takeEvery(GET_DEPOSIT_IMPREST_DATA, handleAPI(getDepositImprestData));
}

// 从api获取数据
function* getDepositImprestData(action) {
  const response = yield call(getDepositListAPI, action.payload);
  if (response.Code === 0 && _.has(response.Result, 'JXSYJB')) {
    yield put({
      type: GET_DEPOSIT_IMPREST_DATA_SUCCESS,
      dataResponse: response.Result.JXSYJB || [],
      currentPageResponse: action.payload.Page,
      totalCountResponse: response.Result.Total || 0
    });
  }
}
