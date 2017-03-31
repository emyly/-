/**
 * Created by NXQ on 12/14/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_PERSONALIZED_TEMPLATE_DATA,
  GET_PERSONALIZED_TEMPLATE_DATA_SUCCESS,
  DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA,
  DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_SUCCESS,
  DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_FAIL
} from './personalizedTemplate';

import {
  GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA,
  GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA_SUCCESS
} from './personalizedTemplateDetail'

import {
  getTemplateListAPI,
  getProductionWithTemplateAPI,
  deleteSingleTemplateAPI
} from 'api/SSMB';

import moment from 'components/Moment'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetPersonalizedTemplateData() {
  yield takeEvery(GET_PERSONALIZED_TEMPLATE_DATA, handleAPI(getPersonalizedTemplateData));
}


// 获取手术模板列表
function* getPersonalizedTemplateData(action) {
  const response = yield call(getTemplateListAPI, action.payload);
  const allTemplateDataResponse = [];
  const publicTemplateDataResponse = [];
  const companyPublicTemplateDataResponse = [];
  const privateTemplateDataResponse = [];
  if (_.get(response.Result, 'SSMBB.length')) {
    response.Result.SSMBB.map((value) => {
      value.CJSJ = moment(value.CJSJ).format('YYYY-MM-DD')
      switch (Number(value.GKCD)) {
        case 0:     // 公开
          publicTemplateDataResponse.push(value);
          break;
        case 1:     // 公司公开
          companyPublicTemplateDataResponse.push(value);
          break;
        case 2:     // 私人
          privateTemplateDataResponse.push(value);
          break;
      }
      allTemplateDataResponse.push(value)
    })
  }
  yield put({
    type: GET_PERSONALIZED_TEMPLATE_DATA_SUCCESS,
    allTemplateDataResponse,
    publicTemplateDataResponse,
    companyPublicTemplateDataResponse,
    privateTemplateDataResponse
  })
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchDeleteSingleTemplateData() {
  yield takeEvery(DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA, handleAPI(deleteSingleTemplateData));
}

// 删除单个私人手术模板
function* deleteSingleTemplateData(action) {
  const response = yield call(deleteSingleTemplateAPI, { id: action.payload.GUID });
  if (response.Code === 0) {
    yield put({
      type: DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_SUCCESS,
      deleteObject: action.payload
    })
  } else {
    yield put({
      type: DELETE_PERSONALIZED_SINGLE_TEMPLATE_DATA_FAIL
    })
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetSingleTemplateGoodsData() {
  yield takeEvery(GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA, handleAPI(getSingleTemplateGoodsData));
}

// 获取手术模板商品关联列表数据
function* getSingleTemplateGoodsData(action) {
  const response = yield call(getProductionWithTemplateAPI, action.payload);
  let singleTemplateGoodsDataResponse = [];
  if (_.get(response.Result, 'SSMBSPGLB.length')) {
    const sortArray = response.Result.SSMBSPGLB.sort((preValue, nextValue) => (Number(preValue.SPLX) - Number(nextValue.SPLX)));
    sortArray.map((value) => {
      value.CJSJ = moment(value.CJSJ).format('YYYY-MM-DD')
    })
    singleTemplateGoodsDataResponse = response.Result.SSMBSPGLB;
  }
  yield put({
    type: GET_PERSONALIZED_SINGLE_TEMPLATE_GOODS_DATA_SUCCESS,
    singleTemplateGoodsDataResponse
  })
}

