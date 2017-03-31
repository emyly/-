import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_REVIEW_LIST_DATA,
  GET_REVIEW_LIST_DATA_SUCCESS,
  GET_REVIEW_LIST_DATA_FAIL
} from './reviewList.js'
import {
  POST_REVIEW,
  POST_REVIEW_SUCCESS,
  POST_ERROR
} from './procurementReviewDetail.js'

import {
  getOrderListAPI,
  postProcurementReviewAPI
} from 'api/DDB'

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchProcurementReviewReviewListData() {
  yield takeEvery(GET_REVIEW_LIST_DATA, handleAPI(getOrderListData))
}

export function* watchProcurementReviewPostReview() {
  yield takeEvery(POST_REVIEW, handleAPI(postReview))
}

// 从api获取数据
function* getOrderListData(action) {
  try {
    const response = yield call(getOrderListAPI, action.payload);
    yield put({
      type: GET_REVIEW_LIST_DATA_SUCCESS,
      response: response.Result,
      currentPage: action.payload.params.page
    })
  } catch (error) {
    yield put({
      type: GET_REVIEW_LIST_DATA_FAIL,
      response: error
    })
  }
}

function* postReview(action) {
  try {
    yield call(postProcurementReviewAPI, action.payload);
    yield put({
      type: POST_REVIEW_SUCCESS,
      response: true
    })
  } catch (error) {
    yield put({
      type: POST_ERROR,
      response: error
    })
  }
}
