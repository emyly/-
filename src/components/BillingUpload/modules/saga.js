/**
 * Created by liuyali on 2016/12/21.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI, getSignature } from 'lib/utils'

import {
  UPLOAD_BILLING,
  UPLOAD_BILLING_SUCCESS,
  UPLOAD_BILLING_ERROR,
  GET_BILLING_DATA,
  GET_BILLING_DATA_SUCCESS,
  GET_BILLING_DATA_ERROR,
  // UPLOAD_BILLING_IMG_DATA_SUCCESS,
  UPLOAD_BILLING_IMG_DATA,
  // UPLOAD_BILLING_IMG_DATA_ERROR,
  DELETE_ONE_BILLIG,
  DELETE_ONE_BILLIG_SUCCESS,
  DELETE_ONE_BILLIG_ERROR
} from './billingUpload'

import {
  uploadBillingAPI, getBillingDataAPI, deleteFPAPI
} from 'api/FP'

import {
  putFileAPI
} from 'api/WJFW'

function *deleteFP(action) {
  try {
    yield call(deleteFPAPI, action.idArr);
    yield put({
      type: DELETE_ONE_BILLIG_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: DELETE_ONE_BILLIG_ERROR,
      error
    });
  }
}

function *uploadBilling(action) {
  try {
    const result = yield call(putFileAPI, action.formdata);
    let arr = [];
    if (Object.prototype.toString.call(result.Result.WDB) === '[object Array]') {
      arr = result.Result.WDB.map(wd => wd.GUID);
    } else if (Object.prototype.toString.call(result.Result.WDB) === '[object Object]') {
      arr.push(result.Result.WDB.GUID);
    }

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

function *getBillingData(action) {
  try {
    const response = yield call(getBillingDataAPI, action.ddid);

    response.Result.FPWD.map((FP) => {
      FP.src = `/api_firstgridFS/WDB/${FP.FPFJID}?MBJXSID=${action.mbjxsid}&${getSignature()}`
    });

    yield put({
      type: GET_BILLING_DATA_SUCCESS,
      response: response.Result.FPWD
    });
  } catch (error) {
    yield put({
      type: GET_BILLING_DATA_ERROR,
      error
    });
  }
}

export function *watchUploadBilling() {
  yield takeEvery(UPLOAD_BILLING_IMG_DATA, handleAPI(uploadBilling));
}

export function *watchGetBillingData() {
  yield takeEvery(GET_BILLING_DATA, handleAPI(getBillingData));
}

export function *watchDeleteFP() {
  yield takeEvery(DELETE_ONE_BILLIG, handleAPI(deleteFP));
}

