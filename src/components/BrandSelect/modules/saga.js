import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_BRAND_DATA,
  GET_BRAND_DATA_SUCCESS,
  GET_BRAND_DATA_ERROR
} from './brandSelect'
import {
  getBrandDataAPI
} from 'api/authorization'

function *getBrandData(action) {
  try {
    const response = yield call(getBrandDataAPI, action.payload);
    yield put({
      type: GET_BRAND_DATA_SUCCESS,
      response: response.Result.brands || []
    })
  } catch (error) {
    yield put({
      type: GET_BRAND_DATA_ERROR,
      error
    })
  }
}

export function *watchGetBrandData() {
  yield takeEvery(GET_BRAND_DATA, handleAPI(getBrandData));
}
