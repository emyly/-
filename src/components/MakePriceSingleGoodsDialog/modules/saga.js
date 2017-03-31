/**
 * Created by NXQ on 11/29/2016.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA,
  GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS,
  GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL,
  DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA,
  DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS,
  DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL,
  GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA,
  GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_SUCCESS,
  GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_FAIL
} from './makePriceSingleGoodsDialog';

import {
  getSingleGoodsMakePriceData,
  deleteSingleGoodsMakePriceData
} from 'api/SPJG'

import moment from 'moment';

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchgetMakePriceSingleGoodsDialogQueryData() {
  yield takeEvery(GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA, handleAPI(getMakePriceSingleGoodsDialogQueryData));
}


// 从api获取数据
function* getMakePriceSingleGoodsDialogQueryData(action) {
  try {
    const response = yield call(getSingleGoodsMakePriceData, action.payload);
    if (response.Code === 0) {
      yield put({
        type: GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS,
        responseObject: {
          JGZT: action.payload.JGZT,
          data: response.Result.goods || []
        }
      })
    } else {
      yield put({
        type: GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL,
      error
    })
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchdeleteMakePriceSingleGoodsDialogQueryData() {
  yield takeEvery(DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA, handleAPI(deleteMakePriceSingleGoodsDialogQueryData));
}


// 从api获取数据
function* deleteMakePriceSingleGoodsDialogQueryData(action) {
  try {
    const response = yield call(deleteSingleGoodsMakePriceData, action.payload);
    if (response.Code === 0) {
      yield put({
        type: DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_SUCCESS,
        response: action.payload
      })
    } else {
      yield put({
        type: DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: DELETE_MAKE_PRICE_SINGLE_GOODS_DIALOG_DATA_FAIL,
      error
    })
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchgetMakePriceSingleGoodsLineChartQueryData() {
  yield takeEvery(GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA, handleAPI(getMakePriceSingleGoodsLineChartQueryData));
}


// 从api获取数据
function* getMakePriceSingleGoodsLineChartQueryData(action) {
  try {
    const response = yield call(getSingleGoodsMakePriceData, action.payload);
    if (response.Code === 0) {
      const xAxisChartData = [];   // chart xAxis data  日期
      const seriesChartData = [];   // chart series data 价格
      const sortArray = response.Result.goods.sort((preValue, nextValue) => (preValue.effective_start_date - nextValue.effective_start_date));
      sortArray.map((value) => {
        xAxisChartData.push(moment(value.effective_start_date).format('YYYY-MM-DD'));
        seriesChartData.push(value.price);
      })
      yield put({
        type: GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_SUCCESS,
        xAxisChartResponse: xAxisChartData,
        seriesChartResponse: seriesChartData
      })
    } else {
      yield put({
        type: GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_FAIL,
        error: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_MAKE_PRICE_SINGLE_GOODS_LINE_CHART_DATA_FAIL,
      error
    })
  }
}

