/**
 * Created by NXQ on 11/29/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
	PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA,
	PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_SUCCESS,
	PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_FAIL
} from './makePriceAddSingleGoodsDialog';

import {
  putGoodsMakePriceAddData
} from 'api/SPJG'


/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchPutMakePriceAddSingleGoodsQueryData() {
  yield takeEvery(PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA, handleAPI(putMakePriceAddSingleGoodsQueryData));
}


// 从api获取数据
function* putMakePriceAddSingleGoodsQueryData(action) {
  try {
    const response = yield call(putGoodsMakePriceAddData, action.payload);
    if (response.Code === 0) {
      yield put({
        type: PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_SUCCESS
      })
    } else {
      yield put({
        type: PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: PUT_MAKE_PRICE_ADD_SINGLE_GOODS_DATA_FAIL,
      error
    })
  }
}

