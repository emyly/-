/**
 * Created by chenming on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_ORDERRECHECKLIST_DATA,
  GET_ORDERRECHECKLIST_DATA_SUCCESS,
  GET_ORDERRECHECKLIST_DATA_FAIL
} from './orderRecheckList.js'
import {
  getOrderListAPI
} from 'api/DDB'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetOrderRecheckListData() {
  yield takeEvery(GET_ORDERRECHECKLIST_DATA, handleAPI(getOrderListData))
}

// 从api获取数据
function* getOrderListData(action) {
  try {
    const response = yield call(getOrderListAPI, action.payload);
    console.log('response', response);
    if (response.Code === 0) {
      yield put({
        type: GET_ORDERRECHECKLIST_DATA_SUCCESS,
        response: response.Result,
        currentPage: action.payload.params.page
      })
    } else {
      yield put({
        type: GET_ORDERRECHECKLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_ORDERRECHECKLIST_DATA_FAIL,
      response: error
    })
  }
}
