import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_PICK_PRODUCTION_DATA,
  GET_PICK_PRODUCTION_DATA_SUCCESS,
} from './pickProductionDialog.js'
import {
  getPickProductionDataAPI
} from 'api/CRK'


/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetPickProductionData() {
  yield takeEvery(GET_PICK_PRODUCTION_DATA, handleAPI(getPickProductionData))
}

// 从api获取数据
function* getPickProductionData(action) {
  const response = yield call(getPickProductionDataAPI, action.payload);
  yield put({
    type: GET_PICK_PRODUCTION_DATA_SUCCESS,
    response: response.Result.KWSPGLB
  })
}
