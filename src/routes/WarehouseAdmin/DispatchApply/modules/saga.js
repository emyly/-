import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  POST_DISPATCH_APPLY,
  POST_DISPATCH_APPLY_SUCCESS,
  POST_DISPATCH_APPLY_ERROR
} from './dispatchApplyAlert.js'

import {
  GET_DISPATCH_APPLY_LIST,
  GET_DISPATCH_APPLY_LIST_SUCCESS,
  GET_DISPATCH_APPLY_LIST_ERROR
} from './dispatchApply.js'

import {
  GET_DISPATCH_APPLY_Detail,
  GET_DISPATCH_APPLY_Detail_SUCCESS,
  GET_DISPATCH_APPLY_Detail_ERROR
} from './dispatchApplyDetail.js'


import { postDispatchApplyAPI, getDispatchApplyListAPI, orderGoodsDetailAPI, getOrderDetailAPI } from 'api/DDB'

export function* watchPostDispatchApply() {
  yield takeEvery(POST_DISPATCH_APPLY, handleAPI(postDispatchApply))
}

export function* watchGetDispatchApplyList() {
  yield takeEvery(GET_DISPATCH_APPLY_LIST, handleAPI(getDispatchApplyList))
}

export function* watchGetDispatchApplyDetail() {
  yield takeEvery(GET_DISPATCH_APPLY_Detail, handleAPI(getDispatchApplyDetail))
}

export function* postDispatchApply(action) {
  try {
    const response = yield call(postDispatchApplyAPI, action.payload);
    yield put({
      type: POST_DISPATCH_APPLY_SUCCESS,
      response
    })
  } catch (error) {
    yield put({
      type: POST_DISPATCH_APPLY_ERROR
    })
  }
}

export function* getDispatchApplyList(action) {
  try {
    const response = yield call(getDispatchApplyListAPI, action.payload);
    yield put({
      type: GET_DISPATCH_APPLY_LIST_SUCCESS,
      response: response.Result
    })
  } catch (error) {
    yield put({
      type: GET_DISPATCH_APPLY_LIST_ERROR
    })
  }
}

export function* getDispatchApplyDetail(action) {
  try {
    const [productionList, orderDetail] = yield [call(orderGoodsDetailAPI, action.payload), call(getOrderDetailAPI, action.payload)]
    console.error(orderDetail)
    yield put({
      type: GET_DISPATCH_APPLY_Detail_SUCCESS,
      response: {
        productionList: productionList.Result.DDSPGLB,
        orderDetail: orderDetail.Result.DDB
      }
    })
  } catch (error) {
    yield put({
      type: GET_DISPATCH_APPLY_Detail_ERROR
    })
  }
}
