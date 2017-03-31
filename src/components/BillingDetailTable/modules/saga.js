import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_BILLINGEDDETAIL_DATA,
  GET_BILLINGEDDETAIL_DATA_SUCCESS,
  GET_BILLINGEDDETAIL_DATA_FAIL,
  GET_UNBILLINGDETAIL_DATA,
  GET_UNBILLINGDETAIL_DATA_SUCCESS,
  GET_UNBILLINGDETAIL_DATA_FAIL
} from './billingDetailTable.js'
import {
  getOrderBillingedDetailAPI,
  getOrderUnbillingDetailAPI
} from 'api/DDB'

export function* watchGetOrderBillingedDetailData() {
  yield takeEvery(GET_BILLINGEDDETAIL_DATA, handleAPI(getOrderBillingedDetail))
}

export function* watchGetOrderUnbillingDetailData() {
  yield takeEvery(GET_UNBILLINGDETAIL_DATA, handleAPI(getOrderUnbillingDetail))
}

function* getOrderBillingedDetail(action) {
  try {
    const response = yield call(getOrderBillingedDetailAPI, action.payload);
    if (response.Code === 0) {
      console.log('getOrderBillingedDetail:', response);
      const resultArray = response.Result.YKPMX;

      yield put({
        type: GET_BILLINGEDDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_BILLINGEDDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_BILLINGEDDETAIL_DATA_FAIL,
      response: error
    })
  }
}

function* getOrderUnbillingDetail(action) {
  try {
    const response = yield call(getOrderUnbillingDetailAPI, action.payload);
    if (response.Code === 0) {
      console.log('getOrderUnbillingDetail:', response);
      const resultArray = response.Result.WKPMX;

      yield put({
        type: GET_UNBILLINGDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_UNBILLINGDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_UNBILLINGDETAIL_DATA_FAIL,
      response: error
    })
  }
}
