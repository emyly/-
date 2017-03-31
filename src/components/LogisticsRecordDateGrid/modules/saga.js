/**
 * Created by qyf on 2016/11/3.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_LOGISTICS_R_DATA,
  GET_LOGISTICS_R_DATA_SUCCESS,
  GET_LOGISTICS_R_DATA_FAIL

} from './logisticsRecordDateGrid.js'
import {
  logisticsRecordDataAPI
} from 'api/WLDB'

export function* watchGetLogisticsRData() {
  yield takeEvery(GET_LOGISTICS_R_DATA, handleAPI(getLogisticsRecordDate))
}
// 获取数据
function* getLogisticsRecordDate(action) {
  try {
    const response = yield call(logisticsRecordDataAPI, action.payload);
    const resultArray = response.Result.WLDB || [];
    yield put({
      type: GET_LOGISTICS_R_DATA_SUCCESS,
      response: resultArray
    })
  } catch (error) {
    yield put({
      type: GET_LOGISTICS_R_DATA_FAIL,
      error

    })
  }
}
