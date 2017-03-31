/**
 * Created by NXQ on 2/14/2017.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  POST_BILLING_BATCH_SUBMIT_DATA,
  POST_BILLING_BATCH_SUBMIT_DATA_SUCCESS,
  POST_BILLING_BATCH_SUBMIT_DATA_FAIL
} from './billingBatchSubmit';
import {
  postSalesBillingAPI
} from 'api/financial';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchPostBillingBatchSubmitData() {
  yield takeEvery(POST_BILLING_BATCH_SUBMIT_DATA, handleAPI(postBillingBatchSubmitData));
}

// 创建经销商信用
function* postBillingBatchSubmitData(action) {
  const response = yield call(postSalesBillingAPI, {body: action.payload});            // 销售开票创建
  if (response.Code === 0) {
    yield put({
      type: POST_BILLING_BATCH_SUBMIT_DATA_SUCCESS
    })
  } else {
    yield put({
      type: POST_BILLING_BATCH_SUBMIT_DATA_FAIL
    });
  }
}
