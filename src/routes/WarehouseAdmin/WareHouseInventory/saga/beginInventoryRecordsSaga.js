/**
 * Created by liuyali on 2016/11/9.
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  getInventoryRecordsData
} from '../modules/getInventoryRecords'

import {
  BENGIN_INVENTORYRECORDS,
  BENGIN_INVENTORYRECORDS_SUCCESS,
  BENGIN_INVENTORYRECORDS_ERROR,
  CHEK_INVENTORY_STATUS,
  CHEK_INVENTORY_STATUS_SUCCESS,
  CHEK_INVENTORY_STATUS_ERROR,
} from '../modules/beginInventoryRecords'

import {
  beiginInventoryRecordsAPI, getInventoryStatusAPI
} from 'api/PCHSY'

function *checkInventoryStatus(action) {
  try {
    yield call(getInventoryStatusAPI, action.id);

    yield put({
      type: CHEK_INVENTORY_STATUS_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: CHEK_INVENTORY_STATUS_ERROR,
      error
    })
  }
}

function* beiginInventoryRecords(action) {
  try {
    yield call(beiginInventoryRecordsAPI, action.payload);

    yield put({
      type: BENGIN_INVENTORYRECORDS_SUCCESS,
    })

    // 返回到第一页
    yield put(getInventoryRecordsData());
  } catch (error) {
    yield put({
      type: BENGIN_INVENTORYRECORDS_ERROR,
      error
    })
  }
}

/* 开始盘存*/
export function * watchBeiginInventoryRecords() {
  yield takeEvery(BENGIN_INVENTORYRECORDS, handleAPI(beiginInventoryRecords))
}
/* 查看盘存仓库状态*/
export function *watchCheckInventoryStatus() {
  yield takeEvery(CHEK_INVENTORY_STATUS, handleAPI(checkInventoryStatus))
}
