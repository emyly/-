/**
 * Created by NXQ on 2017/1/9.
 */


import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_FINANCIAL_BILL_SUMMARY_DATA,
  GET_FINANCIAL_BILL_SUMMARY_DATA_SUCCESS
} from './financialBillSummaryDataGrid'

import {
  getOrderSummaryAPI
} from 'api/financial'

import _ from 'lodash';

function * getFinancialBillSmmryData(action) {
  const response = yield call(getOrderSummaryAPI, action.payload);
  if (response.Code === 0 && _.has(response.Result, 'ZDHZ')) {
    const resultArray = {
        ddje: response.Result.ZDHZ.DDJE,
        zkje: response.Result.ZDHZ.ZKJE,
        jjje: response.Result.ZDHZ.JJFY,
        ysje: response.Result.ZDHZ.YSJE,
        ykpje: response.Result.ZDHZ.YKPJE,
        wkpje: response.Result.ZDHZ.WKPJE,
        wskje: response.Result.ZDHZ.WSZJE,
        yskje: response.Result.ZDHZ.YSZJE,
        hzje: response.Result.ZDHZ.HZJE,
        wlfy: response.Result.ZDHZ.WLFY,
      }

    yield put({
        type: GET_FINANCIAL_BILL_SUMMARY_DATA_SUCCESS,
        response: resultArray
      })
  }
}

export function * watchGetFinancialBillSmmryData() {
  yield takeEvery(GET_FINANCIAL_BILL_SUMMARY_DATA, handleAPI(getFinancialBillSmmryData));
}

