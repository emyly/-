import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_ORDERDETAIL_DATA,
  GET_ORDERDETAIL_DATA_SUCCESS,
  GET_ORDERDETAIL_DATA_FAIL,
  GET_TURN_ORDERDETAIL_DATA,
  GET_TURN_ORDERDETAIL_DATA_SUCCESS,
  GET_TURN_ORDERDETAIL_DATA_FAIL
} from './orderBasicInfoForm.js'
import {
  getOrderDetailAPI
} from 'api/DDB'

function* getOrderDetail(action) {
  try {
    const response = yield call(getOrderDetailAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.DDB;
      yield put({
        type: GET_ORDERDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_ORDERDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_ORDERDETAIL_DATA_FAIL,
      response: error
    })
  }
}

export function* watchGetOrderDetailData() {
  console.debug('saga.js watchGetOrderDetailData');
  yield takeEvery(GET_ORDERDETAIL_DATA, handleAPI(getOrderDetail))
}


// 获取转单信息
function* getTurnOrderDetail(action) {
  try {
    const response = yield call(getOrderDetailAPI, action.payload);
    if (response.Code === 0) {
      const resultArray = response.Result.DDB;
      yield put({
        type: GET_TURN_ORDERDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_TURN_ORDERDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_TURN_ORDERDETAIL_DATA_FAIL,
      response: error
    })
  }
}

export function* watchGetTurnOrderDetailData() {
  yield takeEvery(GET_TURN_ORDERDETAIL_DATA, handleAPI(getTurnOrderDetail))
}

