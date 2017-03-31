/**
 * Created by liuyali on 2016/12/2.
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_INVENTORY_SEE_DATA,
  GET_INVENTORY_SEE_DATA_SUCCESS,
  GET_INVENTORY_SEE_DATA_ERROR
} from '../modules/inventorySee'

import { getInventorySeeData } from 'api/CK'

/* 开始盘存*/
function *inventorySee(action) {
  try {
    const response = yield call(getInventorySeeData, [action.page, action.params]);
    yield put({
      type: GET_INVENTORY_SEE_DATA_SUCCESS,
      resultArr: response.Result.SPCCB || [],
      cPage: action.page,
      total: response.Result.Total,
    })
  } catch (error) {
    yield put({
      type: GET_INVENTORY_SEE_DATA_ERROR,
      error
    })
  }
}

export function * watchInventorySee() {
  yield takeEvery(GET_INVENTORY_SEE_DATA, handleAPI(inventorySee))
}
