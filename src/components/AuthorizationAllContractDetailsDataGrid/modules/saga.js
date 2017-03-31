
/**
 * Created by NXQ on 11/18/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';


import {
  GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA,
  GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS,
  GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL
} from './authorizationAllContractDetailsDataGrid';

import {
  getAllContractAuthorizedSummaryAPI   // RA接口更新后需要更改对应接口
} from 'api/authorization';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetAllContractAuthorizedQueryData() {
  yield takeEvery(GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA, handleAPI(getAllContractAuthorizedQueryData));
}


function* getAllContractAuthorizedQueryData(action) {
  try {
    const response = yield call(getAllContractAuthorizedSummaryAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA_SUCCESS,
        allContractAuthorizedResponse: response.Result.summary || []
      });
    } else {
      yield put({
        type: GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL,
        message: response.Message
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_CONTRACT_AUTHORIZED_DETAIL_DATA__FAIL,
      message: error
    });
  }
}
