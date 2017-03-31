/**
 * Created by NXQ on 1/5/2017.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_DEPOSIT_IMPREST_DETAILS_DATA,
  GET_DEPOSIT_IMPREST_DETAILS_DATA_SUCCESS,
} from './depositImprestDetailsDataGrid';
import {
  getDepositDetailListAPI
} from 'api/financial';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetDepositImprestDetailsData() {
  yield takeEvery(GET_DEPOSIT_IMPREST_DETAILS_DATA, handleAPI(getDepositImprestDetailsData));
}

// 从api获取数据
function* getDepositImprestDetailsData(action) {
  const response = yield call(getDepositDetailListAPI, action.payload);
  if (Number(response.Code) === 0 && _.has(response.Result, 'YJMXB')) {
    yield put({
      type: GET_DEPOSIT_IMPREST_DETAILS_DATA_SUCCESS,
      dataResponse: response.Result.YJMXB || [],
      currentPageResponse: action.payload.Page,
      totalCountResponse: response.Result.Total || 0
    });
  }
}
