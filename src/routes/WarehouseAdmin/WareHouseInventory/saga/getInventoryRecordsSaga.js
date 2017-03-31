/**
 * Created by liuyali on 2016/11/9.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_INVENTORYRECORDS_DATA,
  GET_INVENTORYRECORDS_DATA_SUCCESS,
  GET_INVENTORYRECORDS_DATA_ERROR
} from '../modules/getInventoryRecords'

import {
  getInventoryRecordsAPI,
} from 'api/PCHSY'

/* 获取盘存记录*/
export function * watchGetInventoryRecords() {
  yield takeEvery(GET_INVENTORYRECORDS_DATA, handleAPI(getInventoryRecords));
}

function* getInventoryRecords(action) {
  try {
    const response = yield call(getInventoryRecordsAPI, action.payload.page);
    let resultArr = response.Result.KCPDB;
    resultArr = resultArr.map((result, index) => ({
      GUID: result.GUID,
      PDZT: result.PDZT,
      KSSJ: result.KSSJ,
      JSSJ: result.JSSJ,
      PCLJ: result.CKLJ,
      inventory: result.PDMC,
      inventoryStartDate: result.KSSJ,
      inventoryEndDate: result.JSSJ,
      inventoryOperator: result.YHXM,
    }));
    yield put({
      type: GET_INVENTORYRECORDS_DATA_SUCCESS,
      payload: {
        resultArr,
        cPage: action.payload.page,
        total: response.Result.Total
      }
    })
  } catch (error) {
    yield put({
      type: GET_INVENTORYRECORDS_DATA_ERROR,
      error
    })
  }
}
