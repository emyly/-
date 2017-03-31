/**
 * Created by liuyali on 2016/11/23.
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
    SURGERY_RECOVERY_GOODS_SUMMARY,
    SURGERY_RECOVERY_GOODS_SUMMARY_SUCCESS,
    SURGERY_RECOVERY_GOODS_SUMMARY_ERROR,
    SUBMIT_THIS_TIME_RECOVERY_GOODS,
    SUBMIT_THIS_TIME_RECOVERY_GOODS_SUCCESS,
    SUBMIT_THIS_TIME_RECOVERY_GOODS_ERROR,
} from '../modules/surgeryRecoveryGoodsSummary'

import {
    surgeryRecoveryGoodsSummaryAPI, submitSurgeryRecoveryDataAPI
} from 'api/CRK'

function *surgeryRecoveryGoodsSummary(action) {
  try {
    const result = yield call(surgeryRecoveryGoodsSummaryAPI, action.id);
    yield put({
      type: SURGERY_RECOVERY_GOODS_SUMMARY_SUCCESS,
      response: result.Result.CRKMXB
    })
  } catch (error) {
    yield put({
      type: SURGERY_RECOVERY_GOODS_SUMMARY_ERROR,
      error
    });
  }
}

function *submitSurgeryRecoveryData(action) {
  try {
    const data = [];
    action.data.map((good) => {
      if ('BCHS' in good) {
        const obj = {
          SPBH: good.SPBH, // 商品编号
          SPPH: good.SPPH, // 商品批号
          SL: good.BCHS, // 数量
          ZT: '2', // 状态，0：未出库，1：已出库，2：:已入库，3：已销售，4：未入库
          SPID: good.SPID,
          SPPHID: good.SPPHID,
          SPLX: good.SPLX
        };
        data.push(obj)
      }
      if ('BCSH' in good) {
        const obj = {
          SPBH: good.SPBH, // 商品编号
          SPPH: good.SPPH, // 商品批号
          SL: good.BCSH, // 数量
          ZT: '3', // 状态，0：未出库，1：已出库，2：:已入库，3：已销售，4：未入库
          SPID: good.SPID,
          SPPHID: good.SPPHID,
          SPLX: good.SPLX
        };
        data.push(obj)
      }
    });
    if (data.length <= 0) {
      return;
    }

    yield call(submitSurgeryRecoveryDataAPI, [action.DDID, data, action.params]);
    yield put({
      type: SUBMIT_THIS_TIME_RECOVERY_GOODS_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: SUBMIT_THIS_TIME_RECOVERY_GOODS_ERROR,
      error
    });
  }
}
export function *watchSurgeryRecoveryGoodsSummary() {
  yield takeEvery(SURGERY_RECOVERY_GOODS_SUMMARY, handleAPI(surgeryRecoveryGoodsSummary));
}

export function *watchSubmitSurgeryRecoveryData() {
  yield takeEvery(SUBMIT_THIS_TIME_RECOVERY_GOODS, handleAPI(submitSurgeryRecoveryData));
}
