import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  POST_ORDER_CHECK_AGREE,
  POST_ORDER_CHECK_AGREE_SUCCESS,
  POST_ORDER_CHECK_AGREE_ERROR
} from './successRaisedButton.js'
import {
  POST_ORDER_CHECK_BACK,
  POST_ORDER_CHECK_BACK_SUCCESS,
  POST_ORDER_CHECK_BACK_ERROR
} from './backRaisedButton.js'
import { postOrderCheckAPI } from 'api/DDB'

export function* watchPostOrderCheckAgree() {
  yield takeEvery(POST_ORDER_CHECK_AGREE, handleAPI(postOrderCheckAgree))
}

export function* watchPostOrderCheckBack() {
  yield takeEvery(POST_ORDER_CHECK_BACK, handleAPI(postOrderCheckBack))
}

export function* postOrderCheckAgree(action) {
  try{
    const response = yield call(postOrderCheckAPI, action.payload);
    yield put({
      type: POST_ORDER_CHECK_AGREE_SUCCESS,
      response
    })
  } catch (error){
    yield put({
      type: POST_ORDER_CHECK_BACK_ERROR, 
      error
    })
  }
}

export function* postOrderCheckBack(action) {
  try {
    const response = yield call(postOrderCheckAPI, action.payload);
    yield put({
      type: POST_ORDER_CHECK_BACK_SUCCESS,
      response
    })
  } catch (error) {
    yield put({
      type: POST_ORDER_CHECK_BACK_ERROR,
      error
    })
  }
}
