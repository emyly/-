/**
 * Created by liuyali on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_DLRYORDERSGODDS_DATA,
  GET_DLRYORDERSGODDS_DATA_SUCCESS,
  GET_DLRYORDERSGODDS_DATA_ERROR
} from './DeliveryOrdersGoodsDetailDataGrid'

import {
  getDlryOrdersGoodsAPI
} from 'api/CRK'

export function * watchGetDlryOrdersGoodsData() {
  yield takeEvery(GET_DLRYORDERSGODDS_DATA, handleAPI(getDlryOrdersGoodsData));
}
function * getDlryOrdersGoodsData(action) {
  try {
    const response = yield call(getDlryOrdersGoodsAPI, action.payload);
    const resultArray = response.Result.CRKMXB.map((good, index) => ({
      stuffId: good.SPBH,
      goodName: good.SPMC,
      goodDes: good.SPMS,
      totalAmount: good.DGSL,
      alreadyChecked: good.YFHSL,
      waitingChecked: good.DFHSL,
      selectedGoods: good.YJHSL,
      waitingSelectingGoods: good.WPHSL,
    }));

    yield put({
      type: GET_DLRYORDERSGODDS_DATA_SUCCESS,
      response: resultArray || []
    })
  } catch (error) {
    yield put({
      type: GET_DLRYORDERSGODDS_DATA_ERROR,
      response: error
    })
  }
}
