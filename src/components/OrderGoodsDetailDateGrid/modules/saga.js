/**
 * Created by qyf on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_ORDERGOOGS_D_DATA,
  GET_ORDERGOOGS_D_DATA_SUCCESS,
  GET_ORDERGOOGS_D_DATA_FAIL
} from './orderGoodsDetailDateGrid.js'
import {
  orderGoodsDetailAPI
} from 'api/DDB'

export function* watchGetOrderGoods() {
  yield takeEvery(GET_ORDERGOOGS_D_DATA, handleAPI(getGoodsDetail_Date))
}
// 获取数据
function* getGoodsDetail_Date(action) {
  try {
    const response = yield call(orderGoodsDetailAPI, action.payload);
    const resultArray = response.Result.DDSPGLB;

    yield put({
      type: GET_ORDERGOOGS_D_DATA_SUCCESS,
      response: resultArray
    })
  } catch (error) {
    yield put({
      type: GET_ORDERGOOGS_D_DATA_FAIL,
      error
    })
  }
}
