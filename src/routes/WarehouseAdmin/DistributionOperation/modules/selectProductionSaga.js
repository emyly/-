/**
 * Created by wangming on 11/16/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_SELECT_TABLE_ROW_LIST,
  GET_SELECT_TABLE_ROW_LIST_SUCCESS,
  GET_SELECT_TABLE_ROW_LIST_FAIL
} from './selectProduction';

import {
  copySelectTableRowAPI,
} from 'api/CRK';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
function* copySelectTableRow(action) {
  try {
    const response = yield call(copySelectTableRowAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.SPCCB;
      yield put({
        type: GET_SELECT_TABLE_ROW_LIST_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_SELECT_TABLE_ROW_LIST_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_SELECT_TABLE_ROW_LIST_FAIL,
      response: error
    })
  }
}

export function* watchDOcopySelectTableRow() {
  yield takeEvery(GET_SELECT_TABLE_ROW_LIST, handleAPI(copySelectTableRow));
}

