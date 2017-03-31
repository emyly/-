/**
 * Created by liuyali on 2016/11/9.
 */
/**
 * Created by liuyali on 2016/11/8.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  PRINT_INVENTORYRECORDS,
  PRINT_INVENTORYRECORDS_SUCCESS,
  PRINT_INVENTORYRECORDS_ERROR
} from '../modules/printInventoryRecords'

import {
  printInventoryRecordsAPI
} from 'api/PCHSY'

/* 打印盘存*/
export function * watchPrintInventoryRecords() {
  yield takeEvery(PRINT_INVENTORYRECORDS, handleAPI(printInventoryRecords))
}

function* printInventoryRecords(action) {
  try {
    const response = yield call(printInventoryRecordsAPI, action.payload.id);
    let resultArr = response.Result.KCPDMXB;
    resultArr = resultArr.map((result, index) => ({
      index: index + 1,
      goodsName: result.SPMC,
      brand: result.PPMC,
      materialNum: result.SPBH,
      inventoryPosition: result.KWLJ,
      batchNum: result.SPPH,
      amount: result.SL,
      checkCol: ''
    }));

    yield put({
      type: PRINT_INVENTORYRECORDS_SUCCESS,
      response: resultArr
    })
  } catch (error) {
    yield put({
      type: PRINT_INVENTORYRECORDS_ERROR,
      error
    })
  }
}
