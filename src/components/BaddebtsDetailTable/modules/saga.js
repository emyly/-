import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_BADDEBTSDETAIL_DATA,
  GET_BADDEBTSDETAIL_DATA_SUCCESS,
  GET_BADDEBTSDETAIL_DATA_FAIL
} from './baddebtsDetailTable.js'
import {
  getBaddebtsDetailAPI
} from 'api/SSHZ'

export function* watchGetBaddebtsDetailData() {
  yield takeEvery(GET_BADDEBTSDETAIL_DATA, handleAPI(getBaddebtsDetail))
}

function* getBaddebtsDetail(action) {
  try {
    if (response.Code === 0) {
      const response = yield call(getBaddebtsDetailAPI, action.payload);
      console.log('getOrderDetail:', response);
      const resultArray = response.Result.HZMX;

      yield put({
        type: GET_BADDEBTSDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_BADDEBTSDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_BADDEBTSDETAIL_DATA_FAIL,
      response: error
    })
  }
}
