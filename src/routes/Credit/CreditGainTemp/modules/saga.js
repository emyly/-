/**
 * Created by NXQ on 11/8/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA,
  GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA_SUCCESS,
  GET_CREDIT_GAIN_QUERY_DATA,
  GET_CREDIT_GAIN_QUERY_DATA_SUCCESS
} from './creditGainTemp';
import {
  getCreditOrganizationToMeListAPI,
  getCreditDetailAPI,
  getCreditDetailValidDateAPI
} from 'api/XY';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetCreditOrganizationToMeListData() {
  yield takeEvery(GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA, handleAPI(getCreditOrganizationToMeListData));
}
export function* watchGetCreditDetailData() {
  yield takeEvery(GET_CREDIT_GAIN_QUERY_DATA, handleAPI(getCreditDetailData));
}

// 获取授信于我的公司列表
function* getCreditOrganizationToMeListData(action) {
  const response = yield call(getCreditOrganizationToMeListAPI, action.payload);
  const resultResponse = response.Result.JXSXYB || [];
  const creditResultResponse = [];
  if (resultResponse.length) {
    for (const i in resultResponse) {
      if (i < resultResponse.length) {
        const creditResult = yield call(getCreditDetailAPI, {
          AuthorizeOrganizationId: resultResponse[i].SQJXSID,
          AuthorizedOrganizationId: action.payload.id
        });
        const validDateResult = yield call(getCreditDetailValidDateAPI, {
          AuthorizeOrganizationId: resultResponse[i].SQJXSID,
          AuthorizedOrganizationId: action.payload.id
        });
        creditResultResponse.push({ ...resultResponse[i], ...(creditResult.Result.JXSXYB || {}), ...(validDateResult.Result.JXSXYMXB || {}) })
      }
    }
  }
  yield put({
    type: GET_CREDIT_ORGANIZATION_TO_ME_LIST_DATA_SUCCESS,
    response: creditResultResponse
  })
}

// 经销商信用查询
function* getCreditDetailData(action) {
  const creditResponse = yield call(getCreditDetailAPI, action.payload);
  const validDateResponse = yield call(getCreditDetailValidDateAPI, action.payload);
  const creditResponseObj = creditResponse.Result.JXSXYB || {};
  const validDateResponseObj = validDateResponse.Result.JXSXYMXB || {};

  yield put({
    type: GET_CREDIT_GAIN_QUERY_DATA_SUCCESS,
    responseObj: { ...creditResponseObj, ...validDateResponseObj, ...action.payload },
    creditResponse: creditResponse.Result.JXSXYB || {},
    validDateResponse: validDateResponse.Result.JXSXYMXB || {}
  })
}
