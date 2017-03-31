/**
 * Created by NXQ on 2017/1/9.
 */


import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA,
  GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA_SUCCESS
} from './financialOrderGoodsDetailsDateGrid'
import {
  getBillingedOrderGoodsAPI,      // 查看已开票订单关联的商品清单
  getUnbllingOrderGoodsAPI,       // 查看未开票订单关联的商品清单
  getOrderGoodsAPI                // 查看订单关联的商品清单
} from 'api/financial'

import _ from 'lodash';

// 获取数据 列表模式->'0'为订单下所有商品清单 '1'为已开票商品清单  '2'为未开票商品清单
function* getFinancialGoodsDetailData(action) {
  let response = { Code: -1 };
  switch (action.payload.type) {
    case '0':
      response = yield call(getOrderGoodsAPI, { ddid: action.payload.id });
      break;
    case '1':
      response = yield call(getBillingedOrderGoodsAPI, { ddid: action.payload.id });
      break;
    case '2':
      response = yield call(getUnbllingOrderGoodsAPI, { ddid: action.payload.id });
      break;
  }
  if (response.Code === 0 && _.has(response.Result, 'DDSPGLB')) {
    yield put({
      type: GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA_SUCCESS,
      response: response.Result.DDSPGLB || []
    })
  }
}

export function* watchGetFinancialOrderGoodsData() {
  yield takeEvery(GET_FINANCIAL_ORDER_GOODS_DETAILS_DATA, handleAPI(getFinancialGoodsDetailData))
}

