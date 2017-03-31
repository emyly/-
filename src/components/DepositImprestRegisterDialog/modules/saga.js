/**
 * Created by NXQ on 17/1/7.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA,
  GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA_SUCCESS,
  POST_DEPOSIT_IMPREST_REGISTER_DATA,
  POST_DEPOSIT_IMPREST_REGISTER_DATA_SUCCESS
} from './depositImprestRegisterDialog';
import {
  getAuthorizedOrganizationAPI
} from 'api/authorization';
import {
  postDepositSubmitAPI
} from 'api/financial';

import {
  GET_DEPOSIT_IMPREST_DETAILS_DATA
} from 'components/DepositImprestDetailsDataGrid/modules/depositImprestDetailsDataGrid';

import {
  GET_DEPOSIT_IMPREST_DATA
} from 'components/DepositImprestDataGrid/modules/depositImprestDataGrid';
/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetDepositImprestPartnerData() {
  yield takeEvery(GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA, handleAPI(getDepositImprestPartnerData));
}

// 从api获取数据
function* getDepositImprestPartnerData(action) {
  const response = yield call(getAuthorizedOrganizationAPI, action.payload);
  if (response.Code === 0 && _.has(response.Result, 'authorized_organizations')) {
    yield put({
      type: GET_DEPOSIT_IMPREST_REGISTER_PARTNER_DATA_SUCCESS,
      dataResponse: response.Result.authorized_organizations || []
    });
  }
}

export function* watchPostDepositImprestData() {
  yield takeEvery(POST_DEPOSIT_IMPREST_REGISTER_DATA, handleAPI(postDepositImprestData));
}

// 从api获取数据
function* postDepositImprestData(action) {
  const response = yield call(postDepositSubmitAPI, { body: action.payload.body });
  if (response.Code === 0) {
    if (action.payload.isListQuery) {
      yield put({
        type: GET_DEPOSIT_IMPREST_DATA,
        payload: {
          ...action.payload.params
        }
      })
    } else {
      yield put({
        type: GET_DEPOSIT_IMPREST_DETAILS_DATA,
        payload: {
          ...action.payload.params
        }
      })
    }
    yield put({
      type: POST_DEPOSIT_IMPREST_REGISTER_DATA_SUCCESS
    });
  }
}
