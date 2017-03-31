/**
 *
 *
 * Created by chenming on 2016/11/3.
 */

import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_FINANCIALLIST_DATA,
  GET_FINANCIALLIST_DATA_SUCCESS,
  GET_FINANCIALLIST_DATA_FAIL,
} from './financialDataGrid.js'
import {
  getAlreadyBillingAPI,
  getOrderListAPI,
  getUnverificationAPI,
  getVerificationedAPI
} from 'api/financial'

import {
  FinancialType,
  BillingType,
  VerificationType
} from '../FinancialDataData.js'
/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetFinancialListData() {
  yield takeEvery(GET_FINANCIALLIST_DATA, handleAPI(getFinancialListData))
}

// 从api获取数据
function* getFinancialListData(action) {
  const actionType = action.payload.type;
  console.debug('getFinancialListData saga 1:', action, actionType);
  console.debug('getFinancialListData saga 2:', FinancialType.baddebts);
  switch (actionType) {
    case FinancialType.baddebts : yield call(getFinancialBaddebtsListData, action); break;
    case FinancialType.billing : yield call(getFinancialBillingListData, action); break;
    case FinancialType.discount : yield call(getFinancialDiscountListData, action); break;
    case FinancialType.gathering : yield call(getFinancialGatheringListData, action); break;
    case FinancialType.logistics : yield call(getFinancialLogisticsListData, action); break;
    case FinancialType.urgent : yield call(getFinancialUrgentListData, action); break;
    case FinancialType.verification : yield call(getFinancialVerificationListData, action); break;
  }
}

function* getFinancialBaddebtsListData(action) {
  console.debug('getFinancialBaddebtsListData saga:', action);
  try {
    const response = yield call(getOrderListAPI, action.payload.param);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIALLIST_DATA_SUCCESS,
        response: response.Result.DDB,
        currentPage: action.payload.param.Page,
        totalPage: response.Result.Total,
      })
    } else {
      yield put({
        type: GET_FINANCIALLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIALLIST_DATA_FAIL,
      response: error
    })
  }
}

function* getFinancialBillingListData(action) {
  if (action.payload.billingType === BillingType.Already) {
    yield call(getFinancialAlreadyBillingListData, action);
  } else if (action.payload.billingType === BillingType.Unbilling) {
    yield call(getFinancialUnBillingListData, action);
  }
}

function* getFinancialAlreadyBillingListData(action) {
  try {
    const response = yield call(getAlreadyBillingAPI, action.payload.param);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIALLIST_DATA_SUCCESS,
        response: response.Result.XSKPB,
        currentPage: action.payload.param.Page,
        totalPage: response.Result.total,
      })
    } else {
      yield put({
        type: GET_FINANCIALLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIALLIST_DATA_FAIL,
      response: error
    })
  }
}

function* getFinancialUnBillingListData(action) {
  try {
    const response = yield call(getOrderListAPI, action.payload.param);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIALLIST_DATA_SUCCESS,
        response: response.Result.DDB,
        currentPage: action.payload.param.Page,
        totalPage: response.Result.Total,
      })
    } else {
      yield put({
        type: GET_FINANCIALLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIALLIST_DATA_FAIL,
      response: error
    })
  }
}

function* getFinancialDiscountListData(action) {
  try {
    const response = yield call(getOrderListAPI, action.payload.param);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIALLIST_DATA_SUCCESS,
        response: response.Result.DDB,
        currentPage: action.payload.param.Page,
        totalPage: response.Result.Total,
      })
    } else {
      yield put({
        type: GET_FINANCIALLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIALLIST_DATA_FAIL,
      response: error
    })
  }
}

function* getFinancialGatheringListData(action) {
  try {
    const response = yield call(getOrderListAPI, action.payload.param);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIALLIST_DATA_SUCCESS,
        response: response.Result.DDB,
        currentPage: action.payload.param.Page,
        totalPage: response.Result.Total,
      })
    } else {
      yield put({
        type: GET_FINANCIALLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIALLIST_DATA_FAIL,
      response: error
    })
  }
}

function* getFinancialLogisticsListData(action) {
  try {
    const response = yield call(getOrderListAPI, action.payload.param);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIALLIST_DATA_SUCCESS,
        response: response.Result.DDB,
        currentPage: action.payload.param.Page,
        totalPage: response.Result.Total,
      })
    } else {
      yield put({
        type: GET_FINANCIALLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIALLIST_DATA_FAIL,
      response: error
    })
  }
}

function* getFinancialUrgentListData(action) {
  try {
    const response = yield call(getOrderListAPI, action.payload.param);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIALLIST_DATA_SUCCESS,
        response: response.Result.DDB,
        currentPage: action.payload.param.Page,
        totalPage: response.Result.Total,
      })
    } else {
      yield put({
        type: GET_FINANCIALLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIALLIST_DATA_FAIL,
      response: error
    })
  }
}

function* getFinancialVerificationListData(action) {
  if (VerificationType.Already === action.payload.verType) {
    yield call(getFinancialAlreadyVerificationListData, action);
  } else if (VerificationType.UnverificationType === action.payload.verType) {
    yield call(getFinancialUnVerificationListData, action);
  }
}

function* getFinancialAlreadyVerificationListData(action) {
  try {
    const response = yield call(getVerificationedAPI, action.payload.param);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIALLIST_DATA_SUCCESS,
        response: response.Result.DDYHXB,
        currentPage: action.payload.param.Page,
        totalPage: response.Result.Total,
      })
    } else {
      yield put({
        type: GET_FINANCIALLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIALLIST_DATA_FAIL,
      response: error
    })
  }
}

function* getFinancialUnVerificationListData(action) {
  try {
    const response = yield call(getUnverificationAPI, action.payload.param);
    if (response.Code === 0) {
      yield put({
        type: GET_FINANCIALLIST_DATA_SUCCESS,
        response: response.Result.DDWHXB,
        currentPage: action.payload.param.Page,
        totalPage: response.Result.Total,
      })
    } else {
      yield put({
        type: GET_FINANCIALLIST_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_FINANCIALLIST_DATA_FAIL,
      response: error
    })
  }
}
