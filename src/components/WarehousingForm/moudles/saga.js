/* saga functions */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  FETCH_SINGLE_LOGISTICS_DETAIL,
  fetchSingleLogisticsDetail,
  fetchSingleLogisticsDetailSuccess,
  fetchSingleLogisticsDetailFail,
  dealCurrentWLDSuccess,
} from './logisticsDetail'

import {
  FETCH_ORDER_LOGISTICS_INFO,
  fetchOrderLogisticsInfoSuccess,
  fetchOrderLogisticsInfoFail
} from './orderLogisticsInfo'

import {
  UPDATE_RECEIVING_GOODS,
  updateReceivingGoodsSuccess,
  updateReceivingGoodsFail,
} from './receivingGoods'

import {
  LogistDetailSlect,
  getSingleOrderLogisticsDetailAPI
} from 'api/DDB'

import _ from 'lodash'
import {
  createReceivingGoodsOrderAPI
} from 'api/CRK'

/* Saga function: fetch single logistics detail */
/* 物流单号获取商品详情*/
function *fetchSingleLogisticsDetailSaga(action) {
  try {
    const params = {
      DDID: action.ddid,  /* 订单ID */
      WLDH: action.wldh   /* 物流单号 */
    }
    const logisticsDetail = yield call(getSingleOrderLogisticsDetailAPI, params)
    let resultArr = [];

    if (_.has(logisticsDetail.Result, 'CRKMXB')) {
      resultArr = logisticsDetail.Result.CRKMXB.map((detail, index) => ({
        WLBH: detail.SPBH,
        SPMC: detail.SPMC,
        SPPH: detail.SPPH,
        SL: detail.SL, // 本次发货数量
        YRKSL: detail.YRKSL,
        SYSL: detail.SL - detail.YRKSL, // 未入库数量 之前已入库
        DRKSL: 0,
        SPPHID: detail.SPPHID,
        SPID: detail.SPID,
        SPMS: detail.SPMS
      }))
    }
    yield put(fetchSingleLogisticsDetailSuccess({ wldh: action.wldh, data: resultArr }));
  } catch (error) {
    yield put(fetchSingleLogisticsDetailFail(error))
  }
}
/* 根据订单获取物流单号列表*/
/* Saga function: fetch order logistics infomation */
function *fetchOrderLogisticsInfoSaga(action) {
  try {
    const orderInfo = yield call(LogistDetailSlect, action.guid);
    const result = [];
    orderInfo.Result.WLDB.map((wld, index) => {
      if (wld && wld.WLDH) {
        result.push({ WLDH: wld.WLDH });
      }
    })
    yield put(fetchOrderLogisticsInfoSuccess(result));
    /* 设置第一个物流单号为当前物流单号*/
    yield put(dealCurrentWLDSuccess(result.length ? result[0].WLDH : ''));
    /* 根据物流单号获取商品列表*/
    for (let i = 0; i < result.length; i++) {
      yield put(fetchSingleLogisticsDetail(action.guid, result[i].WLDH));
    }
  } catch (error) {
    yield put(fetchOrderLogisticsInfoFail(error))
  }
}
/* 提交入库数字*/
/* Saga function: update receiving goods */
function *updateReceivingGoodsSaga(action) {
  try {
    const KWS = Object.values(action.receivingGoods);
    const BTZR = action.atPerson.map((person, index) => person.id);
    if (KWS.length > 0) {
      for (let i = 0; i < KWS.length; i++) {
        for (let j = 0; j < KWS[i].length; j++) {
          KWS[i][j].TZ = {
            TZNR: action.message,
            BTZR: BTZR || []
          };
          yield call(createReceivingGoodsOrderAPI, KWS[i][j]);
        }
      }
      yield put(updateReceivingGoodsSuccess());
    } else {
      return;
    }
  } catch (error) {
    yield put(updateReceivingGoodsFail(error))
  }
}

export function *watchFetchSingleLogisticsDetail() {
  yield* takeEvery(FETCH_SINGLE_LOGISTICS_DETAIL, handleAPI(fetchSingleLogisticsDetailSaga))
}

export function *watchFetchOrderLogisticsInfo() {
  yield* takeEvery(FETCH_ORDER_LOGISTICS_INFO, handleAPI(fetchOrderLogisticsInfoSaga))
}

export function *watchUpdateReceivingGoods() {
  yield* takeEvery(UPDATE_RECEIVING_GOODS, handleAPI(updateReceivingGoodsSaga))
}
