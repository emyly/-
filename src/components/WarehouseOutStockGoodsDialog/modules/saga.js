/**
 * Created by NXQ on 17/1/7.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA,
  GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA_SUCCESS
} from './warehouseOutStockGoodsDialog';

import {
  getWarehouseOutStockGoodsDataAPI
} from 'api/CK';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetWarehouseOutStockGoodsData() {
  yield takeEvery(GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA, handleAPI(getDWarehouseOutStockGoodsData));
}

// 从api获取数据
function* getDWarehouseOutStockGoodsData(action) {
  const response = yield call(getWarehouseOutStockGoodsDataAPI, action.payload);
  if (response.Code === 0 && _.has(response.Result, 'CKQHQD')) {
    yield put({
      type: GET_WAREHOUSE_OUTSTOCK_GOODS_DAILOG_DATA_SUCCESS,
      dataResponse: response.Result.CKQHQD || []
    });
  }
}

