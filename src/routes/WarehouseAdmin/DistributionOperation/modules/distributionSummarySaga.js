/**
 * Created by wangming on 11/15/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_DISTRIBUTION_SUMMARY_DATA,
  GET_DISTRIBUTION_SUMMARY_DATA_SUCCESS,
  GET_DISTRIBUTION_SUMMARY_DATA_FAIL,
} from './distributionSummary';
import {
  getWarehouseInOutGoodsSummaryAPI
} from 'api/CRK';

function* getDOWarehouseInOutGoodsSummary(action) {
  try {
    const response = yield call(getWarehouseInOutGoodsSummaryAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.CRKMXB;
      yield put({
        type: GET_DISTRIBUTION_SUMMARY_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_DISTRIBUTION_SUMMARY_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_DISTRIBUTION_SUMMARY_DATA_FAIL,
      response: error
    })
  }
}


/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchDOGetWarehouseInOutGoodsSummary() {
  yield takeEvery(GET_DISTRIBUTION_SUMMARY_DATA, handleAPI(getDOWarehouseInOutGoodsSummary));
}

