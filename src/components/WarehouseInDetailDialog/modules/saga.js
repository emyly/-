/**
 * Created by chenming on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_WAREHOUSEINDETAILDIALOG_DATA,
  GET_WAREHOUSEINDETAILDIALOG_DATA_SUCCESS,
} from './warehouseInDetailDialog.js'
import {
  getSingleWareHouseOutDetailAPI,
  getSingleWareHouseOutProductionDetailAPI
} from 'api/CRK'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetWarehouseInDetailData() {
  yield takeEvery(GET_WAREHOUSEINDETAILDIALOG_DATA, handleAPI(getWarehouseInDetailData))
}

// 从api获取数据
function* getWarehouseInDetailData(action) {
  const resultArray = [];
  for (let i = 0; i < action.payload.params.length; i++) {
    // 发起多次请求
    const wareHouseOutDetailResponse = yield call(getSingleWareHouseOutDetailAPI, action.payload.params[i]);
    const WareHouseOutProductionDetailResponse = yield call(getSingleWareHouseOutProductionDetailAPI, action.payload.params[i]);
    // let oneRequestDataArray = [];
    // oneRequestDataArray.push(wareHouseOutDetailResponse);
    // oneRequestDataArray.push(WareHouseOutProductionDetailResponse);
    resultArray.push([wareHouseOutDetailResponse, WareHouseOutProductionDetailResponse]);
  }
  yield put({
    type: GET_WAREHOUSEINDETAILDIALOG_DATA_SUCCESS,
    response: resultArray
  })
}
