/**
 * Created by wangming on 2016/1/9.
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_FINANCIAL_BILLING_DETAIL,
  GET_FINANCIAL_BILLING_DETAIL_SUCCESS,
  GET_FINANCIAL_BILLING_DETAIL_FAIL
} from './financialBillingDetail.js';

import {
  getOrderCheckDetailAPI
} from 'api/financial';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */

// 从api获取数据
function *getOrderCheckDetail(action) {
  try {
    const response = yield call(getOrderCheckDetailAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIAL_BILLING_DETAIL_SUCCESS,
        response: response.Result.XSDB
      })
    } else {
      yield put({
        type: GET_FINANCIAL_BILLING_DETAIL_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIAL_BILLING_DETAIL_FAIL,
      response: error
    })
  }
}

export function *watchGetOrderCheckDetail() {
  yield takeEvery(GET_FINANCIAL_BILLING_DETAIL, handleAPI(getOrderCheckDetail));
}
