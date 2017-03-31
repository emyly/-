/**
 * Created by liuyali on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_BILLSMR_DATA,
  GET_BILLSMR_DATA_SUCCESS,
  GET_BILLSMR_DATA_ERROR
} from './BillSummaryDataGrid'

import {
  getBillSmmryDataAPI
} from 'api/DDB'

export function * watchGetgetBillSmmryData() {
  yield takeEvery(GET_BILLSMR_DATA, handleAPI(GetgetBillSmmryData));
}
function * GetgetBillSmmryData(action) {
  try {
    const response = yield call(getBillSmmryDataAPI, action.payload);

    const resultArray = {
      ddje: response.Result.ZDHZ.DDJE,
      zkje: response.Result.ZDHZ.ZKJE,
      jjje: response.Result.ZDHZ.JJFY,
      ysje: response.Result.ZDHZ.YSJE,
      ykpje: response.Result.ZDHZ.YKPJE,
      wkpje: response.Result.ZDHZ.WKPJE,
      wskje: response.Result.ZDHZ.WSZJE,
      yskje: response.Result.ZDHZ.YSZJE,
      hzje: response.Result.ZDHZ.HZJE,
      wlfy: response.Result.ZDHZ.WLFY,
    }

    yield put({
      type: GET_BILLSMR_DATA_SUCCESS,
      response: resultArray
    })
  } catch (error) {
    yield put({
      type: GET_BILLSMR_DATA_ERROR,
      error
    })
  }
}
