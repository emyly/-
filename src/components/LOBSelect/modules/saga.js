/**
 * Created by liuyali on 2016/11/2.
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_LOB_DATA,
  GET_LOB_DATA_SUCCESS,
  GET_LOB_DATA_ERROR
} from './lobSelect'
import {
  getLOBAPI
} from 'api/authorization'

export function *watchGetLOBData() {
  yield takeEvery(GET_LOB_DATA, handleAPI(getLOBData));
}

function *getLOBData(action) {
  try {
    const response = yield call(getLOBAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_LOB_DATA_SUCCESS,
        response: response.Result.business_lines || []
      })
    } else {
      yield put({
        type: GET_LOB_DATA_ERROR,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_LOB_DATA_ERROR,
      error
    })
  }
}
