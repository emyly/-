import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_AUTHORIZE_ORGANIZATION,
  GET_AUTHORIZE_ORGANIZATION_SUCCESS,
  GET_RECEIVE_ADDRESS,
  GET_RECEIVE_ADDRESS_SUCCESS,
  POST_STOCK_ORDER,
  POST_STOCK_ORDER_SUCCESS,
  GET_PRODUCTION_LIST,
  GET_PRODUCTION_LIST_SUCCESS,
  STOCK_ORDER_ERROR
} from './createStockOrder.js'

import { getAuthorizeOrganizationAPI } from 'api/authorization'
import { getSendReceiveAddAPI } from 'api/WLDB'
import { atSelectAPI } from 'api/ZZJGB'
import { postZXBHDDAPI } from 'api/DDB'
import { getProductionListAPI } from 'api/SPJCXXB';

export function* watchGetProductionList() {
  yield takeEvery(GET_PRODUCTION_LIST, handleAPI(getProductionList))
}

export function* watchPostStockOrder() {
  yield takeEvery(POST_STOCK_ORDER, handleAPI(postStockOrder))
}

export function* watchStockOrderGetAuthorizeOrganization() {
  yield takeEvery(GET_AUTHORIZE_ORGANIZATION, handleAPI(getAuthorizeOrganization))
}

export function* watchStockOrderGetReceiveAddress() {
  yield takeEvery(GET_RECEIVE_ADDRESS, handleAPI(getReceiveAddress))
}

export function* getAuthorizeOrganization(action) {
  try {
    const response = yield call(getAuthorizeOrganizationAPI, action.payload);
    yield put({
      type: GET_AUTHORIZE_ORGANIZATION_SUCCESS,
      response: response.Result.authorize_organizations || []
    })
  } catch (error) {
    yield put({
      type: STOCK_ORDER_ERROR,
      error
    })
  }
}

export function* getReceiveAddress(action) {
  try {
    const response = yield call(getSendReceiveAddAPI, action.payload);
    yield put({
      type: GET_RECEIVE_ADDRESS_SUCCESS,
      response: response.Result.ZZJGWLDZB || []
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: STOCK_ORDER_ERROR,
      error
    })
  }
}

/**
 * 提交手术订单
 */
export function* postStockOrder(action) {
  try {
    const response = yield call(postZXBHDDAPI, action.payload);
    yield put({
      type: POST_STOCK_ORDER_SUCCESS,
      response: response.Result.DDB
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: STOCK_ORDER_ERROR,
      error
    })
  }
}

/**
 *  根据商品Id数组获取商品信息
 */
export function* getProductionList(action) {
  try {
    const response = yield call(getProductionListAPI, action.payload);
    yield put({
      type: GET_PRODUCTION_LIST_SUCCESS,
      response: response.Result.goods || []
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: STOCK_ORDER_ERROR,
      error
    })
  }
}
