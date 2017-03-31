/**
 * Created by chenming on 2016/11/3.
 */


import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_OPERATIONRECEIVERECHECKLIST_DATA,
  GET_OPERATIONRECEIVERECHECKLIST_DATA_SUCCESS,
  GET_OPERATIONRECEIVERECHECKLIST_DATA_FAIL
} from './operationReceiveRecheckList.js'
import {
  getStorageOutRecheckListAPI
} from 'api/CRK'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchOperationReceiveRecheckData() {
  yield takeEvery(GET_OPERATIONRECEIVERECHECKLIST_DATA, handleAPI(getOperationReceiveRecheckData))
}

// 从api获取数据
function* getOperationReceiveRecheckData(action) {
  try {
    const response = yield call(getStorageOutRecheckListAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_OPERATIONRECEIVERECHECKLIST_DATA_SUCCESS,
        response: response.Result,
        currentPage: action.payload.params.page
      })
    } else {
      yield put({
        type: GET_OPERATIONRECEIVERECHECKLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_OPERATIONRECEIVERECHECKLIST_DATA_FAIL,
      response: error
    })
  }
}

