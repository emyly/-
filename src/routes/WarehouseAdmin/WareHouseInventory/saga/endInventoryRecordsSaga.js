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
  END_INVENTORYRECORDS,
  END_INVENTORYRECORDS_SUCCESS,
  END_INVENTORYRECORDS_ERROR
} from '../modules/endInventoryRecords'

import {
  GET_INVENTORYRECORDS_DATA,
  getInventoryRecordsData
} from '../modules/getInventoryRecords'

import {
  endInventoryRecordsAPI,
} from 'api/PCHSY'


/* 结束盘存*/
export function * watchEndInventoryRecords() {
  yield takeEvery(END_INVENTORYRECORDS, handleAPI(endInventoryRecords))
}

function* endInventoryRecords(action) {
  try {
    const response = yield call(endInventoryRecordsAPI, action.payload.id);
    yield put({
      type: END_INVENTORYRECORDS_SUCCESS,
      action: response
    });

    /* 从新获取当前页内容，从而刷新被结束条目状态*/
    yield put(getInventoryRecordsData(action.payload.currentPage));
  } catch (error) {
    yield put({
      type: END_INVENTORYRECORDS_ERROR,
      error
    })
  }
}
