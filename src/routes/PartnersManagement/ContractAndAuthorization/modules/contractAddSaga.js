/**
 * Created by NXQ on 11/16/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  POST_SINGLE_NEW_CONTRACT_DATA,
  POST_SINGLE_NEW_CONTRACT_DATA_SUCCESS,
  POST_SINGLE_NEW_CONTRACT_DATA_FAIL
} from './contractAdd';

import {
  createContract
} from 'api/contract';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchPostSingleNewContractData() {
  yield takeEvery(POST_SINGLE_NEW_CONTRACT_DATA, handleAPI(postSingleNewContractData));
}

// 创建合同
function* postSingleNewContractData(action) {
  try {
    const response = yield call(createContract, action.payload);
    if (response.Code === 0) {
      yield put({
        type: POST_SINGLE_NEW_CONTRACT_DATA_SUCCESS
      })
    } else {
      yield put({
        type: POST_SINGLE_NEW_CONTRACT_DATA_FAIL
      })
    }
  } catch (error) {
    yield put({
      type: POST_SINGLE_NEW_CONTRACT_DATA_FAIL
    })
  }
}

