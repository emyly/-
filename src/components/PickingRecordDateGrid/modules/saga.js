/**
 * Created by wrq on 2016/11/3.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_PICKING_R_DATA,
  GET_PICKING_R_DATA_SUCCESS,
  GET_PICKING_R_DATA_FAIL
} from './pickingRecordDateGrid.js'
import {
  logisticsRecordDataAPI
} from 'api/WLDB'

export function* watchGetPickingRecordData() {
  yield takeEvery(GET_PICKING_R_DATA, handleAPI(getPickingRecordDate))
}
// 获取数据
function* getPickingRecordDate(action) {
  try {
    const response = yield call(logisticsRecordDataAPI, action.payload);
    const resultArray = response.Result.WLDB;
    yield put({
      type: GET_PICKING_R_DATA_SUCCESS,
      response: resultArray
    })
  } catch (error) {
    yield put({
      type: GET_PICKING_R_DATA_FAIL,
      error
    })
  }
}
