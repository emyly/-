/**
 * Created by NXQ on 11/18/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';


import {
  GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA,
  GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS,
  GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL
} from './authorizationDetailsDataGrid';

import {
  getCurrentContractAuthorizedSummaryAPI
} from 'api/authorization';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetCurrentContractAuthorizedQueryData() {
  yield takeEvery(GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA, handleAPI(getCurrentContractAuthorizedQueryData));
}


function* getCurrentContractAuthorizedQueryData(action) {
  try {
    const response = yield call(getCurrentContractAuthorizedSummaryAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS,
        currentContractAuthorizedResponse: response.Result.summary || []
      });
    } else {
      yield put({
        type: GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL,
        message: response.Message
      });
    }
  } catch (error) {
    yield put({
      type: GET_CURRENT_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL,
      message: error
    });
  }
}
