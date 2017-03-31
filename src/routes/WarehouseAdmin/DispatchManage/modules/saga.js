import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  POST_DISPATCH_MANAGE,
  POST_DISPATCH_MANAGE_SUCCESS,
  POST_DISPATCH_MANAGE_ERROR
} from './dispatchManageAlert.js'

import {
  GET_DISPATCH_MANAGE_LIST,
  GET_DISPATCH_MANAGE_LIST_SUCCESS,
  GET_DISPATCH_MANAGE_LIST_ERROR
} from './dispatchManage.js'

import {
  POST_DISPATCH_MANAGE_VERIFY,
  POST_DISPATCH_MANAGE_VERIFY_SUCCESS,
  POST_DISPATCH_MANAGE_VERIFY_ERROR,
  GET_ORDER_DETAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_ERROR,
} from './dispatchManageVerify.js'

import { postDispatchManageAPI, getDispatchManageListAPI, postOrderCheckAPI, getOrderDetailAPI, orderGoodsDetailAPI } from 'api/DDB'

export function* watchPostDispatchManage() {
  yield takeEvery(POST_DISPATCH_MANAGE, handleAPI(postDispatchManage))
}

export function* watchGetDispatchManageList() {
  yield takeEvery(GET_DISPATCH_MANAGE_LIST, handleAPI(getDispatchManageList))
}

export function* watchPostDispatchManageVerify() {
  yield takeEvery(POST_DISPATCH_MANAGE_VERIFY, handleAPI(postDispatchManageVerify))
}

export function* watchGetDispatchManageOrderDetail() {
  yield takeEvery(GET_ORDER_DETAIL, handleAPI(getOrderDetail))
}

export function* postDispatchManage(action) {
  try {
    const response = yield call(postDispatchManageAPI, action.payload);
    yield put({
      type: POST_DISPATCH_MANAGE_SUCCESS,
      response
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: POST_DISPATCH_MANAGE_ERROR
    })
  }
}

export function* getDispatchManageList(action) {
  try {
    const response = yield call(getDispatchManageListAPI, action.payload);
    yield put({
      type: GET_DISPATCH_MANAGE_LIST_SUCCESS,
      response: response.Result
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: GET_DISPATCH_MANAGE_LIST_ERROR
    })
  }
}

export function* postDispatchManageVerify(action) {
  try {
    const response = yield call(postOrderCheckAPI, action.payload);
    yield put({
      type: POST_DISPATCH_MANAGE_VERIFY_SUCCESS,
      response
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: POST_DISPATCH_MANAGE_VERIFY_ERROR
    })
  }
}

export function* getOrderDetail(action) {
  try {
    const [productionList, orderDetail] = yield [call(orderGoodsDetailAPI, action.payload), call(getOrderDetailAPI, action.payload)]
    yield put({
      type: GET_ORDER_DETAIL_SUCCESS,
      response: {
        productionList: productionList.Result.DDSPGLB,
        orderDetail: orderDetail.Result.DDB
      }
    })
  } catch (error) {
    console.error(error)
    yield put({
      type: GET_ORDER_DETAIL_ERROR
    })
  }
}
