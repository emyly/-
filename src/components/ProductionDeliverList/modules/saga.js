/**
 * Created by chenming on 2016/11/3.
 */


import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_PRODUCTIONDELIVERLIST_DATA,
  GET_PRODUCTIONDELIVERLIST_DATA_SUCCESS,
  GET_PRODUCTIONDELIVERLIST_DATA_FAIL
} from './productionDeliverList.js'
import {
  getLogisticsSendListAPI
} from 'api/WLDB'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchProductionDeliverList() {
  yield takeEvery(GET_PRODUCTIONDELIVERLIST_DATA, handleAPI(getProductionDeliverData))
}

// 从api获取数据
function* getProductionDeliverData(action) {
  try {
    const response = yield call(getLogisticsSendListAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_PRODUCTIONDELIVERLIST_DATA_SUCCESS,
        response: response.Result,
        currentPage: action.payload.params.page
      })
    } else {
      yield put({
        type: GET_PRODUCTIONDELIVERLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_PRODUCTIONDELIVERLIST_DATA_FAIL,
      response: error
    })
  }
}

