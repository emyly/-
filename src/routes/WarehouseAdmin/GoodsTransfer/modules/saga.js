/**
 * Created by niexq on 17/3/25.
 */

import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_GOODS_TRANSFER_LIST_DATA,
  GET_GOODS_TRANSFER_LIST_DATA_SUCCESS
} from './goodsTransferList';
import {
  GET_GOODS_TRANSFER_OPERATING_DATA,
  GET_GOODS_TRANSFER_OPERATING_DATA_SUCCESS,
  GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA,
  GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA_SUCCESS,
  POST_ORDER,
  POST_ORDER_SUCCESS,
  GET_GOODS_TRANSFER_SEARCH_DATA,
  GET_GOODS_TRANSFER_SEARCH_DATA_SUCCESS
} from './goodsTransferOperating'
import {
  getGoodsTransferListAPI,
  getGoodsTransferSearchListAPI
} from 'api/SPZY';
import {
  getLocationAPI,
  getLocationGoodsAPI,
  postProductionTranAPI
} from 'api/CK';

import _ from 'lodash';
/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */

// 从api获取数据
function* getGoodsTransferListData(action) {
  const response = yield call(getGoodsTransferListAPI, action.payload.page);
  if (response.Code === 0 && _.has(response.Result, 'DDB')) {
    yield put({
      type: GET_GOODS_TRANSFER_LIST_DATA_SUCCESS,
      dataResponse: response.Result.DDB || [],
      currentPageResponse: action.payload.page,
      totalCountResponse: response.Result.Total || 0
    });
  }
}


// 从api获取数据
function* getGoodsTransferOperatingData(action) {
  const locationResponse = yield call(getLocationAPI, action.payload);
  if (_.has(locationResponse.Result, 'KWB')) {
    const resultArray = locationResponse.Result.KWB.map((value) => {
      return {
        open: false,
        goods: [],
        ...value
      }
    })
    yield put({
      type: GET_GOODS_TRANSFER_OPERATING_DATA_SUCCESS,
      response: resultArray || []
    })
  }
}

function* GetGoodsTransferLocationGoodsData(action) {
  const goodsResponse = yield call(getLocationGoodsAPI, { id: action.payload.id });
  if (_.has(goodsResponse.Result, 'SPCCB')) {
    yield put({
      type: GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA_SUCCESS,
      response: {
        id: action.payload.id,
        goods: goodsResponse.Result.SPCCB || []
      }
    })
  }
}

export function* postProductionTran(action) {
  const response = yield call(postProductionTranAPI, action.payload.params);
  yield put({
    type: POST_ORDER_SUCCESS,
    response
  })
}

export function* getGoodsTransferSearchData(action) {
  const response = yield call(getGoodsTransferSearchListAPI, action.payload.params);
  yield put({
    type: GET_GOODS_TRANSFER_SEARCH_DATA_SUCCESS,
    response: response.Result.SPCCB || []
  })
}

export function* watchGetGoodsTransferListDataData() {
  yield takeEvery(GET_GOODS_TRANSFER_LIST_DATA, handleAPI(getGoodsTransferListData));
}

export function* watchGetGoodsTransferOperatingData() {
  yield takeEvery(GET_GOODS_TRANSFER_OPERATING_DATA, handleAPI(getGoodsTransferOperatingData));
}

export function* watchGetGoodsTransferLocationGoodsData() {
  yield takeEvery(GET_GOODS_TRANSFER_OPERATING_LOCATION_GOODS_DATA, handleAPI(GetGoodsTransferLocationGoodsData));
}

export function* watchPostProductionTran() {
  yield takeEvery(POST_ORDER, handleAPI(postProductionTran));
}

export function* watchGetGoodsTransferSearchData() {
  yield takeEvery(GET_GOODS_TRANSFER_SEARCH_DATA, handleAPI(getGoodsTransferSearchData));
}
