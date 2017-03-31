/**
 * Created by NXQ on 2017/1/12.
 */


import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  POST_FINANCIAL_VERIFICATION_SUBMIT_DATA,
  POST_FINANCIAL_VERIFICATION_SUBMIT_DATA_SUCCESS
} from './verification'

import {
  postVerificationAPI            // 核销
} from 'api/financial'


function * postFinancialVerificationData(action) {
  let response = yield call(postVerificationAPI, { body: action.payload.body });
  if (response.Code === 0) {
    yield put({
      type: POST_FINANCIAL_VERIFICATION_SUBMIT_DATA_SUCCESS
    })
  }
}

export function * watchPostFinancialVerificationData() {
  yield takeEvery(POST_FINANCIAL_VERIFICATION_SUBMIT_DATA, handleAPI(postFinancialVerificationData));
}

