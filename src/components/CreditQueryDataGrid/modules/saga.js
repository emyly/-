/**
 * Created by NXQ on 11/4/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';
import _ from 'lodash';

import {
  GET_CREDIT_QUERY_DATA,
  GET_CREDIT_QUERY_DATA_SUCCESS,
} from './creditQueryDataGrid.js';
import {
  getCreditOrganizationListAPI
} from 'api/XY';
import {
  getPartnerAPI
} from 'api/ZZJGB';

const debug = require('debug')('creditAPI:');

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetCreditQueryData() {
  yield takeEvery(GET_CREDIT_QUERY_DATA, handleAPI(getCreditQueryData));
}

// 从api获取数据
function* getCreditQueryData(action) {
  const creditResponse = yield call(getCreditOrganizationListAPI, action.payload);
  const parthnerResponse = yield call(getPartnerAPI, action.payload);
  const creditArray = creditResponse.Result.JXSXYB.map(value => ({
    BSQJXSID: value.BSQJXSID,
    JGMC: value.JGMC ? value.JGMC : '机构无名称'
  }));
  const creditTotal = creditArray.length;
  const creditDyadicArray = _.chunk(creditArray, 5);   // 5个一组chunk成一个二维数组供页面显示

  let noCreditArray = [];
  const parthnerArray = parthnerResponse.Result.JXSGXB.map(value => ({
    BSQJXSID: value.GLJXSID,
    JGMC: value.ZZJGB.JGMC ? value.ZZJGB.JGMC : '机构无名称'
  }));
  if (parthnerArray.length) {
    noCreditArray = _.differenceBy(parthnerArray, creditArray, 'BSQJXSID');  // 获取未授信的合作伙伴
  }

  const noCreditTotal = noCreditArray.length;
  const noCreditDyadicArray = _.chunk(noCreditArray, 5);   // 5个一组chunk成一个二维数组供页面显示

  yield put({
    type: GET_CREDIT_QUERY_DATA_SUCCESS,
    creditResponse: creditDyadicArray,
    creditTotalResponse: creditTotal,
    noCreditResponse: noCreditDyadicArray,
    noCreditTotalResponse: noCreditTotal,

  })
}

