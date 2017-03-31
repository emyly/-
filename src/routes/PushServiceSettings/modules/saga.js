/**
 * Created by NXQ on 2/23/2017.
 */

import { takeEvery } from 'redux-saga';
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { handleAPI } from 'lib/utils';

import {
  GET_PUSH_SERVICE_SETTINGS_DATA,
  GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS,
  GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS_FAIL,
  UPDATE_PUSH_SERVICE_SETTINGS_DATA,
  UPDATE_PUSH_SERVICE_SETTINGS_DATA_SUCCESS,
  UPDATE_PUSH_SERVICE_SETTINGS_DATA_FAIL
} from './pushServiceSettings';

import {
  getPushServiceSettingDataAPI,
  updatePushServiceSettingDataAPI
} from 'api/XXPZB';

import _ from 'lodash';


// 获取推送服务设置
function* getPushServiceSettingsData(action) {
  const response = yield call(getPushServiceSettingDataAPI, action.payload);
  if (response.Code === 0 && _.has(response.Result, 'XXPZB')) {
    yield put({
      type: GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS,
      dataResponse: response.Result.XXPZB || []
    })
  } else {
    yield put({
      type: GET_PUSH_SERVICE_SETTINGS_DATA_SUCCESS_FAIL
    })
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchGetPushServiceSettingsData() {
  yield takeEvery(GET_PUSH_SERVICE_SETTINGS_DATA, handleAPI(getPushServiceSettingsData));
}

// 更新推送服务设置
function* updatePushServiceSettingsData(action) {
  const response = yield call(updatePushServiceSettingDataAPI, action.payload);
  if (response.Code === 0) {
    yield put({
      type: UPDATE_PUSH_SERVICE_SETTINGS_DATA_SUCCESS,
      deleteObject: action.payload
    })
  } else {
    yield put({
      type: UPDATE_PUSH_SERVICE_SETTINGS_DATA_FAIL
    })
  }
}

/**
 * 监听action type
 * 触发方法包含在handleAPI中
 */
export function* watchUpdatePushServiceSettingsData() {
  yield takeEvery(UPDATE_PUSH_SERVICE_SETTINGS_DATA, handleAPI(updatePushServiceSettingsData));
}

