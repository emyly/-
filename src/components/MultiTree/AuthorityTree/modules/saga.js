import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_AUTHORITY_DATA,
  GET_AUTHORITY_DATA_SUCCESS,
  GET_AUTHORITY_DATA_FAIL
} from './AuthorityTreeActions.js'
import { getAuthorityAPI } from 'api/Role'
import _ from 'lodash'

export function *watchAuthorityActions() {
  yield takeEvery(GET_AUTHORITY_DATA, handleAPI(getAuthority))
}

function *getAuthority(action) {
  try {
    const response = yield call(getAuthorityAPI, action.payload);
    if (_.get(response, 'Code') === 0) {
      const resultArray = response.Result.MKFLB;
      yield put({
        type: GET_AUTHORITY_DATA_SUCCESS,
        response: resultArray,
        payload: action.payload
      })
    } else {
      yield put({
        type: GET_AUTHORITY_DATA_FAIL,
        response: response.Message,
        payload: action.payload
      })
    }
  } catch (error) {
    yield put({
      type: GET_AUTHORITY_DATA_FAIL,
      response: error
    })
  }
}
