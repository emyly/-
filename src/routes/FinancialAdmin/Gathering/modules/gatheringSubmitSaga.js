/**
 * Created by NXQ on 2/14/2017.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  POST_GATHERING_SUBMIT_DATA,
  POST_GATHERING_SUBMIT_DATA_SUCCESS,
  POST_GATHERING_SUBMIT_DATA_FAIL,
  GET_GATHERING_ONE_DEPOSIT_DATA,
  GET_GATHERING_ONE_DEPOSIT_DATA_SUCCESS,
  GET_GATHERING_BATCH_SALES_ORDER_DATA,
  GET_GATHERING_BATCH_SALES_ORDER_DATA_SUCCESS
} from './gatheringSubmit';
import {
  postSalesCreateAPI,
  getOneDepositDataAPI,
  getOrderCheckDetailAPI
} from 'api/financial';

import _ from 'lodash';

function* postGatheringSubmitData(action) {
  const response = yield call(postSalesCreateAPI, { body: action.payload });            // 销售开票创建
  if (response.Code === 0) {
    yield put({
      type: POST_GATHERING_SUBMIT_DATA_SUCCESS
    })
  } else {
    yield put({
      type: POST_GATHERING_SUBMIT_DATA_FAIL
    });
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchPostGatheringSubmitData() {
  yield takeEvery(POST_GATHERING_SUBMIT_DATA, handleAPI(postGatheringSubmitData));
}


function* getGatheringOneDepositData(action) {
  const response = yield call(getOneDepositDataAPI, { body: action.payload });            // 销售开票创建
  if (response.Code === 0) {
    if (_.has(response.Result, 'JXSYJB')) {
      yield put({
        type: GET_GATHERING_ONE_DEPOSIT_DATA_SUCCESS,
        responseData: response.Result.JXSYJB.JE || -1
      })
    }
  }
}

export function* watchGetGatheringOneDepositData() {
  yield takeEvery(GET_GATHERING_ONE_DEPOSIT_DATA, handleAPI(getGatheringOneDepositData));
}


function* getGatheringBatchSalesOrderData(action) {
  const responseArray = action.payload;
  for (let i = 0; i < responseArray.length; ++i) {
    const response = yield call(getOrderCheckDetailAPI, { ddid: responseArray[i].GUID });            // 批量获取订单的销售单详情
    if (response.Code === 0 && _.has(response.Result, 'XSDB')) {
      responseArray[i].XSDB = response.Result.XSDB.map(value => ({ isSelected: false, ...value })) || [];
      responseArray[i].isClicked = false;                // 是否被点击
      responseArray[i].isSelected = false;               // 是否被选中
      responseArray[i].checkboxIconStyle = {}            // checkbox iconStyle
      responseArray[i].gatheringAmount = 0              // 收款总金额
    }
  }
  yield put({
    type: GET_GATHERING_BATCH_SALES_ORDER_DATA_SUCCESS,
    responseData: responseArray
  })
}

export function* watchGetGatheringBatchSalesOrderData() {
  yield takeEvery(GET_GATHERING_BATCH_SALES_ORDER_DATA, handleAPI(getGatheringBatchSalesOrderData));
}

