/**
 * Created by chenming on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_STORAGEOUTRECHECKLIST_DATA,
  GET_STORAGEOUTRECHECKLIST_DATA_SUCCESS,
  GET_STORAGEOUTRECHECKLIST_DATA_FAIL,
} from './storageOutRecheckList.js'
import {
  getStorageOutRecheckListAPI
} from 'api/CRK'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function *watchGetStorageOutRecheckData() {
  yield takeEvery(GET_STORAGEOUTRECHECKLIST_DATA, handleAPI(getPickingProductionData))
}

// 从api获取数据
function *getPickingProductionData(action) {
  try {
    const response = yield call(getStorageOutRecheckListAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_STORAGEOUTRECHECKLIST_DATA_SUCCESS,
        response: response.Result,
        currentPage: action.payload.params.page
      })
    } else {
      yield put({
        type: GET_STORAGEOUTRECHECKLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_STORAGEOUTRECHECKLIST_DATA_FAIL,
      response: error
    })
  }
}
