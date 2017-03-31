/**
 * Created by wangming on 11/15/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';
import _ from 'lodash';

import {
	GET_DISTRIBUTION_SUMMARY_DATA,
	GET_DISTRIBUTION_SUMMARY_DATA_SUCCESS,
	GET_DISTRIBUTION_SUMMARY_DATA_FAIL,
} from './distributionSummary';
import {
	getWarehouseInOutGoodsSummaryAPI
} from 'api/CRK';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetWarehouseInOutGoodsSummary() {
  yield takeEvery(GET_DISTRIBUTION_SUMMARY_DATA, handleAPI(getWarehouseInOutGoodsSummary));
}

function* getWarehouseInOutGoodsSummary(action) {
  try {
    const response = yield call(getWarehouseInOutGoodsSummaryAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.CRKMXB;
      console.debug('getWarehouseInOutGoodsSummary: 3', response);
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

