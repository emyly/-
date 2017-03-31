import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_DISCOUNTDETAIL_DATA,
  GET_DISCOUNTDETAIL_DATA_SUCCESS,
  GET_DISCOUNTDETAIL_DATA_FAIL
} from './discountDetailTable.js'
import {
  getDiscountDetailAPI
} from 'api/ZK'

export function* watchGetDiscountDetailData() {
  yield takeEvery(GET_DISCOUNTDETAIL_DATA, handleAPI(getDiscountDetail))
}

function* getDiscountDetail(action) {
  try {
    const response = yield call(getDiscountDetailAPI, action.payload);
    if (response.Code === 0) {
      console.log('getOrderDetail:', response);
      const resultArray = response.Result.MX;

      yield put({
        type: GET_DISCOUNTDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_DISCOUNTDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_DISCOUNTDETAIL_DATA_FAIL,
      response: error
    })
  }
}
