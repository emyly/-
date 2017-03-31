import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_PARTNER_DATA,
  GET_PARTNER_DATA_SUCCESS,
} from './partnerSelect.js'
import {
  getPartnerAPI
} from 'api/ZZJGB'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetPartnerData() {
  yield takeEvery(GET_PARTNER_DATA, handleAPI(getPartnerData))
}

// 从api获取数据
function* getPartnerData(action) {
  const response = yield call(getPartnerAPI, action.payload);
  const resultArray = response.Result.JXSGXB.map(ZZJG => ({
    GUID: ZZJG.ZZJGB.GUID,
    JGMC: ZZJG.ZZJGB.JGMC
  }))
  yield put({
    type: GET_PARTNER_DATA_SUCCESS,
    response: resultArray
  })
}
