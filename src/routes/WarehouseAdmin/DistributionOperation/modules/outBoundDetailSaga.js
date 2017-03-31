/**
 * Created by wangming on 11/19/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_WAREHOOUSE_BASICINFO,
  GET_WAREHOOUSE_BASICINFO_SUCCESS,
  GET_WAREHOOUSE_BASICINFO_FAIL,
  GET_WAREHOOUSE_DETAIL,
  GET_WAREHOOUSE_DETAIL_SUCCESS,
  GET_WAREHOOUSE_DETAIL_FAIL,
} from './outBoundDetail';
import {
  getSingleWareHouseOutDetailAPI,
  getSingleWareHouseOutProductionDetailAPI
} from 'api/CRK';

function* getDOSingleWareHouseOutDetail(action) {
  try {
    const response = yield call(getSingleWareHouseOutDetailAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_WAREHOOUSE_BASICINFO_SUCCESS,
        response: response.Result.CRKDB
      })
    } else {
      yield put({
        type: GET_WAREHOOUSE_BASICINFO_FAIL,
        response
      })
    }
  } catch (error) {
    yield put({
      type: GET_WAREHOOUSE_BASICINFO_FAIL,
      response: error
    })
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchDOGetSingleWareHouseOutDetail() {
  yield takeEvery(GET_WAREHOOUSE_BASICINFO, handleAPI(getDOSingleWareHouseOutDetail));
}

function* getDOSingleWareHouseOutProductionDetail(action) {
  try {
    const response = yield call(getSingleWareHouseOutProductionDetailAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_WAREHOOUSE_DETAIL_SUCCESS,
        response: response.Result.CRKMXB
      })
    } else {
      yield put({
        type: GET_WAREHOOUSE_DETAIL_FAIL,
        response
      })
    }
  } catch (error) {
    yield put({
      type: GET_WAREHOOUSE_DETAIL_FAIL,
      response: error
    })
  }
}


export function* watchDOGetSingleWareHouseOutProductionDetail() {
  yield takeEvery(GET_WAREHOOUSE_DETAIL, handleAPI(getDOSingleWareHouseOutProductionDetail));
}

