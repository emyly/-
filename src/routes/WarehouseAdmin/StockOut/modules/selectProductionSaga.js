/**
 * Created by wangming on 11/16/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';
import _ from 'lodash';

import {
	GET_SELECT_ADVICE_DATA,
	GET_SELECT_ADVICE_DATA_SUCCESS,
	GET_SELECT_ADVICE_DATA_FAIL,
	GET_OHTHER_STORAGE_DATA,
	GET_OHTHER_STORAGE_DATA_SUCCESS,
	GET_OHTHER_STORAGE_DATA_FAIL,
	GET_SELECT_TABLE_ROW_LIST,
	GET_SELECT_TABLE_ROW_LIST_SUCCESS,
	GET_SELECT_TABLE_ROW_LIST_FAIL
} from './selectProduction';

import {
	getSelectAdviceAPI,
	getOtherStorageAPI,
	copySelectTableRowAPI
} from 'api/CRK';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchcopySelectTableRow() {
  yield takeEvery(GET_SELECT_TABLE_ROW_LIST, handleAPI(copySelectTableRow));
}

export function* watchGetSelectAdvice() {
  yield takeEvery(GET_SELECT_ADVICE_DATA, handleAPI(getSelectAdvice));
}

export function* watchGetOtherStorage() {
  yield takeEvery(GET_OHTHER_STORAGE_DATA, handleAPI(getOtherStorage));
}

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

function* getOtherStorage(action) {
  try {
    const response = yield call(getOtherStorageAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.TJD;
      yield put({
        type: GET_OHTHER_STORAGE_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_OHTHER_STORAGE_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_OHTHER_STORAGE_DATA_FAIL,
      response: error
    })
  }
}

function* getSelectAdvice(action) {
  try {
    const response = yield call(getSelectAdviceAPI, action.payload);
    console.debug('getSelectAdvice 1;', response);
    if (response.Code === 0) {
      const resultArray = response.Result.JHTJDB;
      yield put({
        type: GET_SELECT_ADVICE_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_SELECT_ADVICE_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    console.debug('getSelectAdvice 33:', error);
    yield put({
      type: GET_SELECT_ADVICE_DATA_FAIL,
      response: error
    })
  }
}

