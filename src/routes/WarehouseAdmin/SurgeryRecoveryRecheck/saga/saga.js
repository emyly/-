/**
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  FETCH_SURGERY_ORDER_RETURN_LIST,
  fetchSurgeryOrderReturnListSuccess,
  fetchSurgeryOrderReturnListFail

} from '../module/surgeryOrderReturnList'

import {
  FETCH_SURGERY_RECHECK_ORDER_DETAIL,
  fetchSurgeryRecheckOrderDetailSuccess,
  fetchSurgeryRecheckOrderDetailFail
} from '../module/surgeryRecheckOrderDetail'

import {
  UPDATE_RETURN_ORDER_RECHECK_STATUS,
  updateReturnOrderRecheckSuccess,
  updateReturnOrderRecheckFail
} from '../module/returnOrderRecheck'

import {
  UPDATE_SURGERY_RETURN_RECEIVING_RECHECK,
  updateSurgeryReturnReceivingRecheck,
  updateSurgeryReturnReceivingRecheckSuccess,
  updateSurgeryReturnReceivingRecheckFail
} from '../module/surgeryReturnReceivingRecheck'

import {
  FETCH_SINGLE_RECEIVING_ORDER_DETAIL,
  fetchSingleReceivingOrderDetailSuccess,
  fetchSingleReceivingOrderDetailFail
} from '../module/singleReceivingOrderDetail'

import {
  FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST,
  fetchSurgeryLogisticsOrderDetailListSuccess,
  fetchSurgeryLogisticsOrderDetailListFail
} from '../module/surgeryLogisticsOrderDetail'

/* Include API functions */
import { historyWarehousingAPI } from 'api/DDB'
import {
  surgeryReturnLogisticsOrderRecheck,
  postOutWarehouseCheckAPI,
  surgeryReturnReceivingRecheckFinish,
  getSingleWareHouseOutProductionDetailAPI,
  fetchSurgeryLogisticsOrderSummary,
} from 'api/CRK'

import Constant from 'lib/constant'

function *fetchSurgeryOrderReturnListSaga(action) {
  try {
    const result = yield call(historyWarehousingAPI, {
      id: action.orderId,
      body: action.payload
    })
    if (result.Code === 0) {
      yield put(fetchSurgeryOrderReturnListSuccess(result.Result.CRKDB))
    } else {
      yield put(fetchSurgeryOrderReturnListFail(result.Message))
      yield put({ type: 'ERROR', error: result.Message })
    }
  } catch (error) {
    yield put(fetchSurgeryOrderReturnListFail(error))
    yield put({ type: 'ERROR', error })
  }
}

export function *watchFetchSurgeryOrderReturnList() {
  yield* takeEvery(FETCH_SURGERY_ORDER_RETURN_LIST, handleAPI(fetchSurgeryOrderReturnListSaga))
}

function *fetchSurgeryRecheckOrderDetailSaga(action) {
  try {
    const result = yield call(surgeryReturnLogisticsOrderRecheck, action.params);
    if (result.Code === 0) {
      yield put(fetchSurgeryRecheckOrderDetailSuccess(result))
    } else {
      yield put(fetchSurgeryRecheckOrderDetailFail(result.Message))
      yield put({ type: 'ERROR', error: result.Message })
    }
  } catch (error) {
    yield put(fetchSurgeryRecheckOrderDetailFail(error))
    yield put({ type: 'ERROR', error })
  }
}

export function *watchFetchSurgeryRecheckOrderDetail() {
  yield* takeEvery(FETCH_SURGERY_RECHECK_ORDER_DETAIL, handleAPI(fetchSurgeryRecheckOrderDetailSaga));
}

/* NOTE: This Saga function will continue to call another API to do Approve Surgery Order Recheck */
function *updateReturnOrderRecheckSaga(action) {
  const params = action.params
  try {
    const result = yield call(postOutWarehouseCheckAPI, action);
    if (result.Code === 0) {
      /* call another API to continue approve process */
      if (action.checkStatus === Constant.SAAS.CRK.APPROVE) {
        yield put(updateSurgeryReturnReceivingRecheck(params.DDB.GUID, params.CRKDSHB.map(obj => obj.CRKDID)))
      }
      yield put(updateReturnOrderRecheckSuccess(result))
    } else {
      yield put(updateReturnOrderRecheckFail(result.Message))
      yield put({ type: 'ERROR', error: result.Message })
    }
  } catch (error) {
    yield put(updateReturnOrderRecheckFail(error))
    yield put({ type: 'ERROR', error })
  }
}

export function *watchUpdateReturnOrderRecheck() {
  yield* takeEvery(UPDATE_RETURN_ORDER_RECHECK_STATUS, handleAPI(updateReturnOrderRecheckSaga));
}

function *updateSurgeryReturnReceivingRecheckSaga(action) {
  try {
    const result = yield call(surgeryReturnReceivingRecheckFinish, action.params);
    if (result.Code === 0) {
      yield put(updateSurgeryReturnReceivingRecheckSuccess(result.Result))
    } else {
      yield put(updateSurgeryReturnReceivingRecheckFail(result.Message))
      yield put({ type: 'ERROR', error: result.Message })
    }
  } catch (error) {
    yield put(updateSurgeryReturnReceivingRecheckFail(error))
    yield put({ type: 'ERROR', error })
  }
}

export function *watchUpdateSurgeryReturnReceivingRecheck() {
  yield* takeEvery(UPDATE_SURGERY_RETURN_RECEIVING_RECHECK, handleAPI(updateSurgeryReturnReceivingRecheckSaga))
}

function *fetchSingleReceivingOrderDetailSaga(action) {
  try {
    const result = yield call(getSingleWareHouseOutProductionDetailAPI, action.params);
    if (result.Code === 0) {
      yield put(fetchSingleReceivingOrderDetailSuccess(result.Result))
    } else {
      yield put(fetchSingleReceivingOrderDetailFail(result.Message))
      yield put({ type: 'ERROR', error: result.Message })
    }
  } catch (error) {
    yield put(fetchSingleReceivingOrderDetailFail(error))
    yield put({ type: 'ERROR', error })
  }
}

export function *watchFetchSingleReceivingOrderDetail() {
  yield* takeEvery(FETCH_SINGLE_RECEIVING_ORDER_DETAIL, handleAPI(fetchSingleReceivingOrderDetailSaga))
}

function *fetchSurgeryLogisticsOrderDetailListSaga(action) {
  try {
    const result = yield call(fetchSurgeryLogisticsOrderSummary, action.params)
    if (result.Code === 0) {
      yield put(fetchSurgeryLogisticsOrderDetailListSuccess(result.Result.CRKDMXB))
    } else {
      yield put(fetchSurgeryLogisticsOrderDetailListFail(result.Message))
      yield put({ type: 'ERROR', error: result.Message })
    }
  } catch (error) {
    yield put(fetchSurgeryLogisticsOrderDetailListFail(error))
    yield put({ type: 'ERROR', error })
  }
}

export function *watchFetchSurgeryLogisticsOrderDetailList() {
  yield* takeEvery(FETCH_SURGERY_LOGISTICS_ORDER_DETAIL_LIST, handleAPI(fetchSurgeryLogisticsOrderDetailListSaga))
}
