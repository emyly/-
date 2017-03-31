import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  POST_LOGISTICS_DELIVERY_DATA,
  POST_LOGISTICS_DELIVERY_SUCCESS,
  POST_LOGISTICS_DELIVERY_ERROR
} from './logisticsDeliveryDetail.js'

import { postLogisticsDeliverySendAPI } from 'api/WLDB'

export function* watchPostLogisticsDeliverySend() {
  yield takeEvery(POST_LOGISTICS_DELIVERY_DATA, handleAPI(postLogisticsDeliverySend))
}


export function* postLogisticsDeliverySend(action) {
  // try {
  //   const data = yield call(postLogisticsDeliverySendAPI,action.payload);
  //   yield put({
  //     type: POST_LOGISTICS_DELIVERY_SUCCESS,
  //     response:data
  //   })
  // } catch (error) {
  //   yield put({
  //     type: POST_LOGISTICS_DELIVERY_ERROR,
  //     response:error
  //   })
  // }

  try {
    const response = yield call(postLogisticsDeliverySendAPI, action.payload);
    if (response.Code === 0) {
      yield put({
        type: POST_LOGISTICS_DELIVERY_SUCCESS,
        response
      })
    } else {
      yield put({
        type: POST_LOGISTICS_DELIVERY_ERROR,
        response
      })
    }
  } catch (error) {
    yield put({
      type: POST_LOGISTICS_DELIVERY_ERROR,
      response: error
    })
  }
}
