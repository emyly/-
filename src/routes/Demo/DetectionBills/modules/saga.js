/**
 * Created by liuyali on 2017/1/4.
 */
import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'

import {
  GET_ORDER_GOODS_DETAIL_AND_BILLS,
  GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR,
  GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS
} from './detectionBills'
import {
  getOrderGoodsDetailAndBillsAPI
} from 'api/LPZ-YP'
import { getImgSrc } from 'lib/utils'

export function* watchGetOrderGoodsDetailAndBills() {
  yield takeEvery(GET_ORDER_GOODS_DETAIL_AND_BILLS, getOrderGoodsDetailAndBills)
}

function *getOrderGoodsDetailAndBills(action) {
  try {
    const result = yield call(getOrderGoodsDetailAndBillsAPI, [action.ddid, action.params]);
    result.Result.SPWZ.map((FP, index) => {
      FP.src = getImgSrc(FP.FPFJID);
    })
    yield put({
      type: GET_ORDER_GOODS_DETAIL_AND_BILLS_SUCCESS,
      response: result.Result,
      LX: action.LX,
      params: action.params
    });
  } catch (error) {
    yield put({
      type: GET_ORDER_GOODS_DETAIL_AND_BILLS_ERROR,
      error
    })
  }
}
