/**
 * Created by NXQ on 11/4/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
	GET_MAKE_PRICE_GOODS_DATA,
	GET_MAKE_PRICE_GOODS_DATA_SUCCESS,
	GET_MAKE_PRICE_GOODS_DATA_FAIL,
  PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA,
  PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_SUCCESS,
  PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_FAIL
} from './makePriceGoodsDataGrid';

import {
  getAuthorizationSelectionGoodsAPI
} from 'api/authorization'

import {
  putGoodsMakePriceAddData
} from 'api/SPJG'

import moment from 'moment';


/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetMakePriceGoodsQueryData() {
  yield takeEvery(GET_MAKE_PRICE_GOODS_DATA, handleAPI(getMakePriceGoodsQueryData));
}


// 从api获取数据
function* getMakePriceGoodsQueryData(action) {
  try {
    const response = yield call(getAuthorizationSelectionGoodsAPI, action.payload);
    const resultResponse = response.Result.goods.map(value => ({
      id: value.id,
      no: value.no,
      name: value.name,
      desc: value.desc,
      price: value.price || '',
      tax_rate: value.tax_rate || 17,
      material_no: value.material_no,
      money_type: value.money_type || 'CNY',
      effective_start_date: new Date(value.effective_start_date) || new Date(moment({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(-1, 'days'))
    }))
    if (response.Code === 0) {
      yield put({
        type: GET_MAKE_PRICE_GOODS_DATA_SUCCESS,
        response: resultResponse || []
      })
    } else {
      yield put({
        type: GET_MAKE_PRICE_GOODS_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_MAKE_PRICE_GOODS_DATA_FAIL,
      error
    })
  }
}


export function* watchPutMakePriceGoodsDataGridQueryData() {
  yield takeEvery(PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA, handleAPI(putMakePriceDataGridGoodsQueryData));
}


// 从api获取数据
function* putMakePriceDataGridGoodsQueryData(action) {
  try {
    const response = yield call(putGoodsMakePriceAddData, action.payload);
    if (response.Code === 0) {
      yield put({
        type: PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_SUCCESS
      })
    } else {
      yield put({
        type: PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: PUT_MAKE_PRICE_GOODS_DATA_GRID_DATA_FAIL,
      error
    })
  }
}

