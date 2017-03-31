/**
 * Created by NXQ on 11/11/2016.
 */


import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';
import _ from 'lodash';

import {
  GET_CREATE_CREDIT_EDIT_DATA,
  GET_CREATE_CREDIT_EDIT_DATA_SUCCESS,
  GET_CREATE_CREDIT_EDIT_DATA_FAIL,
  PUT_CREATE_CREDIT_STATUS,
  PUT_CREATE_CREDIT_STATUS_SUCCESS
} from './creditEdit';
import {
  createSingleCreditAPI
} from 'api/XY';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchCreateCreditData() {
  yield takeEvery(GET_CREATE_CREDIT_EDIT_DATA, handleAPI(createCreditData));
}

// 创建经销商信用
function* createCreditData(action) {
  try {
    const createCreditResponse = yield call(createSingleCreditAPI, action.payload);            // 创建经销商信用
    if (createCreditResponse.Code === 0) {
      yield put({
        type: GET_CREATE_CREDIT_EDIT_DATA_SUCCESS,
        isFixedCreateSuccess: action.payload.EDLX !== '0'
      })
    } else {
      yield put({
        type: GET_CREATE_CREDIT_EDIT_DATA_FAIL,
        message: createCreditResponse.Message
      });
    }
  } catch (error) {
    yield put({
      type: GET_CREATE_CREDIT_EDIT_DATA_FAIL,
      message: error
    });
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchputCreateCreditStatus() {
  yield takeEvery(PUT_CREATE_CREDIT_STATUS, handleAPI(putCreateCreditStatus));
}

function* putCreateCreditStatus(action) {
  yield put({
    type: PUT_CREATE_CREDIT_STATUS_SUCCESS,
    response: false
  })
}
