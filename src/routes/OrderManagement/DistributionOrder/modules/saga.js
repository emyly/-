/**
 * Created by qyf on 2017/3/14.
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_DISTRIBUTION_ORGANIZATION,
  GET_DISTRIBUTION_ORGANIZATION_SUCCESS,
  DISTRIBUTION_ADDRESS,
  DISTRIBUTION_ADDRESS_SUCCESS,
  GET_DIS__BUTION__SEARCH_CONTRACTS,
  GET_DIS__BUTION__SEARCH_CONTRACTS_SUCCESS,
  POST_DIS__BUTION__SUBMIT_DATA,
  POST_DIS__BUTION__SUBMIT_DATA_SUCCESS,
  GET_DIS__BUTION__CANTRACTS_DATA,
  GET_DIS__BUTION__CANTRACTS_DATA_SUCCESS,
  GET_DISTRIBUTION__FAIL,
} from './disorderCheck.js'


import { getAuthorizeOrganizationAPI, searchContractsAPI, getContractAuthorizationsAPI } from 'api/authorization'
import { getSendReceiveAddAPI } from 'api/WLDB'
import { postDistributionOrderAPI } from 'api/DDB'


export function* PostDisorderData(action) {
  try {
    const response = yield call(postDistributionOrderAPI, action.payload);
    yield put({
      type: POST_DIS__BUTION__SUBMIT_DATA_SUCCESS,
      response: response.Result.DDB
    })
  } catch (error) {
    yield put({
      type: GET_DISTRIBUTION__FAIL,
      error
    })
  }
}
export function* getDistriButionOrganization(action) {
  try {
    const response = yield call(getAuthorizeOrganizationAPI, action.payload);
    yield put({
      type: GET_DISTRIBUTION_ORGANIZATION_SUCCESS,
      response: response.Result.authorize_organizations || [],

    })
  } catch (error) {
    yield put({
      type: GET_DISTRIBUTION__FAIL,
      error
    })
  }
}
/* 收货地址*/
export function* getDistriButionAddress(action) {
  try {
    const response = yield call(getSendReceiveAddAPI, action.payload);
    yield put({
      type: DISTRIBUTION_ADDRESS_SUCCESS,
      response: response.Result.ZZJGWLDZB || []
    })
  } catch (error) {
    yield put({
      type: GET_DISTRIBUTION__FAIL,
      error
    })
  }
}
export function* getDisSearchContracts(action) {
  try {
    const response = yield call(searchContractsAPI, action.payload);
    yield put({
      type: GET_DIS__BUTION__SEARCH_CONTRACTS_SUCCESS,
      response: response.Result.contracts || []
    })
  } catch (error) {
    yield put({
      type: GET_DISTRIBUTION__FAIL,
      error
    })
  }
}
export function* getDisSearchContractsrGanization_id(action) {
  try {
    const response = yield call(getContractAuthorizationsAPI, action.payload);
    yield put({
      type: GET_DIS__BUTION__CANTRACTS_DATA_SUCCESS,
      response: response.Result.authorizations || []
    })
  } catch (error) {
    yield put({
      type: GET_DISTRIBUTION__FAIL,
      error
    })
  }
}
export function* watchGetDistriButionOrganization() {
  yield takeEvery(GET_DISTRIBUTION_ORGANIZATION, handleAPI(getDistriButionOrganization))
}
/* 收货地址*/
export function* watchGetDistriButionAddress() {
  yield takeEvery(DISTRIBUTION_ADDRESS, handleAPI(getDistriButionAddress))
}
/* 查询合同*/
export function* watchgetSearchContracts() {
  yield takeEvery(GET_DIS__BUTION__SEARCH_CONTRACTS, handleAPI(getDisSearchContracts))
}
/* 根据合同id获取业务线品牌*/
export function* watchgetAuthorizationsContracts() {
  yield takeEvery(GET_DIS__BUTION__CANTRACTS_DATA, handleAPI(getDisSearchContractsrGanization_id))
}
/* 提交*/
export function* watchPostDisorderData() {
  yield takeEvery(POST_DIS__BUTION__SUBMIT_DATA, handleAPI(PostDisorderData))
}

