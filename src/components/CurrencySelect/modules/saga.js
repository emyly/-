/**
 * Created by wmt on 2016/11/23.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_CURRENCY_DATA,
  GET_CURRENCY_DATA_SUCCESS,
  GET_CURRENCY_DATA_FAIL
} from './currencySelect.js'
import { getCurrencyAPI } from 'api/publicApi'

export function* watchGetCurrencySelectDate() {
  yield takeEvery(GET_CURRENCY_DATA, handleAPI(getCurrencySelectDate))
}
// 获取数据
function* getCurrencySelectDate(action) {
  try {
    const response = yield call(getCurrencyAPI);
    yield put({
      type: GET_CURRENCY_DATA_SUCCESS,
      response: response.Result.HBDMB || []
    })
  } catch (error) {
    yield put({
      type: GET_CURRENCY_DATA_FAIL,
      error
    })
  }
}

