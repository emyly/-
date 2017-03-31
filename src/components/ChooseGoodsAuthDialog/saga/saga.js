/**
 * author: Yechen Huang (huangyc@firstgrid.cn)
 */
import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'

import {
  FETCH_FIRST_CLASS_SELECTION,
  fetchFirstClassSelectionSuccess,
  fetchFirstClassSelectionFail
} from '../modules/firstClassSelection'

import {
  FETCH_SECOND_CLASS_SELECTION,
  fetchSecondClassSelectionSuccess,
  fetchSecondClassSelectionFail
} from '../modules/secondClassSelection'

import {
  FETCH_THIRD_CLASS_SELECTION,
  fetchThirdClassSelectionSuccess,
  fetchThirdClassSelectionFail
} from '../modules/thirdClassSelection'

import {
  FETCH_AUTHORIZATION_SELECTION_GOODS,
  fetchAuthorizationSelectionGoodsSuccess,
  fetchAuthorizationSelectionGoodsFail
} from '../modules/authorizationSelectionGoods'

import {
  SEARCH_AUTHORIZED_GOODS,
  searchAuthorizedGoodsSuccess,
  searchAuthorizedGoodsFail
} from '../modules/searchAuthorizedGoods'


import {
  getFirstClassSelectionAPI,
  getSecondClassSelectionAPI,
  getThirdClassSelectionAPI,
  getAuthorizationSelectionGoodsAPI,
  searchAuthorizedGoodsAPI
} from 'api/authorization'

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

function *fetchAuthorizationSelectionGoodsSaga(action) {
  try {
    const result = yield call(getAuthorizationSelectionGoodsAPI, action.payload)
    if (result.Code === 0) {
      yield put(fetchAuthorizationSelectionGoodsSuccess(result.Result.goods))
    } else {
      yield put(fetchAuthorizationSelectionGoodsFail(result.Message))
    }
  } catch (error) {
    yield put(fetchAuthorizationSelectionGoodsFail(error))
  }
}

function *searchAuthorizedGoodsSaga(action) {
  try {
    const result = yield call(searchAuthorizedGoodsAPI, action.params)
    if (result.Code === 0) {
      yield put(searchAuthorizedGoodsSuccess(result.Result.goods))
    } else {
      yield put(searchAuthorizedGoodsFail(result.Message))
    }
  } catch (error) {
    put(searchAuthorizedGoodsFail(error))
  }
}

export function *watchFetchFirstClassSelection() {
  yield* takeEvery(FETCH_FIRST_CLASS_SELECTION, handleAPI(fetchFirstClassSelectionSaga))
}

export function *watchFetchSecondClassSelection() {
  yield* takeEvery(FETCH_SECOND_CLASS_SELECTION, handleAPI(fetchSecondClassSelectionSaga))
}

export function *watchFetchThirdClassSelection() {
  yield* takeEvery(FETCH_THIRD_CLASS_SELECTION, handleAPI(fetchThirdClassSelectionSaga))
}

export function *watchFetchAuthorizationSelectionGoods() {
  yield* takeEvery(FETCH_AUTHORIZATION_SELECTION_GOODS, handleAPI(fetchAuthorizationSelectionGoodsSaga))
}

export function *watchSearchAuthorizedGoods() {
  yield* takeEvery(SEARCH_AUTHORIZED_GOODS, handleAPI(searchAuthorizedGoodsSaga))
}
