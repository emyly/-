/**
 * Created by NXQ on 10/11/2016.
 */


import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';
import _ from 'lodash';

import {
  GET_FIXED_CREDIT_SEE_DATA,
  GET_FIXED_CREDIT_SEE_DATA_SUCCESS,
  GET_TEMP_CREDIT_SEE_DATA,
  GET_TEMP_CREDIT_SEE_DATA_SUCCESS,
  DELETE_SING_FIXED_CREDIT_DATA,
  DELETE_SING_FIXED_CREDIT_DATA_SUCCESS,
  DELETE_SING_FIXED_CREDIT_DATA_FAIL,
  GET_CREATE_CREDIT_EDIT_DATA,
  GET_CREATE_CREDIT_EDIT_DATA_SUCCESS,
  GET_CREATE_CREDIT_EDIT_DATA_FAIL
} from './creditSee';
import {
  getFixedCreditDetailAPI,
  getCreditDetailAPI,
  getCreditDetailValidDateAPI,
  deleteSingleTempCreditAPI,
  createSingleCreditAPI
} from 'api/XY';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetCreditSeeData() {
  yield takeEvery(GET_FIXED_CREDIT_SEE_DATA, handleAPI(getFixedCreditSeeData));
}

// 经销商长期信用明细查询
function* getFixedCreditSeeData(action) {
  const fixedCreditResponse = yield call(getFixedCreditDetailAPI, action.payload);            // 长期信用明细查询
  const validDateResponse = yield call(getCreditDetailValidDateAPI, action.payload);          // 长期信用有效期查询
  let fixedCreditObj = {};
  if (_.get(fixedCreditResponse.Result, 'JXSXYMXB.length')) {
    switch (fixedCreditResponse.Result.JXSXYMXB[0].EDLX) {
      case '1':
        fixedCreditResponse.Result.JXSXYMXB[0].EDLXMC = '长期固定';
        fixedCreditResponse.Result.JXSXYMXB[0].beginColor = '#00dec8';
        fixedCreditResponse.Result.JXSXYMXB[0].endColor = '#00bf9e';
        fixedCreditObj = fixedCreditResponse.Result.JXSXYMXB[0];
        break;
      case '2':
        fixedCreditResponse.Result.JXSXYMXB[0].EDLXMC = '滚动结算';
        fixedCreditResponse.Result.JXSXYMXB[0].beginColor = '#fdb68f';
        fixedCreditResponse.Result.JXSXYMXB[0].endColor = '#fc855b';
        fixedCreditObj = fixedCreditResponse.Result.JXSXYMXB[0];
        break;
      case '3':
        fixedCreditResponse.Result.JXSXYMXB[0].EDLXMC = '定期结算';
        fixedCreditResponse.Result.JXSXYMXB[0].beginColor = '#fde594';
        fixedCreditResponse.Result.JXSXYMXB[0].endColor = '#f7c222';
        fixedCreditObj = fixedCreditResponse.Result.JXSXYMXB[0];
        break;
    }
  }
  yield put({
    type: GET_FIXED_CREDIT_SEE_DATA_SUCCESS,
    fixedCreditResponse: fixedCreditObj,
    fixedValidDateDataResponse: _.has(validDateResponse.Result, 'JXSXYMXB') ? validDateResponse.Result.JXSXYMXB : {}
  })
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetCreditSeeDetailData() {
  yield takeEvery(GET_TEMP_CREDIT_SEE_DATA, handleAPI(getCreditDetailData));
}

// 经销商信用查询
function* getCreditDetailData(action) {
  const creditResponse = yield call(getCreditDetailAPI, action.payload);
  // const validDateResponse = yield call (getCreditDetailValidDateAPI, action.payload);   // 暂不需要,后期如果有需要再加上
  yield put({
    type: GET_TEMP_CREDIT_SEE_DATA_SUCCESS,
    creditResponse: creditResponse.Result.JXSXYB || {},
  })
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchDeleteFixedCreditDetailData() {
  yield takeEvery(DELETE_SING_FIXED_CREDIT_DATA, handleAPI(deleteSingleFixedCreditData));
}


// 经销商信用明细删除
function* deleteSingleFixedCreditData(action) {
  try {
    const deleteFixedCreditResponse = yield call(deleteSingleTempCreditAPI, action.payload);
    if (deleteFixedCreditResponse.Code === 0) {
      yield put({
        type: DELETE_SING_FIXED_CREDIT_DATA_SUCCESS
      })
    } else {
      yield put({
        type: DELETE_SING_FIXED_CREDIT_DATA_FAIL,
        message: deleteFixedCreditResponse.Message
      });
    }
  } catch (error) {
    yield put({
      type: DELETE_SING_FIXED_CREDIT_DATA_FAIL,
      message: error
    });
  }
}

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

