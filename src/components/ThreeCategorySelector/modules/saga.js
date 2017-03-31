/**
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
    FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION,
    FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_SUCCESS,
    FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION_FAIL,
    FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION,
    FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_SUCCESS,
    FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION_FAIL,
    FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION,
    FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_SUCCESS,
    FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION_FAIL,
    fetchFirstClassSelectionSuccess,
    fetchFirstClassSelectionFail,
    fetchSecondClassSelectionSuccess,
    fetchSecondClassSelectionFail,
    fetchThirdClassSelectionSuccess,
    fetchThirdClassSelectionFail
} from '../modules/threeCategorySelector'

import {
  getFirstClassSelectionAPI,
  getSecondClassSelectionAPI,
  getThirdClassSelectionAPI,
  getAuthorizationSelectionGoodsAPI
} from 'api/authorization'

// {
//   'class_id': '1',
//   'class_name': '1_A'
// }
function *fetchFirstClassSelectionSaga(action) {
  try {
    const result = yield call(getFirstClassSelectionAPI, action.payload)
    if (result.Code === 0) {
      yield put(fetchFirstClassSelectionSuccess(result.Result.class))
    } else {
      yield put(fetchFirstClassSelectionFail(result.Message))
    }
  } catch (error) {
    yield put(fetchFirstClassSelectionFail(error))
  }
}

function *fetchSecondClassSelectionSaga(action) {
  try {
    const result = yield call(getSecondClassSelectionAPI, action.payload)
    if (result.Code === 0) {
      yield put(fetchSecondClassSelectionSuccess(result.Result.class))
    } else {
      yield put(fetchSecondClassSelectionFail(result.Message))
    }
  } catch (error) {
    yield put(fetchSecondClassSelectionFail(error))
  }
}

function *fetchThirdClassSelectionSaga(action) {
  try {
    const result = yield call(getThirdClassSelectionAPI, action.payload)
    if (result.Code === 0) {
      yield put(fetchThirdClassSelectionSuccess(result.Result.class))
    } else {
      yield put(fetchThirdClassSelectionFail(result.Message))
    }
  } catch (error) {
    yield put(fetchThirdClassSelectionFail(error))
  }
}


export function *watchThreeCategoryFetchFirstClassSelection() {
  yield* takeEvery(FETCH_THREE_CATEGORY_FIRST_CLASS_SELECTION, handleAPI(fetchFirstClassSelectionSaga))
}

export function *watchThreeCategoryFetchSecondClassSelection() {
  yield* takeEvery(FETCH_THREE_CATEGORY_SECOND_CLASS_SELECTION, handleAPI(fetchSecondClassSelectionSaga))
}

export function *watchThreeCategoryFetchThirdClassSelection() {
  yield* takeEvery(FETCH_THREE_CATEGORY_THIRD_CLASS_SELECTION, handleAPI(fetchThirdClassSelectionSaga))
}
