/**
 * Created by liuyali on 2017/1/4.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'

import {
  GET_ORDERLIST_FOR_DETECTION,
  GET_ORDERLIST_FOR_DETECTION_ERROR,
  GET_ORDERLIST_FOR_DETECTION_SUCCESS,
  GET_ALL_ORG_LIST_FOR_DETECT,
  GET_ALL_ORG_LIST_FOR_DETECT_SUCCESS,
  GET_ALL_ORG_LIST_FOR_DETECT_ERROR
} from './orderlistForDetection'
import {
  GET_ORDER_GOODS_DETAIL_AND_BILLS,
  GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR,
  GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS
} from './detectionBills'
import {
  getOrderGoodsDetailAndBillsAPI
} from 'api/LPZ-YP'
import {
  getOrderListAPI
} from 'api/DDB'
import { getRelatedOrgNoPageAPI } from 'api/ZZJGB'

import { handleAPI } from 'lib/utils'

import { getImgSrc } from 'lib/utils'

export function* watchGetOrderGoodsDetailAndBills() {
  yield takeEvery(GET_ORDER_GOODS_DETAIL_AND_BILLS, handleAPI(getOrderGoodsDetailAndBills))
}
export function* watchOrderlistForDetection() {
  yield takeEvery(GET_ORDERLIST_FOR_DETECTION, handleAPI(orderlistForDetection))
}
export function *watchGetRelatedOrgNoPage() {
  yield takeEvery(GET_ALL_ORG_LIST_FOR_DETECT, handleAPI(getRelatedOrgNoPage))
}

function *getOrderGoodsDetailAndBills(action) {
  try {
    const result = yield call(getOrderGoodsDetailAndBillsAPI, [action.ddid, action.params]);
    result.Result.SPWZ.map((FP, index) => {
      FP.src = getImgSrc(FP.FPFJID)+`&MBJXSID=${action.SHJXSID}`;
    })
    yield put({
      type: GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS,
      response: result.Result,
      LX: action.LX,
      params: action.params,
      ddid: action.ddid,
      SHJXSID:action.SHJXSID
    });
  } catch (error) {
    yield put({
      type: GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR,
      error
    })
  }
}
function *orderlistForDetection(action) {
  try {
    const result = yield call(getOrderListAPI, { params: {
      page: action.page,
      dataParams: action.params
    } });
    yield put({
      type: GET_ORDERLIST_FOR_DETECTION_SUCCESS,
      page: action.page,
      total: result.Result.Total,
      resultArr: result.Result.DDB
    });
  } catch (error) {
    yield put({
      type: GET_ORDERLIST_FOR_DETECTION_ERROR,
      error
    })
  }
}
function *getRelatedOrgNoPage(action) {
  try {
    const result = yield call(getRelatedOrgNoPageAPI, [action.id, action.params]);
    yield put({
      type: GET_ALL_ORG_LIST_FOR_DETECT_SUCCESS,
      resultArr: result.Result.JXSGXB
    });
  } catch (error) {
    yield put({
      type: GET_ALL_ORG_LIST_FOR_DETECT_ERROR,
      error
    })
  }
}
