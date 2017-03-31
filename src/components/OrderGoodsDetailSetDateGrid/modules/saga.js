/**
 * Created by qyf on 2016/11/3.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_ORDERGOODS_SETDATA_DATA,
  GET_ORDERGOODS_SETDATA_DATA_SUCCESS,
  GET_ORDERGOODS_SETDATA_DATA_FAIL
} from './orderGoodsDetailSetDateGrid.js'
import {
  orderGoodsDetailAPI
} from 'api/DDB'


export function* watchGetGoodsSetData() {
  yield takeEvery(GET_ORDERGOODS_SETDATA_DATA, handleAPI(getOrderSet_Data))
}

function* getOrderSet_Data(action) {
  try {
    const response = yield call(orderGoodsDetailAPI, action.payload);
    const resultArray = response.Result.DDSPGLB;

    yield put({
      type: GET_ORDERGOODS_SETDATA_DATA_SUCCESS,
      response: resultArray
    })
  } catch (error) {
    yield put({
      type: GET_ORDERGOODS_SETDATA_DATA_FAIL,
      error
    })
  }
}
