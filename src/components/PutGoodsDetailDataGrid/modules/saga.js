/**
 * Created by liuyali on 2016/11/3.
 */
/**
 * Created by liuyali on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  GET_PUTORDERSGODDS_DATA,
  GET_PUTORDERSGODDS_DATA_SUCCESS,
  GET_PUTORDERSGODDS_DATA_ERROR
} from './PutGoodsDetailDataGrid'

import {
  getDlryOrdersGoodsAPI
} from 'api/CRK'

export function * watchGetPutOrdersGoodsData() {
  yield takeEvery(GET_PUTORDERSGODDS_DATA, handleAPI(getPutOrdersGoodsData));
}
function * getPutOrdersGoodsData(action) {
  const response = yield call(getDlryOrdersGoodsAPI, action.payload);

  const resultArray = response.Result.CRKDMXB.map((good, index) => ({
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
    type: GET_PUTORDERSGODDS_DATA_SUCCESS,
    response: resultArray || []
  })
}
