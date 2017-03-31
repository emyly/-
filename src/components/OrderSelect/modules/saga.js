/**
 * Created by sjf on 2016/11/2.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_ORDER_DATA,
  GET_ORDER_DATA_SUCCESS
} from './orderSelect.js'
import {
  getOrderAPI
} from 'api/DDB'

export function* watchGetOrderData() {
  yield takeEvery(GET_ORDER_DATA, handleAPI(getOrderData))
}

function* getOrderData(action) {
  const response = yield call(getOrderAPI, action.payload);
  yield put({
    type: GET_ORDER_DATA_SUCCESS,
    response: response.Result.DDB
  })
}
