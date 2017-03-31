import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_GATHERINGEDDETAIL_DATA,
  GET_GATHERINGEDDETAIL_DATA_SUCCESS,
  GET_GATHERINGEDDETAIL_DATA_FAIL,
  GET_UNGATHERINGDETAIL_DATA,
  GET_UNGATHERINGDETAIL_DATA_SUCCESS,
  GET_UNGATHERINGDETAIL_DATA_FAIL
} from './gatheringDetailTable.js'
import {
  getOrderGatheringedDetailAPI,
  getOrderUngatheringDetailAPI
} from 'api/DDB'

export function* watchGetOrderGatheringedDetailData() {
  yield takeEvery(GET_GATHERINGEDDETAIL_DATA, handleAPI(getOrderGatheringedDetail))
}

export function* watchGetOrderUngatheringDetailData() {
  yield takeEvery(GET_UNGATHERINGDETAIL_DATA, handleAPI(getOrderUngatheringDetail))
}

function* getOrderGatheringedDetail(action) {
  try {
    const response = yield call(getOrderGatheringedDetailAPI, action.payload);
    if (response.Code === 0) {
      console.log('getOrderGatheringedDetail:', response);
      const resultArray = response.Result.YSKMX;

      yield put({
        type: GET_GATHERINGEDDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_GATHERINGEDDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_GATHERINGEDDETAIL_DATA_FAIL,
      response: error
    })
  }
}

function* getOrderUngatheringDetail(action) {
  try {
    const response = yield call(getOrderUngatheringDetailAPI, action.payload);
    if (response.Code === 0) {
      console.log('getOrderUngatheringDetail:', response);
      const resultArray = response.Result.WSZMX;

      yield put({
        type: GET_UNGATHERINGDETAIL_DATA_SUCCESS,
        response: resultArray
      })
    } else {
      yield put({
        type: GET_UNGATHERINGDETAIL_DATA_FAIL,
        response: response.Message
      })
    }
  } catch (error) {
    yield put({
      type: GET_UNGATHERINGDETAIL_DATA_FAIL,
      response: error
    })
  }
}
