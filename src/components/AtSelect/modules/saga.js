/**
 * Created by wrq on 2016/11/2.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_SELECT_DATA,
  GET_SELECT_SUCCESS,
  GET_SELECT_DATA_FAIL
} from './atSelect.js'
import {
  atSelectAPI
} from 'api/ZZJGB'

export function* watchGetAtSelectData() {
  yield takeEvery(GET_SELECT_DATA, handleAPI(getAtSelectDate))
}
// 获取数据
function* getAtSelectDate(action) {
  try {
    const response = yield call(atSelectAPI, action.payload);
    yield put({
      type: GET_SELECT_SUCCESS,
      response: response.Result.BMYHB
    })
  } catch (error) {
    yield put({
      type: GET_SELECT_DATA_FAIL,
      error
    })
  }
}

