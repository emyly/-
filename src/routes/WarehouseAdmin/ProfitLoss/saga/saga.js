/**
 * Created by liuyali on 2016/11/17.
 */

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  CHECK_IN_PROFITLOSS,
  CHECK_IN_PROFITLOSS_SUCCESS,
  CHECK_IN_PROFITLOSS_ERROR,
  GET_END_INVENTORY_RECORDS,
  GET_END_INVENTORY_RECORDS_SUCCESS,
  GET_END_INVENTORY_RECORDS_ERROR
} from '../modules/checkInProfitLoss'
import {
  CHECK_SINGLE_PROFITLOSS_DETAIL, CHECK_SINGLE_PROFITLOSS_DETAIL_SUCCESS, CHECK_SINGLE_PROFITLOSS_DETAIL_ERROR
} from '../modules/checkProfitLossList'
import {
  GET_PROFITLOSS_LIST, GET_PROFITLOSS_LIST_SUCCESS, GET_PROFITLOSS_LIST_ERROR
} from '../modules/getProfitLossList'

import {
  getProfitLossListAPI, checkSingleProfitLossDetailAPI, checkInProfitLossAPI, getEndInventoryRecordsAPI
} from 'api/PCHSY'

function * checkSingleProfitLossDetail(action) {
  try {
    const result = yield call(checkSingleProfitLossDetailAPI, action.payload.id);
    const response = result.Result.PDSYMXB.map((KW) => {
      const ARR = KW.SYMX.map(SP => ({
        stuffId: SP.SPBH,
        goodName: SP.SPMC,
        goodId: SP.SPPH,
        amount: SP.KCSL,
        profitLossAmount: SP.PDSL
      }));
      return {
        KWLJ: KW.KWLJ,
        SYMX: ARR
      }
    });
    yield put({
      type: CHECK_SINGLE_PROFITLOSS_DETAIL_SUCCESS,
      response,
    })
  } catch (error) {
    yield put({
      type: CHECK_SINGLE_PROFITLOSS_DETAIL_ERROR,
      error
    })
  }
}

function * getProfitLossList(action) {
  try {
    const result = yield call(getProfitLossListAPI, action.payload.page);

    const response = result.Result.PDSYB.map(SY => ({
      ...SY,
      profitAndLostID: SY.GUID,
      checkInDate: SY.CJSJ,
      profitAndLostOperator: SY.YHXM,
      describe: SY.PDSYMS,
        // status: ,

    }));

    yield put({
      type: GET_PROFITLOSS_LIST_SUCCESS,
      payload: {
        resultArr: response,
        cPage: action.payload.page,
        total: result.Result.Total
      }
    });
  } catch (error) {
    yield put({
      type: GET_PROFITLOSS_LIST_ERROR,
      error
    });
  }
}

function * checkInProfitLoss(action) {
  try {
    const subData = [];
    for (const KW in action.payload.data) {
      if (Object.prototype.hasOwnProperty.call(action.payload.data, KW)) {
        for (let i = 0; i < action.payload.data[KW].length; i++) {
          const obj = {
            KWID: action.payload.data[KW][i].KWID, // 库位ID
            CKID: action.payload.data[KW][i].CKID, // 仓库ID
            SPID: action.payload.data[KW][i].SPID, // 商品ID
            SPPHID: action.payload.data[KW][i].SPPHID, // 商品批号ID
            SPPPID: action.payload.data[KW][i].SPPPID, // 商品品牌ID
            SPBH: action.payload.data[KW][i].SPBH, // 商品编号
            SPPH: action.payload.data[KW][i].SPPH, // 商品批号
            // "SPLX": action.payload.data[KW][i].,//商品类型， "0"商品， "1"工具
            KCSL: action.payload.data[KW][i].SL, // 库存数量
            // "SYHSL": action.payload.data[KW][i].,
            PDSL: action.payload.data[KW][i].XZSL, // 损溢后数量
            // "SYHSL":action.payload.data[KW][i].XZSL,  //损溢后数量
            SCRQ: action.payload.data[KW][i].SCRQ,
            YXQZ: action.payload.data[KW][i].YXQZ,
            SPMS: action.payload.data[KW][i].SPMS,
            WQJXSID: action.payload.data[KW][i].WQJXSID
            // "SYYY": action.payload.data[KW][i].,
          };

          subData.push(obj);
        }
      }
    }
    const BTZR = action.payload.person.map(person => person.id)
    const subObj = {
      PDSYB: {
        PDSYMC: '损溢测试',
        PDSYMS: '测试登记损溢接口',
        KCPDID: action.payload.PDID
      },
      PDSYMXB: subData,
      TZ: {
        BTZR: BTZR || [],
        TZNR: action.payload.message,
      }
    }
    yield call(checkInProfitLossAPI, subObj);
    yield put({
      type: CHECK_IN_PROFITLOSS_SUCCESS,
    })
  } catch (error) {
    yield put({
      type: CHECK_IN_PROFITLOSS_ERROR,
      error
    })
  }
}

function *getEndInventoryRecords() {
  try {
    const result = yield call(getEndInventoryRecordsAPI);
    const response = result.Result.KCPDB.map(PC => ({ GUID: PC.GUID, PDMC: PC.PDMC, PDCK: PC.PDCK, PDCKMC: PC.PDCKMC }))

    yield put({
      type: GET_END_INVENTORY_RECORDS_SUCCESS,
      response
    });
  } catch (error) {
    yield put({
      type: GET_END_INVENTORY_RECORDS_ERROR,
      error
    })
  }
}

export function * watchCheckSingleProfitLossDetail() {
  yield takeEvery(CHECK_SINGLE_PROFITLOSS_DETAIL, handleAPI(checkSingleProfitLossDetail))
}
export function * watchGetProfitLossList() {
  yield takeEvery(GET_PROFITLOSS_LIST, handleAPI(getProfitLossList))
}
export function * watchCheckInProfitLoss() {
  yield takeEvery(CHECK_IN_PROFITLOSS, handleAPI(checkInProfitLoss))
}
export function * watchgetEndInventoryRecords() {
  yield takeEvery(GET_END_INVENTORY_RECORDS, handleAPI(getEndInventoryRecords))
}
