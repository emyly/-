/**
 * Created by chenming on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_WAREHOUSEOUTDETAILDIALOG_DATA,
  GET_WAREHOUSEOUTDETAILDIALOG_DATA_SUCCESS,
} from './warehouseOutDetailDialog.js'
import {
  getSingleWareHouseOutDetailAPI,
  getSingleWareHouseOutProductionDetailAPI
} from 'api/CRK'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetWarehouseOutDetailData() {
  yield takeEvery(GET_WAREHOUSEOUTDETAILDIALOG_DATA, handleAPI(getWarehouseOutDetailData))
}

// 从api获取数据
function* getWarehouseOutDetailData(action) {
  const resultArray = [];
  for (let i = 0; i < action.payload.params.length; i++) {
    // 发起多次请求
    const wareHouseOutDetailResponse = yield call(getSingleWareHouseOutDetailAPI, action.payload.params[i]);
    const WareHouseOutProductionDetailResponse = yield call(getSingleWareHouseOutProductionDetailAPI, action.payload.params[i]);
    resultArray.push([wareHouseOutDetailResponse, WareHouseOutProductionDetailResponse]);
  }

  yield put({
    type: GET_WAREHOUSEOUTDETAILDIALOG_DATA_SUCCESS,
    response: resultArray
  })
}
