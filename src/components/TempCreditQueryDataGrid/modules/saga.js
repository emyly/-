/**
 * Created by NXQ on 11/4/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_TEMP_CREDIT_QUERY_DATA,
  GET_TEMP_CREDIT_QUERY_DATA_SUCCESS,
  DELETE_SING_TEMP_CREDIT_QUERY_DATA,
  DELETE_SING_TEMP_CREDIT_QUERY_DATA_SUCCESS
} from './tempCreditQueryDataGrid';
import {
  getTempCreditDetailAPI,
  deleteSingleTempCreditAPI
} from 'api/XY';

import moment from 'components/Moment'

const debug = require('debug')('tempCreditAPI:');

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetTempCreditQueryData() {
  yield takeEvery(GET_TEMP_CREDIT_QUERY_DATA, handleAPI(getTempCreditQueryData));
}

export function* watchDeleteTempCreditQueryData() {
  yield takeEvery(DELETE_SING_TEMP_CREDIT_QUERY_DATA, handleAPI(deleteSingleTempCreditData));
}

// 从api获取数据
function* getTempCreditQueryData(action) {
  const tempCreditResponse = yield call(getTempCreditDetailAPI, action.payload);
  let sortArray = [];
  if (_.has(tempCreditResponse.Result, 'JXSXYMXB')) {
    sortArray = tempCreditResponse.Result.JXSXYMXB.sort((preValue, nextValue) => (nextValue.YXQZ - preValue.YXQZ));
    sortArray.map((value) => {
      value.YXQS = moment(value.YXQS).format('YYYY-MM-DD');
      value.YXQZ = moment(value.YXQZ).format('YYYY-MM-DD');
    });
  }
  yield put({
    type: GET_TEMP_CREDIT_QUERY_DATA_SUCCESS,
    tempCreditResponse: sortArray || [] // 后期把后台接口重新修改一下返回值JXSXYMXB
  })
}

// 从api获取数据
function* deleteSingleTempCreditData(action) {
  yield call(deleteSingleTempCreditAPI, action.payload);
  yield put({
    type: DELETE_SING_TEMP_CREDIT_QUERY_DATA_SUCCESS,
    deleteObject: action.payload
  })
}

