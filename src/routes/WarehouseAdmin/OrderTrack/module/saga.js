/**
 * Created by liuyali on 2016/12/14.
 */

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_FILTER_ORDERLIST_DATA,
  GET_FILTER_ORDERLIST_DATA_SUCCESS,
  GET_FILTER_ORDERLIST_DATA_ERROR
} from '../module/OrderTrack'

import { orderListSearchAndFilter } from 'api/DDB'

function *getFilterOrderListData(action) {
  try {
    const response = yield call(orderListSearchAndFilter, [action.page, action.params]);
    yield put({
      type: GET_FILTER_ORDERLIST_DATA_SUCCESS,
      resultArr: response.Result.SPCCB || [],
      cPage: action.page,
      total: response.Result.Total,
    })
  } catch (error) {
    yield put({
      type: GET_FILTER_ORDERLIST_DATA_ERROR,
      error
    })
  }
}
/* 开始盘存*/
export function * watchgetFilterOrderListData() {
  yield takeEvery(GET_FILTER_ORDERLIST_DATA, handleAPI(getFilterOrderListData))
}
