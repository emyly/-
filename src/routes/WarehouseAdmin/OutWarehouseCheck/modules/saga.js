import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  POST_OUTWARE_CHECK_DATA,
  POST_OUTWARE_CHECK_SUCCESS,
  POST_OUTWARE_CHECK_ERROR
} from './outWarehouseCheckDetail.js'

import { postOutWarehouseCheckAPI } from 'api/CRK'

export function* watchPostOutWarehouseCheck() {
  yield takeEvery(POST_OUTWARE_CHECK_DATA, handleAPI(postWarehouseOutCheck))
}


export function* postWarehouseOutCheck(action) {
  try {
    const response = yield call(postOutWarehouseCheckAPI, action.payload);
    yield put({
      type: POST_OUTWARE_CHECK_SUCCESS,
      response
    })
  } catch (error) {
    yield put({
      type: POST_OUTWARE_CHECK_ERROR
    })
  }
}
