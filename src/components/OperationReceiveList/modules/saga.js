/**
 * Created by chenming on 2016/11/3.
 */


import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_OPERATIONRECEIVELIST_DATA,
  GET_OPERATIONRECEIVELIST_DATA_SUCCESS,
  GET_OPERATIONRECEIVELIST_DATA_FAIL
} from './operationReceiveList.js'
import {
  getOperationReceiveListAPI
} from 'api/CRK'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchOperationReceiveData() {
  yield takeEvery(GET_OPERATIONRECEIVELIST_DATA, handleAPI(getOperationReceiveData))
}

// 从api获取数据
function* getOperationReceiveData(action) {
  try {
    const response = yield call(getOperationReceiveListAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_OPERATIONRECEIVELIST_DATA_SUCCESS,
        response: response.Result,
        currentPage: action.payload.params.page
      })
    } else {
      yield put({
        type: GET_OPERATIONRECEIVELIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_OPERATIONRECEIVELIST_DATA_FAIL,
      response: error
    })
  }


  // const response = yield call(getOperationReceiveListAPI,action.payload);
  // let resultArray=response.Result.DDB;
  // yield put({
  //   type: GET_OPERATIONRECEIVELIST_DATA_SUCCESS,
  //   response:resultArray
  // })
}

