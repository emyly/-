/**
 * Created by chenming on 2016/11/2.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_SENDRECEIVEADDSELECT_DATA,
  GET_SENDRECEIVEADDSELECT_DATA_SUCCESS,
  GET_SENDRECEIVEADDSELECT_DATA_ERROR
} from './sendReceiveAddSelect.js'
import {
  getSendReceiveAddAPI
} from 'api/WLDB'

export function* watchGetSendReceiveAddData() {
  yield takeEvery(GET_SENDRECEIVEADDSELECT_DATA, handleAPI(getSendReceiveAddData))
}

function* getSendReceiveAddData(action) {
  const response = yield call(getSendReceiveAddAPI, action.payload);
  const resultArray = response.Result.ZZJGWLDZB.map(ZZJGWLDZ => ({
    GUID: ZZJGWLDZ.GUID,
    DZ: ZZJGWLDZ.DZ
  }))
  yield put({
    type: GET_SENDRECEIVEADDSELECT_DATA_SUCCESS,
    response: resultArray
  })
}
