import { takeEvery } from 'redux-saga'
import { call, put, fork, take, cancel } from 'redux-saga/effects'
import { handleAPI, getSignature } from 'lib/utils'

import {
  GET_ALL_MENUBAR_TREE,
  GET_ALL_MENUBAR_TREE_SUCCESS,
  GET_ALL_MENUBAR_TREE_ERROR,
  GET_USER_MENUBAR_TREE,
  GET_USER_MENUBAR_TREE_ERROR,
  GET_USER_MENUBAR_TREE_SUCCESS
} from './menuBar'

import {getAllMenuBarAPI} from 'api/GGBF'
import {getUserMenuBarAPI} from 'api/YH'

function *getAllMenuBar() {
  try {
    const  response = yield call(getAllMenuBarAPI);

    yield put({
      type: GET_ALL_MENUBAR_TREE_SUCCESS,
      response:response.Result.MKFLB
    });
  } catch (error) {
    yield put({
      type: GET_ALL_MENUBAR_TREE_ERROR,
      error
    });
  }
}
function *getUserMenuBar(action) {
  try {
    const  response = yield call(getUserMenuBarAPI,action.yhid);

    yield put({
      type: GET_USER_MENUBAR_TREE_SUCCESS,
      response:response.Result.MKYWB
    });
  } catch (error) {
    yield put({
      type: GET_USER_MENUBAR_TREE_ERROR,
      error
    });
  }
}

export function *watchGetAllMenuBar() {
  yield takeEvery(GET_ALL_MENUBAR_TREE, handleAPI(getAllMenuBar));
}
export function *watchGetUserMenuBar() {
  yield takeEvery(GET_USER_MENUBAR_TREE, handleAPI(getUserMenuBar));
}
