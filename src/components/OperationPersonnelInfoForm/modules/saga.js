import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_OPORDERDETAIL_DATA,
  GET_OPORDERDETAIL_DATA_SUCCESS,
  GET_OPORDERDETAIL_DATA_FAIL
} from './operationPersonnelInfoForm.js'
import {
  getOrderDetailAPI
} from 'api/DDB'

export function* watchOPGetOrderDetailData() {
  yield takeEvery(GET_OPORDERDETAIL_DATA, handleAPI(getOrderDetail))
}

function* getOrderDetail(action) {
  try {
    const response = yield call(getOrderDetailAPI, action.payload);
    if (response.Code === 0) {
      console.log('getOrderDetail:', response);
      const resultArray = response.Result.DDB;

      yield put({
        type: GET_OPORDERDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_OPORDERDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (eror) {
    yield put({
      type: GET_OPORDERDETAIL_DATA_FAIL,
      response: error
    })
  }
}
