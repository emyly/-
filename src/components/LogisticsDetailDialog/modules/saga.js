/**
 * Created by chenming on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_LOGISTICSDETAILDIALOG_DATA,
  GET_LOGISTICSDETAILDIALOG_DATA_SUCCESS,
  GET_LOGISTICSDETAILDIALOG_DATA_FAIL,
  GET_THIRDLOGISTICSINFO_DATA,
  GET_THIRDLOGISTICSINFO_DATA_SUCCESS,
  GET_THIRDLOGISTICSINFO_DATA_FAIL
} from './logisticsDetailDialog.js'
import {
  getLogisticDetailAPI,
  getThirdLogisticsInfo
} from 'api/WLDB'

// 从api获取数据
function* getThirdLogisticsInfoData(action) {
  try {
    const response = yield call(getThirdLogisticsInfo, action.payload);
    const resultArray = response;
    if (response.Code === 0) {
      yield put({
        type: GET_THIRDLOGISTICSINFO_DATA_SUCCESS,
        response: resultArray,
      })
    } else {
      yield put({
        type: GET_THIRDLOGISTICSINFO_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_THIRDLOGISTICSINFO_DATA_FAIL,
      response: error
    })
  }
}
function* getLogisticsDetailData(action) {
  let response = null;
  let thirdResponse = null;
  try {
    response = yield call(getLogisticDetailAPI, action.payload);
    if (response.Result.WLDB.WLLX === '0') {
      const params = { params: response.Result.WLDB.WLDH };
      thirdResponse = yield call(getThirdLogisticsInfo, params);
      if (thirdResponse.Code !== 0) {
        throw new Error('第三方物流信息获取错误');
      }
    }
  } catch (error) {
    yield put({
      type: GET_LOGISTICSDETAILDIALOG_DATA_FAIL,
      response: error
    })
  } finally {
    const reultData = { WLDB: response, WLXX: thirdResponse };
    if (response.Code === 0) {
      yield put({
        type: GET_LOGISTICSDETAILDIALOG_DATA_SUCCESS,
        response: reultData,
      })
    } else {
      yield put({
        type: GET_LOGISTICSDETAILDIALOG_DATA_FAIL,
        response: response.Message
      })
    }
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetLogisticsDetailData() {
  yield takeEvery(GET_LOGISTICSDETAILDIALOG_DATA, handleAPI(getLogisticsDetailData))
}
export function* watchGetThirdLogisticsInfoData() {
  yield takeEvery(GET_THIRDLOGISTICSINFO_DATA, handleAPI(getThirdLogisticsInfoData))
}
