/**
 * Created by chenming on 2016/11/2.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_LOGISTIC_DATA,
  GET_LOGISTIC_DATA_SUCCESS,
  GET_LOGISTIC_DATA_ERROR
} from './logisticsSelect.js'
import {
  getLogisticAPI
} from 'api/WLDB'

export function* watchGetLogisticData() {
  yield takeEvery(GET_LOGISTIC_DATA, handleAPI(getLogisticData))
}

function* getLogisticData(action) {
  const response = yield call(getLogisticAPI, action.payload);
  const resultArray = response.Result.WLGSB.map(WLD => ({
    GUID: WLD.GUID,
    GSMC: WLD.GSMC
  }))
  yield put({
    type: GET_LOGISTIC_DATA_SUCCESS,
    response: resultArray
  })
}
