import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI } from 'lib/utils'
import {
  GET_ROLES_DATA,
  GET_ROLES_DATA_SUCCESS,
  GET_ROLES_DATA_FAIL
} from './RoleTreeActions.js'
import { getRoleAPI } from 'api/Role'
import _ from 'lodash'

export function *watchRoleActions() {
  yield takeEvery(GET_ROLES_DATA, handleAPI(getRole))
}

function *getRole(action) {
  try {
    const response = yield call(getRoleAPI, action.payload);
    if (_.get(response, 'Code') === 0) {
      const resultArray = response.Result.JSB;
      yield put({
        type: GET_ROLES_DATA_SUCCESS,
        response: resultArray,
        payload: action.payload
      })
    } else {
      yield put({
        type: GET_ROLES_DATA_FAIL,
        response: response.Message,
        payload: action.payload
      })
    }
  } catch (error) {
    yield put({
      type: GET_ROLES_DATA_FAIL,
      response: error
    })
  }
}
