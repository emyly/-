/**
 * Created by liuyali on 2016/12/21.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'

import {
  UPLOAD_BILLING,
  UPLOAD_BILLING_SUCCESS,
  UPLOAD_BILLING_ERROR,
  GET_BILLING_DATA,
  GET_BILLING_DATA_SUCCESS,
  GET_BILLING_DATA_ERROR,
  UPLOAD_BILLING_IMG_DATA_SUCCESS,
  UPLOAD_BILLING_IMG_DATA,
  UPLOAD_BILLING_IMG_DATA_ERROR
} from './billingUpload'

import {
  uploadBillingAPI, getBillingDataAPI
} from 'api/FP'

import {
  putFileAPI
} from 'api/WJFW'

import {
  getSignature
} from 'lib/utils'


export function *watchUploadBilling() {
  yield takeEvery(UPLOAD_BILLING_IMG_DATA, uploadBilling);
}

function *uploadBilling(action) {
  try {
    const result = yield call(putFileAPI, action.formdata);

    const arr = result.Result.WDB.map((wd) => wd.GUID);

    action.body.FPFJIDS = arr;
    yield call(uploadBillingAPI, action.body);

    yield put({
      type: UPLOAD_BILLING_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: UPLOAD_BILLING_ERROR,
      error
    });
  }
}

export function *watchGetBillingData() {
  yield takeEvery(GET_BILLING_DATA, getBillingData);
}

function *getBillingData(action) {
  try {
    const response = yield call(getBillingDataAPI, action.ddid);

    let resultArr = response.Result.FPWD.map((FP) => `/api_firstgridFS/WDB/${FP}?${getSignature()}`);

    yield put({
      type: GET_BILLING_DATA_SUCCESS,
      response: resultArr
    });
  } catch (error) {
    yield put({
      type: GET_BILLING_DATA_ERROR,
      error
    });
  }
}

