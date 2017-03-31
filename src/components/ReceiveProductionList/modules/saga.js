/**
 * Created by chenming on 2016/11/3.
 */


import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_RECEIVEPRODUCTIONLIST_DATA,
  GET_RECEIVEPRODUCTIONLIST_DATA_SUCCESS,
  GET_RECEIVEPRODUCTIONLIST_DATA_FAIL
} from './receiveProductionList.js'
import {
  getReceiveProductuonListAPI
} from 'api/WLDB'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetReceiveProductionData() {
  yield takeEvery(GET_RECEIVEPRODUCTIONLIST_DATA, handleAPI(getReceiveProductionData))
}

// 从api获取数据
function* getReceiveProductionData(action) {
  try {
    const response = yield call(getReceiveProductuonListAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_RECEIVEPRODUCTIONLIST_DATA_SUCCESS,
        response: response.Result,
        currentPage: action.payload.params.page
      })
    } else {
      yield put({
        type: GET_RECEIVEPRODUCTIONLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_RECEIVEPRODUCTIONLIST_DATA_FAIL,
      response: error
    })
  }
}

