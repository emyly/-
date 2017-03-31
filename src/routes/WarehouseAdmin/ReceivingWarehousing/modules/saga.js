/**
 * Created by qyf on 2016/11/5.
 */
import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';
import {
  GET_RECEVING_GOODS_DATAIL_DATA,
  GET_RECEVING_GOODS_DATAIL_DATA_SUCCESS,
  GET_RECEVING_GOODS_DATAIL_DATA_FAIL
} from './recevingWareDetail'
import {
  getDlryOrdersGoodsAPI,
} from 'api/CRK';


// 监听action type 详情页面
export function* watchGetRecevingListData() {
  yield takeEvery(GET_RECEVING_GOODS_DATAIL_DATA, handleAPI(getRecevingGoodsData))
}

// 详情页面获取数据
function* getRecevingGoodsData(action) {
  try {
    const response = yield call(getDlryOrdersGoodsAPI, action.payload);
    const resultArray = response.Result.CRKMXB.map((details, index) => ({
      SPBH: details.SPBH,
      SPMC: details.SPMC,
      SL: details.SL,
      SPMS: details.SPMS,
      YRKSL: details.YRKSL,
      WRKSL: details.WRKSL
    }))
    yield put({
      type: GET_RECEVING_GOODS_DATAIL_DATA_SUCCESS,
      response: resultArray || []
    })
  } catch (error) {
    yield put({
      type: GET_RECEVING_GOODS_DATAIL_DATA_FAIL,
      error
    })
  }
}
