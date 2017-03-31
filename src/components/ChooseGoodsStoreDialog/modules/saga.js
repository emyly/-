/**
 * Created by NXQ on 11/5/2016.
 */


import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';
import _ from 'lodash';

import {
  GET_SINGLE_WARE_HOUSE_CHILD_DATA,
  GET_SINGLE_WARE_HOUSE_CHILD_DATA_SUCCESS,
  GET_SINGLE_LOCATION_CHILD_DATA,
  GET_SINGLE_LOCATION_CHILD_DATA_SUCCESS,
  GET_SINGLE_LOCATION_GOODS_DATA_SUCCESS,
  GET_SINGLE_LOCATION_GOODS_DATA
} from './chooseGoodsStoreDialog.js';
import {
  getWarehouseAPI,
  getLocationAPI,
  getChildLocationAPI,
  getLocationGoodsAPI
} from 'api/CK';

// 从api获取数据
function* getSingleWareHouseChildData(action) {
  const wareHouseResponse = yield call(getWarehouseAPI, action.payload);  // 查询单个仓库的子仓库列表
  let resultArray = [];
  if (_.has(wareHouseResponse.Result, 'CKB') && wareHouseResponse.Result.CKB.length !== 0) {
    wareHouseResponse.Result.CKB.map((value) => {
      value.isWareHouse = true;
      value.goodsTypes = value.SPZS || 0;
      value.goodsTotals = value.KCSL || 0;
    });
    resultArray = wareHouseResponse.Result.CKB;
  } else {                                                                   // 为空说明没有子仓库，查询单个仓库的库位列表
    const locationResponse = yield call(getLocationAPI, action.payload);
    if (_.has(locationResponse.Result, 'KWB')) {
      locationResponse.Result.KWB.map((value) => {
        value.isWareHouse = false;
        value.goodsTypes = value.SPZS || 0; // 商品种类
        value.goodsTotals = value.KCSL || 0;// 商品库存总数
      });
      resultArray = locationResponse.Result.KWB;
    }
  }
  yield put({
    type: GET_SINGLE_WARE_HOUSE_CHILD_DATA_SUCCESS,
    wareHouseResponse: resultArray
  })
}

function* GetSingleLocationChildData(action) {
  const locationResponse = yield call(getChildLocationAPI, action.payload);      // 查询单个库位的子库位列表
  let resultArray = [];
  let goodsArray = [];
  let goodsDataTotal = [];
  if (_.has(locationResponse.Result, 'KWB') && locationResponse.Result.KWB.length !== 0) {
    locationResponse.Result.KWB.map((value) => {
      value.isWareHouse = false;
      value.goodsTypes = value.SPZS || 0;  // 商品种类
      value.goodsTotals = value.KCSL || 0; // 商品库存总数
    });
    resultArray = locationResponse.Result.KWB;
  } else {                                                                       // 为空说明没有子库位,查看单个库位下相应商品
    const goodsResponse = yield call(getLocationGoodsAPI, { id: action.payload.id, page: 1 });
    if (_.has(goodsResponse.Result, 'SPCCB')) {
      goodsResponse.Result.SPCCB.map((value) => {
        value.XZSL = -1;                        // 选择数量 初始值-1为了方便input显示
        value.SYSL = value.SL;                  // 剩余数量
        value.SSCKID = action.payload.id;
      });
      goodsArray = goodsResponse.Result.SPCCB;
      goodsDataTotal = goodsResponse.Result.Total || 0
    }
  }
  if (goodsArray.length) {
    yield put({
      type: GET_SINGLE_LOCATION_GOODS_DATA_SUCCESS,
      goodsResponse: goodsArray,
      goodsTotalResponse: goodsDataTotal,
      chooseLocationIdResponse: action.payload.id,
      currentPageResponse: 1
    })
  } else {
    yield put({
      type: GET_SINGLE_LOCATION_CHILD_DATA_SUCCESS,
      locationResponse: resultArray
    })
  }
}


function* GetSingleLocationGoodsData(action) {
  const goodsResponse = yield call(getLocationGoodsAPI, { id: action.payload.id, page: action.payload.page });
  let goodsArray = [];
  let goodsDataTotal = [];
  if (_.has(goodsResponse.Result, 'SPCCB')) {
    goodsResponse.Result.SPCCB.map((value) => {
      value.XZSL = -1;                        // 选择数量 初始值-1为了方便input显示
      value.SYSL = value.SL;                  // 剩余数量
      value.SSCKID = action.payload.id;
    });
    goodsArray = goodsResponse.Result.SPCCB;
    goodsDataTotal = goodsResponse.Result.Total || 0
  }
  if (goodsArray.length) {
    yield put({
      type: GET_SINGLE_LOCATION_GOODS_DATA_SUCCESS,
      goodsResponse: goodsArray,
      goodsTotalResponse: goodsDataTotal,
      chooseLocationIdResponse: action.payload.id,
      currentPageResponse: action.payload.page
    })
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetSingleWareHouseChildData() {
  yield takeEvery(GET_SINGLE_WARE_HOUSE_CHILD_DATA, handleAPI(getSingleWareHouseChildData));
}
export function* watchGetSingleLocationChildData() {
  yield takeEvery(GET_SINGLE_LOCATION_CHILD_DATA, handleAPI(GetSingleLocationChildData));
}
export function* watchGetSingleLocationGoodsData() {
  yield takeEvery(GET_SINGLE_LOCATION_GOODS_DATA, handleAPI(GetSingleLocationGoodsData));
}

