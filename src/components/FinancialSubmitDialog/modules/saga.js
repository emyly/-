/**
 * Created by NXQ on 2017/1/9.
 */


import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA,
  POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA_SUCCESS
} from './financialSubmitDialog'

import {
  postUrgentLogisticsCreateAPI,  // 添加物流、加急
  postDiscountCreateAPI,         // 添加订单折扣
  postBadebtCreateAPI            // 添加销售坏账
} from 'api/financial'

import Constant from 'lib/constant'

import _ from 'lodash';

function * postFinancialExpressOrLogisticsData(action) {
  let response;
  if (action.payload.type === Constant.SAAS.financial.LOGISTICS || action.payload.type === Constant.SAAS.financial.URGENT) {
    response = yield call(postUrgentLogisticsCreateAPI, { ddid: action.payload.ddid, body: action.payload.body });
  } else if (action.payload.type === Constant.SAAS.financial.DISCOUNT) {
    response = yield call(postDiscountCreateAPI, { ddid: action.payload.ddid, body: action.payload.body });
  } else if (action.payload.type === Constant.SAAS.financial.BADDEBTS) {
    response = yield call(postBadebtCreateAPI, { body: action.payload.body });
  }
  if (response.Code === 0) {
    yield put({
      type: POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA_SUCCESS,
      actionType: action.payload.type
    })
  }
}

export function * watchPostFinancialExpressOrLogisticsData() {
  yield takeEvery(POST_FINANCIAL_EXPRESS_LOGISTICS_SUBMIT_DATA, handleAPI(postFinancialExpressOrLogisticsData));
}

