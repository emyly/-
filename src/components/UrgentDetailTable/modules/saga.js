import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_URGENTDETAIL_DATA,
  GET_URGENTDETAIL_DATA_SUCCESS,
  GET_URGENTDETAIL_DATA_FAIL
} from './urgentDetailTable.js'
import {
  getUrgentDetailAPI
} from 'api/JJFY'

export function* watchGetUrgentDetailData() {
  yield takeEvery(GET_URGENTDETAIL_DATA, handleAPI(getUrgentDetail))
}

function* getUrgentDetail(action) {
  try {
    const response = yield call(getUrgentDetailAPI, action.payload);
    if (response.Code === 0) {
      console.log('getOrderDetail:', response);
      const resultArray = response.Result.MX;

      yield put({
        type: GET_URGENTDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_URGENTDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_URGENTDETAIL_DATA_FAIL,
      response: error
    })
  }
}
